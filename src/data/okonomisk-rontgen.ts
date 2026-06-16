import type {
  RontgenCategory,
  RontgenQuestion,
  RontgenResultBand,
} from "@/types/okonomisk-rontgen";

export const RONTGEN_CATEGORY_LABELS: Record<RontgenCategory, string> = {
  buffer: "Buffer",
  gjeld: "Gjeld",
  kostnader: "Faste kostnader",
  sparing: "Sparing",
  trygghet: "Økonomisk trygghet",
};

export const rontgenQuestions: RontgenQuestion[] = [
  {
    id: "buffer-months",
    text: "Hvor mange måneder med nødvendige utgifter dekker bufferen din?",
    category: "buffer",
    options: [
      { id: "none", label: "Ingen buffer", points: 0 },
      { id: "under-1", label: "Under 1 måned", points: 2 },
      { id: "1-2", label: "1–2 måneder", points: 5 },
      { id: "3-5", label: "3–5 måneder", points: 8 },
      { id: "6-plus", label: "6 måneder eller mer", points: 10 },
    ],
  },
  {
    id: "income-stability",
    text: "Hvor stabil er hovedinntekten din?",
    category: "trygghet",
    options: [
      { id: "very-unstable", label: "Svært usikker eller varierende", points: 1 },
      { id: "somewhat-unstable", label: "Noe usikker", points: 4 },
      { id: "stable", label: "Relativt stabil", points: 7 },
      { id: "very-stable", label: "Svært stabil", points: 10 },
    ],
  },
  {
    id: "fixed-costs-share",
    text: "Hvor stor andel av inntekten går til faste utgifter?",
    helpText:
      "Faste utgifter er blant annet bolig, strøm, transport, forsikringer, lån og abonnementer.",
    category: "kostnader",
    options: [
      { id: "over-80", label: "Over 80 %", points: 0 },
      { id: "65-80", label: "65–80 %", points: 3 },
      { id: "50-64", label: "50–64 %", points: 6 },
      { id: "35-49", label: "35–49 %", points: 8 },
      { id: "under-35", label: "Under 35 %", points: 10 },
    ],
  },
  {
    id: "consumer-debt",
    text: "Har du forbruksgjeld eller kredittkortgjeld som ikke betales fullt hver måned?",
    category: "gjeld",
    options: [
      { id: "growing", label: "Ja, og saldoen øker", points: 0 },
      { id: "paying-down", label: "Ja, og jeg betaler den gradvis ned", points: 3 },
      { id: "controlled", label: "Litt, men den er under kontroll", points: 6 },
      { id: "none", label: "Nei", points: 10 },
    ],
  },
  {
    id: "savings-rate",
    text: "Hvor stor del av inntekten sparer eller investerer du vanligvis?",
    category: "sparing",
    options: [
      { id: "nothing", label: "Ingenting", points: 0 },
      { id: "under-5", label: "Under 5 %", points: 3 },
      { id: "5-10", label: "5–10 %", points: 6 },
      { id: "11-20", label: "11–20 %", points: 8 },
      { id: "over-20", label: "Over 20 %", points: 10 },
    ],
  },
  {
    id: "bills-on-time",
    text: "Betaler du regninger innen forfallsdato?",
    category: "trygghet",
    options: [
      { id: "often-late", label: "Ofte for sent", points: 0 },
      { id: "sometimes-late", label: "Av og til for sent", points: 4 },
      { id: "almost-always", label: "Nesten alltid i tide", points: 8 },
      { id: "always", label: "Alltid i tide eller med AvtaleGiro", points: 10 },
    ],
  },
  {
    id: "spending-awareness",
    text: "Vet du omtrent hvor mye du bruker hver måned?",
    category: "kostnader",
    options: [
      { id: "no", label: "Nei", points: 0 },
      { id: "vague", label: "Jeg har en vag oversikt", points: 4 },
      { id: "good", label: "Jeg har ganske god oversikt", points: 7 },
      { id: "active", label: "Ja, jeg følger aktivt med", points: 10 },
    ],
  },
  {
    id: "unexpected-expense",
    text: "Hvordan ville økonomien din tålt en uventet utgift på 20 000 kroner?",
    category: "buffer",
    options: [
      { id: "credit", label: "Jeg måtte tatt opp lån eller brukt kreditt", points: 0 },
      { id: "very-hard", label: "Det ville vært svært vanskelig", points: 3 },
      { id: "reduced-buffer", label: "Jeg kunne håndtert det, men bufferen ville blitt kraftig redusert", points: 7 },
      { id: "no-problem", label: "Jeg kunne betalt uten store problemer", points: 10 },
    ],
  },
  {
    id: "debt-savings-plan",
    text: "Har du en konkret plan for gjeld og sparing?",
    category: "sparing",
    options: [
      { id: "no", label: "Nei", points: 0 },
      { id: "thought", label: "Jeg har tenkt på det, men ingen plan", points: 3 },
      { id: "simple", label: "Jeg har en enkel plan", points: 7 },
      { id: "clear", label: "Jeg har tydelige mål og følger dem opp", points: 10 },
    ],
  },
  {
    id: "income-dependency",
    text: "Hvor avhengig er økonomien din av én enkelt inntekt?",
    category: "trygghet",
    options: [
      { id: "fully-dependent", label: "Helt avhengig, uten buffer eller sikkerhetsnett", points: 1 },
      { id: "mainly-dependent", label: "Hovedsakelig avhengig av én inntekt", points: 4 },
      { id: "one-with-buffer", label: "Én hovedinntekt, men god buffer eller forsikringer", points: 7 },
      { id: "diversified", label: "Flere inntektskilder eller svært god økonomisk sikkerhet", points: 10 },
    ],
  },
];

export const rontgenResultBands: RontgenResultBand[] = [
  {
    minScore: 0,
    maxScore: 29,
    title: "Økonomien din er sårbar",
    text: "Små økonomiske overraskelser kan få store konsekvenser. Det viktigste nå er å skape oversikt og bygge et lite sikkerhetsnett.",
  },
  {
    minScore: 30,
    maxScore: 49,
    title: "Du har noe å bygge videre på",
    text: "Flere deler av økonomien fungerer, men du har enkelte svakheter som gjør deg utsatt dersom inntekten faller eller utgiftene øker.",
  },
  {
    minScore: 50,
    maxScore: 69,
    title: "Økonomien din er forholdsvis robust",
    text: "Du har et godt grunnlag, men noen målrettede grep kan gi betydelig bedre økonomisk trygghet.",
  },
  {
    minScore: 70,
    maxScore: 84,
    title: "Du har en sterk økonomisk grunnmur",
    text: "Du har god kontroll på store deler av økonomien og tåler sannsynligvis moderate økonomiske overraskelser.",
  },
  {
    minScore: 85,
    maxScore: 100,
    title: "Økonomien din er svært robust",
    text: "Du har høy økonomisk motstandskraft, god oversikt og sterke vaner. Fortsett å følge opp økonomien slik at den gode utviklingen varer.",
  },
];

export const RONTGEN_DISCLAIMER =
  "Økonomisk røntgen er en forenklet temperaturmåling basert på svarene dine. Resultatet er ikke personlig økonomisk rådgivning og tar ikke hensyn til alle deler av din økonomiske situasjon.";

export const RONTGEN_COPY_SITE_NAME = "Penger i Fokus";
