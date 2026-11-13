"use client";

import { useEffect, useState } from "react";
import { LuDownload, LuPackageCheck, LuStar } from "react-icons/lu";
import { HIDE_ZERO_STATS } from "@/config/projects";
import { useFormatter, useTranslations } from "next-intl";
import { getProjectStats, obsidianIdOf, type ResolvedStats } from "@/lib/stats";
import { Project } from "@/config/types";

export default function ProjectStats({ project }: { project: Project }) {
  const t = useTranslations("ui");
  const format = useFormatter();
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
        { key: "stars", label: t("statStars"), Icon: LuStar, value: stats.stars },
        { key: "installs", label: t("statInstalls"), Icon: LuPackageCheck, value: stats.installs },
        { key: "downloads", label: t("statDownloads"), Icon: LuDownload, value: stats.downloads },
      ].filter((m) => m.value !== null && !(HIDE_ZERO_STATS && m.value === 0))
    : [];

  // Enabled per project with stats: { button: "obsidian-download" }.
  const obsidianId = obsidianIdOf(project);
  const showInstall = project.stats.button === "obsidian-download" && !!obsidianId;

  // The row keeps its height while loading so the card does not jump.
  return (
    <ul className="flex min-h-5 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground" aria-live="polite">
      {metrics.map(({ key, label, Icon, value }) => (
        <li key={key} title={label} className="hero-swap inline-flex items-center gap-1.5">
          <Icon className="size-4" aria-hidden="true" />
          <span className="sr-only">{label}:</span>
          {format.number(value as number)}
        </li>
      ))}
      {showInstall && (
        <li className="ml-auto">
          <a
            href={`obsidian://show-plugin?id=${encodeURIComponent(obsidianId as string)}`}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            <LuDownload className="size-3.5" aria-hidden="true" />
            {t("installInObsidian")}
          </a>
        </li>
      )}
    </ul>
  );
}
