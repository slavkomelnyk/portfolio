import NextImage from "next/image";
import { prefix } from "@/config/main";

const githubIconSrc = `${prefix}${prefix.endsWith("/") ? "" : "/"}icons/github.svg`;

export default function GithubIcon({ className = "size-4 dark:invert" }: { className?: string }) {
  return (
    <NextImage
      src={githubIconSrc}
      alt=""
      aria-hidden="true"
      width={16}
      height={16}
      className={className}
    />
  );
}
