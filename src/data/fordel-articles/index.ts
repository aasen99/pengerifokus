import type { FordelArticleContent } from "@/types/fordel-article";
import { calculateFordelArticleReadTime } from "@/lib/read-time";
import { bankfordeler } from "./bankfordeler";
import { coop } from "./coop";
import { eurobonus } from "./eurobonus";
import { klarna } from "./klarna";
import { kredittkortfordeler } from "./kredittkortfordeler";
import { naf } from "./naf";
import { obos } from "./obos";
import { revolut } from "./revolut";
import { spenn } from "./spenn";
import { trumf } from "./trumf";

function withReadTime(
  article: Omit<FordelArticleContent, "readTimeMinutes">,
): FordelArticleContent {
  return {
    ...article,
    readTimeMinutes: calculateFordelArticleReadTime(article),
  };
}

/**
 * CMS/ADMIN: Fullstendige fordelsartikler lagres her inntil CMS er på plass.
 */
const fordelArticles: Record<string, FordelArticleContent> = {
  bankfordeler: withReadTime(bankfordeler),
  coop: withReadTime(coop),
  eurobonus: withReadTime(eurobonus),
  klarna: withReadTime(klarna),
  kredittkortfordeler: withReadTime(kredittkortfordeler),
  naf: withReadTime(naf),
  obos: withReadTime(obos),
  revolut: withReadTime(revolut),
  spenn: withReadTime(spenn),
  trumf: withReadTime(trumf),
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
