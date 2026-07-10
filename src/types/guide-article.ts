export interface GuideArticleSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  tip?: string;
}

/** CMS/ADMIN: Full artikkelinnhold kan lagres i database med rich text senere */
export interface GuideArticleContent {
  slug: string;
  /** Beregnes fra innhold ved visning hvis utelatt i kildefil */
  readTimeMinutes?: number;
  intro: string;
  sections: GuideArticleSection[];
  relatedLinks?: { label: string; href: string }[];
}
