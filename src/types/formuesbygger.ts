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

export interface Formuesbygger extends BaseContent {
  name: string;
  region: FormuesbyggerRegion;
  industry: FormuesbyggerIndustry;
  buildType: FormuesbyggerBuildType;
  /** Kort beskrivelse til kortvisning */
  tagline: string;
  /** Omtrentlig formueskilder, uten eksakte tall */
  wealthContext: string;
}

export interface FormuesbyggerArticleSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface FormuesbyggerArticle {
  slug: string;
  readTimeMinutes: number;
  /** SEO-vennlig vinkling, f.eks. «Hvordan ble X rik?» */
  seoAngle: string;
  intro: string;
  sections: FormuesbyggerArticleSection[];
  lessons: string[];
  relatedLinks?: { label: string; href: string }[];
}
