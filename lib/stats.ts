
import { STATS_CACHE_MINUTES } from "@/config/projects";
import { Stat, Project } from "@/config/types";

// Browser-only helpers.

const ttl = STATS_CACHE_MINUTES * 60_000;
const RETRY_AFTER = 5 * 60_000;

type Entry = {
  expiresAt: string;
  value: number;
};

function readEntry(key: string): Entry | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const e = JSON.parse(raw) as Entry;

    return typeof e.value === "number" &&
      Number.isFinite(e.value) &&
      !Number.isNaN(Date.parse(e.expiresAt))
      ? e
      : null;
  } catch {
    return null;
  }
}

function writeEntry(key: string, value: number, lifetime: number) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        expiresAt: new Date(Date.now() + lifetime).toISOString(),
        value,
      }),
    );
  } catch {}
}

async function cachedStat(
  key: string,
  load: () => Promise<number | null>,
): Promise<number | null> {
  const entry = readEntry(key);

  if (entry) {
    const left = Date.parse(entry.expiresAt) - Date.now();

    if (left > 0 && left <= ttl) {
      return entry.value;
    }
  }

  const fresh = await load();

  if (fresh !== null) {
    writeEntry(key, fresh, ttl);
    return fresh;
  }

  if (entry) {
    writeEntry(key, entry.value, Math.min(RETRY_AFTER, ttl));
    return entry.value;
  }

  return null;
}

// --------------------------------------------------
// JSON helper
// --------------------------------------------------

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "no-cache",
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

// --------------------------------------------------
// Shields.io helper
// --------------------------------------------------

type ShieldsBadge = {
  label?: string;
  message?: string;
  value?: string;
  color?: string;
};

async function getShieldsBadge(
  url: string,
): Promise<ShieldsBadge | null> {
  try {
    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) return null;

    return (await res.json()) as ShieldsBadge;
  } catch {
    return null;
  }
}

function parseBadgeNumber(message?: string): number | null {
  if (!message) return null;

  const match = message.match(/^([\d,.]+)\s*([kKmM])?$/);

  if (!match) return null;

  const number = Number(match[1].replace(/,/g, ""));

  const multiplier =
    match[2]?.toLowerCase() === "k"
      ? 1_000
      : match[2]?.toLowerCase() === "m"
        ? 1_000_000
        : 1;

  return Number.isFinite(number)
    ? Math.round(number * multiplier)
    : null;
}

// --------------------------------------------------
// Repository helpers
// --------------------------------------------------

