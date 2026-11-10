import NextImage from "next/image";
import { LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import TechIcon from "@/components/TechIcon";
import { projects, techStack } from "@/config/portfolio";
import { asset } from "@/lib/assets";

const toneOf = (name: string): BadgeTone => techStack.find((t) => t.name === name)?.tone ?? "neutral";

export default function Projects() {
  return (
    <Carousel opts={{ align: "start" }} aria-label="Moje projekty">
      <CarouselContent>
        {projects.map((p) => (
          <CarouselItem key={p.title} className="md:basis-1/2">
            <Card className="h-full rounded-3xl transition-transform duration-200 hover:scale-[1.02]">
              <div className="mx-5 aspect-square max-h-56 self-center">
                <NextImage
                  src={asset(p.image)}
                  alt={`Ikona projektu ${p.title}`}
                  width={400}
                  height={400}
                  className="size-full object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{p.title}</CardTitle>
                <CardDescription>{p.kind}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="flex-1 text-sm leading-6 text-muted-foreground">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <Badge key={tag} tone={toneOf(tag)}>
                      <TechIcon name={tag} />
                      {tag}
                    </Badge>
                  ))}
                </div>
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
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
