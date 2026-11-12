import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  /** Languages available on the site, in the order shown in the header switcher. */
  locales: ["en", "pl"],
  defaultLocale: "en",
  // Static export has no middleware, so every language lives under its own prefix.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Label shown in the header language switcher. */
export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  pl: { short: "PL", name: "Polski" },
};

/** localStorage key remembering the chosen language (used by the root redirect). */
export const LOCALE_STORAGE_KEY = "locale";
