import type { GuideArticleContent } from "@/types/guide-article";

export const forstaaOkonomiskHelse: GuideArticleContent = {
  slug: "forstaa-okonomisk-helse",
  intro:
    "Økonomisk helse handler om mer enn hvor mye du tjener. Det handler om buffer, gjeld, sparing og hvor robust du er når livet overrasker. Her får du en enkel innføring, og et verktøy som gir deg en rask temperaturmåling.",
  sections: [
    {
      heading: "Hva mener vi med økonomisk helse?",
      paragraphs: [
        "Økonomisk helse er hvor godt privatøkonomien din tåler hverdagen og uventede hendelser. Du trenger ikke være rik for å ha god økonomisk helse. Det handler om balanse mellom inntekt, utgifter, gjeld og sparing.",
        "En person med middels lønn og god buffer kan være mer robust enn en med høy inntekt, høy gjeld og ingen oversikt.",
      ],
    },
    {
      heading: "Fem områder som teller",
      bullets: [
        "Buffer: har du penger til uforutsette utgifter?",
        "Gjeld: er gjelden håndterbar, spesielt dyr forbruksgjeld?",
        "Faste kostnader: tar husleie, lån og abonnementer for stor del av inntekten?",
        "Sparing: bygger du noe for fremtiden, jevnt over tid?",
        "Økonomisk trygghet: hvor avhengig er du av én inntekt, og har du oversikt?",
      ],
      tip: "Du trenger ikke score perfekt på alt. De fleste har ett eller to områder som trenger mer oppmerksomhet, og det er helt normalt.",
    },
    {
      heading: "Ta en rask økonomisjekk",
      paragraphs: [
        "Verktøyet Økonomisk røntgen stiller deg 10 enkle spørsmål og gir en score fra 0 til 100, med delresultater og tre konkrete prioriteringer.",
        "Det tar omtrent to minutter, krever ingen innlogging, og alt beregnes lokalt i nettleseren. Resultatet er en forenklet temperaturmåling, ikke personlig rådgivning.",
      ],
      bullets: [
        "Svar ærlig, men grovt. Du trenger ikke eksakte tall",
        "Se hvilke tre områder som bør prioriteres først",
        "Ta testen på nytt senere for å se om du har beveget deg",
      ],
    },
    {
      heading: "Hva scoren betyr, og hva den ikke betyr",
      paragraphs: [
        "En lav score betyr ikke at økonomien din er «ødelagt». Ofte handler det om én eller to svakheter som gjør deg sårbar, for eksempel lite buffer eller høye faste kostnader.",
        "En høy score betyr ikke at du kan slappe helt av. Renter, jobbsituasjon og livshendelser kan endre bildet raskt.",
      ],
      tip: "Bruk resultatet som et utgangspunkt for samtale med deg selv, ikke som en dom over deg som person.",
    },
    {
      heading: "Tre grep som ofte hjelper først",
      bullets: [
        "Skaff oversikt: vet du omtrent hva som går ut hver måned?",
        "Bygg en liten buffer, selv noen tusenlapper reduserer stress",
        "Prioriter dyr gjeld: forbruksgjeld med høy rente bør ofte ned først",
      ],
    },
    {
      heading: "Neste steg",
      paragraphs: [
        "Når du vet hvor du står, blir det lettere å velge hva du skal gjøre videre. Kanskje det handler om å kutte faste kostnader, starte sparing eller lage en nedbetalingsplan.",
        "Små, jevne grep slår ofte store, urealistiske løfter.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Økonomisk røntgen", href: "/verktoy/okonomisk-rontgen" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
    { label: "Bufferkonto i ordboken", href: "/ordbok/bufferkonto" },
  ],
};
