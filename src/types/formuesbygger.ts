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
  /** ISO-dato (YYYY-MM-DD) */
  birthDate?: string;
  /** ISO-dato når personen er avdød */
  deathDate?: string;
  /** Kort beskrivelse til kortvisning */
  tagline: string;
  /** Omtrentlig formueanslag å vise i UI */
  wealthEstimate: WealthEstimate;
  /** Hva formuen hovedsakelig er knyttet til */
  wealthContext: string;
}

export type FormuesbyggerQuoteCategory = "sitat" | "motto";

export type FormuesbyggerQuoteSourceQuality = "original" | "media" | "secondary";

export type FormuesbyggerQuotePublishRecommendation =
  | "publiser"
  | "publiser-som-motto"
  | "vurder"
  | "unnga";

export interface FormuesbyggerQuote {
  /** Originalsitat. Engelske sitater skrives på engelsk. */
  text: string;
  /** Norsk oversettelse når text er på engelsk */
  translation?: string;
  /** Lenke til kilde (påkrevd for publisering) */
  sourceUrl: string;
  /** Kort tekst for kildelenken, f.eks. «Berkshire Hathaway, 2004» */
  sourceLabel: string;
  /** Valgfri sekundær kildelenke */
  additionalSourceUrl?: string;
  /** Vis «Motto/prinsipp» i stedet for «Sitat» */
  category?: FormuesbyggerQuoteCategory;
  /** Brukes til å fremheve kilde når den ikke er original */
  sourceQuality?: FormuesbyggerQuoteSourceQuality;
  /** Filtreres i UI, kun publiser og publiser-som-motto vises */
  publishRecommendation?: FormuesbyggerQuotePublishRecommendation;
  /** Valgfri kontekst */
  note?: string;
}

export interface FormuesbyggerTimelineEvent {
  /** Datert vendepunkt, f.eks. «1984» eller «1. jan. 2026» */
  date: string;
  title: string;
  description?: string;
}

export type FormuesbyggerWealthSourceCategory =
  | "selskaper"
  | "aksjer"
  | "salg"
  | "royalty"
  | "arv"
  | "lonn";

export interface FormuesbyggerWealthSource {
  category: FormuesbyggerWealthSourceCategory;
  description: string;
}

export interface FormuesbyggerMythReality {
  myth: string;
  reality: string;
}

export interface FormuesbyggerSource {
  label: string;
  url: string;
  /**
   * Kildehierarki:
   * primary → årsrapport / SEC / Brønnøysund
   * secondary → børsmelding / oppkjøpsmelding
   * tertiary → Kapital / Forbes / Reuters / DN / E24
   * quaternary → intervju
   * trace → Wikipedia, formueblogger (kun spor, filtreres bort i UI)
   */
  tier: FormuesbyggerSourceTier;
}

export type FormuesbyggerSourceTier =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "trace";

export interface FormuesbyggerFactCard {
  label: string;
  value: string;
  note?: string;
}

export interface FormuesbyggerTable {
  caption?: string;
  headers?: string[];
  rows: string[][];
  footnote?: string;
}

export interface FormuesbyggerBodyCard {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface FormuesbyggerBodySection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: FormuesbyggerTable;
  cards?: FormuesbyggerBodyCard[];
}

/** Fast artikkelmal, samme ni seksjoner på alle profiler */
export interface FormuesbyggerArticle {
  slug: string;
  readTimeMinutes: number;
  /** SEO-vennlig vinkling, f.eks. «Hvordan ble X rik?» */
  seoAngle: string;
  /** Overstyrer seoAngle som dokumenttittel. Layout legger til «| Penger i Fokus». */
  seoTitle?: string;
  /** Overstyrer profilnavn som H1 */
  pageTitle?: string;
  /** Kort svar: hvordan ble personen rik (50–80 ord) */
  shortAnswer: string;
  factCards?: FormuesbyggerFactCard[];
  factCardsNote?: string;
  bodySections?: FormuesbyggerBodySection[];
  /** Standard: etter kort svar. late: før kilder, etter FAQ. */
  timelinePlacement?: "default" | "late";
  /** Fire til seks daterte vendepunkter */
  timeline: FormuesbyggerTimelineEvent[];
  /** Fordeling: selskaper, aksjer, salg, royalty, arv */
  wealthSources: FormuesbyggerWealthSource[];
  /** Eierskap versus kontroll, utelates når ikke relevant */
  ownershipVsControl?: string;
  /** Én konkret transaksjon eller strategisk beslutning */
  decisiveMove: string;
  /** Gjeld, konsentrasjon, konjunkturer, utvanning */
  whatCouldGoWrong: string[];
  /** Selvskapt, arvet, lønn, kontanter eller aksjeverdi */
  mythVsReality: FormuesbyggerMythReality[];
  /** Unikt for profilen, ikke generiske fire punkter */
  personalLessons: string[];
  /** Direkte kildelenker */
  sources: FormuesbyggerSource[];
  /** ISO-dato (YYYY-MM-DD) */
  lastVerified: string;
  /** Valgfri meta description (ellers bygges automatisk) */
  metaDescription?: string;
  /** Ekstra SEO-nøkkelord utover standardsett */
  seoKeywords?: string[];
  /** Valgfri FAQ (ellers bygges fra synlig artikkelinnhold) */
  faq?: { question: string; answer: string }[];
  quotes?: FormuesbyggerQuote[];
  relatedLinks?: { label: string; href: string }[];
}
