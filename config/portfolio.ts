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
    image: "/images/status/relaxing.png",
    alt: "Sviatoslav relaksuje się w fotelu",
    json: { status: "Relaxed", coffee: "Consumed", next_move: "Build something cool after a break" },
  },
  {
    label: "Praca nad projektem",
    image: "/images/status/working.png",
    alt: "Sviatoslav pracuje nad projektem",
    json: { status: "Coding", coffee: "In progress", next_move: "Ship the next feature" },
  },
  {
    label: "Planowanie nowego pomysłu",
    image: "/images/status/thinking.png",
    alt: "Sviatoslav planuje nowy pomysł",
    json: { status: "Planning", coffee: "Refilled", next_move: "Sketch the next big idea" },
  },
] as const;

export type Tech = {
  name: string;
  href: string;
  tone: "python" | "javascript" | "java" | "kotlin" | "obsidian" | "django" | "android" | "synology";
  hint: string;
};

export const techStack: Tech[] = [
  { name: "Python", href: "https://python.org/", tone: "python", hint: "Strona Pythona" },
  { name: "JavaScript", href: "https://developer.mozilla.org/docs/Web/JavaScript", tone: "javascript", hint: "MDN: JavaScript" },
  { name: "Java", href: "https://docs.oracle.com/en/java/", tone: "java", hint: "Dokumentacja Javy" },
  { name: "Kotlin", href: "https://kotlinlang.org/", tone: "kotlin", hint: "Strona Kotlina" },
  { name: "Obsidian", href: "https://help.obsidian.md/", tone: "obsidian", hint: "Pomoc Obsidiana" },
  { name: "Django", href: "https://docs.djangoproject.com/", tone: "django", hint: "Dokumentacja Django" },
  { name: "Android", href: "https://developer.android.com/docs", tone: "android", hint: "Android Developers" },
  { name: "Synology", href: "https://kb.synology.com/", tone: "synology", hint: "Baza wiedzy Synology" },
];

export const projects = [
  {
    title: "Camera Embed",
    kind: "Wtyczka Obsidiana",
    image: "/images/projects/camera.png",
    description:
      "Wtyczka do Obsidiana, która umożliwia robienie zdjęć i dodawanie ich do notatek w kilku kliknięciach.",
    repo: "https://github.com/slavkomelnyk/camera-embed",
    tags: ["JavaScript", "Obsidian"],
  },
  {
    title: "School Ahead TV",
    kind: "Aplikacja Android TV",
    image: "/images/projects/tv.png",
    description:
      "Aplikacja na Android TV, która ułatwia mojej młodszej siostrze uruchamianie lekcji. Obsługuje nawigację pilotem, odtwarzanie wideo i własne menu sterowania.",
    repo: "https://github.com/slavkomelnyk/school-ahead-tv",
    tags: ["Kotlin", "Android", "Java"],
  },
  {
    title: "Sklep w Django",
    kind: "Aplikacja webowa",
    image: "/images/projects/shop.png",
    description:
      "Prosty sklep internetowy dla dzieci, uruchamiany na domowym serwerze Synology NAS.",
    repo: "https://github.com/slavkomelnyk/shoper-main",
    tags: ["Python", "Django", "Synology"],
  },
] as const;
