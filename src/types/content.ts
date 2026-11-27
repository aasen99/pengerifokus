/**
 * Felles innholdstyper for Penger i Fokus.
 *
 * CMS/ADMIN: Disse typene kan senere speiles i et database-schema
 * og brukes av admin-grensesnitt for oppretting/redigering av innhold.
 */

export type PublishStatus = "published" | "draft";

export interface BaseContent {
  id: string;
  slug: string;
  /** CMS: Kun published-innhold vises for besøkende */
  status: PublishStatus;
  /** CMS: Brukes til å fremheve innhold på forsiden */
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Guide extends BaseContent {
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export interface Fordel extends BaseContent {
  name: string;
  description: string;
  type: string;
  useCase: string;
}

export type ToolStatus = PublishStatus | "coming-soon";

export interface Verktoy extends Omit<BaseContent, "status"> {
  name: string;
  description: string;
  status: ToolStatus;
  category: string;
}

export interface OrdbokEntry extends BaseContent {
  term: string;
  definition: string;
  category: string;
  /** CMS: Synonymer og søkeord for ordboksøk */
  tags?: string[];
}

export interface OrdbokArticle {
  slug: string;
  whyItMatters: string;
  example: string;
  formula?: string;
  misconception: string;
  versus: { term: string; slug: string; difference: string };
  relatedTool?: { label: string; href: string };
  relatedGuide?: { label: string; href: string };
  source: { label: string; url: string };
  lastVerified: string;
  lastModifiedIso: string;
}

export type ContentType =
  | "guide"
  | "fordel"
  | "verktoy"
  | "ordbok"
  | "tilbud"
  | "formuesbygger";

/** Konkret medlemstilbud koblet til et fordelsprogram */
export interface Tilbud extends BaseContent {
  title: string;
  description: string;
  /** Kort fordelsbeskrivelse, f.eks. «15 % rabatt» */
  offerLabel: string;
  /** Hvor tilbudet gjelder, butikk, kjede eller tjeneste */
  partner: string;
  /** Slug fra fordeler, kobler tilbake til medlemsprogram */
  fordelSlug: string;
  category: string;
  /** Korte vilkår eller begrensninger */
  terms?: string;
  /** Offisiell kildelenke hos partner eller fordelsprogram */
  sourceUrl?: string;
  /** Ekstra merknad, f.eks. sammenlign totalpris eller verifiser sats */
  warning?: string;
  /** Skjulte søkeord – vises ikke på kort, brukes kun i tilbudssøk */
  searchTags?: string[];
  /** ISO-dato (YYYY-MM-DD). Tilbudet skjules automatisk etter denne datoen. */
  expiresAt?: string;
  shopping?: ShoppingDetails;
}

export interface ShoppingRate {
  label: string;
  value: number;
  unit: "percent" | "points-per-100" | "fixed-points" | "fixed-kr";
  audience?: "all" | "new" | "existing";
  kind: "listed" | "ordinary" | "campaign";
  regularValue?: number;
  endsAt?: string;
}

export interface ShoppingDetails {
  channel: "sobbl" | "sas-online" | "trumf-netthandel" | "klarna" | "spenn" | "spenn-direct" | "eurobonus-shop" | "eurobonus-shop-giftcard";
  verification: "verified" | "needs-review" | "app-required" | "not-listed" | "ended";
  checkedAt?: string;
  attemptedAt: string;
  sourceKind: "official" | "discovery";
  rates: ShoppingRate[];
  basis: "ex-vat" | "incl-vat" | "unknown";
  basisNote?: string;
  previousLabel?: string;
  discoveryUrl?: string;
  amex?: {
    status: "yes" | "reported" | "conditional" | "no" | "unknown";
    note: string;
    sources: { label: string; url?: string; checkedOn: string }[];
  };
}

