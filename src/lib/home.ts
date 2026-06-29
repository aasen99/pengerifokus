import {
  getFordeler,
  getFormuesbyggere,
  getGuides,
  getOrdbok,
  getPublishedVerktoy,
  getTilbud,
} from "@/lib/content";

export function getHomeStats() {
  return {
    tools: getPublishedVerktoy().length,
    guides: getGuides().length,
    ordbok: getOrdbok().length,
    formuesbyggere: getFormuesbyggere().length,
    fordeler: getFordeler().length,
    tilbud: getTilbud().length,
  };
}
