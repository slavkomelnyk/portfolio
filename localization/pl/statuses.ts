import { StatusId } from "@/config/types";
import type { StatusText } from "@/localization/types";

export const statuses: Record<StatusId, StatusText> = {
  relaxing: { label: "Relaks & Inspiracja", alt: "Sviatoslav relaksuje się w fotelu" },
  working: { label: "Praca nad projektem", alt: "Sviatoslav pracuje nad projektem" },
  thinking: { label: "Planowanie nowego pomysłu", alt: "Sviatoslav planuje nowy pomysł" },
};
