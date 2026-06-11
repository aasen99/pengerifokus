import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { OrdbokList } from "@/components/ordbok/OrdbokList";
import { getOrdbok } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ordbok",
  description:
    "Enkel økonomiordbok med forklaringer på begreper som effektiv rente, ASK, inflasjon og mer.",
};

/**
 * CMS/ADMIN: Ordbokbegreper administreres via getOrdbok().
 * Søk og filtrering skjer i OrdbokList – data kan senere hentes fra API/database.
 */
export default function OrdbokPage() {
  const entries = getOrdbok();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Ordbok"
        description="Forklaringer på økonomiske begreper – kort, tydelig og uten unødvendig jargong."
      />

      <OrdbokList entries={entries} />
    </div>
  );
}
