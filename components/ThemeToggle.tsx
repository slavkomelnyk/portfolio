"use client";

import { useSyncExternalStore } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useLocale } from "@/components/LocaleProvider";

// The <html> class is the source of truth (set by the inline script in layout.tsx).
function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}
const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => true;

export default function ThemeToggle() {
  const { t } = useLocale();
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t.themeToLight : t.themeToDark}
      title={dark ? t.themeLightTitle : t.themeDarkTitle}
      suppressHydrationWarning
      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-xl border border-border transition-all hover:bg-secondary/50 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      {dark ? <LuSun className="size-4" aria-hidden="true" /> : <LuMoon className="size-4" aria-hidden="true" />}
    </button>
  );
}
