import type { GuideArticleContent } from "@/types/guide-article";

const CALCULATOR_HREF = "/verktoy/hvor-mye-kan-jeg-lane-kalkulator";

export const lanerammeForBoligkjop: GuideArticleContent = {
  slug: "laneramme-for-boligkjop",
  seoTitle: "Hvor mye kan du låne til bolig?",
  intro:
    "Hvor mye du kan kjøpe bolig for, avgjøres vanligvis av tre ting: inntekten din, gjelden du allerede har og hvor mye egenkapital du har. Banken ser også på om du tåler høyere rente og vanlige levekostnader.",
  shortAnswer:
    "Samlet gjeld kan normalt ikke være høyere enn fem ganger brutto årsinntekt. Boliglånet kan normalt dekke inntil 90 prosent av boligverdien. Banken kan likevel gi deg mindre hvis månedsøkonomien blir for stram.",
  topCta: {
    heading: "Regn med dine egne tall",
    description:
      "Se hva som begrenser deg: inntekt, gjeld, egenkapital eller månedlig betalingsevne.",
    buttonText: "Åpne lånekalkulatoren",
    href: CALCULATOR_HREF,
    analyticsEvent: "laneramme_cta_top",
  },
  sections: [
    {
      heading: "Inntekten setter en grense for samlet gjeld",
      paragraphs: [
        "Samlet gjeld kan som hovedregel ikke overstige fem ganger brutto årsinntekt. Her teller også gjeld du allerede har.",
      ],
      bullets: [
        "Brutto årsinntekt: 600 000 kr",
        "Maksimal samlet gjeld: 3 000 000 kr",
        "Studielån og annen gjeld: 200 000 kr",
        "Mulig nytt boliglån etter femgangersregelen: 2 800 000 kr",
      ],
      tip: "En ubrukt kredittramme kan også påvirke bankens vurdering. Banken skal legge full bruk av samlede kredittrammer til grunn når den vurderer betjeningsevnen.",
    },
    {
      heading: "Egenkapitalen setter en annen grense",
      paragraphs: [
        "Et vanlig boliglån kan normalt dekke inntil 90 prosent av boligverdien. Det betyr at du vanligvis må ha minst 10 prosent [egenkapital](/ordbok/egenkapital).",
        "Har du 400 000 kroner i tilgjengelig egenkapital, kan det isolert sett være nok til 10 prosent av en bolig til 4 millioner kroner.",
        "Kjøpskostnader kommer i tillegg. For en selveier må du normalt også regne med dokumentavgift og tinglysingsgebyrer. Derfor kan ikke nødvendigvis hele egenkapitalen brukes som 10 prosent av kjøpesummen.",
      ],
    },
    {
      heading: "Banken bruker grensen som gir lavest kjøpesum",
      paragraphs: [
        "Med 600 000 kroner i lønn, 200 000 kroner i annen gjeld og 400 000 kroner i egenkapital får vi:",
      ],
      bullets: [
        "Mulig nytt boliglån: 2 800 000 kr",
        "Egenkapital: 400 000 kr",
        "Mulig kjøpesum ut fra inntekt og gjeld: 3 200 000 kr",
        "Mulig kjøpesum ut fra 10 prosent egenkapital: 4 000 000 kr før kjøpskostnader",
      ],
      tip: "Her er det inntekten og gjelden som begrenser. Grov maksimal kjøpesum blir 3,2 millioner kroner før kjøpskostnader. Banken kan fortsatt sette en lavere grense.",
    },
    {
      heading: "Banken ser også på månedsøkonomien",
      paragraphs: [
        "Fem ganger inntekt er en øvre grense, ikke et løfte. Banken skal kontrollere at du fortsatt har penger til normale utgifter når renten settes til minst 7 prosent eller 3 prosentpoeng over dagens nivå.",
      ],
      bullets: [
        "Inntekt etter skatt",
        "Renter og avdrag på all gjeld",
        "Barn og andre faste utgifter",
        "Kredittkort og kredittrammer",
        "Fellesgjeld",
        "Om inntekten er stabil og dokumenterbar",
      ],
    },
    {
      heading: "Bør du betale ned gjeld eller beholde egenkapitalen?",
      paragraphs: [
        "Det kommer an på hva som begrenser deg.",
        "Mangler du egenkapital, kan det være viktig å beholde penger på konto frem mot boligkjøpet. Begrenses du av samlet gjeld eller høye månedsutgifter, kan nedbetaling hjelpe. Dyr [forbruksgjeld](/ordbok/forbruksgjeld) bør normalt ryddes bort før boligkjøpet. Billig gjeld som studielån må vurderes sammen med banken.",
        "Betaler du 100 000 kroner av gjelden med 100 000 kroner fra egenkapitalen, får du omtrent 100 000 kroner mer i lånerom, men samtidig 100 000 kroner mindre å legge inn i boligen. Når inntektsgrensen er problemet, kan maksimal kjøpesum derfor bli omtrent uendret. Betjeningsevnen kan likevel bli bedre.",
      ],
    },
  ],
  sources: [
    {
      label: "Finansdepartementet: veiledning til utlånsforskriften",
      url: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/finansmarkedene/utlansforskriften2/id3077676/",
    },
  ],
  conclusion:
    "Regn først ut fem ganger inntekt og trekk fra annen gjeld. Legg deretter til egenkapitalen du faktisk kan bruke etter kjøpskostnader. Til slutt må banken kontrollere at du tåler renter og vanlige utgifter.",
  bottomCta: {
    heading: "Regn ut lånerammen",
    description: "Se maks boliglån og kjøpesum med dine egne tall.",
    buttonText: "Åpne lånekalkulatoren",
    href: CALCULATOR_HREF,
    analyticsEvent: "laneramme_cta_bottom",
  },
  relatedLinks: [
    { label: "Hvor mye kan jeg låne-kalkulator", href: CALCULATOR_HREF },
    { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
    { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
    { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
    { label: "Gjeldsgrad i ordboken", href: "/ordbok/gjeldsgrad" },
  ],
};
