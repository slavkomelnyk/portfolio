
import { TechnologiesType, TechnologiesId, TechnologyIconEntry } from "@/config/types";

import {
  SiAndroid,
  SiBootstrap,
  SiCss,
  SiDjango,
  SiDocker,
  SiFramer,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiNextdotjs,
  SiObsidian,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSimpleicons,
  SiSynology,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { LuGlobe } from "react-icons/lu";

// Technology names and official URLs
export const Technologies = [
  // Languages
  {
    id: "java",
    name: "Java",
    href: "https://www.java.com/",
  },
  {
    id: "javascript",
    name: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    href: "https://kotlinlang.org/",
  },
  {
    id: "python",
    name: "Python",
    href: "https://www.python.org/",
  },
  {
    id: "typescript",
    name: "TypeScript",
    href: "https://www.typescriptlang.org/",
  },

  // Web technologies
  {
    id: "css",
    name: "CSS",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    id: "html",
    name: "HTML",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },

  // Frameworks
  {
    id: "django",
    name: "Django",
    href: "https://www.djangoproject.com/",
  },
  {
    id: "nextjs",
    name: "Next.js",
    href: "https://nextjs.org/",
  },
  {
    id: "react",
    name: "React",
    href: "https://react.dev/",
  },

  // UI & Styling
  {
    id: "bootstrap",
    name: "Bootstrap",
    href: "https://getbootstrap.com/",
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    href: "https://ui.shadcn.com/",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    href: "https://tailwindcss.com/",
  },

  // Platforms
  {
    id: "android",
    name: "Android",
    href: "https://www.android.com/",
  },

  // DevOps & Infrastructure
  {
    id: "docker",
    name: "Docker",
    href: "https://www.docker.com/",
  },
  {
    id: "synology",
    name: "Synology",
    href: "https://www.synology.com/",
  },

  // Development & Hosting
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/",
  },
  {
    id: "githubpages",
    name: "GitHub Pages",
    href: "https://docs.github.com/en/pages",
  },

  // Productivity
  {
    id: "obsidian",
    name: "Obsidian",
    href: "https://obsidian.md/",
  },

  // Libraries & Tools
  {
    id: "motion",
    name: "Motion",
    href: "https://motion.dev/",
  },
  {
    id: "nextintl",
    name: "Next Intl",
    href: "https://next-intl-docs.vercel.app/",
  },
  {
    id: "reacticons",
    name: "React Icons",
    href: "https://react-icons.github.io/react-icons/",
  },
] as const satisfies readonly TechnologiesType[];


// Badge colors for technologies
export const TechnologyTones = {
  neutral: "border-border bg-secondary/60 text-foreground",

  // Languages
  java: "border-orange-600/40 bg-orange-600/10 text-orange-800 dark:text-orange-300",
  javascript: "border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  kotlin: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
  python: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  typescript: "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300",

  // Web technologies
  css: "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  html: "border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-300",

  // Frameworks
  django: "border-emerald-600/40 bg-emerald-600/10 text-emerald-800 dark:text-emerald-300",
  nextjs: "border-zinc-500/40 bg-zinc-500/10 text-zinc-800 dark:text-zinc-200",
  react: "border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",

  // UI & Styling
  bootstrap: "border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-300",
  shadcn: "border-slate-500/40 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  tailwindcss: "border-teal-500/40 bg-teal-500/10 text-teal-700 dark:text-teal-300",

  // Platforms
  android: "border-lime-600/40 bg-lime-600/10 text-lime-800 dark:text-lime-300",

  // DevOps & Infrastructure
  docker: "border-sky-700/40 bg-sky-700/10 text-sky-800 dark:text-sky-300",
  synology: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",

  // Development & Hosting
  github: "border-gray-600/40 bg-gray-600/10 text-gray-800 dark:text-gray-200",
  githubpages: "border-indigo-700/40 bg-indigo-700/10 text-indigo-800 dark:text-indigo-300",

  // Productivity
  obsidian: "border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300",

  // Libraries & Tools
  motion: "border-pink-500/40 bg-pink-500/10 text-pink-700 dark:text-pink-300",
  nextintl: "border-amber-600/40 bg-amber-600/10 text-amber-800 dark:text-amber-300",
  reacticons: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
} as const satisfies Record<TechnologiesId | "neutral", string>;


