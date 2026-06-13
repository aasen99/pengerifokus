import type { Metadata } from "next";
import Link from "next/link";
import { LuksusfelleTavle } from "@/components/verktoy/LuksusfelleTavle";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Luksusfellen-tavle",
  description:
    "Lag din egen pengetavle – se inntekt, faste og variable utgifter, gjeld og sparing på ett sted. Inspirert av Luksusfellen.",
  path: "/verktoy/luksusfelle-tavle",
  keywords: [
    "luksusfellen tavle",
    "pengetavle",
    "budsjett",
    "personlig økonomi",
    "faste utgifter",
  ],
});

export default function LuksusfelleTavlePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Luksusfellen-tavle
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Fyll inn tallene dine og få oversikt – akkurat som på pengetavlen i
          Luksusfellen, men digitalt og klart på minutter.
        </p>
      </header>

      <LuksusfelleTavle />
    </div>
  );
}
