import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { OrdbokList } from "@/components/ordbok/OrdbokList";
import { getOrdbok } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ordbok",
  description:
    "Norsk økonomiordbok med forklaringer på begreper som realrente, nettoformue, BSU, inflasjon, egenkapital og annuitetslån.",
  path: "/ordbok",
  keywords: [
    "økonomiordbok",
    "finansbegreper",
    "realrente",
    "nettoformue",
    "egenkapital",
    "inflasjon",
    "annuitetslån",
  ],
});

/**
 * CMS/ADMIN: Ordbokbegreper administreres via getOrdbok().
 * Søk og filtrering skjer i OrdbokList: data kan senere hentes fra API/database.
 */
export default function OrdbokPage() {
  const entries = getOrdbok();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Ordbok"
        description="Forklaringer på økonomiske begreper: kort, tydelig og uten unødvendig jargong."
      />

      <OrdbokList entries={entries} />
    </div>
  );
}
