export interface FordelArticleSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  tip?: string;
}

export interface FordelArticleSource {
  label: string;
  url: string;
}

export interface FordelArticleFaqItem {
  question: string;
  answer: string;
}

/** CMS/ADMIN: Full artikkelinnhold for fordelsprogrammer */
export interface FordelArticleContent {
  slug: string;
  title: string;
  readTimeMinutes: number;
  intro: string;
  lastVerified: string;
  /** ISO-dato for structured data og sitemap, f.eks. 2026-07-02 */
  lastModifiedIso: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  sections: FordelArticleSection[];
  faq?: FordelArticleFaqItem[];
  sources: FordelArticleSource[];
  relatedLinks?: { label: string; href: string }[];
}
