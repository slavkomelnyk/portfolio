import { prefix } from "@/config/main";

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

export const statuses = [
  {
    label: "Relaks & Inspiracja",
    image: prefix + "/images/status/relaxing.png",
    alt: "Sviatoslav relaksuje się w fotelu",
    json: { status: "Relaxed", coffee: "Consumed", next_move: "Build something cool after a break" },
  },
  {
    label: "Praca nad projektem",
    image: prefix + "/images/status/working.png",
    alt: "Sviatoslav pracuje nad projektem",
    json: { status: "Coding", coffee: "In progress", next_move: "Ship the next feature" },
  },
  {
    label: "Planowanie nowego pomysłu",
    image: prefix + "/images/status/thinking.png",
    alt: "Sviatoslav planuje nowy pomysł",
    json: { status: "Planning", coffee: "Refilled", next_move: "Sketch the next big idea" },
  },
] as const;

export type Tech = {
  name: string;
  href: string;
  tone: "python" | "javascript" | "typescript" | "tailwind" | "bootstrap" | "java" | "kotlin" | "obsidian" | "django" | "android" | "docker" | "synology";
  hint: string;
};

export const techStack: Tech[] = [
  { name: "Python", href: "https://www.python.org/", tone: "python", hint: "Oficjalna strona Pythona" },
  { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", tone: "javascript", hint: "MDN: JavaScript" },
  { name: "TypeScript", href: "https://www.typescriptlang.org/", tone: "typescript", hint: "Oficjalna strona TypeScripta" },
  { name: "Bootstrap", href: "https://getbootstrap.com/", tone: "bootstrap", hint: "Oficjalna strona Bootstrapa" },
  { name: "Tailwind", href: "https://tailwindcss.com/", tone: "tailwind", hint: "Oficjalna strona Tailwind CSS" },
  { name: "Java", href: "https://www.java.com/", tone: "java", hint: "Oficjalna strona Javy" },
  { name: "Kotlin", href: "https://kotlinlang.org/", tone: "kotlin", hint: "Oficjalna strona Kotlina" },
  { name: "Obsidian", href: "https://obsidian.md/", tone: "obsidian", hint: "Oficjalna strona Obsidiana" },
  { name: "Django", href: "https://www.djangoproject.com/", tone: "django", hint: "Oficjalna strona Django" },
  { name: "Android", href: "https://www.android.com/", tone: "android", hint: "Oficjalna strona systemu Android" },
  { name: "Synology", href: "https://www.synology.com/", tone: "synology", hint: "Oficjalna strona Synology" },
  { name: "Docker", href: "https://www.docker.com/", tone: "docker", hint: "Oficjalna strona Dockera" }
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
  title: string;
  kind: string;
  image: string;
  description: string;
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
    title: "Camera Embed",
    kind: "Wtyczka Obsidiana",
    image: "/images/projects/camera.png",
    description:
      "Wtyczka do Obsidiana, która umożliwia robienie zdjęć i dodawanie ich do notatek w kilku kliknięciach i kompresowanie ich.",
    repo: "https://github.com/slavkomelnyk/camera-embed",
    obsidian_marketplace: "https://community.obsidian.md/plugins/camera-embed",
    obsidianId: "camera-embed",
    stats: { stars: "github-stars", downloads: "obsidian-downloads" },
    tags: ["JavaScript", "Obsidian"],
  },
  {
    title: "School Ahead TV",
    kind: "Aplikacja Android TV",
    image: "/images/projects/tv.png",
    description:
      "Aplikacja na Android TV, która ułatwia mojej młodszej siostrze uruchamianie lekcji. Obsługuje nawigację pilotem, odtwarzanie wideo i własne menu sterowania video.",
    repo: "https://github.com/slavkomelnyk/school-ahead-tv",
    stats: { stars: "github-stars", downloads: "github-releases" },
    tags: ["Kotlin", "Android", "Java"],
  },
  {
    title: "Sklep w Django",
    kind: "Aplikacja webowa",
    image: "/images/projects/shop.png",
    description:
      "Prosty sklep internetowy dla dzieci stworzony w Django, wyposażony w system logowania, komentarzy i ocen oraz interfejs w Bootstrapie. Uruchamiany w Dockerze na serwerze Synology NAS.",
    repo: "https://github.com/slavkomelnyk/shoper-main",
    stats: { stars: "github-stars" },
    tags: ["Python", "Django", "Bootstrap", "Docker", "Synology"],
  },
];
