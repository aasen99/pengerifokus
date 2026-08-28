import type { GuideArticleContent } from "@/types/guide-article";

const RONTGEN_HREF = "/verktoy/okonomisk-rontgen";

export const forstaaOkonomiskHelse: GuideArticleContent = {
  slug: "forstaa-okonomisk-helse",
  intro:
    "Økonomisk helse handler om mer enn hvor mye du tjener. Det handler om buffer, gjeld, sparing og hvor robust du er når livet overrasker. Her får du en enkel innføring og et verktøy som gir deg en rask sjekk.",
  topCta: {
    heading: "Ta en rask økonomisjekk",
    description: "Ti spørsmål, score og tre konkrete prioriteringer.",
    buttonText: "Åpne Økonomisk røntgen",
    href: RONTGEN_HREF,
  },
  sections: [
    {
      heading: "Hva mener vi med økonomisk helse?",
      paragraphs: [
        "Økonomisk helse er hvor godt privatøkonomien din tåler hverdagen og uventede hendelser. Du trenger ikke være rik for å ha god økonomisk helse. Det handler om balanse mellom inntekt, utgifter, gjeld og sparing.",
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
    },
    {
      heading: "Hva scoren betyr",
      paragraphs: [
        "Poengsummen er en forenklet modell laget av Penger i Fokus. Den er ikke en kredittscore og brukes ikke av banker.",
        "En lav score betyr ofte at én eller to svakheter gjør deg sårbar, for eksempel lite buffer eller høye faste kostnader. En høy score betyr ikke at du kan slappe helt av.",
      ],
    },
    {
      heading: "Tre grep som ofte hjelper først",
      bullets: [
        "Skaff oversikt over hva som går ut hver måned",
        "Bygg en liten buffer, selv noen tusenlapper reduserer stress",
        "Prioriter dyr gjeld: [forbruksgjeld](/ordbok/forbruksgjeld) med høy effektiv rente bør ofte ned først",
      ],
    },
  ],
  relatedLinks: [
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
    { label: "Bufferkonto i ordboken", href: "/ordbok/bufferkonto" },
  ],
};
