import { calculateReadTimeFromTexts } from "@/lib/read-time";
import type {
  FormuesbyggerArticle,
  FormuesbyggerArticleSection,
  FormuesbyggerQuote,
} from "@/types/formuesbygger";
import { getFormuesbyggerQuotesForSlug } from "@/lib/sitater";

interface BuildArticleOptions {
  slug: string;
  seoAngle: string;
  intro: string;
  sections: FormuesbyggerArticleSection[];
  ownershipParagraphs: string[];
  personalFinanceBullets?: string[];
  personalFinanceTip?: string;
  quotes?: FormuesbyggerQuote[];
  lessons: string[];
  relatedLinks?: { label: string; href: string }[];
}

function collectArticleTexts(
  article: Omit<FormuesbyggerArticle, "readTimeMinutes">,
): string[] {
  const texts: string[] = [article.intro, article.seoAngle];

  for (const section of article.sections) {
    texts.push(section.heading, ...(section.paragraphs ?? []));
    texts.push(...(section.bullets ?? []));
    if (section.tip) texts.push(section.tip);
  }

  for (const quote of article.quotes ?? []) {
    texts.push(quote.text);
    if (quote.translation) texts.push(quote.translation);
    if (quote.note) texts.push(quote.note);
  }

  texts.push(...article.lessons);

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
  const personalBullets = options.personalFinanceBullets ?? [
    "Høy lønn alene bygger sjelden stor formue. Det er det du beholder og lar vokse som teller.",
    "Sparing i fond eller aksjer over mange år kopierer i liten skala det store eierskapet gjør i stor skala.",
    "Kompetanse og nettverk kan være starten på eget firma, sideprosjekt eller bedre investeringsvalg.",
    "Unngå dyr gjeld som spiser av det du kunne investert.",
  ];

  const quotes =
    options.quotes ?? getFormuesbyggerQuotesForSlug(options.slug);

  const articleWithoutReadTime = {
    slug: options.slug,
    seoAngle: options.seoAngle,
    intro: options.intro,
    sections: [
      ...options.sections,
      {
        heading: "Lønn versus eierskap",
        paragraphs: options.ownershipParagraphs,
        tip: "Lønn er det du får utbetalt hver måned. Eierskap er andelen av verdi du sitter igjen med når et selskap, en merkevare eller en eiendel vokser. De fleste store formuer er bygget på det siste.",
      },
      {
        heading: "Hva betyr dette for deg?",
        paragraphs: [
          "Du trenger ikke starte et industrikonsern for å ta lærdommen på alvor. Prinsippet om eierskap gjelder også i vanlig privatøkonomi.",
        ],
        bullets: personalBullets,
        tip: options.personalFinanceTip,
      },
    ],
    quotes,
    lessons: options.lessons,
    relatedLinks: options.relatedLinks,
  };

  return {
    ...articleWithoutReadTime,
    readTimeMinutes: calculateFormuesbyggerReadTime(articleWithoutReadTime),
  };
}
