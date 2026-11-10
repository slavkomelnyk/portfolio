"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import TechIcon from "@/components/TechIcon";
import { techStack } from "@/config/portfolio";
import { useLocale } from "@/components/LocaleProvider";

export default function TechStack() {
  const { l } = useLocale();
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tech Stack</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2.5">
        {techStack.map((t) => (
          <Tooltip key={t.name}>
            <TooltipTrigger asChild>
              <a href={t.href} target="_blank" rel="noreferrer" aria-label={`${t.name} – ${l.techHints[t.name]}`}>
                <Badge tone={t.tone} className="cursor-pointer transition-all hover:scale-105">
                  <TechIcon name={t.name} />
                  {t.name}
                </Badge>
              </a>
            </TooltipTrigger>
            <TooltipContent>{l.techHints[t.name]} ↗</TooltipContent>
          </Tooltip>
        ))}
      </CardContent>
    </Card>
  );
}
