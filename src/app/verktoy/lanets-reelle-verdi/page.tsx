import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Lånets reelle verdi"
        description={toolDescription}
        path="/verktoy/lanets-reelle-verdi"
      />
      <ToolPageHeader
        title="Lånets reelle verdi"
        description="Inflasjon kan gjøre at gjelden føles mindre over tid, fordi pengene er verdt mindre. Kalkulatoren viser hvordan restgjelden utvikler seg i dagens kjøpekraft, og hva som skjer hvis du øker innbetalingen i takt med lønnen."
      />

      <LanetsReelleVerdiKalkulator />

      <p className="mt-8 text-sm text-stone-600">
        <Link
          href="/ordbok/inflasjon"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          Inflasjon
        </Link>{" "}
        svekker kjøpekraften, mens{" "}
        <Link
          href="/ordbok/realrente"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          realrente
        </Link>{" "}
        viser omtrent hvor dyrt lånet er etter prisvekst.
      </p>

      <ToolRelatedGuides
        guides={[
          { label: "Inflasjon og gjeld", href: "/guider/inflasjon-og-gjeld" },
          { label: "Gjeldsbremsen", href: "/verktoy/gjeldsbremsen" },
          { label: "Realrente i ordboken", href: "/ordbok/realrente" },
          { label: "Emne: gjeld", href: "/emner/gjeld" },
        ]}
      />
    </div>
  );
}
