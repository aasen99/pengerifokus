import type { GuideArticleContent } from "@/types/guide-article";

export const betalNedDyrGjeld: GuideArticleContent = {
  slug: "betal-ned-dyr-gjeld",
  intro:
    "Dyr gjeld koster deg mer jo lenger den står. Med en enkel plan kan du betale ned raskere, uten å sette livet på vent.",
  sections: [
    {
      heading: "Hva er «dyr» gjeld?",
      paragraphs: [
        "Dyr gjeld er lån med høy [effektiv rente](/ordbok/effektiv-rente), ikke bare høy nominell rente. Kredittkort, forbrukslån og delbetaling uten rentefri periode er vanlige eksempler.",
        "Boliglån har ofte lavere rente. I de fleste tilfeller bør du prioritere dyr [forbruksgjeld](/ordbok/forbruksgjeld) først.",
      ],
    },
    {
      heading: "En enkel plan",
      bullets: [
        "1. Skaff full oversikt over restgjeld, effektiv rente og minstebeløp",
        "2. Betal minstebeløpet på alle lån",
        "3. Bygg en liten buffer som dekker en vanlig uventet regning",
        "4. Betal alt ekstra på lånet med høyest effektiv rente",
        "5. Når lånet er borte, flytt hele beløpet videre til neste lån",
      ],
      tip: "For noen med svært dyr gjeld kan en mindre startbuffer være mer fornuftig enn å vente med nedbetaling til du har en full måneds utgifter på konto.",
    },
    {
      heading: "Lavine vs. snøball",
      paragraphs: [
        "Lavinemetoden er billigst: betal ekstra på lånet med høyest effektiv rente først. Snøballmetoden, minste gjeld først, kan fungere som motivasjon, men koster ofte mer i renter.",
      ],
    },
    {
      heading: "Refinansiering",
      paragraphs: [
        "[Refinansiering](/ordbok/refinansiering) kan gi lavere effektiv rente og én faktura, men bare hvis du faktisk endrer adferd.",
      ],
      bullets: [
        "Lavere effektiv rente, inkludert gebyrer",
        "Ikke forleng løpetid bare for å få lavere månedlig beløp",
        "Steng gammel kreditt når den er betalt",
      ],
    },
    {
      heading: "Oppsummert",
      paragraphs: [
        "Betal minimum på alt, og legg ekstra der effektiv rente er høyest. Vurder å bruke hele eller deler av skatteoppgjør, bonus eller uventet inntekt på gjeld.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Gjeldsbremsen", href: "/verktoy/gjeldsbremsen" },
    { label: "Nedbetalingskalkulator", href: "/verktoy/nedbetalingskalkulator" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Effektiv rente i ordboken", href: "/ordbok/effektiv-rente" },
  ],
};
