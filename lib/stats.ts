import { STATS_CACHE_MINUTES } from "@/config/projects";
import { Stat, Project } from "@/config/types";

// Browser-only helpers: statistics are fetched when the page loads, so they are always current.

const ttl = STATS_CACHE_MINUTES * 60_000;
/** After a failed request (offline, rate limit) keep the old value and try again after this long. */
const RETRY_AFTER = 5 * 60_000;

// Each resolved number is stored in localStorage together with the date it expires:
//   stats:v2:<project>:<stat> -> { "expiresAt": "2026-11-10T12:30:00.000Z", "value": 8 }
// While expiresAt is in the future no request is made; at/after that moment a new fetch is done.
type Entry = { expiresAt: string; value: number };

function readEntry(key: string): Entry | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const e = JSON.parse(raw) as Entry;
    return typeof e.value === "number" && !Number.isNaN(Date.parse(e.expiresAt)) ? e : null;
  } catch {
    return null;
  }
}

function writeEntry(key: string, value: number, lifetime: number) {
  try {
    localStorage.setItem(key, JSON.stringify({ expiresAt: new Date(Date.now() + lifetime).toISOString(), value }));
  } catch {}
}

async function cachedStat(key: string, load: () => Promise<number | null>): Promise<number | null> {
  const entry = readEntry(key);
  if (entry) {
    const left = Date.parse(entry.expiresAt) - Date.now();
    // Still valid. (An expiry further away than the configured lifetime means the setting was lowered -> refetch.)
    if (left > 0 && left <= ttl) return entry.value;
  }

  const fresh = await load();
  if (fresh !== null) {
    writeEntry(key, fresh, ttl);
    return fresh;
  }
  if (entry) {
    // Request failed: keep showing the last known value and retry soon.
    writeEntry(key, entry.value, Math.min(RETRY_AFTER, ttl));
    return entry.value;
  }
  return null;
}

async function getJson<T>(url: string): Promise<T | null> {
  try {
    // "no-cache" = always revalidate with the server instead of reusing the browser's HTTP cache.
    const res = await fetch(url, { cache: "no-cache", headers: { Accept: "application/vnd.github+json" } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

const repoSlug = (url: string) => url.match(/github\.com\/([^/]+\/[^/#?]+)/)?.[1]?.replace(/\.git$/, "");

type ObsidianStats = Record<string, { downloads?: number }>;
let obsidianStats: Promise<ObsidianStats | null> | undefined;
const getObsidianStats = () =>
  (obsidianStats ??= getJson<ObsidianStats>(
    "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json",
  ));

async function load(stat: Exclude<Stat, number>, p: Project): Promise<number | null> {
  if (stat === "obsidian-downloads") {
    if (!p.obsidianId) return null;
    return (await getObsidianStats())?.[p.obsidianId]?.downloads ?? null;
  }

  const slug = repoSlug(p.repo);
  if (!slug) return null;

  if (stat === "github-stars") {
    const repo = await getJson<{ stargazers_count: number }>(`https://api.github.com/repos/${slug}`);
    return repo?.stargazers_count ?? null;
  }

  const releases = await getJson<{ assets: { download_count: number }[] }[]>(
    `https://api.github.com/repos/${slug}/releases?per_page=100`,
  );
  return releases ? releases.reduce((sum, r) => sum + r.assets.reduce((n, a) => n + a.download_count, 0), 0) : null;
}

function resolve(stat: Stat | undefined, p: Project): Promise<number | null> {
  if (stat === undefined) return Promise.resolve(null);
  if (typeof stat === "number") return Promise.resolve(stat);
  return cachedStat(`stats:v2:${p.id}:${stat}`, () => load(stat, p));
}

// Remove entries written by the previous cache format (raw API responses).
try {
  for (const k of Object.keys(localStorage)) if (/^stats:https?:/.test(k)) localStorage.removeItem(k);
} catch {}

export type ResolvedStats = { stars: number | null; installs: number | null; downloads: number | null };

export async function getProjectStats(p: Project): Promise<ResolvedStats> {
  const [stars, installs, downloads] = await Promise.all([
    resolve(p.stats?.stars, p),
    resolve(p.stats?.installs, p),
    resolve(p.stats?.downloads, p),
  ]);
  return { stars, installs, downloads };
}
