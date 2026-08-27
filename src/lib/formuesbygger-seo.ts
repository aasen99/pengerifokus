import {
  BUILD_TYPE_LABELS,
  INDUSTRY_LABELS,
  REGION_LABELS,
} from "@/data/formuesbyggere-labels";
import type {
  Formuesbygger,
  FormuesbyggerArticle,
} from "@/types/formuesbygger";
import { trimMetaDescription } from "@/lib/seo";
import { formatWealthEstimate } from "@/lib/wealth-estimate";

export interface FormuesbyggerFaqItem {
  question: string;
  answer: string;
}

function firstSentence(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  const match = normalized.match(/^(.+?[.!?])(?:\s|$)/);
  return match?.[1] ?? normalized;
}

function clipAnswer(text: string, maxLength = 320): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  const trimmed = normalized.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  const cut = lastSpace > 140 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${cut.trimEnd()}…`;
}

export function getFormuesbyggerSeoTitle(article: FormuesbyggerArticle): string {
  return article.seoTitle ?? article.seoAngle;
}

/** Meta description: formuestall tidlig (søkeintent), deretter første setning. */
export function buildFormuesbyggerMetaDescription(
  profile: Formuesbygger,
  article: FormuesbyggerArticle,
): string {
  if (article.metaDescription) {
    return trimMetaDescription(article.metaDescription);
  }

  const wealth = formatWealthEstimate(profile.wealthEstimate);
  const source = profile.wealthEstimate.source
    ? ` (${profile.wealthEstimate.source})`
    : "";
  const lead = `Omtrentlig formue ${wealth}${source}.`;
  const remainder = firstSentence(article.shortAnswer);

  return trimMetaDescription(`${lead} ${remainder}`);
}

export function buildFormuesbyggerKeywords(
  profile: Formuesbygger,
  article: FormuesbyggerArticle,
): string[] {
  const name = profile.name;
  const base = [
    name,
    `${name} formue`,
    `${name} rik`,
    "hvordan ble rik",
    "formue",
    "eierskap",
    INDUSTRY_LABELS[profile.industry],
    BUILD_TYPE_LABELS[profile.buildType],
    REGION_LABELS[profile.region],
  ];

  if (profile.region === "norsk") {
    base.push("norske milliardærer", "Kapital 400");
  } else {
    base.push("Forbes", "milliardær");
  }

  return [...base, ...(article.seoKeywords ?? [])];
}

/**
 * FAQ basert på synlig innhold (kort svar, formue, avgjørende grep, myte/virkelighet).
 * Unngår egen FAQ-seksjon, men matcher det som allerede står på siden.
 */
export function buildFormuesbyggerFaq(
  profile: Formuesbygger,
  article: FormuesbyggerArticle,
): FormuesbyggerFaqItem[] {
  if (article.faq?.length) return article.faq;

  const name = profile.name;
  const wealth = formatWealthEstimate(profile.wealthEstimate);
  const source = profile.wealthEstimate.source
    ? ` ifølge ${profile.wealthEstimate.source}`
    : "";

  const items: FormuesbyggerFaqItem[] = [
    {
      question: `Hvor stor formue har ${name}?`,
      answer: clipAnswer(
        `Omtrentlig formue ${wealth}${source}. ${profile.wealthContext} Anslaget er markedsverdi, ikke ligningsformue eller penger på konto.`,
      ),
    },
    {
      question: `Hvordan ble ${name} rik?`,
      answer: clipAnswer(article.shortAnswer),
    },
    {
      question: `Hva var det avgjørende grepet bak formuen til ${name}?`,
      answer: clipAnswer(article.decisiveMove),
    },
  ];

  for (const pair of article.mythVsReality.slice(0, 2)) {
    items.push({
      question: `Er det sant at ${pair.myth.replace(/\?$/, "").trim()}?`,
      answer: clipAnswer(pair.reality),
    });
  }

  return items;
}
