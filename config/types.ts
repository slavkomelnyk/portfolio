import { Technologies, TechnologyTones } from "@/config/tech";
import { IconType } from "react-icons";
import { projects } from "./projects";
import { statuses } from "./status";

// Technologies

export type TechnologiesId = (typeof Technologies)[number]["id"];


export type TechnologiesType = {
  id: string;
  name: string
  href: string;
};

export type TechnologyTonesType = keyof typeof TechnologyTones;

export type TechnologyIconEntry = {
  Icon: IconType;
  color: string;
};

// Projects

export type Stat = number | "github-stars" | "github-releases" | "obsidian-downloads";
export type ProjectId = (typeof projects)[number]["id"];

export type Project = {
  /** Key of the texts (title, kind, description) in localization/<lang>/projects.ts. */
  id: string;
  image: string;
  repo: string;
  /** Link to the Obsidian community plugins page (optional). */
  obsidian_marketplace?: string;
  /** Plugin id from manifest.json; needed for "obsidian-downloads". */
  obsidianId?: string;
  stats?: { stars?: Stat; installs?: Stat; downloads?: Stat };
  tags: TechnologiesId[];
};


// Status

export type StatusId = (typeof statuses)[number]["id"];

export type Status = { id: string; image: string; json: Record<string, string> };
