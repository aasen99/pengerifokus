import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Utleiebolig-kalkulator"
        description={toolDescription}
        path="/verktoy/utleiebolig-kalkulator"
      />
      <ToolPageHeader
        title="Utleiebolig-kalkulator"
        description="Se om leieinntekten dekker lån og driftskostnader, hva du tjener på egenkapitalen, og få en vurdering med fordeler, ulemper og risiko. Bolig vs. fond viser ofte sterk effekt fordi du er gearet med lån — både oppside og nedsiden forsterkes."
      />

      <UtleieboligKalkulator />

      <section className="mt-10 rounded-xl border border-stone-200 bg-stone-50 p-4">
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
              (sammenlign kjøp til eget bruk mot å leie)
            </span>
          </li>
          <li>
            <Link
              href="/verktoy/rentekalkulator"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              Rentekalkulator
            </Link>
            <span className="text-stone-600"> (detaljert låneberegning)</span>
          </li>
          <li>
            <Link
              href="/verktoy/bsu-kalkulator"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              BSU-kalkulator
            </Link>
            <span className="text-stone-600"> (sparing til egen bolig)</span>
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
