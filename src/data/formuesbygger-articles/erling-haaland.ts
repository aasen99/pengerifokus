import { buildFormuesbyggerArticle } from "./helpers";
import { kapital400Source } from "./source-tiers";

const CITY_PROFILE = "https://www.mancity.com/players/erling-haaland";
const CITY_CONTRACT =
  "https://www.mancity.com/news/mens/erling-haaland-10-year-manchester-city-contract-63872694";
const E24_SALARY =
  "https://e24.no/naeringsliv/i/16jRRX/haaland-tjener-mer-enn-21-i-vm-troppen-til-sammen";
const FORBES_2026 =
  "https://www.forbes.com/sites/brettknight/2026/05/22/the-worlds-highest-paid-athletes-25-and-under-for-2026/";
const AFTENPOSTEN_KAPITAL =
  "https://www.aftenposten.no/okonomi/i/lw6xb9/kapital-haaland-knuser-naeringslivstopper-formuen-anslaatt-til-fire-milliarder";
const E24_PILLAGE3 =
  "https://e24.no/boers-og-finans/i/QMVA6R/erling-25-fra-bryne-tjente-millioner-paa-investeringer";
const E24_PILLAGE2 =
  "https://e24.no/boers-og-finans/i/yEeLA2/haaland-har-347-mill-i-luxembourg-selskap";
const NORWAY_CHESS =
  "https://norwaychess.no/en/2026/03/19/erling-haaland-invests-in-norway-chess-to-launch-the-new-total-chess-world-championship-tour/";
const NIKE =
  "https://about.nike.com/en/newsroom/releases/erling-haaland-signs-with-nike";
const REUTERS_YOUTUBE =
  "https://www.reuters.com/sports/soccer/man-citys-haaland-reveals-quirky-routines-youtube-debut-2025-10-24/";
const NFF =
  "https://www.fotball.no/landslag/kampprogram/a-lag-herrer/erling-braut-haaland2/";
const YOUTUBE = "https://www.youtube.com/@erling";

