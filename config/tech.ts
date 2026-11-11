import { TechnologiesType, TechnologiesId, TechnologyIconEntry } from "@/config/types";

import {
  SiAndroid, SiBootstrap, SiDjango, SiDocker, SiHtml5, SiJavascript, SiKotlin, SiNextdotjs, SiObsidian, SiOpenjdk, SiPython, SiReact, SiSynology, SiTailwindcss, SiTypescript
} from "react-icons/si";

// Technology names and official URLs
export const Technologies: TechnologiesType[] = [
  { id: "javascript", name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { id: "typescript", name: "TypeScript", href: "https://www.typescriptlang.org/" },
  { id: "python", name: "Python", href: "https://www.python.org/" },
  { id: "java", name: "Java", href: "https://www.java.com/" },
  { id: "kotlin", name: "Kotlin", href: "https://kotlinlang.org/" },
  { id: "html", name: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },

  { id: "react", name: "React", href: "https://react.dev/" },
  { id: "nextjs", name: "Next.js", href: "https://nextjs.org/" },
  { id: "django", name: "Django", href: "https://www.djangoproject.com/" },

  { id: "bootstrap", name: "Bootstrap", href: "https://getbootstrap.com/" },
  { id: "tailwindcss", name: "Tailwind CSS", href: "https://tailwindcss.com/" },

  { id: "android", name: "Android", href: "https://www.android.com/" },

  { id: "docker", name: "Docker", href: "https://www.docker.com/" },
  { id: "synology", name: "Synology", href: "https://www.synology.com/" },

  { id: "obsidian", name: "Obsidian", href: "https://obsidian.md/" },
];

// Badge colors for technologies
export const TechnologyTones = {
  neutral: "border-border bg-secondary/60 text-foreground",
  python: "border-sky-400/40 bg-sky-400/10 text-sky-900 dark:text-sky-100",
  javascript: "border-yellow-400/50 bg-yellow-400/10 text-yellow-900 dark:text-yellow-100",
  java: "border-orange-500/40 bg-orange-500/10 text-orange-900 dark:text-orange-100",
  kotlin: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-900 dark:text-fuchsia-100",
  obsidian: "border-violet-400/40 bg-violet-400/10 text-violet-900 dark:text-violet-100",
  django: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
  android: "border-green-400/50 bg-green-400/10 text-green-900 dark:text-green-100",
  synology: "border-blue-400/40 bg-blue-400/10 text-blue-900 dark:text-blue-100",
  typescript: "border-blue-600/40 bg-blue-600/10 text-blue-900 dark:text-blue-100",
  tailwindcss: "border-cyan-400/40 bg-cyan-400/10 text-cyan-900 dark:text-cyan-100",
  docker: "border-sky-600/40 bg-sky-600/10 text-sky-900 dark:text-sky-100",
  bootstrap: "border-purple-500/40 bg-purple-500/10 text-purple-900 dark:text-purple-100",
  html: "border-orange-500/40 bg-orange-500/10 text-orange-900 dark:text-orange-100",
  nextjs: "border-neutral-500/40 bg-neutral-500/10 text-neutral-900 dark:text-neutral-100",
  react: "border-sky-500/40 bg-sky-500/10 text-sky-900 dark:text-sky-100",
} as const;


// Technologies displayed in the Tech Stack section
export const techStack: TechnologiesId[] = [
  "javascript",
  "typescript",
  "python",
  "java",
  "kotlin",
  "html",

  "react",
  "nextjs",
  "django",

  "bootstrap",
  "tailwindcss",

  "android",

  "docker",
  "synology",

  "obsidian",
];

export const TechnologyIcons: Record<TechnologiesId, TechnologyIconEntry> = {
  python: { Icon: SiPython, color: "text-sky-400" },
  javascript: { Icon: SiJavascript, color: "text-yellow-500 dark:text-yellow-300" },
  java: { Icon: SiOpenjdk, color: "text-orange-400" },
  kotlin: { Icon: SiKotlin, color: "text-fuchsia-400" },
  obsidian: { Icon: SiObsidian, color: "text-violet-400" },
  django: { Icon: SiDjango, color: "text-emerald-400" },
  android: { Icon: SiAndroid, color: "text-green-600 dark:text-green-400" },
  synology: { Icon: SiSynology, color: "text-blue-400" },
  typescript: { Icon: SiTypescript, color: "text-blue-500" },
  tailwindcss: { Icon: SiTailwindcss, color: "text-cyan-400" },
  docker: { Icon: SiDocker, color: "text-sky-500" },
  bootstrap: { Icon: SiBootstrap, color: "text-purple-500" },
  html: { Icon: SiHtml5, color: "text-orange-500" },
  nextjs: { Icon: SiNextdotjs, color: "text-black dark:text-white" },
  react: { Icon: SiReact, color: "text-sky-600 dark:text-sky-400" },
};
