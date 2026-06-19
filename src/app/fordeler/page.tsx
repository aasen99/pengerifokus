import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import {
  FORDELSPROGRAMMER_INTRO,
  FORDELSPROGRAMMER_TITLE,
  TILBUD_TITLE,
} from "@/data/content-labels";
import { getFordeler, getTilbudByFordel } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: FORDELSPROGRAMMER_TITLE,
  description:
    "Lær om fordelsprogrammer som Trumf, OBOS og Spenn: hva de er og når de passer.",
  path: "/fordeler",
  keywords: [
    "fordelsprogram",
    "bonusprogram",
    "cashback",
    "trumf",
    "spenn",
    "eurobonus",
    "medlemsfordeler",
  ],
});

export default function FordelerPage() {
  const fordeler = getFordeler();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title={FORDELSPROGRAMMER_TITLE}
        description={FORDELSPROGRAMMER_INTRO}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fordeler.map((fordel) => {
          const tilbudCount = getTilbudByFordel(fordel.slug).length;

          return (
            <ContentCard
              key={fordel.id}
              title={fordel.name}
              description={fordel.description}
              meta={fordel.type}
              tags={[
                fordel.useCase,
                ...(tilbudCount > 0 ? [`${tilbudCount} tilbud samlet`] : []),
              ]}
              actionLabel="Les om programmet"
              href={`/fordeler/${fordel.slug}`}
            />
          );
        })}
      </div>

      <p className="mt-10 text-sm text-stone-500">
        Leter du etter rabatter du kan bruke nå?{" "}
        <Link href="/tilbud" className="font-medium text-orange-600 hover:text-orange-700">
          Gå til {TILBUD_TITLE.toLowerCase()}
        </Link>
        .
      </p>
    </div>
  );
}
