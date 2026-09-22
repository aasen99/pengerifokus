import type { GuideArticleContent } from "@/types/guide-article";

export const halvSkatt: Omit<GuideArticleContent, "readTimeMinutes"> = {
  slug: "halv-skatt",
  seoTitle: "Halv skatt 2026: November eller desember?",
  intro:
    "Mange får halvt skattetrekk på vanlig lønn før jul. Det betyr ikke at lønnen er beskattet lavere for året – bare at forskuddstrekket er fordelt annerledes. Her ser du hvilken måned det kan komme, hva som vanligvis omfattes, og hvordan du unngår å bruke hele forskjellen ved en feil.",
  shortAnswer:
    "Arbeidsgiver kan legge halvt skattetrekk på vanlig lønn i november eller desember. Overtid, bonus og spesielle honorarer har normalt fullt skattetrekk. Ordningen gir ikke lavere årsskatt: du trekkes litt mer de øvrige månedene for å få lavere trekk før jul.",
  sections: [
    {
      heading: "Hva betyr halv skatt?",
      paragraphs: [
        "«Halv skatt» er egentlig halvt forskuddstrekk. Skatten beregnes for hele inntektsåret, mens trekket på lønnsslippene fordeles over færre enn tolv fulle trekkmåneder. Feriepenger er normalt trekkfrie ved utbetaling, og vanlig lønn før jul har halvt trekk.",
        "Du får derfor mer utbetalt den aktuelle måneden, men den samlede skatten blir ikke automatisk lavere. Er skattekortet feil, kan du fortsatt få restskatt eller penger tilbake.",
      ],
      tip: "Tenk på forskjellen som allerede planlagt kontantstrøm, ikke som en julebonus fra staten.",
    },
    {
      heading: "November eller desember?",
      paragraphs: [
        "For månedslønn kan arbeidsgiver gjennomføre det reduserte trekket i november eller desember. Sjekk lønnskalenderen, intranettet eller spør lønnskontoret dersom du trenger å vite nøyaktig hvilken utbetaling som får halvt trekk.",
        "Har du flere arbeidsgivere, kan lønnsslippene behandles ulikt. Pass også på at hovedarbeidsgiveren bruker tabelltrekk og at andre utbetalere bruker prosenten som står på skattekortet.",
      ],
    },
    {
      heading: "Et forenklet regneeksempel",
      paragraphs: [
        "Eksemplet bruker en bruttolønn på 50 000 kroner og et vanlig skattetrekk på 15 000 kroner. Faktisk trekk avhenger av skattekort, inntekt, fradrag og andre ytelser.",
      ],
      table: {
        caption: "Eksempel på vanlig og halvt skattetrekk",
        rows: [
          {
            label: "Vanlig måned",
            value: "50 000 kr brutto − 15 000 kr trekk = 35 000 kr utbetalt",
          },
          {
            label: "Måned med halvt trekk",
            value: "50 000 kr brutto − 7 500 kr trekk = 42 500 kr utbetalt",
          },
          {
            label: "Midlertidig forskjell",
            value: "7 500 kr mer utbetalt denne måneden",
          },
        ],
      },
    },
    {
      heading: "Hva får fullt skattetrekk?",
      paragraphs: [
        "Skatteetaten presiserer at halvt trekk før jul bare gjelder vanlig lønn. Disse utbetalingene har normalt fullt trekk:",
      ],
      bullets: [
        "Overtid",
        "Bonus",
        "Spesielle honorarer",
        "Andre utbetalinger som ikke regnes som vanlig lønn",
      ],
      tip: "Lønnssystemet kan vise én samlet trekkprosent på lønnsslippen selv om ulike deler av utbetalingen er behandlet forskjellig. Se på trekkgrunnlaget eller spør lønnskontoret.",
    },
    {
      heading: "Pensjon, NAV og kildeskatt kan følge andre regler",
      paragraphs: [
        "Pensjon og enkelte ytelser har egne trekkperioder. Pensjon har normalt en trekkfri måned før jul i stedet for halvt trekk. Utbetalinger fra NAV kan variere etter ytelse og tidspunkt.",
        "Er du i ordningen med kildeskatt på lønn, har du ikke trekkfri feriepengemåned eller halvt skattetrekk før jul. Kontroller derfor reglene som gjelder akkurat din utbetaling.",
      ],
    },
    {
      heading: "Slik bruker du den ekstra utbetalingen smart",
      bullets: [
        "Sett av penger til kjente juleutgifter før du begynner å handle",
        "Fyll opp en manglende buffer",
        "Betal ned kredittkort eller annen dyr gjeld",
        "Sett av til årsregninger som kommer i januar",
        "Kontroller skattekortet hvis inntekt, rente eller gjeld har endret seg",
      ],
      cta: {
        heading: "Gi hver krone en jobb",
        description:
          "Legg inn inntekt, utgifter, gjeld og sparing på én enkel tavle.",
        buttonText: "Åpne Luksusfellen-tavlen",
        href: "/verktoy/luksusfelle-tavle",
        analyticsEvent: "guide_halv_skatt_cta",
      },
    },
  ],
  faq: [
    {
      question: "Er det halv skatt i november eller desember 2026?",
      answer:
        "For vanlig månedslønn kan arbeidsgiver legge halvt skattetrekk til november eller desember. Sjekk arbeidsgiverens lønnskalender for riktig måned.",
    },
    {
      question: "Betaler jeg mindre skatt totalt?",
      answer:
        "Nei. Halvt trekk før jul endrer normalt bare når skatten trekkes, ikke hvor mye skatt du skal betale for hele året.",
    },
    {
      question: "Er det halv skatt på bonus og overtid?",
      answer:
        "Normalt nei. Skatteetaten oppgir at overtid, bonus og spesielle honorarer har fullt skattetrekk.",
    },
    {
      question: "Kan jeg be om fullt skattetrekk?",
      answer:
        "Du kan be arbeidsgiveren trekke mer skatt enn skattekortet tilsier. Det kan være aktuelt hvis du frykter restskatt, men oppdater gjerne skattekortet først.",
    },
  ],
  sources: [
    {
      label: "Skatteetaten: tallene i skattekortet",
      url: "https://www.skatteetaten.no/person/skatt/skattekort/om-skattekortet/tallene-i-skattekortet/",
    },
    {
      label: "Skatteetaten: kildeskatt på lønn",
      url: "https://www.skatteetaten.no/person/utenlandsk/skal-du-arbeide-i-norge/skattekort/kildeskatt-pa-lonn/",
    },
  ],
  conclusion:
    "Halvt skattetrekk gir bedre likviditet før jul, men ingen skatterabatt. Finn riktig utbetalingsmåned, skill vanlig lønn fra bonus og overtid, og bestem på forhånd hvor den midlertidige forskjellen skal gå.",
  relatedLinks: [
    { label: "SIFO-budsjett 2026", href: "/guider/sifo-budsjett" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    {
      label: "Forstå økonomisk helse",
      href: "/guider/forstaa-okonomisk-helse",
    },
    { label: "Emne: budsjett", href: "/emner/budsjett" },
  ],
};
