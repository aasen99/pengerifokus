import type { GuideArticleContent } from "@/types/guide-article";

export const bsuEllerFond: Omit<GuideArticleContent, "readTimeMinutes"> = {
  slug: "bsu-eller-fond",
  seoTitle: "BSU eller fond i 2026: Hva bør du velge først?",
  intro:
    "BSU gir skattefradrag og trygg sparing til bolig, mens aksjefond gir større frihet og mulighet for høyere langsiktig avkastning. Det riktige valget avhenger først og fremst av om du får skattefradraget, når du trenger pengene og hva de skal brukes til.",
  shortAnswer:
    "Får du fullt BSU-fradrag og sparer til bolig, er BSU ofte et naturlig førstevalg. I 2026 er fradraget 10 prosent av innskuddet, med maksimalt årlig innskudd på 27 500 kroner. Fond passer bedre for langsiktige penger du vil bruke fritt, men verdien kan falle når du trenger dem.",
  topCta: {
    heading: "Se BSU-effekten med dine tall",
    description:
      "Regn ut mulig skattefradrag, innskudd og hvor mye plass du har igjen på BSU.",
    buttonText: "Åpne BSU-kalkulatoren",
    href: "/verktoy/bsu-kalkulator",
    analyticsEvent: "guide_bsu_fond_top_cta",
  },
  sections: [
    {
      heading: "BSU-reglene i 2026",
      bullets: [
        "Du kan spare inntil 27 500 kroner i året",
        "Samlet innbetalt sparebeløp kan være inntil 300 000 kroner",
        "Skattefradraget er 10 prosent av godkjent innskudd",
        "Maksimalt fradrag ved fullt årsinnskudd er 2 750 kroner",
        "Du kan spare til og med året du fyller 33 år",
        "Du får ikke fradrag dersom du eier primær- eller sekundærbolig ved årsslutt",
      ],
      paragraphs: [
        "Du må betale nok skatt til å bruke fradraget. Et ubrukt BSU-fradrag kan ikke uten videre flyttes til et senere år. Banken må også ha registrert innbetalingen før årsskiftet.",
      ],
      tip: "Sjekk vilkårene før du fyller opp kontoen. Har du lav skatt, kan det være bedre å fordele innskuddet eller vente til et år der du kan bruke mer av fradraget.",
    },
    {
      heading: "BSU og fond side om side",
      table: {
        caption: "De viktigste forskjellene",
        rows: [
          {
            label: "Avkastning",
            value: "BSU: avtalt bankrente + mulig skattefradrag · Fond: usikker markedsavkastning",
          },
          {
            label: "Risiko",
            value: "BSU: lav · Aksjefond: verdien kan svinge mye",
          },
          {
            label: "Bruk av pengene",
            value: "BSU: boligformål etter reglene · Fond: fritt formål",
          },
          {
            label: "Tidshorisont",
            value: "BSU: kan passe frem mot boligkjøp · Aksjefond: helst minst 5–10 år",
          },
          {
            label: "Skatt",
            value: "BSU: mulig fradrag ved innskudd · Aksjefond: skatt på skattepliktig gevinst",
          },
          {
            label: "Beløpsgrense",
            value: "BSU: 27 500 kr per år og 300 000 kr totalt · Fond: ingen tilsvarende sparegrense",
          },
        ],
      },
    },
    {
      heading: "Hvor mye er skattefradraget verdt?",
      paragraphs: [
        "Setter du inn 27 500 kroner og kan bruke hele fradraget, reduseres skatten med 2 750 kroner. Det tilsvarer 10 prosent av innskuddet i tillegg til bankrenten det første året.",
        "Dette er ikke det samme som 10 prosent årlig avkastning. Fradraget kommer én gang for hvert godkjent innskudd, mens renten opptjenes over tid. Sammenlign derfor både fradrag, BSU-rente, tidshorisont og fleksibilitet.",
      ],
      table: {
        caption: "BSU-fradrag ved ulike innskudd",
        rows: [
          { label: "5 000 kr", value: "Inntil 500 kr i skattefradrag" },
          { label: "10 000 kr", value: "Inntil 1 000 kr i skattefradrag" },
          { label: "20 000 kr", value: "Inntil 2 000 kr i skattefradrag" },
          { label: "27 500 kr", value: "Inntil 2 750 kr i skattefradrag" },
        ],
      },
    },
    {
      heading: "Når bør BSU komme først?",
      bullets: [
        "Du kvalifiserer til og kan bruke hele eller mesteparten av fradraget",
        "Du sparer til egen bolig eller nedbetaling av lån på egen bolig",
        "Boligkjøpet kan komme så snart at aksjefond blir for risikabelt",
        "BSU-renten er konkurransedyktig sammenlignet med andre sparekontoer",
        "Du ønsker en tydelig sperre mot å bruke pengene på andre ting",
      ],
    },
    {
      heading: "Når kan fond passe bedre?",
      bullets: [
        "Du eier bolig og får derfor ikke BSU-fradrag",
        "Du har minst 5–10 års tidshorisont og tåler fall underveis",
        "Pengene skal kunne brukes til noe annet enn bolig",
        "BSU-kvoten er allerede fylt opp",
        "Du betaler så lite skatt at fradraget har begrenset verdi akkurat nå",
      ],
      tip: "Skal pengene brukes til egenkapital de nærmeste årene, er aksjefond ofte feil sted selv om forventet avkastning er høyere. Et børsfall følger ikke boligplanen din.",
    },
    {
      heading: "En enkel prioriteringsrekkefølge",
      bullets: [
        "Bygg en liten buffer som tåler uforutsette utgifter",
        "Betal ned kredittkort og annen dyr gjeld",
        "Bruk BSU dersom du får god nytte av fradraget og sparer til bolig",
        "Sett langsiktige penger utover dette i et bredt og rimelig fond dersom risikoen passer",
      ],
      paragraphs: [
        "Du trenger ikke velge enten–eller. Mange fyller BSU gradvis gjennom året og setter et mindre fast beløp i fond samtidig. Da bygger du både boligkapital og en fri, langsiktig portefølje.",
      ],
    },
  ],
  faq: [
    {
      question: "Hvor mye kan jeg spare i BSU i 2026?",
      answer:
        "Du kan sette inn inntil 27 500 kroner i 2026. Samlet innbetalt sparebeløp på BSU kan være inntil 300 000 kroner.",
    },
    {
      question: "Hvor stort er BSU-fradraget i 2026?",
      answer:
        "Fradraget er 10 prosent av godkjent innskudd. Setter du inn maksbeløpet på 27 500 kroner og kan bruke hele fradraget, er skattereduksjonen 2 750 kroner.",
    },
    {
      question: "Kan jeg ha både BSU og fond?",
      answer:
        "Ja. BSU og fond dekker ulike behov. BSU kan brukes til bolig etter reglene, mens fond kan være fri, langsiktig sparing.",
    },
    {
      question: "Bør egenkapital stå i aksjefond?",
      answer:
        "Ikke hvis boligkjøpet er nært. Aksjefond kan falle mye på kort sikt. Penger du trenger de nærmeste årene passer ofte bedre på konto med lav risiko.",
    },
  ],
  sources: [
    {
      label: "Skatteetaten: satser for BSU-fradrag",
      url: "https://www.skatteetaten.no/satser/fradrag-for-boligsparing-for-ungdom-bsu/",
    },
    {
      label: "Skatteetaten: boligsparing for ungdom",
      url: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bank-og-lan/bsu/",
    },
    {
      label: "Skatteetaten: skatt på aksjegevinst og utbytte",
      url: "https://www.skatteetaten.no/satser/faktor-for-oppjustering-av-gevinsttap-eller-utbytte-pa-aksjer/",
    },
  ],
  conclusion:
    "BSU er ofte vanskelig å slå når du får hele skattefradraget og sparer til bolig. Fond vinner på fleksibilitet og langsiktig vekstmulighet. Velg etter formål og tid – og kombiner gjerne når økonomien tillater det.",
  bottomCta: {
    heading: "Hvor mye får du i BSU-fradrag?",
    description:
      "Test innskuddet ditt og se mulig skattefordel før årsskiftet.",
    buttonText: "Regn på BSU",
    href: "/verktoy/bsu-kalkulator",
    analyticsEvent: "guide_bsu_fond_bottom_cta",
  },
  relatedLinks: [
    { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
    { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Emne: sparing og investering", href: "/emner/sparing-og-investering" },
  ],
};
