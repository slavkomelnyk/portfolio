import { prefix } from "./main";
import { Status } from "./types";

/** How long a status stays before auto-advancing to the next one (ms). */
export const STATUS_INTERVAL_MS = 10_000;

/** Texts (label, alt) live in localization/<lang>/statuses.ts. */
export const statuses: Status[] = [
  {
    id: "relaxing",
    image: prefix + "/images/status/relaxing.png",
    json: { status: "Relaxed", tea: "Consumed", next_move: "Build something cool after a break" },
  },
  {
    id: "working",
    image: prefix + "/images/status/working.png",
    json: { status: "Coding", tea: "In progress", next_move: "Develop the next feature" },
  },
  {
    id: "thinking",
    image: prefix + "/images/status/thinking.png",
    json: { status: "Planning", tea: "Refilled", next_move: "Sketch the next big idea" },
  },
];