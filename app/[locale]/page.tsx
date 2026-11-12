import { use } from "react";
import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { StatusProvider } from "@/components/StatusProvider";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Terminal from "@/components/sections/Terminal";

export default function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = useTranslations("ui");

  return (
    <StatusProvider>
      <Hero />
      <section id="projects" className="py-12">
        <h2 className="mb-6 text-2xl font-semibold">{t("projectsTitle")}</h2>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="px-4 lg:px-0">
            <Projects />
          </div>
          <div className="flex flex-col gap-5">
            <TechStack />
            <Terminal />
          </div>
        </div>
      </section>
    </StatusProvider>
  );
}
