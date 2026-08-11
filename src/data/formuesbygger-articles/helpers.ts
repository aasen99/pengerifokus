import { calculateReadTimeFromTexts } from "@/lib/read-time";
import type {
  FormuesbyggerArticle,
  FormuesbyggerMythReality,
  FormuesbyggerQuote,
  FormuesbyggerSource,
  FormuesbyggerTimelineEvent,
  FormuesbyggerWealthSource,
} from "@/types/formuesbygger";
import { getFormuesbyggerQuotesForSlug } from "@/lib/sitater";
import { normalizeArticleSources } from "./source-tiers";

export interface BuildArticleOptions {
  slug: string;
  seoAngle: string;
  shortAnswer: string;
  timeline: FormuesbyggerTimelineEvent[];
  wealthSources: FormuesbyggerWealthSource[];
  ownershipVsControl?: string;
  decisiveMove: string;
  whatCouldGoWrong: string[];
  mythVsReality: FormuesbyggerMythReality[];
  personalLessons: string[];
  sources: FormuesbyggerSource[];
  lastVerified: string;
  quotes?: FormuesbyggerQuote[];
  relatedLinks?: { label: string; href: string }[];
}

function collectArticleTexts(
  article: Omit<FormuesbyggerArticle, "readTimeMinutes">,
): string[] {
  const texts: string[] = [article.seoAngle, article.shortAnswer];

  for (const event of article.timeline) {
    texts.push(event.date, event.title, ...(event.description ? [event.description] : []));
  }

  for (const source of article.wealthSources) {
    texts.push(source.category, source.description);
  }

  if (article.ownershipVsControl) texts.push(article.ownershipVsControl);
  texts.push(article.decisiveMove);
  texts.push(...article.whatCouldGoWrong);

  for (const pair of article.mythVsReality) {
    texts.push(pair.myth, pair.reality);
  }

  texts.push(...article.personalLessons);

  for (const quote of article.quotes ?? []) {
    texts.push(quote.text);
    if (quote.translation) texts.push(quote.translation);
    if (quote.note) texts.push(quote.note);
  }

  return texts;
}

export function calculateFormuesbyggerReadTime(
  article: Omit<FormuesbyggerArticle, "readTimeMinutes">,
): number {
  return calculateReadTimeFromTexts(collectArticleTexts(article));
}

export function buildFormuesbyggerArticle(
  options: BuildArticleOptions,
): FormuesbyggerArticle {
  const quotes =
    options.quotes ?? getFormuesbyggerQuotesForSlug(options.slug);

  const articleWithoutReadTime = {
    slug: options.slug,
    seoAngle: options.seoAngle,
    shortAnswer: options.shortAnswer,
    timeline: options.timeline,
    wealthSources: options.wealthSources,
    ownershipVsControl: options.ownershipVsControl,
    decisiveMove: options.decisiveMove,
    whatCouldGoWrong: options.whatCouldGoWrong,
    mythVsReality: options.mythVsReality,
    personalLessons: options.personalLessons,
    sources: normalizeArticleSources(options.sources),
    lastVerified: options.lastVerified,
    quotes,
    relatedLinks: options.relatedLinks,
  };

  return {
    ...articleWithoutReadTime,
    readTimeMinutes: calculateFormuesbyggerReadTime(articleWithoutReadTime),
  };
}

export const WEALTH_SOURCE_LABELS: Record<
  FormuesbyggerWealthSource["category"],
  string
> = {
  selskaper: "Selskaper",
  aksjer: "Aksjer",
  salg: "Salg",
  royalty: "Royalty",
  arv: "Arv",
};
