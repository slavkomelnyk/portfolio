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
export type StatButton = "obsidian-download";
export type ProjectId = (typeof projects)[number]["id"];

export type Project = {
  /** Key of the texts (title, kind, description) in messages/<lang>.json ("projects"). */
  id: string;
  image: string;
  repo: string;
  /**
   * Obsidian plugin id (manifest.json), e.g. "camera-embed". Optional.
   * The community plugins link, download stats and install button are all built from it.
   */
  obsidian_marketplace?: string;
  stats?: {
    stars?: Stat;
    installs?: Stat;
    downloads?: Stat;
    /** "obsidian-download" adds an "Install in Obsidian" button (needs `obsidian_marketplace`). */
    button?: StatButton;
  };
  tags: TechnologiesId[];
};


// Status

export type StatusId = (typeof statuses)[number]["id"];

export type Status = { id: string; image: string; json: Record<string, string> };
