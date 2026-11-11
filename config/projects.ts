import { Project } from "./types";

/**
 * Where a project statistic comes from:
 *  - a number            -> shown as-is (edit it by hand)
 *  - "github-stars"      -> stargazers of `repo` (GitHub API, fetched in the visitor's browser)
 *  - "github-releases"   -> sum of downloads of all release assets of `repo`
 *  - "obsidian-downloads"-> downloads of the plugin `obsidianId` from Obsidian's public stats
 *  - omitted             -> not shown
 * API values are fetched client-side on every page load (cached in localStorage for STATS_CACHE_MINUTES).
 */

/** How long fetched statistics are reused from localStorage (protects GitHub's 60 requests/hour/IP limit). */
export const STATS_CACHE_MINUTES = 60;

/** Hide a statistic whose value is 0 (e.g. an app nobody has downloaded yet). */
export const HIDE_ZERO_STATS = true;

export const projects: Project[] = [
  {
    id: "camera-embed",
    image: "/images/projects/camera.png",
    repo: "https://github.com/slavkomelnyk/camera-embed",
    obsidian_marketplace: "https://community.obsidian.md/plugins/camera-embed",
    obsidianId: "camera-embed",
    stats: { stars: "github-stars", downloads: "obsidian-downloads" },
    tags: ["javascript", "typescript", "obsidian"],
  },
  {
    id: "school-ahead-tv",
    image: "/images/projects/tv.png",
    repo: "https://github.com/slavkomelnyk/school-ahead-tv",
    stats: { stars: "github-stars", downloads: "github-releases" },
    tags: ["kotlin", "android", "java", "javascript"],
  },
  {
    id: "django-shop",
    image: "/images/projects/shop.png",
    repo: "https://github.com/slavkomelnyk/shoper-main",
    stats: { stars: "github-stars" },
    tags: ["python", "javascript", "django", "html", "bootstrap", "docker", "synology"],
  },
];