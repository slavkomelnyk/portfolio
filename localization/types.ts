/**
 * Shapes of the translation files in localization/<lang>/.
 * Every language must provide ALL of these keys - TypeScript reports a missing translation.
 * When you add a project, status or technology, add its id/name to the unions below.
 */

export type ProjectId = "camera-embed" | "school-ahead-tv" | "django-shop";
export type StatusId = "relaxing" | "working" | "thinking";
export type TechName =
  | "Python" | "JavaScript" | "TypeScript" | "Bootstrap" | "Tailwind" | "Java"
  | "Kotlin" | "Obsidian" | "Django" | "Android" | "Synology" | "Docker";

export type Ui = {
  metaTitle: string;
  metaDescription: string;
  languageSwitcher: string;

  navHome: string;
  navAbout: string;
  navProjects: string;
  navLabel: string;

  themeToLight: string;
  themeToDark: string;
  themeLightTitle: string;
  themeDarkTitle: string;

  heroGreeting: string;
  heroPassion: string;
  heroFocus: string;
  heroFocusTitle: string;
  heroIntro: string;
  heroAnd: string;
  heroOutro: string;

  projectsTitle: string;
  projectsLabel: string;
  projectIconAlt: string;
  carouselPrev: string;
  carouselNext: string;

  statStars: string;
  statInstalls: string;
  statDownloads: string;
};
export type UiKey = keyof Ui;

export type ProjectText = { title: string; kind: string; description: string };
export type StatusText = { label: string; alt: string };

export type Translation = {
  ui: Ui;
  projects: Record<ProjectId, ProjectText>;
  statuses: Record<StatusId, StatusText>;
  /** Tooltip shown over a technology badge. */
  techHints: Record<TechName, string>;
};
