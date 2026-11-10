import { prefix } from "@/config/main";

/** Prefixes a public/ asset path with the deployment base path. */
export function asset(path: string) {
  const base = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
  return `${base}${path}`;
}
