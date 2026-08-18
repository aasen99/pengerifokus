import type { OrdbokArticle } from "@/types/content";

const skatteetatenRente =
  "https://www.skatteetaten.no/satser/renter/";
const skatteetatenBsu =
  "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bank-og-lan/bsu/";
const skatteetatenAsk =
  "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/aksjer-og-verdipapirer/om/aksjesparekonto-ask/";
const skatteetatenRentefradrag =
  "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bank-og-lan/lan-og-renter/fordeling/";
const finanstilsynet =
  "https://www.finanstilsynet.no/";

export const ordbokArticles: Record<string, OrdbokArticle> = {
  "effektiv-rente": {
    slug: "effektiv-rente",
    whyItMatters:
      "Nominell rente sier ikke hva lånet faktisk koster. Gebyrer, terminer og renters rente gjør at to lån med samme nominelle rente kan ha svært ulik effektiv rente.",
    example:
      "Et lån på 100 000 kr med 10 % nominell rente og 1 000 kr i etableringsgebyr koster mer enn 10 % i året. Den effektive renten inkluderer gebyret fordelt over lånets løpetid.",
    formula:
      "Effektiv rente er den årlige raten som gjør at nåverdien av alle inn- og utbetalinger blir null. Banken plikter å oppgi den i tilbudet.",
    misconception:
      "Mange tror lavest nominell rente alltid er billigst. Et gebyrfritt lån med litt høyere nominell rente kan likevel være rimeligere.",
    versus: {
      term: "Nominell rente",
      slug: "nominell-rente",
      difference:
        "Nominell rente er avtalt rentesats før gebyrer. Effektiv rente er total årlig kostnad.",
    },
    relatedTool: { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
    relatedGuide: { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
    source: { label: "Finanstilsynet om kredittopplysninger", url: finanstilsynet },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  "nominell-rente": {
    slug: "nominell-rente",
    whyItMatters:
      "Nominell rente er tallet banken oftest fremhever. Det er nyttig for å sammenligne rentesatser, men ikke nok til å velge lån.",
    example:
      "Et boliglån med 5,00 % nominell rente koster 5 000 kr i renter per 100 000 kr i året før skatt og gebyrer, fordelt på terminene.",
    formula: "Nominell rente oppgis vanligvis som årlig sats. Månedlig rentesats ≈ nominell / 12.",
    misconception:
      "Nominell rente er ikke det samme som det du betaler totalt. Termingebyr og etablering kommer i tillegg.",
    versus: {
      term: "Effektiv rente",
      slug: "effektiv-rente",
      difference:
        "Nominell rente er avtalt sats. Effektiv rente inkluderer gebyrer og sammensatt rente.",
    },
    relatedTool: { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
    source: { label: "Skatteetaten om renter", url: skatteetatenRente },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  refinansiering: {
    slug: "refinansiering",
    whyItMatters:
      "Å slå sammen dyr gjeld eller bytte boliglån kan kutte renter, men gebyrer, binding og løpetid kan spise gevinsten.",
    example:
      "Har du 80 000 kr i forbruksgjeld til 20 % og kan refinansiere til 8 %, faller årlig rentekostnad grovt fra 16 000 kr til 6 400 kr, før gebyrer.",
    misconception:
      "Refinansiering er ikke gratis penger. Lengre løpetid kan gi lavere terminbeløp, men høyere samlet rentekostnad.",
    versus: {
      term: "Forbruksgjeld",
      slug: "forbruksgjeld",
      difference:
        "Forbruksgjeld er ofte det du refinansierer. Refinansiering er selve byttet av lån.",
    },
    relatedGuide: { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
    relatedTool: { label: "Nedbetalingskalkulator", href: "/verktoy/nedbetalingskalkulator" },
    source: { label: "Finanstilsynet", url: finanstilsynet },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  annuitetslan: {
    slug: "annuitetslan",
    whyItMatters:
      "De fleste boliglån i Norge er annuitetslån. Terminbeløpet er jevnt, men andelen renter er høyest i starten.",
    example:
      "Et lån på 3 600 000 kr til 5 % over 25 år har et fast terminbeløp rundt 21 000 kr. Første måned er det meste renter, senere mer avdrag.",
    formula:
      "Terminbeløpet beregnes slik at nåverdien av alle terminer er lik lånebeløpet.",
    misconception:
      "Fast terminbeløp betyr ikke fast rentekostnad. Du betaler mest renter når restgjelden er høy.",
    versus: {
      term: "Serielån",
      slug: "serielan",
      difference:
        "Annuitet har jevnt terminbeløp. Serielån har faste avdrag og synkende terminbeløp.",
    },
    relatedTool: { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
    relatedGuide: { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
    source: { label: "Finanstilsynet", url: finanstilsynet },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  serielan: {
    slug: "serielan",
    whyItMatters:
      "Serielån gir høyere terminbeløp i starten og lavere samlede renter enn et tilsvarende annuitetslån, hvis du tåler kontantstrømmen.",
    example:
      "Med samme lån som over blir avdraget fast (lånebeløp / antall terminer). Første termin er tyngst, siste er lettest.",
    misconception:
      "Serielån er ikke automatisk «bedre». Mange velger annuitet fordi månedsbeløpet er mer forutsigbart.",
    versus: {
      term: "Annuitetslån",
      slug: "annuitetslan",
      difference:
        "Serielån: faste avdrag. Annuitet: fast terminbeløp, avdragene øker over tid.",
    },
    relatedTool: { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
    source: { label: "Finanstilsynet", url: finanstilsynet },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  rentefradrag: {
    slug: "rentefradrag",
    whyItMatters:
      "Du får fradrag for gjeldsrenter i alminnelig inntekt. I 2026 er satsen 22 %, så 10 000 kr i renter gir 2 200 kr lavere skatt hvis du har skatt å motregne.",
    example:
      "15 000 kr i boliglånsrenter én måned har en skatteverdi på 3 300 kr (22 %). Det reduserer den reelle rentekostnaden, ikke avdraget.",
    formula: "Skatteverdi = rentekostnad × 0,22",
    misconception:
      "Fradraget er ikke en utbetaling fra Skatteetaten. Det reduserer skatten din, og hjelper bare hvis du faktisk betaler skatt.",
    versus: {
      term: "Nominell rente",
      slug: "nominell-rente",
      difference:
        "Nominell rente er det du avtale med banken. Rentefradraget er skatteeffekten av rentene du betaler.",
    },
    relatedTool: {
      label: "Eie-versus-leie-kalkulator",
      href: "/verktoy/eie-leie-kalkulator",
    },
    source: { label: "Skatteetaten om rentefradrag", url: skatteetatenRentefradrag },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  forbruksgjeld: {
    slug: "forbruksgjeld",
    whyItMatters:
      "Kredittkort, forbrukslån og avbetalinger har ofte høy effektiv rente. Små beløp kan bli dyre hvis de blir stående.",
    example:
      "20 000 kr til 25 % effektiv rente koster rundt 5 000 kr i renter på ett år hvis du bare betaler renter.",
    misconception:
      "Minstebeløp på kredittkortfakturaen er ikke en nedbetalingsplan. Det forlenger gjelden.",
    versus: {
      term: "Refinansiering",
      slug: "refinansiering",
      difference:
        "Forbruksgjeld er selve gjelden. Refinansiering er å bytte den mot et billigere lån.",
    },
    relatedGuide: { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
    source: { label: "Finanstilsynet", url: finanstilsynet },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  bsu: {
    slug: "bsu",
    whyItMatters:
      "BSU gir høy rente og skattefradrag, men innskuddene har tak og pengene skal brukes til bolig.",
    example:
      "27 500 kr innskudd gir 2 750 kr i skattefradrag (10 %) hvis du ikke eier bolig 31. desember og betaler nok skatt. Samlet innbetalt kan ikke overstige 300 000 kr.",
    misconception:
      "Du kan ikke fortsette å sette inn 27 500 kr i evighet. Når 300 000 kr er innbetalt, stopper nye innskudd. Renter kan fortsatt løpe.",
    versus: {
      term: "Egenkapital",
      slug: "egenkapital",
      difference:
        "BSU er en sparekonto med regler. Egenkapital er det du eier i boligen etter gjeld.",
    },
    relatedTool: { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
    source: { label: "Skatteetaten om BSU", url: skatteetatenBsu },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  ask: {
    slug: "ask",
    whyItMatters:
      "ASK utsetter skatt på gevinst og utbytte til du tar penger ut av kontoen utover innskutt beløp. Det er ikke skattefritt.",
    example:
      "Setter du inn 100 000 kr og kontoen vokser til 140 000 kr, kan du ta ut 100 000 kr uten skatt. Gevinsten på 40 000 kr skattlegges når den tas ut.",
    misconception:
      "ASK fjerner ikke skatten. Den utsetter den. Latent skatt er likevel en del av reell nettoformue.",
    versus: {
      term: "Nettoformue",
      slug: "nettoformue",
      difference:
        "ASK-saldo er brutto. Nettoformue bør trekke fra latent skatt på gevinsten.",
    },
    relatedGuide: { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
    source: { label: "Skatteetaten om ASK", url: skatteetatenAsk },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  "rentes-rente": {
    slug: "rentes-rente",
    whyItMatters:
      "Avkastning på tidligere avkastning gjør at tid og jevn sparing betyr mer enn de fleste tror.",
    example:
      "10 000 kr til 7 % i 10 år blir omtrent 19 700 kr. I 20 år omtrent 38 700 kr, uten nye innskudd.",
    formula: "Sluttverdi ≈ start × (1 + r)^n",
    misconception:
      "Rentes rente er ikke en garanti. Negativ avkastning virker den andre veien.",
    versus: {
      term: "Regel 72",
      slug: "regel-72",
      difference:
        "Rentes rente er mekanismen. Regel 72 er en grov måte å anslå doblingstid.",
    },
    relatedTool: { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    relatedGuide: { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
    source: { label: "Finanstilsynet", url: finanstilsynet },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  egenkapital: {
    slug: "egenkapital",
    whyItMatters:
      "Ved boligkjøp kreves som hovedregel minst 10 % egenkapital. Egenkapitalen er også det du taper først hvis boligverdien faller.",
    example:
      "Kjøper du for 4 000 000 kr med 400 000 kr i egenkapital, er belåningsgraden 90 %. Faller boligen 10 %, er egenkapitalen i utgangspunktet borte.",
    misconception:
      "Egenkapital er ikke det samme som sparekonto. I bolig er den bundet og kan svinge med markedet.",
    versus: {
      term: "Fellesgjeld",
      slug: "fellesgjeld",
      difference:
        "Egenkapital er det du eier. Fellesgjeld er andel av lagets lån og inngår i totalprisen.",
    },
    relatedTool: {
      label: "Eie-versus-leie-kalkulator",
      href: "/verktoy/eie-leie-kalkulator",
    },
    relatedGuide: { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
    source: {
      label: "Utlånsforskriften",
      url: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/finansmarkedene/utlansforskriften2/id3077676/",
    },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  fellesgjeld: {
    slug: "fellesgjeld",
    whyItMatters:
      "I borettslag er totalprisen innskudd pluss din andel av fellesgjelden. Felleskostnadene kan også inneholde renter og avdrag.",
    example:
      "Prisantydning 2 000 000 kr og 800 000 kr fellesgjeld betyr 2 800 000 kr i reell totalpris. Ikke tell fellesgjeld to ganger i felleskostnadene.",
    misconception:
      "Lav innskuddspris er ikke automatisk et kupp. Høy fellesgjeld kan gi høyere månedlige kostnader.",
    versus: {
      term: "Egenkapital",
      slug: "egenkapital",
      difference:
        "Fellesgjeld øker det du finansierer. Egenkapital er det du har betalt inn selv.",
    },
    relatedGuide: { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
    source: { label: "Finanstilsynet", url: finanstilsynet },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  realrente: {
    slug: "realrente",
    whyItMatters:
      "Hvis inflasjonen er høy, kan et lån med 5 % nominell rente være billigere i kjøpekraft enn det ser ut som.",
    example:
      "5 % nominell rente og 3 % inflasjon gir omtrent 1,9 % realrente. Formelen er (1 + rente) / (1 + inflasjon) − 1.",
    formula: "Realrente ≈ (1 + nominell) / (1 + inflasjon) − 1",
    misconception:
      "Høy inflasjon «spiser» ikke gjelden automatisk. Lønnen din må henge med, og renten kan stige.",
    versus: {
      term: "Nominell rente",
      slug: "nominell-rente",
      difference:
        "Nominell rente er avtalt. Realrente er etter inflasjon.",
    },
    relatedTool: {
      label: "Lånets reelle verdi",
      href: "/verktoy/lanets-reelle-verdi",
    },
    relatedGuide: { label: "Inflasjon og gjeld", href: "/guider/inflasjon-og-gjeld" },
    source: { label: "SSB om inflasjon", url: "https://www.ssb.no/priser-og-prisindekser/konsumpriser" },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  nettoformue: {
    slug: "nettoformue",
    whyItMatters:
      "Brutto verdier uten gjeld og latent skatt gir et for pent bilde. Nettoformue er det som er igjen hvis alt selges og gjelden gjøres opp.",
    example:
      "Bolig 4 000 000 kr, lån 3 200 000 kr og fond 200 000 kr gir 1 000 000 kr i grov nettoformue, før salgskostnader og skatt.",
    misconception:
      "Fondssaldo i ASK er ikke det samme som uttakbar formue etter skatt.",
    versus: {
      term: "Egenkapital",
      slug: "egenkapital",
      difference:
        "Egenkapital brukes ofte om én eiendel, for eksempel bolig. Nettoformue summerer alt du eier minus alt du skylder.",
    },
    relatedTool: {
      label: "Eie-versus-leie-kalkulator",
      href: "/verktoy/eie-leie-kalkulator",
    },
    source: { label: "Skatteetaten om formue", url: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/formue/" },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
  alternativkostnad: {
    slug: "alternativkostnad",
    whyItMatters:
      "Penger bundet i bolig, bil eller buffer kunne gitt avkastning et annet sted. Alternativkostnaden er den beste muligheten du gir opp.",
    example:
      "400 000 kr i egenkapital til 6 % forventet fondsavkastning har en alternativkostnad på omtrent 24 000 kr i året før skatt.",
    misconception:
      "Alternativkostnad er ikke en faktura. Den synes ikke på kontoutskriften, men den påvirker formuen over tid.",
    versus: {
      term: "Nettoformue",
      slug: "nettoformue",
      difference:
        "Nettoformue er en beholdning. Alternativkostnad er verdien av valget du ikke tok.",
    },
    relatedTool: {
      label: "Eie-versus-leie-kalkulator",
      href: "/verktoy/eie-leie-kalkulator",
    },
    relatedGuide: { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
    source: { label: "Finanstilsynet", url: finanstilsynet },
    lastVerified: "18. august 2026",
    lastModifiedIso: "2026-08-18",
  },
};

export function getOrdbokArticle(slug: string): OrdbokArticle | undefined {
  return ordbokArticles[slug];
}
