import type { GuideArticleContent } from "@/types/guide-article";

const CALCULATOR_HREF = "/verktoy/bonuskalkulator";

export const velgRiktigKredittkort: GuideArticleContent = {
  slug: "velg-riktig-kredittkort",
  intro:
    "Gitt at du skal ha kredittkort, handler valget om forbruk, gebyrer og om du faktisk betaler hele fakturaen. Detaljer om enkelte kort finner du under Kredittkortfordeler.",
  sections: [
    {
      heading: "1. Betaler du alltid hele fakturaen?",
      paragraphs: [
        "Hvis nei, er bonus lite viktig. Vurder debetkort eller et kort med lavere effektiv rente. Bonus hjelper bare når du unngår renter ved å betale hele fakturaen ved forfall.",
      ],
    },
    {
      heading: "2. Hva bruker du penger på?",
      paragraphs: [
        "Velg etter faktiske kjøp de siste månedene, ikke ønsket livsstil. Dagligvarer, reise, drivstoff og netthandel gir ulike korttyper mening.",
      ],
    },
    {
      heading: "3. Hva koster kortet?",
      paragraphs: [
        "Regn med årsavgift, valutapåslag og kontantuttaksgebyr som separate kostnader. De kan gjøre et «gratis» kort dyrt hvis du reiser eller tar ut kontanter ofte.",
      ],
    },
    {
      heading: "4. Hva er bonusen verdt for deg?",
      paragraphs: [
        "Poeng du aldri bruker, er verdt null. Et kort med 1 200 kroner i årsavgift og 1 prosent bonus krever 120 000 kroner i kjøp bare for å tjene inn avgiften.",
      ],
      tip: "Bruk bonuskalkulatoren hvis du vil teste om kortet går i pluss med ditt forbruk.",
    },
    {
      heading: "5. Gjør kortet økonomien enklere?",
      paragraphs: [
        "Flere kort gir bare verdi hvis du klarer å følge med på dem. For mange er ett enkelt kort med forutsigbare vilkår bedre enn å optimalisere hvert kjøp.",
      ],
    },
    {
      heading: "Oppsummert",
      paragraphs: [
        "Hele fakturaen ved forfall er grunnvilkåret. Deretter ser du på gebyrer, faktisk forbruk og om bonusen du får faktisk brukes.",
      ],
    },
  ],
  bottomCta: {
    heading: "Test om kortet går i pluss",
    description: "Legg inn årsavgift, forventet forbruk og bonus.",
    buttonText: "Åpne bonuskalkulatoren",
    href: CALCULATOR_HREF,
  },
  relatedLinks: [
    { label: "Kredittkort eller debetkort", href: "/guider/kredittkort-eller-debetkort" },
    { label: "Kredittkortfordeler", href: "/fordeler/kredittkortfordeler" },
    { label: "Bonuskalkulator", href: CALCULATOR_HREF },
  ],
};
