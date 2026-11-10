"use client";

import NextImage from "next/image";
import { Badge } from "@/components/ui/badge";
import TechIcon from "@/components/TechIcon";
import { useStatus } from "@/components/StatusProvider";
import { asset } from "@/lib/assets";

// Deterministic binary rain (no Math.random -> no hydration mismatch).
const binary = Array.from({ length: 14 }, (_, r) =>
  Array.from({ length: 70 }, (_, c) => ((r * 7 + c * 13 + ((r * c) % 5)) % 3 === 0 ? "1" : "0")).join(" ")
);

export default function Hero() {
  const { status, next } = useStatus();

  return (
    <section id="top" className="relative isolate">
      <div
        aria-hidden="true"
        className="binary-bg pointer-events-none absolute inset-x-0 -top-4 -z-10 h-64 overflow-hidden font-mono text-xs leading-6 whitespace-pre text-emerald-600/20 dark:text-emerald-400/20 select-none"
      >
        {binary.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <div className="grid items-center gap-8 py-12 md:grid-cols-[minmax(0,1fr)_20rem] lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="motion-fade-up">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Cześć! Jestem Sviatoslav Melnyk
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <h2 id="about" className="text-2xl font-semibold">
              Moją pasją jest programowanie!
            </h2>
            <button
              type="button"
              onClick={next}
              aria-live="polite"
              title="Kliknij, aby zmienić status"
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm backdrop-blur transition-all hover:scale-105 hover:border-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              <span className="status-dot size-2.5 rounded-full bg-green-400" aria-hidden="true" />
              <span className="text-muted-foreground">Aktualny fokus:</span>
              <span key={status.label} className="hero-swap font-medium text-green-600 dark:text-green-400">
                {status.label}
              </span>
            </button>
          </div>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Lubię tworzyć aplikacje, poznawać nowe technologie i wymyślać rozwiązania, które
            ułatwiają codzienne życie.{" "}
            <Badge tone="python" className="font-mono align-middle">
              <TechIcon name="Python" /> Python
            </Badge>{" "}
            i{" "}
            <Badge tone="javascript" className="font-mono align-middle">
              <TechIcon name="JavaScript" /> JavaScript
            </Badge>
            .
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Programowanie pozwala mi rozwijać kreatywność, uczyć się logicznego myślenia i
            realizować własne pomysły.
          </p>
        </div>

        <div className="mx-auto w-full max-w-xs md:max-w-none">
          <div
            key={status.image}
            className="hero-swap aspect-[4/3]"
          >
            <NextImage
              src={status.image}
              alt={status.alt}
              width={1600}
              height={1194}
              priority
              className="size-full object-contain drop-shadow-[0_0_40px_oklch(0.7_0.15_280/30%)]"
            />
          </div>
        </div>
      </div>
      <hr className="border-border" />
    </section>
  );
}
