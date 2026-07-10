import type { GuideArticleContent } from "@/types/guide-article";
import { calculateGuideArticleReadTime } from "@/lib/read-time";
import { bankenesFordelsprogrammer } from "./bankenes-fordelsprogrammer";
import { byggBufferkonto } from "./bygg-bufferkonto";
import { komIGangMedFond } from "./kom-i-gang-med-fond";
import { kuttFasteKostnader } from "./kutt-faste-kostnader";
import { betalNedDyrGjeld } from "./betal-ned-dyr-gjeld";
import { funfacts } from "./funfacts";
import { forstaaOkonomiskHelse } from "./forstaa-okonomisk-helse";
import { eieEllerLeieBolig } from "./eie-eller-leie-bolig";
import { inflasjonOgGjeld } from "./inflasjon-og-gjeld";
import { kredittkortEllerDebetkort } from "./kredittkort-eller-debetkort";
import { velgRiktigKredittkort } from "./velg-riktig-kredittkort";

function withReadTime(
  article: Omit<GuideArticleContent, "readTimeMinutes">,
): GuideArticleContent {
  return {
    ...article,
    readTimeMinutes: calculateGuideArticleReadTime(article),
  };
}

/**
 * CMS/ADMIN: Fullstendige guider lagres her inntil CMS er på plass.
 * Nye artikler legges til i guideArticles og får egen slug.
 */
const guideArticles: Record<string, GuideArticleContent> = {
  "bankenes-fordelsprogrammer": withReadTime(bankenesFordelsprogrammer),
  "bygg-bufferkonto": withReadTime(byggBufferkonto),
  "kom-i-gang-med-fond": withReadTime(komIGangMedFond),
  "kutt-faste-kostnader": withReadTime(kuttFasteKostnader),
  "betal-ned-dyr-gjeld": withReadTime(betalNedDyrGjeld),
  funfacts: withReadTime(funfacts),
  "forstaa-okonomisk-helse": withReadTime(forstaaOkonomiskHelse),
  "eie-eller-leie-bolig": withReadTime(eieEllerLeieBolig),
  "inflasjon-og-gjeld": withReadTime(inflasjonOgGjeld),
  "kredittkort-eller-debetkort": withReadTime(kredittkortEllerDebetkort),
  "velg-riktig-kredittkort": withReadTime(velgRiktigKredittkort),
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
