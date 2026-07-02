import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import {
  FORDELSPROGRAMMER_INTRO,
  FORDELSPROGRAMMER_TITLE,
  TILBUD_TITLE,
} from "@/data/content-labels";
import { hasFordelArticle } from "@/data/fordel-articles";
import { getFordeler, getTilbudByFordel } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: FORDELSPROGRAMMER_TITLE,
  description:
    "Oversikt over Trumf, OBOS, Spenn og andre fordelsprogrammer. Les guider om bonus, uttak og når programmene passer deg.",
  path: "/fordeler",
  keywords: [
    "fordelsprogram",
    "bonusprogram",
    "cashback",
    "trumf",
    "trumf-bonus",
    "trumf pay",
    "spenn",
    "eurobonus",
    "bankfordeler",
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
          const hasArticle = hasFordelArticle(fordel.slug);

          return (
            <ContentCard
              key={fordel.id}
              title={fordel.name}
              description={fordel.description}
              meta={fordel.type}
              tags={[
                fordel.useCase,
                ...(hasArticle ? ["Full guide"] : []),
                ...(tilbudCount > 0 ? [`${tilbudCount} tilbud samlet`] : []),
              ]}
              actionLabel={hasArticle ? "Les guiden" : "Les om programmet"}
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
