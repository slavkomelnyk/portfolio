import {
  SiAndroid, SiDjango, SiJavascript, SiKotlin, SiObsidian, SiOpenjdk, SiPython, SiSynology,
} from "react-icons/si";
import type { ComponentType } from "react";

const icons: Record<string, { Icon: ComponentType<{ className?: string }>; color: string }> = {
  Python: { Icon: SiPython, color: "text-sky-400" },
  JavaScript: { Icon: SiJavascript, color: "text-yellow-500 dark:text-yellow-300" },
  Java: { Icon: SiOpenjdk, color: "text-orange-400" },
  Kotlin: { Icon: SiKotlin, color: "text-fuchsia-400" },
  Obsidian: { Icon: SiObsidian, color: "text-violet-400" },
  Django: { Icon: SiDjango, color: "text-emerald-400" },
  Android: { Icon: SiAndroid, color: "text-green-600 dark:text-green-400" },
  Synology: { Icon: SiSynology, color: "text-blue-400" },
};

export default function TechIcon({ name }: { name: string }) {
  const entry = icons[name];
  if (!entry) return null;
  return <entry.Icon className={`size-4 ${entry.color}`} />;
}
