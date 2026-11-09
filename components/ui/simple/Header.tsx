import Link from "next/link";
import { portfolio } from "@/config/portfolio";
import { Button } from "@/components/ui/simple/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/simple/dropdown-menu";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b py-5">
      <Link href="/" className="font-semibold">{portfolio.name}</Link>

      <nav className="flex items-center gap-2" aria-label="Main menu">
        {portfolio.directLinks.map((link) => (
          <Button asChild key={link.href} variant="outline" className="rounded-none border-black bg-white text-black">
            <Link href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>
    </header>
  );
}
