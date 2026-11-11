// lib/tech.ts

import { Technologies } from "@/config/tech";
import { TechnologyTonesType, TechnologiesId } from "@/config/types";

export const toneOf = (id: TechnologiesId): TechnologyTonesType => id;

export const techNames = Object.fromEntries(
  Technologies.map(({ id, name }) => [id, name])
) as Record<TechnologiesId, string>;
