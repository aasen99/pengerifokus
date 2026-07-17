import {
  getFordeler,
  getFormuesbyggere,
  getGuides,
  getOrdbok,
  getPublishedVerktoy,
  getTilbud,
} from "@/lib/content";
import { hasGuideArticle } from "@/data/guide-articles";
import { isTilbudOptInProgram } from "@/lib/tilbud";

export function getHomeStats() {
  const publiserteTilbud = getTilbud().filter(
    (entry) => !isTilbudOptInProgram(entry.fordelSlug),
  );

  return {
    tools: getPublishedVerktoy().length,
    guides: getGuides().filter((guide) => hasGuideArticle(guide.slug)).length,
    ordbok: getOrdbok().length,
    formuesbyggere: getFormuesbyggere().length,
    fordeler: getFordeler().length,
    tilbud: publiserteTilbud.length,
  };
}
