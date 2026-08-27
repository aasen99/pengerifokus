import { buildFormuesbyggerArticle } from "./helpers";
import { kapital400Source } from "./source-tiers";
import { erlingHaalandArticle } from "./erling-haaland";

/** Nye norske profiler (august 2026): Haaland, Spetalen, Johannson */
export const norskeProfilerBatch3 = {
  "erling-haaland": erlingHaalandArticle,

  "oystein-stray-spetalen": buildFormuesbyggerArticle({
    slug: "oystein-stray-spetalen",
    seoAngle:
      "Øystein Stray Spetalen: Slik bygget han formuen gjennom aksjer, oppkjøp og kontroll",
    metaDescription:
      "Omtrentlig formue ca. 5,5 mrd. NOK (Kapital 2025, før gavene). Spetalen, Ferncliff, Tycoon og skillet mellom eierskap, stemmer og kontroll.",
    seoKeywords: [
      "Øystein Stray Spetalen formue",
      "Spetalen døtre",
      "Spetalen aksjer",
      "Spetalen selskaper",
      "Ferncliff",
      "Tycoon Industrier",
      "Spetalen Saga Pure",
      "Spetalen alder",
    ],
    shortAnswer:
      "Øystein Stray Spetalen bygde formue gjennom konsentrerte investeringer og aktiv selskapskontroll, ikke gjennom ett produkt. Kapital anslo formuen til 5,5 milliarder kroner i 2025, før store aksjegaver til døtrene. Gaver, flaggemeldinger og senere kjøp gjør det nødvendig å skille økonomisk eierskap, juridisk eierskap, stemmerett og faktisk kontroll. Høy avkastning har fulgt med konsentrasjon, omdømmerisiko og store svingninger.",
    timeline: [
      {
        date: "17. juni 1962",
        title: "Født i Sandefjord",
        description:
          "Sivilingeniør med bakgrunn fra verdipapirmarkedet før egen kapitalbase.",
      },
      {
        date: "tidlig 1990-tallet",
        title: "Fra broker til Sveaas",
        description:
          "Oslo Securities, Noka Securities og Gjensidige, deretter investeringsdirektør for Christen Sveaas, nettverk før Tycoon.",
      },
      {
        date: "1995",
        title: "Tycoon Industrier etableres",
        description:
          "Spetalen etablerte eget investeringsselskap og gikk over til aktivt, konsentrert eierskap.",
      },
      {
        date: "2014–2017",
        title: "Nel-posisjon og exit",
        description:
          "Ferncliff var betydelig eier; Spetalen satt i styret (årsrapport 2014). Senere medieestimat om gevinst ved salg i 2017.",
      },
      {
        date: "september 2025",
        title: "Gave av Saga Pure-aksjer til døtrene",
        description:
          "Alle 172 841 799 Saga Pure-aksjer eid via Ferncliff Holding, og aksjene i Ferncliff Holding, overført 50/50 til døtrenes selskaper (flaggemelding).",
      },
      {
        date: "desember 2025",
        title: "Kjøp av 75 mill. Saga-aksjer",
        description:
          "E24 omtalte kjøp fra Tycoon Industrier for 101,25 mill. kroner (1,35 kr/aksje); direkte eierskap ca. 13,46 % på det tidspunktet.",
      },
    ],
    wealthSources: [
      {
        category: "aksjer",
        description:
          "Konsentrerte børsposisjoner og familie-/holdingselskaper (Ferncliff, Tycoon, Saga Pure-sfæren).",
      },
      {
        category: "selskaper",
        description:
          "Private og børsnoterte selskaper der eierstruktur og kontroll er like viktige som kursen.",
      },
      {
        category: "salg",
        description:
          "Gevinster ved exit fra posisjoner (f.eks. Nel), ofte medieestimater, ikke offisiell gevinstoppgave.",
      },
    ],
    ownershipVsControl:
      "Gavene i 2025 flyttet juridisk og økonomisk eierskap til døtrenes selskaper, men kontrollspørsmålet forsvant ikke. Aksjonærlister, direkte kjøp og eventuelle A-aksjer i familieselskaper må undersøkes separat. Prosent eierskap er ikke det samme som stemmer eller faktisk innflytelse.",
    decisiveMove:
      "De dokumenterte gavene i september 2025, overføring av Ferncliff Holdings Saga Pure-post og Ferncliff Holding-aksjene 50/50 til døtrenes selskaper, som gjør skillet mellom personlig formue, familiesfære og kontroll til selve lærdommen.",
    whatCouldGoWrong: [
      "Konsentrerte posisjoner gir stor oppside og stort tap.",
      "Verdier i private selskaper er vanskeligere å kontrollere enn børsverdier.",
      "Transaksjoner mellom nærstående krever ekstra tydelighet for minoritetsaksjonærer.",
      "Kontroll kan være større eller mindre enn den økonomiske andelen tilsier.",
      "Et resultat før skatt drevet av utbytte og konsernbidrag er ikke ny ekstern verdiskaping.",
    ],
    mythVsReality: [
      {
        myth: "Gaver til døtrene betyr at Spetalen ikke lenger har interesser eller innflytelse.",
        reality:
          "Senere transaksjoner og aksjonærlister viser direkte og indirekte posisjoner. Kontroll må undersøkes separat.",
      },
      {
        myth: "Et resultat før skatt på 1,5 milliarder betyr 1,5 milliarder i ny ekstern verdiskaping.",
        reality:
          "Utbytte og konsernbidrag kan flytte resultat mellom selskaper i samme sfære.",
      },
      {
        myth: "Kapitals 2025-anslag er et presist nåtidsbilde.",
        reality:
          "Store eierskifter gjør sammenligningen krevende, anslaget er historisk kontekst, ikke fasit etter gavene.",
      },
    ],
    personalLessons: [
      "I finans bygges formue ofte gjennom kapitalallokering og kontroll, ikke gjennom ett produkt.",
      "Skill alltid økonomisk eierskap, juridisk eierskap, stemmerett og faktisk kontroll.",
      "Konsentrasjon kan gi ekstrem avkastning, og ekstrem nedsiderisiko.",
      "Les børsmeldinger før medieoppsummeringer når eierskap endres.",
    ],
    sources: [
      {
        label: "Flagging: gave av Saga Pure / Ferncliff (sept. 2025)",
        url: "https://newsweb.oslobors.no/",
        tier: "secondary",
      },
      {
        label: "Saga Pure: investor relations / aksjonærliste",
        url: "https://www.sagapure.com/",
        tier: "primary",
      },
      {
        label: "Nel: årsrapport 2014",
        url: "https://nelhydrogen.com/",
        tier: "primary",
      },
      {
        label: "Store norske leksikon: Øystein Stray Spetalen",
        url: "https://snl.no/%C3%98ystein_Stray_Spetalen",
        tier: "primary",
      },
      kapital400Source(),
      {
        label: "E24: omtale av Kapital-anslag og eierskifter",
        url: "https://e24.no/",
        tier: "tertiary",
      },
      {
        label: "Dagens Næringsliv: Spetalen-sitat (2021)",
        url: "https://www.dn.no/",
        tier: "quaternary",
      },
    ],
    lastVerified: "2026-08-11",
    relatedLinks: [
      { label: "Christen Sveaas", href: "/formuesbyggere/christen-sveaas" },
      { label: "Kjell Inge Røkke", href: "/formuesbyggere/kjell-inge-rokke" },
      { label: "Nicolai Tangen", href: "/formuesbyggere/nicolai-tangen" },
      { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
    ],
  }),

  "johan-johannson": buildFormuesbyggerArticle({
    slug: "johan-johannson",
    seoAngle:
      "Johan Johannson og NorgesGruppen: Formuen bak Norges største dagligvarehus",
    metaDescription:
      "Omtrentlig formue ca. 59 mrd. NOK (Kapital 2025, tilordnet). Johannson-familien og NorgesGruppen: skala, lave marginer og familieeierskap vs personlig eierandel.",
    seoKeywords: [
      "Johan Johannson formue",
      "Johan Johannson NorgesGruppen",
      "hvem eier NorgesGruppen",
      "Johannson familien",
      "NorgesGruppen eierandel",
      "Johan Johannson alder",
      "NorgesGruppen Vitusapotek",
      "Kiwi Meny eier",
    ],
    shortAnswer:
      "Johan Johannson er femte generasjon i handelsslekten bak NorgesGruppen. Kapital anslo i 2025 formuen tilordnet ham til 59 milliarder kroner, ofte familieverdier tilordnet én person, ikke personlig bankbeholdning. Familien kontrollerte 74,4 prosent av aksjer og stemmer i NorgesGruppen ved utgangen av 2024 via Joh. Johannson Handel AS. Historien handler om arv plus skala: lave marginer på enorme volumer, vertikal integrasjon og langsiktig familiekapital, ikke «selvskapt fra null».",
    timeline: [
      {
        date: "1866",
        title: "Handelsslektens røtter",
        description:
          "SNL beskriver virksomheten med røtter tilbake til 1866, Johannson er femte generasjon.",
      },
      {
        date: "25. januar 1967",
        title: "Født i Oslo",
        description: "Utdannet ved BI; arbeid i Andersen Consulting 1991–1995.",
      },
      {
        date: "1995",
        title: "Inn i familievirksomheten",
        description:
          "Johannson trådte inn i familievirksomheten og ble senere sentral i NorgesGruppen-strukturen.",
      },
      {
        date: "2000",
        title: "NorgesGruppen ASA",
        description:
          "Grossist- og kjedestrukturer ble samlet; NorgesGruppen etablert som ASA.",
      },
      {
        date: "mai 2022",
        title: "Styreleder etter faren",
        description:
          "Johan Johannson overtok som styreleder etter Knut Hartvig Johannson.",
      },
      {
        date: "2025–jan. 2026",
        title: "Apotekoppkjøp fullført",
        description:
          "Kjøp av Norsk Medisinaldepot (Vitusapotek/Ditt Apotek) kunngjort 2025; Konkurransetilsynet tillot det; McKesson meldte fullføring 30. januar 2026. Kjøpesum ikke offentliggjort.",
      },
    ],
    wealthSources: [
      {
        category: "arv",
        description:
          "Startposisjon i familievirksomhet med røtter til 1866, kategori arv + videreutvikling, ikke «bare arving».",
      },
      {
        category: "selskaper",
        description:
          "Familiekontroll i NorgesGruppen via Joh. Johannson Handel AS, privat selskap uten løpende børspris.",
      },
      {
        category: "salg",
        description:
          "Ikke hovedforklaringen. Verdien ligger i eierskap og kontantstrøm i dagligvarekjeden, ikke i ett enkelt salg.",
      },
    ],
    ownershipVsControl:
      "Nordic Credit Rating oppga at Johannson-familien kontrollerte 74,4 prosent av aksjene og stemmene i NorgesGruppen ved utgangen av 2024 gjennom Joh. Johannson Handel AS. Riktig formulering er at familien kontrollerer andelen, ikke at Johan eier 74,4 prosent personlig. Kapital kan tilordne familieformue til én person selv om arvinger eier deler.",
    decisiveMove:
      "Å bygge og beholde vertikal skala i NorgesGruppen, produksjon, grossist, distribusjon og ca. 1 800 butikker, der 3,3 prosent driftsmargin på 125,3 milliarder i omsetning (2025) likevel gir milliarder i absolutt resultat.",
    whatCouldGoWrong: [
      "Dagligvaremarkedet er politisk og regulatorisk utsatt.",
      "De tre store gruppene står for om lag 95 prosent av markedet, skala gir makt, men også vedvarende konkurransedebatt.",
      "Lav driftsmargin gjør kostnadsøkninger svært merkbare.",
      "Privat selskap mangler løpende børspris; formuesanslag blir modellberegninger.",
    ],
    mythVsReality: [
      {
        myth: "125,3 milliarder i omsetning er familiens inntekt.",
        reality:
          "Omsetning er kundebetaling før varekostnader, lønn, logistikk og skatt. Resultat før skatt var 4,9 milliarder i 2025.",
      },
      {
        myth: "Johan Johannson eier personlig 74,4 prosent av NorgesGruppen.",
        reality:
          "Kilden sier at Johannson-familien kontrollerer andelen gjennom holdingselskap.",
      },
      {
        myth: "Formuen er bare passiv arv.",
        reality:
          "Startposisjonen var arvet, men NorgesGruppen ble bygget videre gjennom konsolidering, logistikk og nye oppkjøp.",
      },
      {
        myth: "59 milliarder er en kontrollert bankbeholdning.",
        reality:
          "Det er et markedsverdiestimat knyttet til familieeierskap i et privat selskap.",
      },
    ],
    personalLessons: [
      "Små marginer kan gi store resultater når volumet er enormt, omsetning er ikke formue.",
      "Familieandel er ikke det samme som personlig eierandel; les holdingselskap og metodefotnoter.",
      "Vertikal integrasjon kan skape effektivitet i flere ledd, ikke bare i butikkassen.",
      "Skala kan flyttes til nabomarkeder (apotek), men kjøpesum uten offentlig tall bør ikke gjettes.",
    ],
    sources: [
      {
        label: "NorgesGruppen: 2025-resultat / rapportarkiv",
        url: "https://www.norgesgruppen.no/",
        tier: "primary",
      },
      {
        label: "NorgesGruppen: styrelederskifte (2022)",
        url: "https://www.norgesgruppen.no/",
        tier: "secondary",
      },
      {
        label: "Nordic Credit Rating: NorgesGruppen (juni 2025)",
        url: "https://nordiccreditrating.com/",
        tier: "primary",
      },
      {
        label: "Konkurransetilsynet: NMD/Vitusapotek-vedtak",
        url: "https://konkurransetilsynet.no/",
        tier: "primary",
      },
      {
        label: "McKesson: fullføring av salget (30. jan. 2026)",
        url: "https://www.mckesson.com/",
        tier: "secondary",
      },
      {
        label: "Store norske leksikon: Johan Johannson",
        url: "https://snl.no/Johan_Johannson",
        tier: "primary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-11",
    relatedLinks: [
      { label: "Odd Reitan", href: "/formuesbyggere/odd-reitan" },
      { label: "Reitan-familien", href: "/formuesbyggere/reitan-familien" },
      { label: "Stein Erik Hagen", href: "/formuesbyggere/stein-erik-hagen" },
      { label: "Nettoformue i ordboken", href: "/ordbok/nettoformue" },
    ],
  }),
};
