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
import { prosentregning } from "./prosentregning";
import { sifoBudsjett } from "./sifo-budsjett";
import { sifoSammenligneHusholdninger } from "./sifo-sammenligne-husholdninger";
import { stromregningOgNorgespris } from "./stromregning-og-norgespris";
import { drivstoffpriser } from "./drivstoffpriser";
import { lanerammeForBoligkjop } from "./laneramme-for-boligkjop";
import { trippelTrumf } from "./trippel-trumf";
import { rentemoteSeptember2026 } from "./rentemote-september-2026";
import { statsbudsjettet2027 } from "./statsbudsjettet-2027";
import { halvSkatt } from "./halv-skatt";
import { bsuEllerFond } from "./bsu-eller-fond";
import { spareIFondEllerBetaleNedBoliglan } from "./spare-i-fond-eller-betale-ned-boliglan";
import { trumfVsCoop } from "./trumf-vs-coop";
import { penniDenStoreUtfordreren } from "./penni-den-store-utfordreren";

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
  "penni-den-store-utfordreren": withReadTime(penniDenStoreUtfordreren),
  "rentemote-september-2026": withReadTime(rentemoteSeptember2026),
  "statsbudsjettet-2027": withReadTime(statsbudsjettet2027),
  "halv-skatt": withReadTime(halvSkatt),
  "bsu-eller-fond": withReadTime(bsuEllerFond),
  "spare-i-fond-eller-betale-ned-boliglan": withReadTime(
    spareIFondEllerBetaleNedBoliglan,
  ),
  "trumf-vs-coop": withReadTime(trumfVsCoop),
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
  prosentregning: withReadTime(prosentregning),
  "sifo-budsjett": withReadTime(sifoBudsjett),
  "sifo-sammenligne-husholdninger": withReadTime(sifoSammenligneHusholdninger),
  "stromregning-og-norgespris": withReadTime(stromregningOgNorgespris),
  drivstoffpriser: withReadTime(drivstoffpriser),
  "laneramme-for-boligkjop": withReadTime(lanerammeForBoligkjop),
  "trippel-trumf": withReadTime(trippelTrumf),
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
