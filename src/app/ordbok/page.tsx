import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
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
        description="Forklaringer på økonomiske begreper, kort og tydelig. Hvert begrep har egen side du kan lenke til og dele."
      />

      <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="font-semibold text-stone-900">Sitater fra formuesbyggerne</p>
          <p className="mt-1 text-sm text-stone-600">
            Visdom om penger, investering og formue, med kilde og lenke til profilen.
          </p>
        </div>
        <Link
          href="/ordbok/sitater"
          className="mt-3 inline-flex shrink-0 items-center justify-center rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 sm:mt-0"
        >
          Se alle sitater
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
            Laster ordbok...
          </div>
        }
      >
        <OrdbokList entries={entries} />
      </Suspense>
    </div>
  );
}
