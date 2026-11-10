import {
  SiAndroid, SiBootstrap, SiDjango, SiDocker, SiJavascript, SiKotlin, SiObsidian, SiOpenjdk, SiPython, SiSynology, SiTailwindcss, SiTypescript
} from "react-icons/si";
import type { ComponentType } from "react";
import { BsBootstrap } from "react-icons/bs";

const icons: Record<string, { Icon: ComponentType<{ className?: string }>; color: string }> = {
  Python: { Icon: SiPython, color: "text-sky-400" },
  JavaScript: { Icon: SiJavascript, color: "text-yellow-500 dark:text-yellow-300" },
  Java: { Icon: SiOpenjdk, color: "text-orange-400" },
  Kotlin: { Icon: SiKotlin, color: "text-fuchsia-400" },
  Obsidian: { Icon: SiObsidian, color: "text-violet-400" },
  Django: { Icon: SiDjango, color: "text-emerald-400" },
  Android: { Icon: SiAndroid, color: "text-green-600 dark:text-green-400" },
  Synology: { Icon: SiSynology, color: "text-blue-400" },
  TypeScript: { Icon: SiTypescript, color: "text-blue-500" },
  Tailwind: { Icon: SiTailwindcss, color: "text-cyan-400" },
  Docker: { Icon: SiDocker, color: "text-sky-500" },
  Bootstrap: { Icon: BsBootstrap, color: "text-purple-500" },
};

export default function TechIcon({ name }: { name: string }) {
  const entry = icons[name];
  if (!entry) return null;
  return <entry.Icon className={`size-4 ${entry.color}`} />;
}
