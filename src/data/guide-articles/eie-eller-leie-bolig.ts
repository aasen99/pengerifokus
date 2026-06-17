import type { GuideArticleContent } from "@/types/guide-article";

export const eieEllerLeieBolig: GuideArticleContent = {
  slug: "eie-eller-leie-bolig",
  readTimeMinutes: 7,
  intro:
    "Skal du kjøpe eller leie? Det er et av de største økonomiske spørsmålene mange stiller. Svaret handler sjelden bare om månedlig husleie mot terminbeløp – tid, kjøpskostnader og alternativ avkastning spiller minst like stor rolle.",
  sections: [
    {
      heading: "Det viktigste spørsmålet: Hvor lenge skal du bo der?",
      paragraphs: [
        "Kjøp og salg av bolig koster penger. Dokumentavgift, megler, flytting og andre omkostninger gjør at eie ofte lønner seg økonomisk først hvis du bor lenge nok på ett sted.",
        "Skal du bo et sted i to til tre år, er leie ofte rimeligere – selv om månedskostnaden ved kjøp ser lav ut. Skal du bo i ti år eller mer, kan eierskap gi bedre økonomisk utfall, særlig hvis du bygger egenkapital.",
      ],
      tip: "Tenk på tidshorisonten før du sammenligner månedlig pris. Break-even – når eie «går forbi» leie – er ofte det mest nyttige tallet.",
    },
    {
      heading: "Ikke sammenlign bare terminbeløp og husleie",
      bullets: [
        "Eier: felleskostnader, vedlikehold, forsikring og strøm",
        "Kjøper: dokumentavgift, tinglysing og andre engangskostnader",
        "Selger: megler og salgskostnader senere",
        "Leier: depositum, men frihet til å flytte lettere",
        "Leier: kan investere egenkapital og kjøpskostnader i stedet for å binde dem i bolig",
      ],
    },
    {
      heading: "Avdrag er sparing – ikke ren kostnad",
      paragraphs: [
        "Når du betaler avdrag på boliglånet, reduserer du gjelden og bygger egenkapital i boligen. Det er ikke penger som forsvinner på samme måte som renter eller husleie.",
        "Derfor er det misvisende å si at «eie koster 25 000 i måneden» hvis mesteparten er avdrag. Den delen tilhører deg – i form av eierskap.",
      ],
    },
    {
      heading: "Alternativkostnaden av egenkapital",
      paragraphs: [
        "Egenkapitalen du legger i bolig, kunne også vært investert i fond eller annet. Hvis boligen stiger lite og fondene gjør det bra, kan leie pluss sparing teoretisk slå eie – og omvendt.",
        "Ingen vet fremtiden. Poenget er å være bevisst på at egenkapital har en alternativ verdi, ikke bare at den «forsvinner» ved kjøp.",
      ],
    },
    {
      heading: "Norske særtrekk du bør kjenne til",
      bullets: [
        "Dokumentavgift på 2,5 % ved kjøp av selveierbolig – borettslag har normalt ikke dette",
        "Fellesgjeld i borettslag – du finansierer mer enn bare kjøpesummen på leiligheten",
        "BSU kan styrke egenkapitalen for unge før første kjøp",
        "Boligpriser og renter varierer – bruk egne antagelser, ikke bare «det har alltid lønnet seg»",
      ],
    },
    {
      heading: "Prøv eie vs. leie-kalkulatoren",
      paragraphs: [
        "Kalkulatoren sammenligner nettoformue over tid: hva du sitter igjen med ved eie mot å leie og investere differansen. Den beregner måned for måned med lån, inflasjon, prisvekst og valgfrie antagelser.",
        "Start enkelt med kjøpesum, egenkapital, rente og husleie. Utvid med vedlikehold, salgskostnader og lønnsvekst i avansert modus hvis du vil gå dypere.",
      ],
      tip: "Kalkulatoren gir estimater basert på det du legger inn. Den kan ikke forutsi boligmarkedet – bruk den til å forstå hva som driver resultatet.",
    },
    {
      heading: "Økonomi er ikke hele svaret",
      paragraphs: [
        "Fleksibilitet, livssituasjon, jobb og trivsel teller også. Kanskje du vil bo billigere nå for å spare, eller kanskje eierskap gir trygghet som er verdt noe for deg.",
        "Et godt økonomisk valg du ikke trives med, er sjelden et godt valg totalt sett.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Eie vs. leie-kalkulator", href: "/verktoy/eie-leie-kalkulator" },
    { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
    { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
  ],
};
