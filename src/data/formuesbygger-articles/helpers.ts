import type {
  FormuesbyggerArticle,
  FormuesbyggerArticleSection,
} from "@/types/formuesbygger";

interface BuildArticleOptions {
  slug: string;
  readTimeMinutes: number;
  seoAngle: string;
  intro: string;
  sections: FormuesbyggerArticleSection[];
  ownershipParagraphs: string[];
  personalFinanceBullets?: string[];
  personalFinanceTip?: string;
  lessons: string[];
  relatedLinks?: { label: string; href: string }[];
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

  return {
    slug: options.slug,
    readTimeMinutes: options.readTimeMinutes,
    seoAngle: options.seoAngle,
    intro: options.intro,
    sections: [
      ...options.sections,
      {
        heading: "Lønn versus eierskap",
        paragraphs: options.ownershipParagraphs,
        tip:
          "Lønn er det du får utbetalt hver måned. Eierskap er andelen av verdi du sitter igjen med når et selskap, en merkevare eller en eiendel vokser. De fleste store formuer er bygget på det siste.",
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
    lessons: options.lessons,
    relatedLinks: options.relatedLinks,
  };
}
