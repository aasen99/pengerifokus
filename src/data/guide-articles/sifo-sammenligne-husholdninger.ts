import type { GuideArticleContent } from "@/types/guide-article";
import {
  formatSifoGuideKr,
  getSifoGuideExampleTotals,
} from "./sifo-guide-examples";

const { enslig, par, familie } = getSifoGuideExampleTotals();
const parDiff = par - enslig;
const familieDiff = familie - par;

export const sifoSammenligneHusholdninger: GuideArticleContent = {
  slug: "sifo-sammenligne-husholdninger",
  seoTitle: "SIFO: sammenligne husholdninger",
  intro:
    "SIFO-referansebudsjettet endrer seg mye når du flytter sammen, får barn eller endrer livssituasjon. Bolig og strøm er ikke med. Med to scenarioer i kalkulatoren ser du hvilke poster som går opp, ned eller slås sammen.",
  sections: [
    {
      heading: "Flytte sammen",
      paragraphs: [
        "SIFO skiller mellom individposter og husholdningsposter. Når to voksne flytter sammen, dobles ikke alt. Husholdningsposter deles etter antall personer i husholdningen.",
      ],
    },
    {
      heading: "Eksempel 1: én enslig husholdning vs. par uten barn",
      paragraphs: [
        `Én kvinne 25–50 år uten bil: ca. ${formatSifoGuideKr(enslig)} kr per måned i forbruksutgifter. Par 25–50 år uten barn: ca. ${formatSifoGuideKr(par)} kr per måned. Forskjellen er ca. ${formatSifoGuideKr(parDiff)} kr per måned.`,
        "Valg i kalkulatoren: alder og kjønn for voksne, ingen bil, ingen barnehage og ingen AKS/SFO.",
      ],
      tip: "Velg forhåndsvalgene «Enslig kvinne 25–50 år» og «Par 25–50 år uten barn» i SIFO-kalkulatoren.",
    },
    {
      heading: "Eksempel 2: par uten barn vs. familie med barn",
      paragraphs: [
        `Par uten barn: ca. ${formatSifoGuideKr(par)} kr per måned. Eksempelfamilien Nordmann med bensinbil, ett barn i barnehage og ett i AKS: ca. ${formatSifoGuideKr(familie)} kr per måned. Forskjellen er ca. ${formatSifoGuideKr(familieDiff)} kr per måned.`,
        "Valg i kalkulatoren: par 25–50 år, bensinbil, barnehage for ett barn og AKS/SFO for ett barn.",
      ],
    },
    {
      heading: "Slik leser du sammenligningen",
      bullets: [
        "Total per måned og per år for begge scenarioer",
        "Oppdeling i individposter, husholdningsposter og barnehage/AKS",
        "Forklaring av hvilke poster som endrer seg mest",
      ],
    },
    {
      heading: "Begrensninger",
      bullets: [
        "Bolig, strøm, forsikring, lån og ferie er ikke med",
        "Barnehage og AKS bruker eksempelpriser fra Oslo kommune",
        "Kollektivpriser er basert på Ruter i Oslo",
      ],
    },
  ],
  sources: [
    {
      label: "OsloMet: SIFOs referansebudsjett og kalkulator",
      url: "https://www.oslomet.no/om/sifo/referansebudsjettet",
    },
    {
      label: "OsloMet: referansebudsjett 2026",
      url: "https://www.oslomet.no/om/nyheter/sifo-sitt-referansebudsjett-2026-framleis-brei-prisauke",
    },
  ],
  relatedLinks: [
    { label: "SIFO-kalkulator", href: "/verktoy/sifo-kalkulator" },
    { label: "SIFO referansebudsjett 2026", href: "/guider/sifo-budsjett" },
  ],
};
