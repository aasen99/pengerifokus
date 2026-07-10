import type { GuideArticleContent } from "@/types/guide-article";

export const inflasjonOgGjeld: GuideArticleContent = {
  slug: "inflasjon-og-gjeld",
  intro:
    "Inflasjon gjør at penger gradvis mister kjøpekraft. Det påvirker også hvordan gjeld føles over tid, selv om du fortsatt skylder banken det samme nominelle beløpet. Her forklarer vi sammenhengen, og hvordan du kan bruke lønnsvekst til å bli raskere gjeldfri.",
  sections: [
    {
      heading: "Nominell gjeld vs. reell verdi",
      paragraphs: [
        "Når du skylder 2 millioner kroner, er det fortsatt 2 millioner kroner du må betale tilbake: uansett inflasjon. Banken ettergir ikke gjelden.",
        "Men målt i dagens kjøpekraft kan det samme beløpet føles mindre om mange år. Ved 2,5 % årlig inflasjon tilsvarer 2 millioner om ti år omtrent 1,56 millioner i dagens pengeverdi.",
      ],
      tip: "Dette er en modell, ikke en garanti. Inflasjonen kan være høyere, lavere eller variere fra år til år.",
    },
    {
      heading: "Hva er realrente?",
      paragraphs: [
        "Realrenten er lånerenten etter at inflasjon er tatt med. Den viser omtrent hvor dyr gjeld er målt i reell kjøpekraft.",
        "Har du 5 % nominell rente og 2,5 % inflasjon, er realrenten omtrent 2,4 %, ikke 2,5 %. Det skyldes at prisvekst og rente påvirker hverandre (Fisher-ligningen).",
      ],
    },
    {
      heading: "Hvorfor kan boliglån føles lettere over tid?",
      paragraphs: [
        "Ved et annuitetslån betaler du samme terminbeløp hver måned, men andelen renter faller og avdragene øker etter hvert.",
        "Samtidig vil inflasjon og ofte lønnsvekst gjøre at terminbeløpet utgjør en mindre del av inntekten din over tid, selv om beløpet i kroner er det samme.",
      ],
      bullets: [
        "Du betaler fortsatt med faktiske kroner",
        "Fremtidige kroner har normalt lavere kjøpekraft",
        "Du betaler også ned hovedstolen, det bygger egenkapital",
        "Boligpris og renter er ikke garantert",
      ],
    },
    {
      heading: "Inflasjon og lønnsvekst er ikke det samme",
      paragraphs: [
        "Inflasjon svekker pengenes verdi. Lønnsvekst øker den nominelle inntekten din. Noen år følger de hverandre, andre år ikke.",
        "Hvis lønnen stiger raskere enn inflasjonen, kan du få mer å rutte med. Stiger prisene raskere enn lønnen, blir hverdagen strammere: uansett hva som skjer med gjeldens reelle verdi.",
      ],
    },
    {
      heading: "Bruk lønnsveksten til å betale raskere ned",
      paragraphs: [
        "Når lønnen øker, kan du velge å øke låneinnbetalingen tilsvarende. Da bruker du mer av fremtidig inntekt til å kutte hovedstolen, ikke bare til høyere forbruk.",
        "Dersom innbetalingen og lønnen øker med samme prosent, tar lånet omtrent samme andel av lønnen som før. Forskjellen er at du blir gjeldfri raskere og betaler mindre renter totalt.",
      ],
      tip: "Du trenger ikke øke forbruket hver gang lønnen stiger. Noen velger å «leve som før» og la det ekstra gå til gjeld eller sparing.",
    },
    {
      heading: "Prøv kalkulatoren Lånets reelle verdi",
      paragraphs: [
        "Hoveddelen viser hvordan inflasjon påvirker gjeldens kjøpekraft over tid, med graf og beregnet realrente.",
        "Valgfritt kan du se hva som skjer hvis du øker innbetalingen i takt med lønnsveksten. Da simuleres nedbetalingen måned for måned, og du ser hvor mye tid og renter du kan spare.",
      ],
      bullets: [
        "Enkel modus: restgjeld, år fremover, inflasjon og rente",
        "Tillegg: lønnsvekst, andel av veksten til lånet, nedbetalingstid",
        "Alt beregnes lokalt, ingen innlogging",
      ],
    },
    {
      heading: "Hva du ikke bør konkludere",
      bullets: [
        "At gjeld «føles lettere» betyr ikke at du bør ta mer gjeld",
        "Høy inflasjon kan også øke rentene: banken justerer ofte etter tiden",
        "Realrente og modeller er forenklinger, ikke prognoser",
        "Personlig rådgivning får du hos bank, rådgiver eller Nav, ikke fra en kalkulator",
      ],
    },
  ],
  relatedLinks: [
    { label: "Lånets reelle verdi", href: "/verktoy/lanets-reelle-verdi" },
    { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
    { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
    { label: "Realrente i ordboken", href: "/ordbok/realrente" },
  ],
};
