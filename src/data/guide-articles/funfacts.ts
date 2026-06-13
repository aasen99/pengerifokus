import type { GuideArticleContent } from "@/types/guide-article";

export const funfacts: GuideArticleContent = {
  slug: "funfacts",
  readTimeMinutes: 5,
  intro:
    "Økonomi trenger ikke alltid være alvorlig. Her er noen funfacts som gjør penger litt mer interessant – og kanskje motiverer deg til å ta bedre valg.",
  sections: [
    {
      heading: "Tall som overrasker",
      bullets: [
        "1 000 kr spart hver måned i 20 år blir over 240 000 kr – uten rente. Med moderat avkastning kan det bli langt mer",
        "En kaffe à 45 kr hver arbeidsdag blir rundt 11 000 kr i året – ikke for å skjemme deg ut, men for å vise hvor fort det summerer seg",
        "Renter på rente (rentes rente) gjør at sparingen akselererer mot slutten – ikke i starten",
        "Å utsette sparing med fem år kan koste deg mer enn du sparer de fem første årene",
      ],
      tip: "Regn «per dag» eller «per uke» når du vurderer småutgifter. 300 kr i uken høres lite ut – men det er over 15 000 kr i året.",
    },
    {
      heading: "Hjernen din er ikke bygget for penger",
      bullets: [
        "Vi føler et tap sterkere enn en tilsvarende gevinst – derfor holder vi ofte på dyre abonnementer «for sikkerhets skyld»",
        "Runde tall føles enklere: 199 kr oppleves billigere enn 201 kr, selv om forskjellen er minimal",
        "«Betale senere» føles mindre smertefullt enn å betale med en gang – det er hele poenget med delbetaling",
        "Vi undervurderer hvor mye faste trekk stjeler av lønnen fordi de skjer automatisk",
      ],
      tip: "Gjør gode valg lettvinte: automatisk sparing på lønningsdag slår viljestyrke hver gang.",
    },
    {
      heading: "Litt historie og kultur",
      bullets: [
        "Før bankkort var vanlig, var lønningspose bokstavelig talt en pose med kontanter",
        "Ordet «lønn» kommer fra det du fikk utdelt – ikke det som stod på en PDF",
        "Kredittkort ble introdusert for å gjøre det enklere å handle – ikke for å gjøre det enklere å spare",
        "Første norske sparebanker oppsto på 1800-tallet for å gi vanlige folk et trygt sted å legge penger",
      ],
    },
    {
      heading: "Små valg, stor effekt over tid",
      bullets: [
        "Å øke fondssparing med bare 200 kr i måneden kan bety hundretusener ekstra over et arbeidsliv",
        "Ekstra innbetaling på lån tidlig i løpet sparer mest rente – fordi restgjelden er høyest da",
        "Bytte én dyr forsikring eller mobilavtale kan finansiere en hel ferie – over noen år",
        "En bufferkonto er egentlig en «rente-fri forsikring» mot å måtte ta opp dyrt lån ved uhell",
      ],
      tip: "Velg én ting du kan forbedre denne måneden. Ikke ti. Én ting som faktisk blir gjort slår en perfekt plan.",
    },
    {
      heading: "Funfacts du kan bruke",
      paragraphs: [
        "Det morsomme med disse faktaene er at de ikke bare er trivia – de forklarer hvorfor vanlige råd fungerer: start tidlig, automatiser sparing, se på faste kostnader, og bruk medlemsfordeler du allerede har betalt for.",
        "Del gjerne en favoritt med noen som trenger et lite spark i ryggen. Økonomi blir lettere når man skjønner hvorfor det lønner seg.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
    { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    { label: "Se tilbud og medlemsrabatter", href: "/tilbud" },
  ],
};
