import { LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { portfolio } from "@/config/portfolio";

export default function Footer() {
  return (
    <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground">
      <p>© 2026 {portfolio.name}</p>
      <a
        href={portfolio.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        <SiGithub className="size-4" aria-hidden="true" /> GitHub
        <LuArrowUpRight className="size-3.5" aria-hidden="true" />
      </a>
    </footer>
  );
}
