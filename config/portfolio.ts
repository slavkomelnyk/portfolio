import { prefix } from "@/config/main";
import type { ProjectId, StatusId, TechName } from "@/localization/types";

export const portfolio = {
  name: "Sviatoslav Melnyk",
  githubUrl: "https://github.com/slavkomelnyk",
  // Used only by the archived components in components/ui/old.
  directLinks: [
    { label: "Strona główna", href: "/", external: false },
    { label: "O mnie", href: "/about", external: false },
    { label: "Projekty", href: "/projects", external: false },
    { label: "GitHub", href: "https://github.com/slavkomelnyk", external: true },
  ],
};

/** How long a status stays before auto-advancing to the next one (ms). */
export const STATUS_INTERVAL_MS = 10_000;

export type Status = { id: StatusId; image: string; json: Record<string, string> };

/** Texts (label, alt) live in localization/<lang>/statuses.ts. */
export const statuses: Status[] = [
  {
    id: "relaxing",
    image: prefix + "/images/status/relaxing.png",
    json: { status: "Relaxed", tea: "Consumed", next_move: "Build something cool after a break" },
  },
  {
    id: "working",
    image: prefix + "/images/status/working.png",
    json: { status: "Coding", tea: "In progress", next_move: "Develop the next feature" },
  },
  {
    id: "thinking",
    image: prefix + "/images/status/thinking.png",
    json: { status: "Planning", tea: "Refilled", next_move: "Sketch the next big idea" },
  },
];

export type Tech = {
  name: TechName;
  href: string;
  tone: "python" | "javascript" | "typescript" | "tailwind" | "bootstrap" | "java" | "kotlin" | "obsidian" | "django" | "android" | "docker" | "synology";
};

/** Tooltips live in localization/<lang>/tech.ts. */
export const techStack: Tech[] = [
  { name: "Python", href: "https://www.python.org/", tone: "python" },
  { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", tone: "javascript" },
  { name: "TypeScript", href: "https://www.typescriptlang.org/", tone: "typescript" },
  { name: "Bootstrap", href: "https://getbootstrap.com/", tone: "bootstrap" },
  { name: "Tailwind", href: "https://tailwindcss.com/", tone: "tailwind" },
  { name: "Java", href: "https://www.java.com/", tone: "java" },
  { name: "Kotlin", href: "https://kotlinlang.org/", tone: "kotlin" },
  { name: "Obsidian", href: "https://obsidian.md/", tone: "obsidian" },
  { name: "Django", href: "https://www.djangoproject.com/", tone: "django" },
  { name: "Android", href: "https://www.android.com/", tone: "android" },
  { name: "Synology", href: "https://www.synology.com/", tone: "synology" },
  { name: "Docker", href: "https://www.docker.com/", tone: "docker" }
];

/**
 * Where a project statistic comes from:
 *  - a number            -> shown as-is (edit it by hand)
 *  - "github-stars"      -> stargazers of `repo` (GitHub API, fetched in the visitor's browser)
 *  - "github-releases"   -> sum of downloads of all release assets of `repo`
 *  - "obsidian-downloads"-> downloads of the plugin `obsidianId` from Obsidian's public stats
 *  - omitted             -> not shown
 * API values are fetched client-side on every page load (cached in localStorage for STATS_CACHE_MINUTES).
 */
export type Stat = number | "github-stars" | "github-releases" | "obsidian-downloads";

export type Project = {
  /** Key of the texts (title, kind, description) in localization/<lang>/projects.ts. */
  id: ProjectId;
  image: string;
  repo: string;
  /** Link to the Obsidian community plugins page (optional). */
  obsidian_marketplace?: string;
  /** Plugin id from manifest.json; needed for "obsidian-downloads". */
  obsidianId?: string;
  stats?: { stars?: Stat; installs?: Stat; downloads?: Stat };
  tags: string[];
};

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
    tags: ["JavaScript", "Obsidian"],
  },
  {
    id: "school-ahead-tv",
    image: "/images/projects/tv.png",
    repo: "https://github.com/slavkomelnyk/school-ahead-tv",
    stats: { stars: "github-stars", downloads: "github-releases" },
    tags: ["Kotlin", "Android", "Java"],
  },
  {
    id: "django-shop",
    image: "/images/projects/shop.png",
    repo: "https://github.com/slavkomelnyk/shoper-main",
    stats: { stars: "github-stars" },
    tags: ["Python", "Django", "Bootstrap", "Docker", "Synology"],
  },
];
