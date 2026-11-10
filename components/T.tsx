"use client";

import { useLocale } from "@/components/LocaleProvider";
import type { UiKey } from "@/localization";

/** Renders a UI string in the current language; lets server components stay translated. */
export default function T({ k }: { k: UiKey }) {
  return <>{useLocale().t[k]}</>;
}
