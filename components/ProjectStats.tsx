"use client";

import { useEffect, useState } from "react";
import { LuDownload, LuPackageCheck, LuStar } from "react-icons/lu";
import { HIDE_ZERO_STATS, type Project } from "@/config/portfolio";
import { useLocale } from "@/components/LocaleProvider";
import { numberLocale } from "@/localization";
import { getProjectStats, type ResolvedStats } from "@/lib/stats";

export default function ProjectStats({ project }: { project: Project }) {
  const { locale, t } = useLocale();
  const [stats, setStats] = useState<ResolvedStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    getProjectStats(project).then((s) => {
      if (!cancelled) setStats(s);
    });
    return () => {
      cancelled = true;
    };
  }, [project]);

  // Nothing configured for this project -> render nothing.
  if (!project.stats || Object.keys(project.stats).length === 0) return null;

  const metrics = stats
    ? [
        { key: "stars", label: t.statStars, Icon: LuStar, value: stats.stars },
        { key: "installs", label: t.statInstalls, Icon: LuPackageCheck, value: stats.installs },
        { key: "downloads", label: t.statDownloads, Icon: LuDownload, value: stats.downloads },
      ].filter((m) => m.value !== null && !(HIDE_ZERO_STATS && m.value === 0))
    : [];

  // The row keeps its height while loading so the card does not jump.
  return (
    <ul className="flex min-h-5 flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground" aria-live="polite">
      {metrics.map(({ key, label, Icon, value }) => (
        <li key={key} title={label} className="hero-swap inline-flex items-center gap-1.5">
          <Icon className="size-4" aria-hidden="true" />
          <span className="sr-only">{label}:</span>
          {new Intl.NumberFormat(numberLocale[locale]).format(value as number)}
        </li>
      ))}
    </ul>
  );
}
