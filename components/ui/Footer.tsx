import Link from "next/link";
import { portfolio } from "@/config/portfolio";
import GithubIcon from "@/components/GithubIcon";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground">
      <p className="m-0">© 2026 {portfolio.name}</p>
      <Link
        href={portfolio.githubUrl}
        className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon className="mr-1 inline size-4 dark:invert" /> GitHub
        <ArrowUpRight className="ml-1 inline size-3.5" aria-hidden="true" />
      </Link>
    </footer>
  );
}
