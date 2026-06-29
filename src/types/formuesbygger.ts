import type { BaseContent } from "@/types/content";

export type FormuesbyggerRegion = "norsk" | "internasjonal";

export type FormuesbyggerIndustry =
  | "teknologi"
  | "eiendom"
  | "sport"
  | "musikk"
  | "handel"
  | "industri"
  | "investering"
  | "arv";

export type FormuesbyggerBuildType =
  | "selvskapt"
  | "arv-videreutvikling"
  | "investor"
  | "grunder"
  | "merkevare"
  | "idrett-underholdning";

export type WealthEstimateCurrency = "NOK" | "USD";

export interface WealthEstimate {
  /** Tall eller intervall uten enhet, f.eks. «12–15» eller «130» */
  amount: string;
  unit: "mrd" | "mill";
  currency: WealthEstimateCurrency;
  /** År eller periode anslaget gjelder */
  asOf?: string;
  /** F.eks. «Kapital 400» */
  source?: string;
  sourceUrl?: string;
}

export interface Formuesbygger extends BaseContent {
  name: string;
  region: FormuesbyggerRegion;
  industry: FormuesbyggerIndustry;
  buildType: FormuesbyggerBuildType;
  /** Kort beskrivelse til kortvisning */
  tagline: string;
  /** Omtrentlig formueanslag å vise i UI */
  wealthEstimate: WealthEstimate;
  /** Hva formuen hovedsakelig er knyttet til */
  wealthContext: string;
}

export interface FormuesbyggerQuote {
  /** Originalsitat. Engelske sitater skrives på engelsk. */
  text: string;
  /** Norsk oversettelse når text er på engelsk */
  translation?: string;
  /** Lenke til kilde (påkrevd for publisering) */
  sourceUrl: string;
  /** Kort tekst for kildelenken, f.eks. «Berkshire Hathaway, 2004» */
  sourceLabel: string;
  /** Valgfri kontekst */
  note?: string;
}

export interface FormuesbyggerArticleSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  tip?: string;
}

export interface FormuesbyggerArticle {
  slug: string;
  readTimeMinutes: number;
  /** SEO-vennlig vinkling, f.eks. «Hvordan ble X rik?» */
  seoAngle: string;
  intro: string;
  sections: FormuesbyggerArticleSection[];
  quotes?: FormuesbyggerQuote[];
  lessons: string[];
  relatedLinks?: { label: string; href: string }[];
}
