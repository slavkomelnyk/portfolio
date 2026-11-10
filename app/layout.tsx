import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { portfolio } from "@/config/portfolio";

export const metadata: Metadata = {
  title: `${portfolio.name} — Portfolio`,
  description: `Portfolio młodego programisty: ${portfolio.name}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" suppressHydrationWarning className="min-h-full font-sans antialiased">
      <head>
        {/* Apply the saved/system theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.classList.toggle("dark",t==="dark")}catch(e){document.documentElement.classList.add("dark")}`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <TooltipProvider>
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
