// lib/tech.ts

import { BadgeTone } from "@/components/ui/badge";
import { Technologies } from "@/config/tech";
import { TechnologiesId } from "@/config/types";


export const toneOf = (id: TechnologiesId): BadgeTone => (id as BadgeTone);

export const techNames = Object.fromEntries(
  Technologies.map(({ id, name }) => [id, name])
) as Record<TechnologiesId, string>;

// type Tech = (typeof techData)[number];
// export type TechId = Tech["id"];