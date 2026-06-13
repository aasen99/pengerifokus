import type { GuideArticleContent } from "@/types/guide-article";
import { byggBufferkonto } from "./bygg-bufferkonto";
import { komIGangMedFond } from "./kom-i-gang-med-fond";

/**
 * CMS/ADMIN: Fullstendige guider lagres her inntil CMS er på plass.
 * Nye artikler legges til i guideArticles og får egen slug.
 */
const guideArticles: Record<string, GuideArticleContent> = {
  "bygg-bufferkonto": byggBufferkonto,
  "kom-i-gang-med-fond": komIGangMedFond,
};

export function getGuideArticle(slug: string): GuideArticleContent | undefined {
  return guideArticles[slug];
}

export function getGuideArticleSlugs(): string[] {
  return Object.keys(guideArticles);
}

export function hasGuideArticle(slug: string): boolean {
  return slug in guideArticles;
}
