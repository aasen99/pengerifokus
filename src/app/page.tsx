import type { Metadata } from "next";
import { FeaturedGuides } from "@/components/home/FeaturedGuides";
import { FeaturedTools } from "@/components/home/FeaturedTools";
import { Hero } from "@/components/home/Hero";
import { HomeStats } from "@/components/home/HomeStats";
import { MainEntries } from "@/components/home/MainEntries";
import { QuickPaths } from "@/components/home/QuickPaths";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  description: siteConfig.description,
  path: "/",
  keywords: [
    "penger i fokus",
    "økonomiguider",
    "personlig økonomi norge",
    "sparekalkulator",
    "eie eller leie",
    "bonuspoeng",
    "økonomisk røntgen",
    "ordbok økonomi",
  ],
});

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Hero />

      <div className="mt-10">
        <HomeStats />
      </div>

      <div className="mt-16 space-y-16">
        <QuickPaths />

        <FeaturedGuides />

        <FeaturedTools />

        <section>
          <h2 className="text-2xl font-bold text-stone-900">Hva er dette?</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-stone-600">
            Penger i Fokus er en kunnskaps- og verktøyportal for personlig
            økonomi i Norge. Vi hjelper deg å forstå begrepene i ordboken, lære
            gjennom guider, sammenligne valg med kalkulatorer, finne tilbud og
            fordelsprogrammer, og se hvordan andre har bygget formue over tid.
            Alt uten å måtte lese gjennom en hel bankavdeling med fine ord.
          </p>
        </section>

        <MainEntries />

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 px-6 py-14 text-center text-white sm:px-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-stone-600/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-orange-500/25 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Klar til å komme i gang?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-lg text-stone-300">
              Start med en rask økonomisk sjekk, eller dykk rett inn i
              kalkulatorer og guider.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/verktoy/okonomisk-rontgen" variant="secondary">
                Ta økonomisk røntgen
              </Button>
              <Button
                href="/verktoy/bonuskalkulator"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20 hover:text-white"
              >
                Bonuskalkulator
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
