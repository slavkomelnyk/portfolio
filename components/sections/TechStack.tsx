import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import TechIcon from "@/components/TechIcon";
import { techStack } from "@/config/portfolio";

export default function TechStack() {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tech Stack</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2.5">
        {techStack.map((t) => (
          <Tooltip key={t.name}>
            <TooltipTrigger asChild>
              <a href={t.href} target="_blank" rel="noreferrer" aria-label={`${t.name} – ${t.hint}`}>
                <Badge tone={t.tone} className="cursor-pointer transition-all hover:scale-105">
                  <TechIcon name={t.name} />
                  {t.name}
                </Badge>
              </a>
            </TooltipTrigger>
            <TooltipContent>{t.hint} ↗</TooltipContent>
          </Tooltip>
        ))}
      </CardContent>
    </Card>
  );
}
