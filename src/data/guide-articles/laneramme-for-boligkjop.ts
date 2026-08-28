import type { GuideArticleContent } from "@/types/guide-article";

const CALCULATOR_HREF = "/verktoy/hvor-mye-kan-jeg-lane-kalkulator";

export const lanerammeForBoligkjop: GuideArticleContent = {
  slug: "laneramme-for-boligkjop",
  seoTitle: "Hvor mye kan du låne til bolig?",
  intro:
    "Banken bruker sjelden én enkel formel. For egen bolig er det to tommelfingerregler som oftest avgjør lånerammen: egenkapital multiplisert med ti, og lønn multiplisert med fem. Begge minus gjeld du allerede har.",
  shortAnswer:
    "Med 10 % egenkapital kan du grovt regne maks kjøpesum som egenkapital × 10 − gjeld, og maks lån som det laveste av det inntekten tillater (lønn × 5 − gjeld) og det egenkapitalen tillater.",
  topCta: {
    heading: "Regn med dine egne tall",
    description: "Se maks lån og kjøpesum, og hvilken regel som begrenser deg.",
    buttonText: "Åpne lånekalkulator",
    href: CALCULATOR_HREF,
    analyticsEvent: "laneramme_cta_top",
  },
  sections: [
    {
      heading: "De to reglene",
      paragraphs: [
        "Det er lett å tro at banken bare ser på egenkapital minus gjeld. Det er misvisende. [Egenkapital](/ordbok/egenkapital) og [gjeldsgrad](/ordbok/gjeldsgrad) vurderes hver for seg.",
        "For egen bolig med 10 % egenkapital kan du grovt regne slik:",
      ],
      bullets: [
        "Egenkapital × 10 − gjeld ≈ maks kjøpesum",
        "Lønn × 5 − gjeld ≈ maks nytt lån",
      ],
      tip: "Banken tar det laveste av reglene, og ser også på betjeningsevne og rentestress. Dette er veiledende, ikke en garanti.",
    },
    {
      heading: "Et enkelt eksempel",
      paragraphs: [
        "Du har 400 000 kr i egenkapital, 200 000 kr i gjeld og 600 000 kr i brutto lønn.",
      ],
      bullets: [
        "Egenkapital × 10 − gjeld = 3 800 000 kr i maks kjøpesum",
        "Lønn × 5 − gjeld = 2 800 000 kr i maks lån",
        "Da er det inntekten som begrenser. Maks lån blir 2 800 000 kr, og maks kjøpesum blir 3 200 000 kr med egenkapitalen du har.",
      ],
    },
    {
      heading: "Hold igjen egenkapital før boligkjøp",
      paragraphs: [
        "Når du nærmer deg boligkjøp, kan det være smart å la penger stå på konto som egenkapital i stedet for å betale ned billig gjeld.",
        "Hver krone i egenkapital kan gi opptil ti kroner i kjøpekraft gjennom egenkapital-regelen. Hver krone du betaler ned i gjeld, frigir bare én krone i lånerom gjennom lønn × 5-regelen.",
      ],
      tip: "Dette gjelder særlig billig gjeld som studielån. Dyr [forbruksgjeld](/ordbok/forbruksgjeld) bør du fortsatt prioritere å kvitte deg med.",
    },
    {
      heading: "Det banken også ser på",
      bullets: [
        "Betjeningsevne om renten stiger",
        "Rentestress med høyere rente enn i dag",
        "Type gjeld: boliglån, studielån og kredittkort veies ulikt",
        "BSU og bankgaranti kan gi mer rom for unge førstegangskjøpere",
      ],
      paragraphs: [
        "Bruk [kalkulatoren](/verktoy/hvor-mye-kan-jeg-lane-kalkulator) med dine tall, og snakk med banken når du er nær kjøp.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Hvor mye kan jeg låne-kalkulator", href: CALCULATOR_HREF },
    { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
    { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
    { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
    { label: "Gjeldsgrad i ordboken", href: "/ordbok/gjeldsgrad" },
  ],
};
