import type { GuideArticleContent } from "@/types/guide-article";
import { byggBufferkonto } from "./bygg-bufferkonto";
import { komIGangMedFond } from "./kom-i-gang-med-fond";
import { kuttFasteKostnader } from "./kutt-faste-kostnader";
import { betalNedDyrGjeld } from "./betal-ned-dyr-gjeld";

/**
 * CMS/ADMIN: Fullstendige guider lagres her inntil CMS er på plass.
 * Nye artikler legges til i guideArticles og får egen slug.
 */
const guideArticles: Record<string, GuideArticleContent> = {
  "bygg-bufferkonto": byggBufferkonto,
  "kom-i-gang-med-fond": komIGangMedFond,
  "kutt-faste-kostnader": kuttFasteKostnader,
  "betal-ned-dyr-gjeld": betalNedDyrGjeld,
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
