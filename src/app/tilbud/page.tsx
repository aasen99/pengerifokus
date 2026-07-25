import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TilbudList } from "@/components/tilbud/TilbudList";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import { TILBUD_INTRO, TILBUD_TITLE } from "@/data/content-labels";
import { getFordeler, getTilbud } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "Medlemsrabatter og bonuser du kan bruke nå: OBOS, Trumf, Usbl, Klarna, EuroBonus, NAF og studentrabatter. Søk og filtrer etter fordelsprogram.";

export const metadata: Metadata = createPageMetadata({
  title: TILBUD_TITLE,
  description: pageDescription,
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
      <HubPageSeo
        name={TILBUD_TITLE}
        description={pageDescription}
        path="/tilbud"
        items={fordeler
          .filter((fordel) =>
            tilbud.some((item) => item.fordelSlug === fordel.slug),
          )
          .map((fordel) => ({
            name: `${fordel.name}: tilbud`,
            path: `/tilbud?program=${fordel.slug}`,
            description: fordel.description,
          }))}
      />

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

      <HubCrossLinks
        links={[
          { href: "/fordeler", label: "Fordelsprogrammer" },
          { href: "/verktoy/bonuskalkulator", label: "Bonuskalkulator" },
          { href: "/guider", label: "Guider" },
        ]}
      />
    </div>
  );
}
