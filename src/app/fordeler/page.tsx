import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import { getFordeler, getTilbudByFordel } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fordeler",
  description:
    "Oversikt over bonusprogrammer, cashback, medlemsfordeler og smarte medlemskap i Norge – Trumf, Spenn, EuroBonus og mer.",
  path: "/fordeler",
  keywords: ["bonusprogram", "cashback", "trumf", "spenn", "eurobonus", "medlemsfordeler"],
});

interface FordelerPageProps {
  searchParams: Promise<{ program?: string }>;
}

export default async function FordelerPage({ searchParams }: FordelerPageProps) {
  const { program } = await searchParams;
  const fordeler = getFordeler();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Fordeler"
        description="Bonus, cashback og medlemsfordeler som kan gi deg mer for pengene – når du bruker dem riktig."
      />

      <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="font-semibold text-stone-900">Se konkrete tilbud</p>
          <p className="mt-1 text-sm text-stone-600">
            Vi har samlet medlemsrabatter og bonuser du kan bruke i dag.
          </p>
        </div>
        <Link
          href="/tilbud"
          className="mt-3 inline-flex shrink-0 text-sm font-semibold text-orange-700 hover:text-orange-800 sm:mt-0"
        >
          Gå til tilbud →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fordeler.map((fordel) => {
          const tilbudCount = getTilbudByFordel(fordel.slug).length;
          const isHighlighted = program === fordel.slug;

          return (
            <div
              key={fordel.id}
              className={isHighlighted ? "rounded-2xl ring-2 ring-orange-400 ring-offset-2" : ""}
            >
              <ContentCard
                title={fordel.name}
                description={fordel.description}
                meta={fordel.type}
                tags={[
                  fordel.useCase,
                  ...(tilbudCount > 0 ? [`${tilbudCount} tilbud`] : []),
                ]}
                actionLabel={
                  tilbudCount > 0 ? "Se tilbud" : "Les mer"
                }
                disabled={tilbudCount === 0}
                href={
                  tilbudCount > 0
                    ? `/tilbud?program=${fordel.slug}`
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