// Technologies displayed in the Tech Stack section
export const techStack: TechnologiesId[] = [
  // Languages
  "java",
  "javascript",
  "kotlin",
  "python",
  "typescript",

  // Web technologies
  "css",
  "html",

  // Frameworks
  "django",
  "nextjs",
  "react",

  // UI & Styling
  // "bootstrap",
  // "shadcn",
  // "tailwindcss",

  // Platforms
  // "android",

  // DevOps & Infrastructure
  "docker",
  // "synology",

  // Development & Hosting
  "github",
  // "githubpages",

  // Productivity
  // "obsidian",

  // Libraries & Tools
  // "motion",
  // "nextintl",
  // "reacticons",
];


// Technology icons and colors
export const TechnologyIcons: Record<TechnologiesId, TechnologyIconEntry> = {
  // Languages
  java: {
    Icon: SiOpenjdk,
    color: "text-orange-500 dark:text-orange-400",
  },
  javascript: {
    Icon: SiJavascript,
    color: "text-yellow-500 dark:text-yellow-300",
  },
  kotlin: {
    Icon: SiKotlin,
    color: "text-fuchsia-500 dark:text-fuchsia-400",
  },
  python: {
    Icon: SiPython,
    color: "text-sky-500 dark:text-sky-400",
  },
  typescript: {
    Icon: SiTypescript,
    color: "text-blue-500 dark:text-blue-400",
  },

  // Web technologies
  css: {
    Icon: SiCss,
    color: "text-indigo-500 dark:text-indigo-400",
  },
  html: {
    Icon: SiHtml5,
    color: "text-orange-600 dark:text-orange-400",
  },

  // Frameworks
  django: {
    Icon: SiDjango,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  nextjs: {
    Icon: SiNextdotjs,
    color: "text-zinc-900 dark:text-white",
  },
  react: {
    Icon: SiReact,
    color: "text-cyan-500 dark:text-cyan-400",
  },

  // UI & Styling
  bootstrap: {
    Icon: SiBootstrap,
    color: "text-purple-600 dark:text-purple-400",
  },
  shadcn: {
    Icon: SiShadcnui,
    color: "text-slate-800 dark:text-slate-200",
  },
  tailwindcss: {
    Icon: SiTailwindcss,
    color: "text-teal-500 dark:text-teal-400",
  },

  // Platforms
  android: {
    Icon: SiAndroid,
    color: "text-lime-600 dark:text-lime-400",
  },

  // DevOps & Infrastructure
  docker: {
    Icon: SiDocker,
    color: "text-sky-600 dark:text-sky-400",
  },
  synology: {
    Icon: SiSynology,
    color: "text-red-500 dark:text-red-400",
  },

  // Development & Hosting
  github: {
    Icon: SiGithub,
    color: "text-gray-800 dark:text-gray-200",
  },
  githubpages: {
    Icon: SiGithub,
    color: "text-indigo-600 dark:text-indigo-400",
  },

  // Productivity
  obsidian: {
    Icon: SiObsidian,
    color: "text-violet-500 dark:text-violet-400",
  },

  // Libraries & Tools
  motion: {
    Icon: SiFramer,
    color: "text-pink-500 dark:text-pink-400",
  },
  nextintl: {
    Icon: LuGlobe,
    color: "text-amber-600 dark:text-amber-400",
  },
  reacticons: {
    Icon: SiSimpleicons,
    color: "text-rose-500 dark:text-rose-400",
  },
};
