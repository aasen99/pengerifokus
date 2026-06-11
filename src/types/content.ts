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
}

export interface Kombinasjon extends BaseContent {
  title: string;
  description: string;
  /** Produkter/fordeler som inngår i kombinasjonen */
  items: string[];
}

export type ContentType =
  | "guide"
  | "fordel"
  | "verktoy"
  | "ordbok"
  | "kombinasjon";
