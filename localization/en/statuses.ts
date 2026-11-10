import type { StatusId, StatusText } from "@/localization/types";

export const statuses: Record<StatusId, StatusText> = {
  relaxing: { label: "Relax & Inspiration", alt: "Sviatoslav relaxing in an armchair" },
  working: { label: "Working on a project", alt: "Sviatoslav working on a project" },
  thinking: { label: "Planning a new idea", alt: "Sviatoslav planning a new idea" },
};
