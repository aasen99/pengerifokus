import type { GuideArticleContent } from "@/types/guide-article";

const SIFO_CALCULATOR_HREF = "/verktoy/sifo-kalkulator";

export const sifoBudsjett: GuideArticleContent = {
  slug: "sifo-budsjett",
  intro:
    "SIFOs referansebudsjett viser et nøkternt nivå for vanlige forbruksutgifter i norske husholdninger. Det er et nyttig sammenligningsgrunnlag, men ikke et komplett [budsjett](/ordbok/budsjett) for husholdningen.",
  shortAnswer:
    "SIFO viser et nøkternt nivå for vanlige forbruksutgifter. Bolig, strøm, ferie, sparing og flere andre store utgifter er ikke med. Bruk derfor SIFO som sammenligning, ikke som et komplett budsjett.",
  topCta: {
    heading: "Regn ut SIFO-nivå for din husholdning",
    description: "Se månedlige og årlige beløp fra SIFO 2026-datasettet.",
    buttonText: "Åpne SIFO-kalkulatoren",
    href: SIFO_CALCULATOR_HREF,
  },
  sections: [
    {
      heading: "Hva er ikke med?",
      paragraphs: [
        "Referansebudsjettet er et forbruksbudsjett, ikke et fullt livsopphold. De største postene mange sliter med i hverdagen, bolig og strøm, ligger utenfor.",
      ],
      bullets: [
        "Bolig: husleie, renter, avdrag, [felleskostnader](/ordbok/felleskostnader) og vedlikehold",
        "Strøm og andre faste boutgifter",
        "Forsikring, lån, sparing og investering",
        "Alkohol, tobakk, feriereiser og kostbare hobbyer",
      ],
    },
    {
      heading: "Hva er SIFO og referansebudsjettet?",
      paragraphs: [
        "SIFO (Forbruksforskningsinstituttet) er en del av OsloMet og forsker på forbruk og levekår. Referansebudsjettet er et anslag på nødvendige forbruksutgifter for ulike husholdninger, bygget på konkrete varekurver og priser.",
      ],
    },
    {
      heading: "Slik bruker du tallene",
      bullets: [
        "1. Regn ut SIFO-nivå for din husholdning i kalkulatoren",
        "2. Legg til bolig, strøm og andre faste poster du faktisk har",
        "3. Sammenlign totalt og per kategori med egne utgifter",
        "4. Tilpass barnehage, AKS og kollektivpriser til din kommune",
      ],
      tip: "Kalkulatoren viser dataversjon SIFO 2026, priser fra februar 2026.",
    },
    {
      heading: "Begrensninger",
      bullets: [
        "Kollektivpriser er basert på Ruter i Oslo",
        "Barnehage og AKS bruker eksempelpriser fra Oslo kommune",
        "Tallene er normer, ikke det du «bør» bruke hvis prioritetene dine er annerledes",
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
    { label: "SIFO-kalkulator", href: SIFO_CALCULATOR_HREF },
    {
      label: "Sammenlign to husholdninger",
      href: "/guider/sifo-sammenligne-husholdninger",
    },
    { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
  ],
};
