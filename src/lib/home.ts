import {
  getFordeler,
  getFormuesbyggere,
  getGuides,
  getOrdbok,
  getPublishedVerktoy,
  getTilbud,
} from "@/lib/content";
import { hasGuideArticle } from "@/data/guide-articles";

export function getHomeStats() {
  return {
    tools: getPublishedVerktoy().length,
    guides: getGuides().filter((guide) => hasGuideArticle(guide.slug)).length,
    ordbok: getOrdbok().length,
    formuesbyggere: getFormuesbyggere().length,
    fordeler: getFordeler().length,
    tilbud: getTilbud().length,
  };
}
