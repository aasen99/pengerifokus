import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import { TilbudDisclaimer } from "@/components/tilbud/TilbudDisclaimer";
import { TilbudFilters } from "@/components/tilbud/TilbudFilters";
import { TilbudGrid } from "@/components/tilbud/TilbudGrid";
import {
  FORDELSPROGRAMMER_TITLE,
  TILBUD_INTRO,
  TILBUD_SEO_TITLE,
} from "@/data/content-labels";
import { getFordeler, getTilbud } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { getTilbudCategoryGroupOptions } from "@/lib/tilbud-categories";
import {
  filterTilbud,
  groupTilbudByPartner,
  paginateGruppertTilbud,
  parseTilbudPage,
  sortGruppertTilbud,
  type TilbudSortOption,
} from "@/lib/tilbud";
import { buildTilbudHref, isTilbudOptInProgram } from "@/lib/tilbud-ui";

const pageDescription =
  "Finn medlemsrabatter og cashback fra OBOS, Usbl, Trumf Netthandel, Klarna, EuroBonus, NAF, Coop og mer. Filtrer etter program, kategori eller partner.";

export const metadata: Metadata = createPageMetadata({
  title: TILBUD_SEO_TITLE,
  description: pageDescription,
  path: "/tilbud",
  keywords: [
    "medlemsrabatter",
    "medlemsrabatter norge",
    "tilbud medlemskap",
    "tilbudsoversikt",
    "medlemstilbud",
    "medlemsfordeler",
    "fordelsprogrammer rabatt",
    "cashback norge",
    "OBOS rabatt",
    "OBOS medlemsfordeler",
    "Usbl rabatt",
    "Trumf netthandel",
    "Trumf bonus",
    "Klarna cashback",
    "EuroBonus shopping",
    "EuroBonus tilbud",
    "NAF medlemsrabatt",
    "Coop medlemsfordeler",
    "Spenn tilbud",
    "LOfavør rabatt",
    "studentrabatt",
    "student tilbud",
  ],
});

interface TilbudPageProps {
  searchParams: Promise<{
    q?: string | string[];
    program?: string | string[];
    kategori?: string | string[];
    student?: string | string[];
    sortering?: string | string[];
    side?: string | string[];
  }>;
}

function first(value?: string | string[]): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isSortOption(value: string | undefined): value is TilbudSortOption {
  return (
    value === "name-asc" ||
    value === "rate-desc" ||
    value === "programs-desc" ||
    value === "category-asc"
  );
}

export default async function TilbudPage({ searchParams }: TilbudPageProps) {
  const params = await searchParams;
  const tilbud = getTilbud();
  const fordeler = getFordeler();

  let program = first(params.program) || null;
  const studentParam = first(params.student);
  let includeStudent = studentParam === "1" || studentParam === "true";
  if (program === "student") {
    includeStudent = true;
    program = null;
  }

  const query = first(params.q)?.trim() ?? "";
  const category = first(params.kategori) || null;
  const sort = isSortOption(first(params.sortering))
    ? (first(params.sortering) as TilbudSortOption)
    : "rate-desc";

  const filtered = filterTilbud(
    tilbud,
    query,
    program,
    category,
    includeStudent,
  );
  const grouped = sortGruppertTilbud(groupTilbudByPartner(filtered), sort);
  const pagination = paginateGruppertTilbud(grouped, parseTilbudPage(params.side));

  const programs = fordeler
    .filter(
      (fordel) =>
        !isTilbudOptInProgram(fordel.slug) &&
        tilbud.some((item) => item.fordelSlug === fordel.slug),
    )
    .map((fordel) => ({
      slug: fordel.slug,
      name: fordel.name,
      count: tilbud.filter((item) => item.fordelSlug === fordel.slug).length,
    }));

  const categoryOptions = getTilbudCategoryGroupOptions(
    filterTilbud(tilbud, query, program, null, includeStudent),
  );

  const filterState = {
    q: query || undefined,
    program,
    kategori: category,
    student: includeStudent,
    sortering: sort,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <HubPageSeo
        name={TILBUD_SEO_TITLE}
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

      <PageHeader title={TILBUD_SEO_TITLE} description={TILBUD_INTRO} />

      <div className="space-y-5">
        <TilbudDisclaimer
          variant="banner"
          showTrumfNetthandelNote={program === "trumf"}
          showEurobonusShoppingNote={program === "eurobonus"}
        />

        <TilbudFilters
          query={query}
          program={program}
          category={category}
          includeStudent={includeStudent}
          sort={sort}
          programs={programs}
          categories={categoryOptions}
          partnerCount={grouped.length}
          offerCount={filtered.length}
        />

        <TilbudGrid
          groups={pagination.items}
          activeProgram={program}
          includeStudent={includeStudent}
          categoryGroup={category}
        />

        {pagination.pageCount > 1 && (
          <nav
            aria-label="Sidene i tilbudsoversikten"
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {Array.from({ length: pagination.pageCount }, (_, index) => {
              const page = index + 1;
              const current = page === pagination.page;
              return (
                <Link
                  key={page}
                  href={buildTilbudHref({ ...filterState, side: page })}
                  aria-current={current ? "page" : undefined}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                    current
                      ? "bg-orange-600 text-white"
                      : "border border-stone-200 bg-white text-stone-700 hover:border-orange-300"
                  }`}
                >
                  {page}
                </Link>
              );
            })}
          </nav>
        )}

        <TilbudDisclaimer />
      </div>

      <HubCrossLinks
        links={[
          { href: "/fordeler", label: FORDELSPROGRAMMER_TITLE },
          { href: "/verktoy/bonuskalkulator", label: "Bonuskalkulator" },
          { href: "/guider", label: "Guider" },
        ]}
      />
    </div>
  );
}