export const erlingHaalandArticle = buildFormuesbyggerArticle({
  slug: "erling-haaland",
  seoAngle: "Erling Haaland lønn og formue i 2026",
  seoTitle: "Erling Haaland lønn og formue i 2026",
  pageTitle: "Erling Haaland: lønn, inntekt og formue",
  metaDescription:
    "Hvor mye tjener Erling Haaland? Se anslått lønn per år, måned, uke og sekund, samlet inntekt, formue, selskaper, investeringer og YouTube-prosjekt.",
  seoKeywords: [
    "Erling Haaland lønn",
    "Erling Haaland formue",
    "hvor mye tjener Haaland",
    "Haaland ukelønn",
    "Haaland Manchester City kontrakt",
    "Haaland sponsorinntekter",
    "Pillage 2",
    "Pillage 3",
    "Haaland YouTube",
    "Haaland Norway Chess",
    "Erling Braut Haaland",
  ],
  factCards: [
    {
      label: "Anslått fast årslønn",
      value: "ca. 339 mill. kr",
      note: "Capology og E24, 2026",
    },
    {
      label: "Anslått ukelønn",
      value: "ca. 6,5 mill. kr",
      note: "Før bonuser",
    },
    {
      label: "Samlede årsinntekter",
      value: "80 mill. dollar",
      note: "Forbes, måleperiode 2025 til 2026",
    },
    {
      label: "Anslått formue",
      value: "4,1 mrd. kr",
      note: "Kapital, 2025",
    },
  ],
  factCardsNote:
    "Lønn, samlet inntekt og formue er tre forskjellige størrelser. Fast klubblønn er før bonuser. Forbes-tallet er samlede inntekter i en 12-månedersperiode. Kapital-tallet er et medieanslag på formue.",
  shortAnswer: `Erling Haalands faste bruttolønn i Manchester City er anslått til 525 000 pund i uken. Det tilsvarer 27,3 millioner pund eller omtrent 339 millioner kroner i året før bonuser.

Manchester City har ikke offentliggjort lønnen. Tallene bygger derfor på estimater fra lønnsdatabasen Capology, gjengitt av blant andre [E24](${E24_SALARY}).

[Forbes](${FORBES_2026}) anslår samtidig at Haaland hadde samlede inntekter på 80 millioner dollar i perioden fra 1. mai 2025 til 1. mai 2026. Av dette kom 60 millioner dollar fra aktivitet på banen og 20 millioner dollar fra sponsoravtaler og andre kommersielle inntekter.

[Kapital](${AFTENPOSTEN_KAPITAL}) anslo Haalands formue til 4,1 milliarder kroner i 2025. Dette er et medieanslag på samlet formue og må ikke forveksles med lønn eller penger på konto.`,
  timelinePlacement: "late",
  bodySections: [
    {
      heading: "Hvor mye tjener Erling Haaland?",
      paragraphs: [
        `Tabellen under fordeler den anslåtte faste klubblønnen på 339 millioner kroner jevnt over hele året. Beløpet bygger på Capology-estimatet på £525 000 i uken, gjengitt av [E24](${E24_SALARY}).`,
      ],
      table: {
        headers: ["Periode", "Britiske pund", "Norske kroner"],
        rows: [
          ["Per år", "£27 300 000", "ca. 339 mill. kr"],
          ["Per måned", "£2 275 000", "ca. 28,3 mill. kr"],
          ["Per uke", "£525 000", "ca. 6,5 mill. kr"],
          ["Per dag", "ca. £74 795", "ca. 929 000 kr"],
          ["Per time", "ca. £3 116", "ca. 38 700 kr"],
          ["Per minutt", "ca. £52", "ca. 645 kr"],
          ["Per sekund", "ca. £0,87", "ca. 10,75 kr"],
        ],
        footnote:
          "Beløpene viser den anslåtte faste klubblønnen fordelt jevnt over hele året. Det betyr ikke at Haaland faktisk får penger utbetalt hvert sekund. Valutakursen endrer seg, og norske beløp er derfor avrundet. Bonuser, sponsorinntekter, skatt og agenthonorarer er ikke inkludert.",
      },
    },
    {
      heading: "Fast lønn mot samlet inntekt",
      paragraphs: [
        "Fast klubblønn, inntekter på banen og inntekter utenfor banen måler tre ulike ting. Forbes-tallene er anslag før skatt og agenthonorarer.",
      ],
      cards: [
        {
          title: "Fast klubblønn",
          paragraphs: [
            `Anslått til £525 000 per uke, eller £27,3 millioner per år – omtrent 339 millioner kroner før bonuser. Beløpet er ikke offentlig bekreftet av Manchester City. Kilde: [E24](${E24_SALARY}) / Capology.`,
          ],
        },
        {
          title: "Inntekter på banen",
          paragraphs: [
            `[Forbes](${FORBES_2026}) anslår 60 millioner dollar fra aktivitet på banen i måleperioden 1. mai 2025 til 1. mai 2026.`,
          ],
          bullets: [
            "Fast klubblønn",
            "Prestasjonsbonuser",
            "Kamprelaterte utbetalinger",
            "Andre sportslige inntekter",
          ],
        },
        {
          title: "Inntekter utenfor banen",
          paragraphs: [
            `[Forbes](${FORBES_2026}) anslår 20 millioner dollar fra aktivitet utenfor banen i samme periode.`,
          ],
          bullets: [
            "Sponsoravtaler",
            "Reklameoppdrag",
            "Lisensiering",
            "Opptredener",
            "Memorabilia",
            "Andre kommersielle samarbeid",
          ],
        },
      ],
    },
    {
      heading: "Kontrakten med Manchester City",
      paragraphs: [
        `[Manchester City](${CITY_CONTRACT}) bekreftet 17. januar 2025 at Haaland hadde signert en ny langtidskontrakt. Avtalen varer til sommeren 2034.`,
        "Klubben offentliggjorde ikke lønn, bonuser eller samlet kontraktsverdi.",
        "Kontrakten gir Haaland langsiktig økonomisk forutsigbarhet, samtidig som Manchester City sikrer seg rettighetene til en av verdens mest verdifulle spillere gjennom store deler av karrieren.",
      ],
    },
    {
      heading: "Vanlige fakta om Erling Haaland",
      paragraphs: [
        `Grunnleggende spillerfakta er hentet fra [Manchester Citys spillerprofil](${CITY_PROFILE}) og [Norges Fotballforbund](${NFF}).`,
      ],
      table: {
        headers: ["Fakta", "Opplysning"],
        rows: [
          ["Fullt navn", "Erling Braut Haaland"],
          ["Født", "21. juli 2000"],
          ["Fødested", "Leeds, England"],
          ["Oppvokst", "Bryne"],
          ["Nasjonalitet", "Norsk"],
          ["Høyde", "1,94 meter"],
          ["Posisjon", "Spiss"],
          ["Klubb", "Manchester City"],
          ["Draktnummer", "9"],
          ["Manchester City-spiller siden", "1. juli 2022"],
          ["Kontrakt", "Til sommeren 2034"],
          ["Landslagsdebut", "Norge mot Malta i 2019"],
          ["Tidligere klubber", "Bryne, Molde, RB Salzburg og Borussia Dortmund"],
        ],
      },
    },
    {
      heading: "Hvor stor er formuen til Haaland?",
      paragraphs: [
        `[Kapital](${AFTENPOSTEN_KAPITAL}) anslo Haalands formue til 4,1 milliarder kroner i 2025. Det plasserte ham som nummer 114 på listen over Norges rikeste og gjorde ham til tidenes rikeste norske fotballspiller, ifølge Aftenposten og NTB.`,
        "Formuestallet er et medieanslag. Det er ikke det samme som skattemessig formue, kontanter på bankkonto, samlet karriereinntekt eller verdiene som er synlige i enkelte selskapsregnskaper.",
        "Ikke forsøk å beregne en ny formue ved å legge sammen lønn, sponsorinntekter og selskapsverdier. Deler av verdiene kan allerede være inkludert i Kapital-anslaget.",
      ],
    },
    {
      heading: "Pillage-selskapene",
      paragraphs: [
        "Haaland bruker en internasjonal selskapsstruktur til å forvalte og investere deler av kapitalen han har bygget opp gjennom fotballkarrieren. Offentlige regnskaper viser enkelte selskapsverdier, men ikke hele privatøkonomien eller den nøyaktige veien pengene har tatt.",
        "Bokført egenkapital, eiendeler, aksjeportefølje og personlig formue er forskjellige størrelser. Gjennom Pillage 2 eier Haaland blant annet Pillage 3 og interesser i eiendomsselskapet Sapiens Eiendom.",
      ],
      cards: [
        {
          title: "Pillage 2",
          paragraphs: [
            `[Pillage 2](${E24_PILLAGE2}) er et morselskap registrert i Luxembourg. [E24](${E24_PILLAGE2}) omtalte 2024-regnskapet slik:`,
          ],
          bullets: [
            "Eiendeler på 29,6 millioner euro",
            "Omtrent 347 millioner kroner etter valutakursen E24 benyttet",
            "Nesten alle eiendelene var finansielle",
            "Årsresultat på omtrent minus 300 000 euro",
            "Kontantbeholdning på omtrent 79 000 euro",
          ],
        },
        {
          title: "Pillage 3",
          paragraphs: [
            `Pillage 3 brukes til investeringer, blant annet i det norske aksjemarkedet. [E24](${E24_PILLAGE3}) omtalte 2024-regnskapet slik:`,
          ],
          bullets: [
            "Resultat på 24,5 millioner kroner",
            "Aksjer og andre investeringer verdsatt til omtrent 223 millioner kroner",
            "Bokført egenkapital på 127,9 millioner kroner",
            "Egenkapitalen økte fra 13,4 millioner kroner året før",
          ],
        },
      ],
    },
    {
      heading: "Investeringen i Norway Chess",
      paragraphs: [
        `I mars 2026 ble det [offentliggjort](${NORWAY_CHESS}) at Haaland og næringslivsleder Morten Borge hadde etablert Chess Mates. Chess Mates ble en betydelig eier i Norway Chess og den nye turneringen Total Chess World Championship Tour.`,
      ],
      bullets: [
        "Investeringsbeløpet er ikke offentliggjort",
        "Haaland omtales som en strategisk investor",
        "En pilotturnering er planlagt høsten 2026",
        "Første fulle sesong er planlagt i 2027",
        "Turneringen skal ha fire arrangementer per sesong",
        "Minste årlige premiepott er 2,7 millioner dollar",
        "FIDE har godkjent konseptet for minst 16 år",
      ],
    },
    {
      heading: "Sponsoravtaler og merkevare",
      paragraphs: [
        `[Nike](${NIKE}) offentliggjorde samarbeidet med Haaland i mars 2023, men oppga ikke verdien av avtalen.`,
        `[Forbes](${FORBES_2026}) oppførte i 2026 blant annet følgende sponsorer og samarbeidspartnere: Nike, Beats by Dre, Breitling, Dolce & Gabbana, Electronic Arts, Marriott International, Midea, Supercell, Unilever og Visa.`,
        "Haaland har også samarbeidet med norske merkevarer og organisasjoner som Bama og Godfisk.",
        "Verdien av individuelle sponsoravtaler oppgis ikke som bekreftet her, med mindre selskapet eller en dokumenterbar primærkilde har offentliggjort beløpet.",
      ],
    },
    {
      heading: "Haalands YouTube-prosjekt",
      paragraphs: [
        `Haaland lanserte sin [offisielle YouTube-kanal](${YOUTUBE}) i oktober 2025. [Reuters](${REUTERS_YOUTUBE}) omtalte den første lengre videoen, «Day in the Life of a Pro Footballer», som viste trening, kosthold, restitusjon og livet utenfor fotballbanen.`,
        "Kanalen nådde én million abonnenter etter omtrent 35 dager. Kanalen er utviklet i samarbeid med agenturet Tatica.",
        "Haaland bygger en direkte kanal til sitt eget publikum. Han blir mindre avhengig av klubben og tradisjonelle medier. Kanalen kan gjøre ham mer verdifull for sponsorer, og han kontrollerer i større grad hvordan merkevaren presenteres. Plattformen kan senere brukes til egne produkter og prosjekter.",
        "Videoene kan gi annonseinntekter, men de faktiske inntektene er ikke offentliggjort. Tredjepartsestimater for YouTube-inntekter brukes ikke som fakta her.",
      ],
      table: {
        caption: "Status 27. august 2026",
        headers: ["YouTube-tall", "Status"],
        rows: [
          ["Abonnenter", "ca. 4,36 millioner"],
          ["Videoer", "68"],
          ["Samlede visninger", "ca. 218 millioner"],
        ],
      },
    },
  ],
  timeline: [
    {
      date: "juli 2000",
      title: "Født i Leeds",
      description:
        "Erling Braut Haaland er født 21. juli 2000 i Leeds, England.",
    },
    {
      date: "Oppvekst",
      title: "Vokste opp på Bryne",
      description: "Haaland vokste opp på Bryne og startet karrieren i Bryne FK.",
    },
    {
      date: "2019",
      title: "Landslagsdebut mot Malta",
      description:
        "Haaland debuterte for Norge mot Malta i 2019, ifølge Norges Fotballforbund.",
    },
    {
      date: "juli 2022",
      title: "Ble Manchester City-spiller",
      description:
        "Haaland kom til Manchester City 1. juli 2022, ifølge klubbens spillerprofil.",
    },
    {
      date: "mars 2023",
      title: "Nike offentliggjorde sponsoravtalen",
      description:
        "Nike kunngjorde samarbeidet, men offentliggjorde ikke verdien av avtalen.",
    },
    {
      date: "2023",
      title: "Pillage 3 ble etablert",
      description:
        "Investeringsselskapet Pillage 3 inngår i Haalands selskapsstruktur.",
    },
    {
      date: "januar 2025",
      title: "Signerte kontrakt til sommeren 2034",
      description:
        "Manchester City bekreftet 17. januar 2025 en ny langtidskontrakt. Lønn og samlet avtaleverdi ble ikke offentliggjort.",
    },
    {
      date: "oktober 2025",
      title: "Lanserte sin offisielle YouTube-kanal",
      description:
        "Den første lengre videoen viste en dag i livet til en proffspiller.",
    },
    {
      date: "november 2025",
      title: "YouTube-kanalen passerte én million abonnenter",
      description: "Kanalen nådde én million abonnenter etter omtrent 35 dager.",
    },
    {
      date: "mars 2026",
      title: "Gikk inn som strategisk investor i Norway Chess",
      description:
        "Sammen med Morten Borge etablerte Haaland Chess Mates, som ble en betydelig eier i Norway Chess. Investeringsbeløpet er ikke offentliggjort.",
    },
    {
      date: "mai 2026",
      title: "Forbes anslo årsinntektene til 80 millioner dollar",
      description:
        "Måleperioden var 1. mai 2025 til 1. mai 2026: 60 millioner dollar på banen og 20 millioner dollar utenfor banen.",
    },
    {
      date: "august 2026",
      title: "YouTube-kanalen passerte 4,3 millioner abonnenter",
      description:
        "Per 27. august 2026 hadde kanalen omtrent 4,36 millioner abonnenter, 68 videoer og 218 millioner visninger.",
    },
  ],
  wealthSources: [
    {
      category: "lonn",
      description: `Fast klubblønn i Manchester City er anslått til £525 000 i uken, eller omtrent 339 millioner kroner i året før bonuser, ifølge [E24](${E24_SALARY}) og Capology. [Forbes](${FORBES_2026}) anslår 60 millioner dollar fra aktivitet på banen i perioden 1. mai 2025 til 1. mai 2026, et tall som kan omfatte lønn, bonuser og andre sportslige inntekter.`,
    },
    {
      category: "royalty",
      description: `[Forbes](${FORBES_2026}) anslår 20 millioner dollar utenfor banen i samme periode. [Nike](${NIKE}) har bekreftet samarbeidet, men ikke verdien. YouTube-kanalen kan gi annonseinntekter, men beløpet er ikke offentliggjort.`,
    },
    {
      category: "selskaper",
      description: `[Pillage 2](${E24_PILLAGE2}) i Luxembourg hadde eiendeler på 29,6 millioner euro i 2024-regnskapet, ifølge E24. [Pillage 3](${E24_PILLAGE3}) hadde bokført egenkapital på 127,9 millioner kroner. Chess Mates er en betydelig eier i Norway Chess; investeringsbeløpet er ikke offentliggjort.`,
    },
    {
      category: "aksjer",
      description: `Pillage 3 hadde aksjer og andre investeringer verdsatt til omtrent 223 millioner kroner i 2024, ifølge [E24](${E24_PILLAGE3}). Bokført porteføljeverdi er ikke det samme som personlig formue.`,
    },
  ],
  ownershipVsControl:
    "Haaland bruker en internasjonal selskapsstruktur til å forvalte og investere deler av kapitalen han har bygget opp gjennom fotballkarrieren. Pillage 2 er et morselskap i Luxembourg. Gjennom selskapet eier han blant annet Pillage 3 og interesser i eiendomsselskapet Sapiens Eiendom. Offentlige regnskaper viser enkelte selskapsverdier, men ikke hele privatøkonomien eller den nøyaktige veien pengene har tatt. Bokført egenkapital, eiendeler, aksjeportefølje og personlig formue er forskjellige størrelser.",
  decisiveMove:
    "Manchester City bekreftet 17. januar 2025 at Haaland hadde signert en ny langtidskontrakt til sommeren 2034. Klubben offentliggjorde ikke lønn, bonuser eller samlet kontraktsverdi. Avtalen gir langsiktig økonomisk forutsigbarhet, samtidig som klubben sikrer seg rettighetene til en av verdens mest verdifulle spillere gjennom store deler av karrieren.",
  whatCouldGoWrong: [
    "Inntekten er fortsatt sterkt knyttet til helse, prestasjoner og fotballens kommersielle økonomi.",
    "Lang kontrakt gir forutsigbarhet, men skaper konsentrasjon mot én klubb og én bransje.",
    "Formue-, inntekts- og lønnsanslag måler ulike ting og kan ikke legges sammen til en ny fasit.",
    "YouTube-visninger og sponsorlister sier ingenting om faktiske beløp før kilden offentliggjør dem.",
  ],
  mythVsReality: [
    {
      myth: "Alle milliardene er fotballønn på konto.",
      reality:
        "Kapital-anslaget er et medieanslag på samlet formue. Fast klubblønn og Forbes-inntektene er andre størrelser, og alle tre er før skatt, kostnader og agenthonorarer.",
    },
    {
      myth: "Nike-avtalen har en offentlig bekreftet verdi.",
      reality:
        "Nike bekrefter samarbeidet, men ikke prisen. Beløpet bør ikke oppgis som fasit.",
    },
    {
      myth: "Du kan legge sammen lønn, sponsorer og selskapsverdier for å få formuen.",
      reality:
        "Deler av verdiene kan allerede inngå i Kapital-anslaget. Bokført egenkapital i Pillage-selskapene er heller ikke det samme som personlig nettoformue.",
    },
    {
      myth: "YouTube-visninger viser hvor mye Haaland tjener på kanalen.",
      reality:
        "De faktiske YouTube-inntektene er ikke offentliggjort. Visningstall alene gir ikke grunnlag for et presist inntektsanslag.",
    },
  ],
  personalLessons: [
    "Høy inntekt og høy formue er ikke det samme. Haalands ukelønn, Forbes-inntektene og Kapital-formuen måler tre ulike ting.",
    "En tidsbegrenset karriere krever langsiktig kapitalforvaltning. Kontrakten varer til 2034, men spilleren kan ikke ta for gitt at inntekten varer like lenge.",
    "Flere inntektskilder reduserer avhengigheten av én arbeidsgiver. Klubblønn, sponsorer og egne selskaper er likevel ikke en mal vanlige lønnsmottakere kan kopiere beløpsmessig.",
    "Eide kanaler kan være mer verdifulle enn midlertidig oppmerksomhet. YouTube-kanalen gir Haaland en direkte vei til publikum, uavhengig av klubbens mediestrategi.",
    "Sponsorinntekter bygger på både prestasjoner og merkevare. Nike har bekreftet samarbeidet, men ikke verdien.",
    "Regnskapstall må forstås før de sammenlignes. Eiendeler, egenkapital og årsresultat i Pillage-selskapene er ikke det samme som penger på konto.",
    "Langsiktige avtaler gir trygghet, men skaper også konsentrasjon. Ti år i én klubb binder både inntekt og merkevare til Manchester City.",
  ],
  faq: [
    {
      question: "Hvor mye tjener Haaland i uken?",
      answer:
        "Haalands faste bruttolønn i Manchester City er anslått til £525 000 i uken, tilsvarende omtrent 6,5 millioner kroner. Bonuser og sponsorinntekter kommer i tillegg.",
    },
    {
      question: "Hvor mye tjener Haaland i året?",
      answer:
        "Den faste klubblønnen er anslått til omtrent 339 millioner kroner i året. Forbes anslår den samlede årsinntekten fra fotball, bonuser, sponsorer og andre kommersielle aktiviteter til 80 millioner dollar.",
    },
    {
      question: "Hvor mye tjener Haaland per sekund?",
      answer:
        "Fordelt jevnt over hele året tilsvarer den anslåtte faste klubblønnen omtrent 10,75 kroner per sekund. Dette er kun en matematisk illustrasjon.",
    },
    {
      question: "Hvor stor formue har Haaland?",
      answer:
        "Kapital anslo formuen til omtrent 4,1 milliarder kroner i 2025. Dette er et medieanslag og ikke en offentlig bekreftet nettoformue.",
    },
    {
      question: "Hvor lenge varer Haalands kontrakt?",
      answer: "Kontrakten med Manchester City varer til sommeren 2034.",
    },
    {
      question: "Hvor mye tjener Haaland på YouTube?",
      answer:
        "De faktiske YouTube-inntektene er ikke offentliggjort. Kanalen hadde omtrent 4,36 millioner abonnenter og 218 millioner visninger i august 2026, men visningstall alene gir ikke grunnlag for et presist inntektsanslag.",
    },
  ],
  sources: [
    {
      label: "Manchester City: spillerprofil",
      url: CITY_PROFILE,
      tier: "primary",
    },
    {
      label: "Manchester City: kontrakt til 2034",
      url: CITY_CONTRACT,
      tier: "primary",
    },
    {
      label: "Norges Fotballforbund: Erling Braut Haaland",
      url: NFF,
      tier: "primary",
    },
    {
      label: "Nike: offisiell kunngjøring (mars 2023)",
      url: NIKE,
      tier: "secondary",
    },
    {
      label: "Norway Chess: Haaland investerer i Total Chess-turneringen",
      url: NORWAY_CHESS,
      tier: "secondary",
    },
    {
      label: "Erling Haaland, offisiell YouTube-kanal",
      url: YOUTUBE,
      tier: "secondary",
    },
    {
      label: "E24: anslått fast klubblønn 2026",
      url: E24_SALARY,
      tier: "tertiary",
    },
    {
      label: "Forbes: høyest betalte idrettsutøvere under 25 (2026)",
      url: FORBES_2026,
      tier: "tertiary",
    },
    {
      label: "Aftenposten/NTB: Kapital-anslaget på 4,1 milliarder",
      url: AFTENPOSTEN_KAPITAL,
      tier: "tertiary",
    },
    kapital400Source(),
    {
      label: "E24: Pillage 3-regnskapet",
      url: E24_PILLAGE3,
      tier: "tertiary",
    },
    {
      label: "E24: Pillage 2 i Luxembourg",
      url: E24_PILLAGE2,
      tier: "tertiary",
    },
    {
      label: "Reuters: lansering av YouTube-kanalen",
      url: REUTERS_YOUTUBE,
      tier: "tertiary",
    },
  ],
  lastVerified: "2026-08-27",
  relatedLinks: [
    { label: "Cristiano Ronaldo", href: "/formuesbyggere/cristiano-ronaldo" },
    { label: "Michael Jordan", href: "/formuesbyggere/michael-jordan" },
    { label: "Nettoformue i ordboken", href: "/ordbok/nettoformue" },
    { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
  ],
});
