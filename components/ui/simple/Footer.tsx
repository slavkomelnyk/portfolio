import Link from "next/link";
import { portfolio } from "@/config/portfolio";

export default function Footer() {
  return (
    <footer className="mt-12 flex flex-wrap justify-between gap-4 border-t py-6 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} {portfolio.name}</p>
      <Link href={portfolio.githubUrl} className="underline" target="_blank" rel="noreferrer">
        GitHub profile
      </Link>
    </footer>
  );
}
