import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { portfolio } from "@/config/portfolio";

export const metadata: Metadata = {
  title: {
    default: `${portfolio.name} — Portfolio`,
    template: `%s — ${portfolio.name}`,
  },
  description: `A portfolio website for ${portfolio.name}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="min-h-full font-sans antialiased"
    >
      <body className="min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6">
          <Header />
          <main className="flex-1 py-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
