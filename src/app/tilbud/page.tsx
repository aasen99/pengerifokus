import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TilbudList } from "@/components/tilbud/TilbudList";
import { TILBUD_INTRO, TILBUD_TITLE } from "@/data/content-labels";
import { getFordeler, getTilbud } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: TILBUD_TITLE,
  description:
    "Medlemsrabatter og bonuser du kan bruke nå: OBOS, Trumf, Usbl, Klarna, EuroBonus, NAF og studentrabatter. Søk og filtrer etter fordelsprogram.",
  path: "/tilbud",
  keywords: [
    "OBOS rabatt",
    "Trumf netthandel",
    "Trumf-bonus",
    "Usbl medlemsfordeler",
    "Klarna cashback",
    "EuroBonus tilbud",
    "NAF rabatt",
    "studentrabatt",
    "medlemstilbud",
  ],
});

/**
 * CMS/ADMIN: Tilbud administreres via getTilbud() og kobles til fordeler med fordelSlug.
 */
export default function TilbudPage() {
  const tilbud = getTilbud();
  const fordeler = getFordeler();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader title={TILBUD_TITLE} description={TILBUD_INTRO} />

      <Suspense
        fallback={
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
            Laster tilbud...
          </div>
        }
      >
        <TilbudList tilbud={tilbud} fordeler={fordeler} />
      </Suspense>
    </div>
  );
}
