import type { GuideArticleContent } from "@/types/guide-article";
import { byggBufferkonto } from "./bygg-bufferkonto";
import { komIGangMedFond } from "./kom-i-gang-med-fond";
import { kuttFasteKostnader } from "./kutt-faste-kostnader";
import { betalNedDyrGjeld } from "./betal-ned-dyr-gjeld";
import { funfacts } from "./funfacts";
import { forstaaOkonomiskHelse } from "./forstaa-okonomisk-helse";
import { eieEllerLeieBolig } from "./eie-eller-leie-bolig";
import { inflasjonOgGjeld } from "./inflasjon-og-gjeld";

/**
 * CMS/ADMIN: Fullstendige guider lagres her inntil CMS er på plass.
 * Nye artikler legges til i guideArticles og får egen slug.
 */
const guideArticles: Record<string, GuideArticleContent> = {
  "bygg-bufferkonto": byggBufferkonto,
  "kom-i-gang-med-fond": komIGangMedFond,
  "kutt-faste-kostnader": kuttFasteKostnader,
  "betal-ned-dyr-gjeld": betalNedDyrGjeld,
  funfacts: funfacts,
  "forstaa-okonomisk-helse": forstaaOkonomiskHelse,
  "eie-eller-leie-bolig": eieEllerLeieBolig,
  "inflasjon-og-gjeld": inflasjonOgGjeld,
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
