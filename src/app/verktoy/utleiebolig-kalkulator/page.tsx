import type { Metadata } from "next";
import Link from "next/link";
import { UtleieboligKalkulator } from "@/components/verktoy/UtleieboligKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis utleiebolig-kalkulator: regn ut kontantstrøm, leieavkastning og break-even leie for en utleiebolig.";

export const metadata: Metadata = createPageMetadata({
  title: "Utleiebolig-kalkulator",
  description: toolDescription,
  path: "/verktoy/utleiebolig-kalkulator",
  keywords: [
    "utleiebolig",
    "leieavkastning",
    "kontantstrøm",
    "utleiebolig kalkulator",
    "boliginvestering",
    "utleie",
  ],
});

export default function UtleieboligKalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Utleiebolig-kalkulator"
        description={toolDescription}
        path="/verktoy/utleiebolig-kalkulator"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Utleiebolig-kalkulator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Se om leieinntekten dekker lån og driftskostnader, hva du tjener på
          egenkapitalen — og få en vurdering med fordeler, ulemper og risiko.
        </p>
      </header>

      <UtleieboligKalkulator />

      <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <h2 className="text-lg font-semibold text-stone-900">Relaterte verktøy</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link
              href="/verktoy/eie-leie-kalkulator"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              Eie vs. leie-kalkulator
            </Link>
            <span className="text-stone-600">
              {" "}
              — sammenlign kjøp til eget bruk mot å leie
            </span>
          </li>
          <li>
            <Link
              href="/verktoy/rentekalkulator"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              Rentekalkulator
            </Link>
            <span className="text-stone-600"> — detaljert låneberegning</span>
          </li>
          <li>
            <Link
              href="/verktoy/bsu-kalkulator"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              BSU-kalkulator
            </Link>
            <span className="text-stone-600"> — sparing til egen bolig</span>
          </li>
        </ul>
      </section>

      <ToolRelatedGuides
        guides={[
          { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
          { label: "Boliglån i ordboken", href: "/ordbok/boliglan" },
        ]}
      />
    </div>
  );
}
