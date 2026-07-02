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

/** CMS/ADMIN: Full artikkelinnhold for fordelsprogrammer */
export interface FordelArticleContent {
  slug: string;
  title: string;
  readTimeMinutes: number;
  intro: string;
  lastVerified: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  sections: FordelArticleSection[];
  sources: FordelArticleSource[];
  relatedLinks?: { label: string; href: string }[];
}
