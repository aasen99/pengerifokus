import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import { getFordeler } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fordeler",
  description:
    "Oversikt over bonusprogrammer, cashback, medlemsfordeler og smarte medlemskap i Norge – Trumf, Spenn, EuroBonus og mer.",
  path: "/fordeler",
  keywords: ["bonusprogram", "cashback", "trumf", "spenn", "eurobonus", "medlemsfordeler"],
});

/**
 * CMS/ADMIN: Fordelsprogrammer administreres via getFordeler().
 * Senere: /fordeler/[slug] for detaljsider per program.
 */
export default function FordelerPage() {
  const fordeler = getFordeler();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Fordeler"
        description="Bonus, cashback og medlemsfordeler som kan gi deg mer for pengene – når du bruker dem riktig."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fordeler.map((fordel) => (
          <ContentCard
            key={fordel.id}
            title={fordel.name}
            description={fordel.description}
            meta={fordel.type}
            tags={[fordel.useCase]}
            actionLabel="Les mer"
            disabled
          />
        ))}
      </div>
    </div>
  );
}
