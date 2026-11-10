import type { Translation } from "@/localization/types";
import { en } from "@/localization/en";
import { pl } from "@/localization/pl";

export * from "@/localization/types";

/** Languages available on the site, in the order shown in the header switcher. */
export const locales = ["en", "pl"] as const;
export type Locale = (typeof locales)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Label shown in the header language switcher. */
export const localeLabels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  pl: { short: "PL", name: "Polski" },
};

/** Locale used for number formatting. */
export const numberLocale: Record<Locale, string> = { en: "en-US", pl: "pl-PL" };

/** To add a language: create localization/<code>/, add it here and to `locales`, `localeLabels`, `numberLocale`. */
export const translations: Record<Locale, Translation> = { en, pl };