const repoSlug = (url: string) =>
  url
    .match(/github\.com\/([^/]+\/[^/#?]+)/)?.[1]
    ?.replace(/\.git$/, "");

export const obsidianIdOf = (p: Project) =>
  p.obsidian_marketplace ?? repoSlug(p.repo)?.split("/")[1];

export const obsidianMarketplaceUrl = (id: string) =>
  `https://community.obsidian.md/plugins/${encodeURIComponent(id)}`;

// --------------------------------------------------
// Obsidian statistics
// --------------------------------------------------

type ObsidianStats = Record<string, { downloads?: number }>;

let obsidianStats: Promise<ObsidianStats | null> | undefined;

const getObsidianStats = () =>
  (obsidianStats ??= getJson<ObsidianStats>(
    "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json",
  ));

// --------------------------------------------------
// GitHub Stars
// Primary: GitHub API
// Fallback: Shields.io
// --------------------------------------------------

async function getGitHubStars(slug: string): Promise<number | null> {
  // Primary source.
  const repo = await getJson<{ stargazers_count: number }>(
    `https://api.github.com/repos/${slug}`,
  );

  if (
    repo &&
    typeof repo.stargazers_count === "number" &&
    Number.isFinite(repo.stargazers_count)
  ) {
    return repo.stargazers_count;
  }

  // Fallback source.
  const badge = await getShieldsBadge(
    `https://img.shields.io/github/stars/${slug}.json`,
  );

  return parseBadgeNumber(badge?.message);
}

// --------------------------------------------------
// Release downloads
// Primary: GitHub API
// Fallback: Shields.io
// --------------------------------------------------

async function getReleaseDownloads(
  slug: string,
): Promise<number | null> {
  const releases = await getJson<
    { assets: { download_count: number }[] }[]
  >(
    `https://api.github.com/repos/${slug}/releases?per_page=100`,
  );

  if (releases) {
    return releases.reduce(
      (sum, release) =>
        sum +
        release.assets.reduce(
          (total, asset) => total + asset.download_count,
          0,
        ),
      0,
    );
  }

  // Fallback: all release downloads.
  const badge = await getShieldsBadge(
    `https://img.shields.io/github/downloads/${slug}/total.json`,
  );

  return parseBadgeNumber(badge?.message);
}

// --------------------------------------------------
// Latest release version
// Primary: Shields.io
// Fallback: GitHub API
// --------------------------------------------------

export async function getLatestRelease(
  slug: string,
): Promise<string | null> {
  const badge = await getShieldsBadge(
    `https://img.shields.io/github/v/release/${slug}.json`,
  );

  if (badge?.value || badge?.message) {
    return badge.value || badge.message || null;
  }

  const releases = await getJson<
    { tag_name: string; draft: boolean; prerelease: boolean }[]
  >(
    `https://api.github.com/repos/${slug}/releases?per_page=100`,
  );

  return releases?.find(
    (release) => !release.draft && !release.prerelease,
  )?.tag_name ?? null;
}

// --------------------------------------------------
// Complete release list
// GitHub API with pagination
// --------------------------------------------------

export type GitHubRelease = {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string | null;
  draft: boolean;
  prerelease: boolean;
  assets: {
    id: number;
    name: string;
    browser_download_url: string;
    download_count: number;
    size: number;
  }[];
};

export async function getProjectReleases(
  slug: string,
): Promise<GitHubRelease[] | null> {
  try {
    const allReleases: GitHubRelease[] = [];

    for (let page = 1; ; page++) {
      const releases = await getJson<GitHubRelease[]>(
        `https://api.github.com/repos/${slug}/releases?per_page=100&page=${page}`,
      );

      if (!releases) return null;

      allReleases.push(...releases);

      if (releases.length < 100) break;
    }

    return allReleases;
  } catch {
    return null;
  }
}

// --------------------------------------------------
// Load statistics
// --------------------------------------------------

async function load(
  stat: Exclude<Stat, number>,
  p: Project,
): Promise<number | null> {
  if (stat === "obsidian-downloads") {
    const id = obsidianIdOf(p);

    if (!id) return null;

    return (await getObsidianStats())?.[id]?.downloads ?? null;
  }

  const slug = repoSlug(p.repo);

  if (!slug) return null;

  if (stat === "github-stars") {
    return getGitHubStars(slug);
  }

  return getReleaseDownloads(slug);
}

// --------------------------------------------------
// Resolve statistics
// --------------------------------------------------

function resolve(
  stat: Stat | undefined,
  p: Project,
): Promise<number | null> {
  if (stat === undefined) {
    return Promise.resolve(null);
  }

  if (typeof stat === "number") {
    return Promise.resolve(stat);
  }

  return cachedStat(
    `stats:v2:${p.id}:${stat}`,
    () => load(stat, p),
  );
}

// --------------------------------------------------
// Remove old cache entries
// --------------------------------------------------

try {
  for (const k of Object.keys(localStorage)) {
    if (/^stats:https?:/.test(k)) {
      localStorage.removeItem(k);
    }
  }
} catch {}

// --------------------------------------------------
// Public API
// --------------------------------------------------

export type ResolvedStats = {
  stars: number | null;
  installs: number | null;
  downloads: number | null;
};

export async function getProjectStats(
  p: Project,
): Promise<ResolvedStats> {
  const [stars, installs, downloads] = await Promise.all([
    resolve(p.stats?.stars, p),
    resolve(p.stats?.installs, p),
    resolve(p.stats?.downloads, p),
  ]);

  return {
    stars,
    installs,
    downloads,
  };
}
