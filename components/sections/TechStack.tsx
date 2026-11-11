"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import TechIcon from "@/components/TechIcon";
import { Technologies, techStack } from "@/config/tech";
import { toneOf, techNames } from "@/lib/tech";
import { useLocale } from "@/components/LocaleProvider";

export default function TechStack() {
  const { l } = useLocale();

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tech Stack</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2.5">
        {techStack.map((id) => {
          const tech = Technologies.find((item) => item.id === id);

          if (!tech) return null;

          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${tech.name} – ${l.techHints[id]}`}
                >
                  <Badge
                    tone={toneOf(id)}
                    className="cursor-pointer transition-all hover:scale-105"
                  >
                    <TechIcon id={id} />
                    {techNames[id]}
                  </Badge>
                </a>
              </TooltipTrigger>

              <TooltipContent>
                {l.techHints[id]} ↗
              </TooltipContent>
            </Tooltip>
          );
        })}
      </CardContent>
    </Card>
  );
}
