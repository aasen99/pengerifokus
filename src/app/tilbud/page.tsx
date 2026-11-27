import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import { TilbudDisclaimer } from "@/components/tilbud/TilbudDisclaimer";
import { TilbudBrowser } from "@/components/tilbud/TilbudBrowser";
import {
  FORDELSPROGRAMMER_TITLE,
  TILBUD_INTRO,
  TILBUD_SEO_TITLE,
} from "@/data/content-labels";
import { getFordeler, getTilbud } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { getTilbudCategoryGroupOptions, getStudentTilbudCategoryOptions } from "@/lib/tilbud-categories";
import {
  filterTilbud,
  groupTilbudByPartner,
  parseTilbudPage,
  sortGruppertTilbud,
  sortStudentTilbud,
  type TilbudSortOption,
} from "@/lib/tilbud";
import { isTilbudOptInProgram } from "@/lib/tilbud-ui";
import { DEFAULT_BONUS_SETTINGS } from "@/lib/netthandel";

const pageDescription =
  "Finn tilbud, bonus og cashback fra OBOS, Trumf, Coop, NAF, EuroBonus, Spenn og flere. Søk eller filtrer etter program og kategori. Oversikten utvides løpende.";

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
    "drivstoffrabatt",
    "bensinrabatt",
    "Circle K Extra",
    "Esso Trumf",
    "Coop drivstoff",
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
    funn?: string; netthandel?: string; flere?: string; kontrollert?: string;
    eb?: string; spenn?: string; trumf?: string; belop?: string; frakt?: string; mva?: string; kunde?: string;
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
  const showFindings = first(params.funn) === "1";
  const catalogue = getTilbud();
  const tilbud = catalogue.filter(item => showFindings || !item.shopping || item.shopping.verification === "verified");
  const fordeler = getFordeler();
  const bounded = (raw: string | undefined, fallback: number, min: number, max: number) => {
    const n = raw === undefined ? fallback : Number(raw);
    return Number.isFinite(n) && n >= min && n <= max ? n : fallback;
  };
  const settings = { ...DEFAULT_BONUS_SETTINGS,
    euroOre: bounded(first(params.eb), 10, 0, 100), spennOre: bounded(first(params.spenn), 10, 0, 100),
    amount: bounded(first(params.belop), 1000, 1, 1000000), shipping: bounded(first(params.frakt), 0, 0, 1000000),
    vat: bounded(first(params.mva), 25, 0, 100),
    trumf: params.trumf === "auto" ? "auto" as const : params.trumf === "once" ? "once" as const : "cash" as const,
    customer: params.kunde === "new" ? "new" as const : "existing" as const,
  };
  const checkedNow = new Date().toISOString();

  let program = first(params.program) || null;
  const studentProgramView = program === "student";
  const studentParam = first(params.student);
  let includeStudent = studentParam === "1" || studentParam === "true";
  if (studentProgramView) {
    includeStudent = true;
    program = null;
  }

  const query = first(params.q)?.trim() ?? "";
  const category = first(params.kategori) || null;
  const sort = isSortOption(first(params.sortering))
    ? (first(params.sortering) as TilbudSortOption)
    : "rate-desc";

  const scoped = filterTilbud(tilbud, "", program, category, includeStudent);
  const sortedEntries = studentProgramView ? sortStudentTilbud(scoped) : scoped;
  const grouped = sortGruppertTilbud(
    groupTilbudByPartner(sortedEntries),
    sort,
    settings,
    checkedNow,
  );

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

  const categoryOptions = studentProgramView
    ? getStudentTilbudCategoryOptions(
        filterTilbud(tilbud, "", program, null, includeStudent),
      )
    : getTilbudCategoryGroupOptions(
        filterTilbud(tilbud, "", program, null, includeStudent),
      );

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-10">
      <HubPageSeo
        name={TILBUD_SEO_TITLE}
        description={pageDescription}
        path="/tilbud"
        items={fordeler
          .filter((fordel) =>
            catalogue.some((item) => item.fordelSlug === fordel.slug),
          )
          .map((fordel) => ({
            name: `${fordel.name}: tilbud`,
            path: `/tilbud?program=${fordel.slug}`,
            description: fordel.description,
          }))}
      />

      <PageHeader title={TILBUD_SEO_TITLE} description={TILBUD_INTRO} />

      <div className="space-y-5">
        <TilbudBrowser
          showFindings={showFindings}
          groups={grouped}
          query={query}
          program={program}
          category={category}
          includeStudent={includeStudent}
          sort={sort}
          page={parseTilbudPage(params.side)}
          programs={programs}
          categories={categoryOptions}
          initialSettings={settings}
          online={params.netthandel === "1"}
          multiple={params.flere === "1"}
          verified={params.kontrollert === "1"}
          checkedNow={checkedNow}
        />

        <TilbudDisclaimer
          variant="banner"
          showTrumfNetthandelNote={program === "trumf"}
          showEurobonusShoppingNote={program === "eurobonus"}
        >
          <p>
            Ved siste gjennomgang ble satsene kontrollert hos {catalogue.filter(t => t.shopping?.channel === "trumf-netthandel" && t.shopping.verification === "verified").length} Trumf-butikker
            {" "}og {catalogue.filter(t => t.shopping?.channel === "klarna" && t.shopping.verification === "verified").length} Klarna-butikker.
            For SAS og Spenn er dekningen ufullstendig. Under avanserte filtre kan du også se ubekreftede partnerskap og tidligere registrerte satser.
            {" "}Spenn viser også butikkens sats i nettleserutvidelsen{" "}
            <a href="https://spenn.refunder.com/no/extension" className="underline">Tjen Spenn på nett</a> når du besøker en støttet nettbutikk på PC eller Mac.
          </p>
        </TilbudDisclaimer>
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
