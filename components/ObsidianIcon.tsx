import NextImage from "next/image";
import { prefix } from "@/config/main";

const obsidianIconSrc = `${prefix}${prefix.endsWith("/") ? "" : "/"}icons/obsidian.svg`;

export default function ObsidianIcon({ className = "size-4 dark:invert" }: { className?: string }) {
  return (
    <NextImage
      src={obsidianIconSrc}
      alt=""
      aria-hidden="true"
      width={16}
      height={16}
      className={className}
    />
  );
}
