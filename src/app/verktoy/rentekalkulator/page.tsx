import type { Metadata } from "next";
import Link from "next/link";
import { Rentekalkulator } from "@/components/verktoy/Rentekalkulator";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Rentekalkulator",
  description:
    "Gratis rentekalkulator – beregn månedlig terminbeløp, total rentekostnad og se hva du sparer med ekstra innbetalinger på lånet.",
  path: "/verktoy/rentekalkulator",
  keywords: ["rentekalkulator", "lånekalkulator", "annuitetslån", "ekstra innbetaling", "boliglån"],
});

export default function RentekalkulatorPage() {
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
          Rentekalkulator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Se hva lånet ditt koster over tid – og hvor mye du kan spare ved å
          betale inn ekstra hver måned.
        </p>
      </header>

      <Rentekalkulator />
    </div>
  );
}
