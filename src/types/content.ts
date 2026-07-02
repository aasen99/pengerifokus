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
}

