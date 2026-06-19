import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { MainEntries } from "@/components/home/MainEntries";
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
    "spare tips",
  ],
});

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Hero />

      <div className="mt-16 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-stone-900">Hva er dette?</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-stone-600">
            Penger i Fokus er en kunnskaps- og verktøyportal for personlig
            økonomi. Vi hjelper deg å forstå begrepene, lære om
            fordelsprogrammer, finne konkrete tilbud, og bruke kalkulatorer,
            uten å måtte lese gjennom en hel bankavdeling med fine ord.
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
              Start med en praktisk guide og bygg økonomien din steg for steg.
            </p>
            <div className="mt-8">
              <Button href="/guider" variant="secondary">
                Start her
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
