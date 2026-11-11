import { TechnologyIcons } from "@/config/tech";
import { TechnologiesId } from "@/config/types";



export default function TechIcon({ id }: { id: TechnologiesId }) {
  const entry = TechnologyIcons[id];
  if (!entry) return null;
  return <entry.Icon className={`size-4 ${entry.color}`} />;
}
