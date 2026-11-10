import { STATS_CACHE_MINUTES, type Project, type Stat } from "@/config/portfolio";

// Browser-only helpers: statistics are fetched when the page loads, so they are always current.

const ttl = STATS_CACHE_MINUTES * 60_000;

/** Fetch JSON with a small localStorage cache; falls back to a stale copy if the request fails. */
async function cachedJson<T>(url: string): Promise<T | null> {
  const key = `stats:${url}`;
  let stale: T | null = null;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const { t, v } = JSON.parse(raw) as { t: number; v: T };
      if (Date.now() - t < ttl) return v;
      stale = v;
    }
  } catch {}

  try {
    const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) return stale;
    const v = (await res.json()) as T;
    try {
      localStorage.setItem(key, JSON.stringify({ t: Date.now(), v }));
    } catch {}
    return v;
  } catch {
    return stale;
  }
}

const repoSlug = (url: string) => url.match(/github\.com\/([^/]+\/[^/#?]+)/)?.[1]?.replace(/\.git$/, "");

// The Obsidian stats file is large: keep only the numbers we need before caching.
type ObsidianStats = Record<string, { downloads?: number }>;
let obsidianStats: Promise<ObsidianStats | null> | undefined;
const getObsidianStats = () =>
  (obsidianStats ??= cachedJson<ObsidianStats>(
    "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json",
  ));

async function resolve(stat: Stat | undefined, p: Project): Promise<number | null> {
  if (stat === undefined) return null;
  if (typeof stat === "number") return stat;

  if (stat === "obsidian-downloads") {
    if (!p.obsidianId) return null;
    return (await getObsidianStats())?.[p.obsidianId]?.downloads ?? null;
  }

  const slug = repoSlug(p.repo);
  if (!slug) return null;

  if (stat === "github-stars") {
    const repo = await cachedJson<{ stargazers_count: number }>(`https://api.github.com/repos/${slug}`);
    return repo?.stargazers_count ?? null;
  }

  const releases = await cachedJson<{ assets: { download_count: number }[] }[]>(
    `https://api.github.com/repos/${slug}/releases?per_page=100`,
  );
  return releases ? releases.reduce((sum, r) => sum + r.assets.reduce((n, a) => n + a.download_count, 0), 0) : null;
}

export type ResolvedStats = { stars: number | null; installs: number | null; downloads: number | null };

export async function getProjectStats(p: Project): Promise<ResolvedStats> {
  const [stars, installs, downloads] = await Promise.all([
    resolve(p.stats?.stars, p),
    resolve(p.stats?.installs, p),
    resolve(p.stats?.downloads, p),
  ]);
  return { stars, installs, downloads };
}
