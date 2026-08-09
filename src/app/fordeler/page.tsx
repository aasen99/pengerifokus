import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import {
  FORDELSPROGRAMMER_INTRO,
  FORDELSPROGRAMMER_TITLE,
  TILBUD_TITLE,
} from "@/data/content-labels";
import { hasFordelArticle } from "@/data/fordel-articles";
import { getFordeler, getTilbudByFordel } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "Oversikt over Trumf, OBOS, Usbl, Spenn, Norwegian Reward, Strawberry, studentrabatter og andre fordelsprogrammer. Les guider om bonus, uttak og når programmene passer deg.";

export const metadata: Metadata = createPageMetadata({
  title: FORDELSPROGRAMMER_TITLE,
  description: pageDescription,
  path: "/fordeler",
  keywords: [
    "fordelsprogram",
    "bonusprogram",
    "cashback",
    "trumf",
    "trumf-bonus",
    "trumf pay",
    "obos",
    "usbl",
    "spenn",
    "norwegian reward",
    "strawberry medlemskap",
    "studentrabatt",
    "eurobonus",
    "bankfordeler",
    "medlemsfordeler",
    "klarna cashback",
  ],
});

export default function FordelerPage() {
  const fordeler = getFordeler();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <HubPageSeo
        name={FORDELSPROGRAMMER_TITLE}
        description={pageDescription}
        path="/fordeler"
        items={fordeler.map((fordel) => ({
          name: fordel.name,
          path: `/fordeler/${fordel.slug}`,
          description: fordel.description,
        }))}
      />

      <PageHeader
        title={FORDELSPROGRAMMER_TITLE}
        description={FORDELSPROGRAMMER_INTRO}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                ...(tilbudCount > 0 ? [`${tilbudCount} tilbud`] : []),
                ...(hasArticle ? ["Full guide"] : []),
              ]}
              actionLabel={hasArticle ? "Les guiden" : "Les mer"}
              href={`/fordeler/${fordel.slug}`}
            />
          );
        })}
      </div>

      <p className="mt-8 text-sm text-stone-500">
        Leter du etter rabatter du kan bruke nå?{" "}
        <Link href="/tilbud" className="font-medium text-orange-600 hover:text-orange-700">
          Gå til {TILBUD_TITLE.toLowerCase()}
        </Link>
        .
      </p>

      <HubCrossLinks
        links={[
          { href: "/tilbud", label: TILBUD_TITLE },
          { href: "/verktoy/bonuskalkulator", label: "Bonuskalkulator" },
          { href: "/guider/velg-riktig-kredittkort", label: "Velg kredittkort" },
        ]}
      />
    </div>
  );
}
