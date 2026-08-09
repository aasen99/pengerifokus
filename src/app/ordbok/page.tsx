import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { OrdbokList } from "@/components/ordbok/OrdbokList";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import { getOrdbok } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "Norsk økonomiordbok med forklaringer på begreper som realrente, nettoformue, BSU, inflasjon, egenkapital, prosent og annuitetslån.";

export const metadata: Metadata = createPageMetadata({
  title: "Ordbok",
  description: pageDescription,
  path: "/ordbok",
  keywords: [
    "økonomiordbok",
    "finansbegreper",
    "realrente",
    "nettoformue",
    "egenkapital",
    "inflasjon",
    "annuitetslån",
    "prosent",
  ],
});

/**
 * CMS/ADMIN: Ordbokbegreper administreres via getOrdbok().
 * Søk og filtrering skjer i OrdbokList: data kan senere hentes fra API/database.
 */
export default function OrdbokPage() {
  const entries = getOrdbok();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <HubPageSeo
        name="Ordbok"
        description={pageDescription}
        path="/ordbok"
        items={entries.map((entry) => ({
          name: entry.term,
          path: `/ordbok/${entry.slug}`,
          description: entry.definition,
        }))}
      />

      <PageHeader
        title="Ordbok"
        description="Forklaringer på økonomiske begreper, kort og tydelig. Hvert begrep har egen side du kan lenke til og dele."
      />

      <p className="mb-6 text-sm text-stone-600">
        Se også{" "}
        <Link
          href="/ordbok/sitater"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          sitater fra formuesbyggerne
        </Link>
        .
      </p>

      <Suspense
        fallback={
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600">
            Laster ordbok...
          </div>
        }
      >
        <OrdbokList entries={entries} />
      </Suspense>

      <HubCrossLinks
        links={[
          { href: "/guider", label: "Guider" },
          { href: "/ordbok/prosent", label: "Prosent" },
          { href: "/formuesbyggere", label: "Formuesbyggere" },
        ]}
      />
    </div>
  );
}
