import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { OrdbokList } from "@/components/ordbok/OrdbokList";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import { FORMUESBYGGERE_TITLE } from "@/data/formuesbyggere-labels";
import { getOrdbok } from "@/lib/content";
import { sortOrdbokEntries } from "@/lib/ordbok";
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

interface OrdbokPageProps {
  searchParams: Promise<{
    q?: string | string[];
  }>;
}

function first(value?: string | string[]): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * CMS/ADMIN: Ordbokbegreper administreres via getOrdbok().
 * Hele listen rendres som HTML. Søk filtrerer allerede rendret innhold.
 */
export default async function OrdbokPage({ searchParams }: OrdbokPageProps) {
  const params = await searchParams;
  const query = first(params.q)?.trim() ?? "";
  const entries = sortOrdbokEntries(getOrdbok());

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

      <OrdbokList entries={entries} initialQuery={query} />

      <HubCrossLinks
        links={[
          { href: "/guider", label: "Guider" },
          { href: "/ordbok/prosent", label: "Prosent" },
          { href: "/formuesbyggere", label: FORMUESBYGGERE_TITLE },
        ]}
      />
    </div>
  );
}
