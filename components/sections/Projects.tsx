"use client";

import NextImage from "next/image";
import { LuArrowUpRight } from "react-icons/lu";
import { SiGithub, SiObsidian } from "react-icons/si";
import { Badge} from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectStats from "@/components/ProjectStats";
import TechIcon from "@/components/TechIcon";
import { projects } from "@/config/projects";
import { asset } from "@/lib/assets";
import { useLocale } from "@/components/LocaleProvider";
import { toneOf, techNames } from "@/lib/tech";
import { Technologies } from "@/config/tech";

export default function Projects() {
  const { t, l } = useLocale();
  return (
    <Carousel opts={{ align: "start", loop: true }} autoplay={4000} aria-label={t.projectsLabel}>
      <CarouselContent>
        {projects.map((p) => (
          <CarouselItem key={p.id} className="md:basis-1/2">
            <Card className="h-full rounded-3xl transition-transform duration-200 hover:scale-[1.02]">
              <div className="mx-5 aspect-square max-h-56 self-center">
                <NextImage
                  src={asset(p.image)}
                  alt={`${t.projectIconAlt}: ${l.projects[p.id].title}`}
                  width={400}
                  height={400}
                  className="size-full object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{l.projects[p.id].title}</CardTitle>
                <CardDescription>{l.projects[p.id].kind}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="flex-1 text-sm leading-6 text-muted-foreground">{l.projects[p.id].description}</p>
                <ProjectStats project={p} />
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => {
                    const tech = Technologies.find((item) => item.id === tag);

                    return (
                      <a
                        key={tag}
                        href={tech?.href ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={techNames[tag] ?? tag}
                        className="transition-transform hover:scale-105"
                      >
                        <Badge tone={toneOf(tag)} className="cursor-pointer">
                          <TechIcon id={tag} />
                          {techNames[tag] ?? tag}
                        </Badge>
                      </a>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
                  >
                    <SiGithub className="size-4" aria-hidden="true" />
                    GitHub Repo
                    <LuArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                  {p.obsidian_marketplace && (
                    <a
                      href={p.obsidian_marketplace}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
                    >
                      <SiObsidian className="size-4 text-violet-400" aria-hidden="true" />
                      Obsidian Marketplace
                      <LuArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious label={t.carouselPrev} />
      <CarouselNext label={t.carouselNext} />
    </Carousel>
  );
}
