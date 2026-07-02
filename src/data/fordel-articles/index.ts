import type { FordelArticleContent } from "@/types/fordel-article";
import { coop } from "./coop";
import { spenn } from "./spenn";
import { trumf } from "./trumf";

/**
 * CMS/ADMIN: Fullstendige fordelsartikler lagres her inntil CMS er på plass.
 */
const fordelArticles: Record<string, FordelArticleContent> = {
  coop,
  spenn,
  trumf,
};

export function getFordelArticle(slug: string): FordelArticleContent | undefined {
  return fordelArticles[slug];
}

export function hasFordelArticle(slug: string): boolean {
  return slug in fordelArticles;
}

export function getFordelArticleSlugs(): string[] {
  return Object.keys(fordelArticles);
}
