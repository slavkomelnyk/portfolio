"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { portfolio } from "@/config/portfolio";
import { DEFAULT_LOCALE, locales, translations, type Locale, type Translation } from "@/localization";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** UI strings of the current language (localization/<lang>/ui.ts). */
  t: Translation["ui"];
  /** All texts of the current language: l.projects[id], l.statuses[id], l.techHints[name]. */
  l: Translation;
};
const LocaleContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Restore the saved choice after mount (reading it during render would break hydration).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (locales.includes(saved as Locale)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocaleState(saved as Locale);
      }
    } catch {}
  }, []);

  // Keep <html lang>, the tab title and the description in sync with the language.
  useEffect(() => {
    const t = translations[locale].ui;
    document.documentElement.lang = locale;
    document.title = `${portfolio.name} — ${t.metaTitle}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", `${t.metaDescription}: ${portfolio.name}.`);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const value: Ctx = { locale, setLocale, t: translations[locale].ui, l: translations[locale] };
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
