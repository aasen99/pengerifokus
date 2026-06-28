import type { Metadata } from "next";
import Link from "next/link";
import { LanetsReelleVerdiKalkulator } from "@/components/verktoy/lanets-reelle-verdi/LanetsReelleVerdiKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Se hvordan inflasjon reduserer den reelle verdien av gjeld over tid, og valgfritt effekten av å øke innbetalingen med lønnsveksten.";

export const metadata: Metadata = createPageMetadata({
  title: "Lånets reelle verdi",
  description: toolDescription,
  path: "/verktoy/lanets-reelle-verdi",
  keywords: [
    "lånets reelle verdi",
    "realrente",
    "inflasjon gjeld",
    "annuitetslån",
    "lønnsvekst",
    "nedbetaling",
  ],
});

export default function LanetsReelleVerdiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Lånets reelle verdi"
        description={toolDescription}
        path="/verktoy/lanets-reelle-verdi"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Lånets reelle verdi
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-stone-600">
          Inflasjon kan gjøre at gjelden føles mindre over tid, fordi pengene
          er verdt mindre. Kalkulatoren viser hvordan restgjelden utvikler seg i
          dagens kjøpekraft, og hva som skjer hvis du øker innbetalingen i takt
          med lønnen.
        </p>
      </header>

      <LanetsReelleVerdiKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Inflasjon og gjeld", href: "/guider/inflasjon-og-gjeld" },
          { label: "Realrente i ordboken", href: "/ordbok/realrente" },
        ]}
      />
    </div>
  );
}
