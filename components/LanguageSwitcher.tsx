"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_STORAGE_KEY, localeLabels, routing, type Locale } from "@/i18n/routing";
import { cn } from "cn";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("ui");
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (l: Locale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, l);
    } catch {}
    router.replace(pathname, { locale: l, scroll: false });
  };

  return (
    <div
      role="group"
      aria-label={t("languageSwitcher")}
      className="inline-flex h-9 items-center rounded-xl border border-border p-0.5"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          lang={l}
          title={localeLabels[l].name}
          className={cn(
            "h-full cursor-pointer rounded-[10px] px-2.5 text-xs font-semibold transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
            locale === l
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {localeLabels[l].short}
        </button>
      ))}
    </div>
  );
}
