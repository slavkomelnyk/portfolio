"use client";

import { useEffect, useState } from "react";
import { LuArrowUpRight, LuCode, LuHouse, LuUserRound } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { portfolio } from "@/config/portfolio";
import { cn } from "cn";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { id: "top", label: "Strona główna", href: "#top", Icon: LuHouse },
  { id: "about", label: "O mnie", href: "#about", Icon: LuUserRound },
  { id: "projects", label: "Projekty", href: "#projects", Icon: LuCode },
];

const pill =
  "inline-flex h-9 items-center gap-2 rounded-xl border px-3.5 text-sm transition-all focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none";

export default function Header() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      const mark = window.scrollY + 140;
      let current = "top";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= mark) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 -mx-6 border-b border-border bg-background/80 px-6 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 py-4">
        <a
          href="#top"
          className="text-lg font-semibold tracking-tight"
        >
          {portfolio.name}
        </a>
        <nav className="flex flex-wrap items-center gap-2" aria-label="Menu główne">
          {links.map(({ id, label, href, Icon }) => (
            <a
              key={id}
              href={href}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                pill,
                active === id
                  ? "border-border bg-secondary text-foreground"
                  : "border-transparent text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </a>
          ))}
          <a
            href={portfolio.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(pill, "border-border hover:bg-secondary/50")}
          >
            <SiGithub className="size-4" aria-hidden="true" />
            GitHub
            <LuArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
