import type { GuideArticleContent } from "@/types/guide-article";

const CALCULATOR_HREF = "/verktoy/hvor-mye-kan-jeg-lane-kalkulator";

export const lanerammeForBoligkjop: GuideArticleContent = {
  slug: "laneramme-for-boligkjop",
  seoTitle: "EK × 10 og lønn × 5: slik regner banken låneramme",
  intro:
    "Før boligkjøp lurer mange på hvor mye de kan låne. Banken ser sjelden på «EK − gjeld» som én enkel formel. I praksis er det to tommelfingerregler som teller mest: egenkapital multiplisert med ti, og brutto lønn multiplisert med fem – begge minus gjeld du allerede har.",
  shortAnswer:
    "Med 10 % [egenkapital](/ordbok/egenkapital) kan du grovt regne maks kjøpesum som **EK × 10 − gjeld**, og maks nytt lån som det laveste av **EK × 9 − gjeld** og **lønn × 5 − gjeld**. Derfor kan det lønne seg å holde penger på konto som egenkapital når du nærmer deg boligkjøp, i stedet for å betale ned billig gjeld.",
  topCta: {
    heading: "Regn med dine egne tall",
    description:
      "Kalkulatoren viser begge reglene side om side og hvilken som begrenser deg.",
    buttonText: "Åpne hvor mye kan jeg låne-kalkulator",
    href: CALCULATOR_HREF,
    analyticsEvent: "laneramme_cta_top",
  },
  sections: [
    {
      heading: "To regler, ikke EK − gjeld",
      paragraphs: [
        "Det er lett å tro at banken bare ser på nettoformue: egenkapital minus gjeld. Det er misvisende. [Gjeldsgrad](/ordbok/gjeldsgrad) og [egenkapital](/ordbok/egenkapital) vurderes hver for seg.",
        "For egen bolig med 10 % egenkapital er de to vanligste tommelfingerreglene:",
      ],
      bullets: [
        "**EK × 10 − gjeld** ≈ maks kjøpesum ut fra egenkapitalen du har",
        "**Lønn × 5 − gjeld** ≈ maks nytt lån ut fra inntekten",
      ],
      tip: "Banken tar det laveste av reglene, og vurderer i tillegg betjeningsevne og rentestress. Reglene er veiledende, ikke garanti.",
    },
    {
      heading: "Hva betyr EK × 10?",
      paragraphs: [
        "Trenger du minst 10 % egenkapital, kan 400 000 kr i egenkapital i utgangspunktet støtte et kjøp på om lag 4 000 000 kr. Da kan lånet bli om lag 3 600 000 kr.",
        "Har du allerede gjeld, trekkes den fra i begge ledd. Med 200 000 kr i studielån blir utgangspunktet **400 000 × 10 − 200 000 = 3 800 000 kr** i maks kjøpesum, ikke 4 000 000 kr.",
      ],
    },
    {
      heading: "Hva betyr lønn × 5?",
      paragraphs: [
        "Finanstilsynet har veiledende tak på total gjeld på omtrent fem ganger brutto årsinntekt. Tjener husstanden 600 000 kr brutto, er utgangspunktet 3 000 000 kr i total gjeld.",
        "Har du allerede 500 000 kr i gjeld, er rommet for nytt lån **600 000 × 5 − 500 000 = 2 500 000 kr**. Lønn × 5 sier altså noe om hvor mye du kan låne, ikke hvor dyr boligen kan være alene.",
      ],
    },
    {
      heading: "Hold igjen egenkapital før boligkjøp",
      paragraphs: [
        "Når du nærmer deg boligkjøp, kan det være smart å la noe av pengene stå på konto som egenkapital i stedet for å betale ned gjeld.",
        "Grunnen er at hver krone i egenkapital kan gi opptil ti kroner i kjøpekraft gjennom EK × 10-regelen. Hver krone du betaler ned i gjeld, frigir bare én krone i låneramme gjennom lønn × 5-regelen.",
      ],
      bullets: [
        "100 000 kr ekstra på konto som EK kan øke maks kjøpesum med om lag 1 000 000 kr",
        "100 000 kr ekstra nedbetaling reduserer gjeld med 100 000 kr og gir omtrent det samme i ekstra lånerom",
        "Derfor slår ekstra egenkapital ofte hardest når EK × 10 er det som begrenser",
      ],
      tip: "Dette gjelder særlig billig gjeld som studielån. Dyr [forbruksgjeld](/ordbok/forbruksgjeld) bør du fortsatt prioritere å kvitte deg med.",
    },
    {
      heading: "Regneeksempel",
      paragraphs: [
        "Du har 300 000 kr på konto, 500 000 kr i gjeld og 600 000 kr i brutto lønn. Du vurderer å bruke 100 000 kr ekstra på nedbetaling.",
      ],
      bullets: [
        "**Beholde 100 000 kr som EK:** 400 000 × 10 − 500 000 = 3 500 000 kr i maks kjøpesum. Lønn × 5 − gjeld = 2 500 000 kr i maks lån.",
        "**Betale ned 100 000 kr:** 300 000 × 10 − 400 000 = 2 600 000 kr i maks kjøpesum. Lønn × 5 − gjeld = 2 600 000 kr i maks lån.",
        "I dette eksempelet er det lønn × 5 som begrenser når du beholder pengene, men maks kjøpesum er fortsatt høyere fordi EK × 10 stiger mer enn gjeld faller.",
      ],
    },
    {
      heading: "Det banken også ser på",
      bullets: [
        "Betjeningsevne: tåler du renta om den stiger?",
        "Rentestress: ofte testet med høyere rente enn dagens nivå",
        "Type gjeld: boliglån, studielån og kredittkort veies ulikt",
        "BSU og bankgaranti kan gi mer rom for unge førstegangskjøpere",
      ],
      paragraphs: [
        "Tommelfingerreglene er et utgangspunkt. Bruk [kalkulatoren](/verktoy/hvor-mye-kan-jeg-lane-kalkulator) med dine tall, og snakk med banken når du er nær kjøp.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Hvor mye kan jeg låne-kalkulator", href: CALCULATOR_HREF },
    { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
    { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
    { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
    { label: "Gjeldsgrad i ordboken", href: "/ordbok/gjeldsgrad" },
    { label: "Emne: bolig", href: "/emner/bolig" },
  ],
};
