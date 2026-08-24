import type { GuideArticleContent } from "@/types/guide-article";

export const stromregningOgNorgespris: Omit<
  GuideArticleContent,
  "readTimeMinutes"
> = {
  slug: "stromregning-og-norgespris",
  seoTitle: "Strømregningen forklart: nettleie, avgifter og Norgespris",
  intro:
    "Strømregningen er sjelden én pris. Den er en sum av kraftpris, nettleie, avgifter og eventuell støtte. Når du forstår postene, blir det lettere å se hvor du faktisk kan spare – og hvorfor Norgespris ofte er det tryggeste valget for vanlige husholdninger.",
  shortAnswer:
    "Regningen består av strøm (kraftpris + påslag), nettleie og offentlige avgifter. Norgespris låser kraftprisen til 50 øre/kWh inkl. mva. (40 øre i Nordland, Troms og Finnmark) opp til et månedlig forbrukstak. Du må fortsatt ha strømavtale. For de fleste i Sør-Norge lønner forutsigbarheten og taket på 50 øre seg bedre enn vanlig strømstøtte, som først gir betydelig hjelp når prisen er svært høy.",
  sections: [
    {
      heading: "Strømregningen er tre ting – ikke én",
      paragraphs: [
        "Ifølge NVE består strømregningen din av nettleie, strøm og avgifter. Noen får én samlet faktura, andre får to. Innholdet er det samme.",
      ],
      bullets: [
        "Strøm: det du betaler kraftleverandøren for energien du bruker",
        "Nettleie: det du betaler nettselskapet for å frakte strømmen hjem til deg",
        "Avgifter: mva., forbruksavgift (el-avgift) og Enova-avgift",
      ],
      tip: "Du kan bytte strømleverandør. Du kan ikke bytte nettselskap – det er monopol i ditt område.",
    },
    {
      heading: "Selve strømmen: spotpris, påslag og fastbeløp",
      paragraphs: [
        "De fleste har spotprisavtale. Da følger prisen markedet time for time. I tillegg kommer ofte et påslag per kWh og et fast månedsbeløp til leverandøren.",
        "Spotpris er ikke det samme som det du betaler totalt. Påslag og månedspris kan gjøre en «billig» avtale dyr hvis du bruker mye strøm.",
      ],
      bullets: [
        "Spotpris: markedspris per kWh (varierer gjennom døgnet)",
        "Påslag: ekstra øre/kWh til leverandøren (ofte inkludert elsertifikat)",
        "Fastbeløp: månedlig gebyr uavhengig av forbruk",
        "Avtaletype: spot, fastpris eller andre modeller – les vilkårene",
      ],
      tip: "Med Norgespris er lavt påslag og lavt fastbeløp enda viktigere. Norgespris fanger kraftprisen – ikke leverandørens ekstra gebyrer.",
    },
    {
      heading: "Nettleie: kapasitetsledd og energiledd",
      paragraphs: [
        "Nettleien betales for transport og drift av strømnettet. For privatkunder består den typisk av et kapasitetsledd (basert på hvor mye strøm du bruker samtidig) og et energiledd (pris per kWh).",
        "Bruker du mye strøm på én gang – for eksempel elbillading, ovn og varmtvann samtidig – kan kapasitetsleddet bli høyere. Spredt forbruk kan gi lavere nettleie.",
      ],
      bullets: [
        "Kapasitetsledd: månedlig beløp ut fra forbrukstopper",
        "Energiledd: pris per kWh for transport",
        "Avgifter på nettleiefakturaen: el-avgift, Enova og ofte mva.",
      ],
    },
    {
      heading: "Avgiftene på regningen",
      paragraphs: [
        "NVE trekker frem tre offentlige avgifter: merverdiavgift, Enova-avgift og forbruksavgift (el-avgift). El-avgiften betales via nettselskapet videre til staten.",
        "I Nordland, Troms og Finnmark er det egne regler for mva. på strøm. Det påvirker også Norgespris-satsen.",
      ],
    },
    {
      heading: "Hva er Norgespris?",
      paragraphs: [
        "Norgespris er en frivillig, statlig ordning som gir forutsigbar kraftpris. Ifølge NVE er prisen 50 øre per kWh inkludert mva. (40 øre uten mva. i Nordland, Troms og Finnmark).",
        "Det er ikke en ny strømavtale. Du må fortsatt ha kraftleverandør. Differansen mellom spotpris og Norgespris håndteres via nettleiefakturaen – som fradrag når spot er høyere, eller tillegg når spot er lavere.",
      ],
      bullets: [
        "Gjelder bolig og fritidsbolig",
        "Forbrukstak: 5 000 kWh/mnd for husholdning, 1 000 kWh/mnd for hytte",
        "Forbruk over taket: vanlig avtalt kraftpris",
        "Bestilles på minside.elhub.no",
        "Bindingstid til 31. desember 2026 etter 14 dagers angrerett",
        "Kan ikke kombineres med vanlig strømstøtte på samme måler",
      ],
      tip: "Har du flere målere, må du bestille Norgespris for hver måler du vil ha med.",
    },
    {
      heading: "Norgespris vs. vanlig strømstøtte",
      paragraphs: [
        "Uten Norgespris følger du spotpris og får vanlig strømstøtte når prisen er høy. Støtten dekker en andel av prisen over et terskelnivå – ikke hele regningen fra første øre.",
        "Med Norgespris betaler du i praksis 50 øre/kWh (inkl. mva.) for kraften innenfor taket – uansett om spot er 30 eller 300 øre. Du mister gevinsten ved svært lave priser, men unngår de dyre månedene.",
      ],
      table: {
        caption: "Forenklet sammenligning (kraftpris)",
        rows: [
          { label: "Norgespris", value: "Fast 50 øre/kWh inkl. mva. innenfor tak" },
          {
            label: "Vanlig strømstøtte",
            value: "Spotpris + støtte først når prisen er svært høy",
          },
          {
            label: "Når spot er 40 øre",
            value: "Norgespris: 50 øre. Støtte: ca. 40 øre (+ påslag)",
          },
          {
            label: "Når spot er 150 øre",
            value: "Norgespris: 50 øre. Støtte: du betaler fortsatt mye før støtten hjelper",
          },
        ],
      },
    },
    {
      heading: "Hvorfor Norgespris lønner seg for de fleste",
      paragraphs: [
        "Det avgjørende er ikke om spot er litt under 50 øre noen timer. Det er hva du betaler gjennom en hel vinter – og hvor mye usikkerhet du tåler i budsjettet.",
      ],
      bullets: [
        "Tak på 50 øre: du betaler ikke 70–200 øre for kraften når markedet stiger",
        "Vanlig støtte hjelper sent: mellom «grei» og «ekstrem» pris betaler du full spot",
        "Forutsigbarhet: strøm er en fast kostnad – stabile utgifter gjør budsjettet enklere",
        "Hytta kan også være med: fritidsbolig har eget tak på 1 000 kWh/mnd",
        "Du beholder valgfrihet på leverandør: bytt fortsatt til lavt påslag",
      ],
      tip: "Norgespris lønner seg særlig hvis du bor i områder med høye og svingende priser, har høyt vinterforbruk, eller vil unngå at én dyr måned ødelegger budsjettet.",
    },
    {
      heading: "Når kan vanlig støtte være bedre?",
      paragraphs: [
        "Hvis spotprisen ligger under 50 øre over lang tid, og du sjelden får dyre topper, kan du betale litt mer med Norgespris enn med spot + støtte. Da «kjøper» du i praksis forsikring.",
        "For mange er den forsikringen verdt det. Strøm er ikke et spekulasjonsobjekt – det er varme, matlaging og ladning du uansett trenger.",
      ],
    },
    {
      heading: "Slik får du mest ut av Norgespris",
      bullets: [
        "Bestill via minside.elhub.no (ikke tilfeldige lenker i e-post)",
        "Behold eller bytt til strømavtale med lavt/null påslag og lavt fastbeløp",
        "Spre forbruket for lavere kapasitetsledd i nettleien",
        "Sjekk om hytta også bør være med",
        "Husk: binding etter angreretten – avtalen følger målepunktet ut 2026",
      ],
    },
    {
      heading: "Penger i Fokus-vurdering",
      paragraphs: [
        "Forstå postene først: strøm, nettleie og avgifter. Deretter velg Norgespris hvis du vil ha tak på kraftprisen og ro i budsjettet. Kutt deretter påslag og unødvendig samtidighetsforbruk.",
        "Norgespris er ikke magi – nettleie og avgifter blir igjen. Men for kraftprisen er 50 øre en klar og forståelig ramme, og det er nettopp det de fleste trenger.",
      ],
    },
  ],
  faq: [
    {
      question: "Er Norgespris en strømavtale?",
      answer:
        "Nei. Ifølge NVE er Norgespris en statlig ordning for forutsigbar kraftpris. Du må fortsatt ha avtale med en strømleverandør.",
    },
    {
      question: "Hva koster Norgespris?",
      answer:
        "50 øre per kWh inkludert mva. for de fleste. I Nordland, Troms og Finnmark er satsen 40 øre per kWh uten mva. I tillegg kommer nettleie, avgifter og eventuelle påslag/fastbeløp fra leverandøren.",
    },
    {
      question: "Kan jeg ha både Norgespris og strømstøtte?",
      answer:
        "Nei. NVE oppgir at du ikke kan få både vanlig strømstøtte og Norgespris samtidig på samme måler.",
    },
    {
      question: "Hvor bestiller jeg Norgespris?",
      answer:
        "På minside.elhub.no. Trenger du hjelp, kontakt nettselskapet ditt. Unngå å klikke på tilfeldige lenker i e-post.",
    },
    {
      question: "Hva skjer hvis jeg bruker mer enn 5 000 kWh på én måned?",
      answer:
        "Forbruk innenfor taket går til Norgespris. Forbruk over taket betales etter prisen du har avtalt med kraftleverandøren. For hytter er taket 1 000 kWh per måned.",
    },
  ],
  sources: [
    {
      label: "NVE – Dette er Norgespris",
      url: "https://www.nve.no/reguleringsmyndigheten/kunde/stroem/dette-er-norgespris/",
    },
    {
      label: "NVE – Strømregningen din",
      url: "https://www.nve.no/reguleringsmyndigheten/kunde/stroem/stroemregningen-din/",
    },
    {
      label: "Elhub – Min side (bestilling)",
      url: "https://minside.elhub.no",
    },
  ],
  conclusion:
    "Les regningen som tre deler. Lås kraftprisen med Norgespris hvis du vil ha forutsigbarhet. Optimaliser deretter påslag og nettleie – det er der du fortsatt har handlingsrom.",
  relatedLinks: [
    { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
    { label: "Forstå økonomisk helse", href: "/guider/forstaa-okonomisk-helse" },
    { label: "SIFO-budsjett", href: "/guider/sifo-budsjett" },
    { label: "Økonomisk røntgen", href: "/verktoy/okonomisk-rontgen" },
  ],
};
