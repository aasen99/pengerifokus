import type { GuideArticleContent } from "@/types/guide-article";

const CALCULATOR_HREF = "/verktoy/sparekalkulator";

export const funfacts: GuideArticleContent = {
  slug: "funfacts",
  seoTitle: "10 overraskende fakta om penger",
  intro:
    "Små beløp kan bli store, og penger har en merkelig historie. Her er ti fakta som er enkle å kontrollere og lette å huske.",
  sections: [
    {
      heading: "1. 1 000 kroner i måneden er 240 000 kroner på 20 år",
      paragraphs: [
        "Det er bare innbetalingene. Med 6 prosent årlig avkastning ville beløpet blitt omtrent 462 000 kroner før skatt og kostnader. Avkastning er aldri garantert, men eksemplet viser hvor mye tiden betyr.",
      ],
    },
    {
      heading: "2. De første fem spareårene kan bli de mest verdifulle",
      paragraphs: [
        "Sparer du 1 000 kroner hver måned i 40 år med 6 prosent årlig avkastning, blir sluttsummen omtrent 1,99 millioner kroner. Starter du fem år senere, blir den omtrent 1,42 millioner. Du har bare satt inn 60 000 kroner mindre, men forskjellen til slutt er rundt 567 000 kroner.",
      ],
    },
    {
      heading: "3. 200 kroner ekstra i måneden kan nærme seg 400 000 kroner",
      paragraphs: [
        "200 kroner i måneden i 40 år er 96 000 kroner i egne innbetalinger. Med 6 prosent årlig avkastning blir den beregnede sluttsummen omtrent 398 000 kroner før skatt og kostnader.",
      ],
    },
    {
      heading: "4. En kaffevane kan koste over 10 000 kroner i året",
      paragraphs: [
        "En kaffe til 45 kroner på 230 arbeidsdager koster 10 350 kroner. Poenget er ikke at du må slutte å kjøpe kaffe. Poenget er at små, gjentatte kjøp bør regnes som årsbeløp før du bestemmer hva de er verdt for deg.",
      ],
    },
    {
      heading: "5. Ett prosentpoeng på et stort lån er mye penger",
      paragraphs: [
        "På 3 millioner kroner i gjeld tilsvarer ett prosentpoeng omtrent 30 000 kroner i renter det første året, før skattevirkning og nedbetaling. Små renteforskjeller betyr derfor mer på store lån enn de gjør på små kontoer.",
      ],
    },
    {
      heading: "6. En halv prosent i årlig fondskostnad kan koste mye over tid",
      paragraphs: [
        "Med 2 000 kroner i månedlig sparing i 30 år blir forskjellen mellom 6 og 5,5 prosent årlig netto vekst omtrent 182 000 kroner. Dette er et regneeksempel, ikke en prognose, men det viser hvorfor kostnader betyr mer jo lenger du sparer.",
      ],
    },
    {
      heading: "7. Norge har brukt kroner siden 1875",
      paragraphs: [
        "Norge sluttet seg til den skandinaviske myntunionen i 1875. Kroner ble felles pengeenhet i Norge, Sverige og Danmark.",
      ],
    },
    {
      heading: "8. Norges første sparebank åpnet i 1822",
      paragraphs: [
        "Christiania Sparebank ble etablert 29. juni 1822. Tanken var å gi vanlige mennesker et trygt sted å spare.",
      ],
    },
    {
      heading: "9. De første pengene kom inn i Oljefondet i 1996",
      paragraphs: [
        "Det første innskuddet var på nesten 2 milliarder kroner. Pengene ble satt inn 30. mai 1996.",
      ],
    },
    {
      heading: "10. Norges første papirpenger ble ingen suksess",
      paragraphs: [
        "Jørgen thor Møhlen fikk tillatelse til å utstede papirpenger i 1695. Sedlene ble ikke godtatt som betalingsmiddel slik planen var.",
      ],
    },
  ],
  sources: [
    {
      label: "Norges Bank: kronen innføres 1875",
      url: "https://www.norges-bank.no/tema/Om-Norges-Bank/historie/norges-banks-historie/e3-artikkel2/1873-/1875-utdyping-om-smu/",
    },
    {
      label: "Sparebankforeningen: sparebankenes historie",
      url: "https://www.sparebankforeningen.no/om-oss/sparebankene-styrker-samfunnet/",
    },
    {
      label: "NBIM: Oljefondet 25 år",
      url: "https://www.nbim.no/no/nyheter-og-innsikt/presserom/pressemeldinger/2021/statens-pensjonsfond-utland-25-ar/",
    },
    {
      label: "Norges Bank: thor Møhlens sedler",
      url: "https://www.norges-bank.no/tema/Om-Norges-Bank/historie/norges-banks-historie/Epoke1-teaser/1736-/1736-utdyping-thor-mohlen-sedlene/",
    },
  ],
  conclusion:
    "Sparekalkulatoren viser hvor mye månedlig sparing, tid og forventet avkastning kan bety. Husk at beregnet avkastning ikke er garantert.",
  bottomCta: {
    heading: "Prøv med dine egne tall",
    description: "Se hva månedlig sparing kan bli over tid.",
    buttonText: "Åpne sparekalkulatoren",
    href: CALCULATOR_HREF,
    analyticsEvent: "funfacts_cta_bottom",
  },
  relatedLinks: [
    { label: "Sparekalkulator", href: CALCULATOR_HREF },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
  ],
};
