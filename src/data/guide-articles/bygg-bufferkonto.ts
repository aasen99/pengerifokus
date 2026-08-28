import type { GuideArticleContent } from "@/types/guide-article";

export const byggBufferkonto: GuideArticleContent = {
  slug: "bygg-bufferkonto",
  intro:
    "En bufferkonto er økonomiens airbag. Den gjør at uforutsette regninger ikke blir til dyr gjeld, og gir deg ro i hverdagen.",
  sections: [
    {
      heading: "Hva er en bufferkonto?",
      paragraphs: [
        "[Bufferkontoen](/ordbok/bufferkonto) er penger du setter til side for det du ikke planlegger: bil som ryker, tannlege, plutselig jobbtap eller en ødelagt vaskemaskin.",
        "Pengene bør være lett tilgjengelige på en vanlig sparekonto, ikke låst i fond eller [BSU](/ordbok/bsu).",
      ],
    },
    {
      heading: "Et trinnvis mål",
      paragraphs: [
        "Det finnes ingen universell riktig buffer. Beløpene under er eksempler. Velg et mål som passer egen risiko.",
      ],
      bullets: [
        "Første mål: nok til den vanligste uventede regningen, for eksempel 5 000 til 15 000 kroner",
        "Neste mål: omtrent én måneds nødvendige utgifter",
        "Større sikkerhet: tre til seks måneder hvis inntekten er ustabil eller konsekvensene av inntektsbortfall er store",
      ],
      tip: "Bufferbehovet øker med bolig, bil, barn, ustabil inntekt og få forsikringer. Det kan være lavere med stabil inntekt, lave faste kostnader og god forsikringsdekning.",
    },
    {
      heading: "Skill buffer fra planlagte utgifter",
      paragraphs: [
        "Bilservice, ferie og årlig forsikring bør ha egne kontoer hvis kostnaden er kjent. Bufferen er for det du ikke vet når kommer.",
      ],
    },
    {
      heading: "Slik bygger du den",
      bullets: [
        "1. Finn månedlige utgifter",
        "2. Sett et realistisk mål",
        "3. Åpne en egen sparekonto",
        "4. Sett opp fast trekk på lønningsdag",
        "5. Fyll på igjen etter bruk",
      ],
    },
  ],
  relatedLinks: [
    { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
    { label: "Bufferkonto i ordboken", href: "/ordbok/bufferkonto" },
  ],
};
