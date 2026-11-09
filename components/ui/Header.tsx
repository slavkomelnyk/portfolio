import Link from "next/link";
import { portfolio } from "@/config/portfolio";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/GithubIcon";
import { ArrowUpRight, Code2, House, UserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-5">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        {portfolio.name}
      </Link>

      <nav className="flex items-center gap-2" aria-label="Main menu">
        {portfolio.directLinks.map((link) => {
          const Icon = link.external
            ? null
            : link.href === "/"
              ? House
              : link.href === "/about"
                ? UserRound
                : Code2;

          return (
            <Button asChild key={link.href} variant="ghost" size="sm">
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {Icon ? <Icon className="size-4" aria-hidden="true" /> : <GithubIcon />}
                {link.label}
                {link.external && <ArrowUpRight className="size-3.5" aria-hidden="true" />}
              </Link>
            </Button>
          );
        })}
      </nav>
    </header>
  );
}
