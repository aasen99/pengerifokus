import { calculateReadTimeFromTexts } from "@/lib/read-time";
import type {
  FormuesbyggerArticle,
  FormuesbyggerBodySection,
  FormuesbyggerFactCard,
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
  seoTitle?: string;
  pageTitle?: string;
  shortAnswer: string;
  factCards?: FormuesbyggerFactCard[];
  factCardsNote?: string;
  bodySections?: FormuesbyggerBodySection[];
  hideStandardSections?: boolean;
  timelinePlacement?: FormuesbyggerArticle["timelinePlacement"];
  timeline: FormuesbyggerTimelineEvent[];
  wealthSources: FormuesbyggerWealthSource[];
  ownershipVsControl?: string;
  decisiveMove: string;
  whatCouldGoWrong: string[];
  mythVsReality: FormuesbyggerMythReality[];
  personalLessons: string[];
  sources: FormuesbyggerSource[];
  lastVerified: string;
  metaDescription?: string;
  seoKeywords?: string[];
  faq?: { question: string; answer: string }[];
  quotes?: FormuesbyggerQuote[];
  relatedLinks?: { label: string; href: string; description?: string }[];
}

function collectArticleTexts(
  article: Omit<FormuesbyggerArticle, "readTimeMinutes">,
): string[] {
  const texts: string[] = [
    article.seoAngle,
    ...(article.seoTitle ? [article.seoTitle] : []),
    ...(article.pageTitle ? [article.pageTitle] : []),
    article.shortAnswer,
  ];

  for (const card of article.factCards ?? []) {
    texts.push(card.label, card.value, ...(card.note ? [card.note] : []));
  }
  if (article.factCardsNote) texts.push(article.factCardsNote);

  for (const section of article.bodySections ?? []) {
    texts.push(section.heading, ...(section.paragraphs ?? []), ...(section.bullets ?? []));
    if (section.table) {
      texts.push(...(section.table.headers ?? []));
      texts.push(...section.table.rows.flat());
      if (section.table.footnote) texts.push(section.table.footnote);
      if (section.table.caption) texts.push(section.table.caption);
    }
    for (const card of section.cards ?? []) {
      texts.push(card.title, ...(card.paragraphs ?? []), ...(card.bullets ?? []));
    }
    if (section.callout) {
      if (section.callout.title) texts.push(section.callout.title);
      texts.push(section.callout.text);
    }
  }

  for (const event of article.timeline) {
    texts.push(event.date, event.title, ...(event.description ? [event.description] : []));
  }

  if (!article.hideStandardSections) {
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
  }

  for (const item of article.faq ?? []) {
    texts.push(item.question, item.answer);
  }

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
    seoTitle: options.seoTitle,
    pageTitle: options.pageTitle,
    shortAnswer: options.shortAnswer,
    factCards: options.factCards,
    factCardsNote: options.factCardsNote,
    bodySections: options.bodySections,
    hideStandardSections: options.hideStandardSections,
    timelinePlacement: options.timelinePlacement,
    timeline: options.timeline,
    wealthSources: options.wealthSources,
    ownershipVsControl: options.ownershipVsControl,
    decisiveMove: options.decisiveMove,
    whatCouldGoWrong: options.whatCouldGoWrong,
    mythVsReality: options.mythVsReality,
    personalLessons: options.personalLessons,
    sources: normalizeArticleSources(options.sources),
    lastVerified: options.lastVerified,
    metaDescription: options.metaDescription,
    seoKeywords: options.seoKeywords,
    faq: options.faq,
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
  lonn: "Lønn og kontrakter",
};
