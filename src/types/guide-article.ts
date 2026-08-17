export interface GuideArticleTableRow {
  label: string;
  value: string;
}

export interface GuideArticleTable {
  caption?: string;
  rows: GuideArticleTableRow[];
}

export interface GuideArticleCta {
  heading: string;
  description: string;
  buttonText: string;
  href: string;
  analyticsEvent?: string;
}

export interface GuideArticleSource {
  label: string;
  url: string;
}

export interface GuideArticleSubsection {
  subheading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface GuideArticleSection {
  heading: string;
  subheading?: string;
  paragraphs?: string[];
  bullets?: string[];
  tip?: string;
  table?: GuideArticleTable;
  cta?: GuideArticleCta;
  factBox?: string[];
  subsections?: GuideArticleSubsection[];
}

/** CMS/ADMIN: Full artikkelinnhold kan lagres i database med rich text senere */
export interface GuideArticleContent {
  slug: string;
  /** SEO-tittel uten nettstedsnavn. H1 hentes fra guide.title. */
  seoTitle?: string;
  /** Beregnes fra innhold ved visning hvis utelatt i kildefil */
  readTimeMinutes?: number;
  intro: string;
  shortAnswer?: string;
  topCta?: GuideArticleCta;
  sections: GuideArticleSection[];
  faq?: { question: string; answer: string }[];
  sources?: GuideArticleSource[];
  conclusion?: string;
  bottomCta?: GuideArticleCta;
  relatedLinks?: { label: string; href: string }[];
}
