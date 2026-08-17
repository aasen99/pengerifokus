/**
 * SIFO referansebudsjett for forbruksutgifter 2026.
 * Kilde: Referansebudsjettet_2026_Norsk.xlsx og SIFO-rapport 9-2026.
 * https://www.oslomet.no/om/sifo/referansebudsjettet
 */

export const SIFO_REPORT_YEAR = 2026;
export const SIFO_LAST_VERIFIED = "2026-08-17";
export const SIFO_SOURCE_URL =
  "https://www.oslomet.no/om/sifo/referansebudsjettet";

/** Stordriftseffekt på mat og drikke for par med mer enn to barn (12 %). */
export const SIFO_MAT_STORDRIFT_RABATT = 0.12;

export type SifoMemberType =
  | "kvinne_18_24"
  | "kvinne_25_50"
  | "kvinne_51_70"
  | "kvinne_70_plus"
  | "mann_18_24"
  | "mann_25_50"
  | "mann_51_70"
  | "mann_70_plus"
  | "jente_0_5mnd"
  | "jente_6_11mnd"
  | "jente_1_3"
  | "jente_4_6"
  | "jente_7_10"
  | "jente_11_14"
  | "jente_15_17"
  | "gutt_0_5mnd"
  | "gutt_6_11mnd"
  | "gutt_1_3"
  | "gutt_4_6"
  | "gutt_7_10"
  | "gutt_11_14"
  | "gutt_15_17"
  | "gravid"
  | "ammende"
  | "spedbarn_grunn_6mnd";

export interface SifoMemberRates {
  matOgDrikke: number;
  klaerOgSko: number;
  personligPleie: number;
  lekOgMediebruk: number;
}

export interface SifoMemberOption {
  id: SifoMemberType;
  label: string;
  group: "voksne" | "barn" | "spesial";
}

export const SIFO_MEMBER_OPTIONS: SifoMemberOption[] = [
  { id: "kvinne_18_24", label: "Kvinne 18–24 år", group: "voksne" },
  { id: "kvinne_25_50", label: "Kvinne 25–50 år", group: "voksne" },
  { id: "kvinne_51_70", label: "Kvinne 51–70 år", group: "voksne" },
  { id: "kvinne_70_plus", label: "Kvinne 70+ år", group: "voksne" },
  { id: "mann_18_24", label: "Mann 18–24 år", group: "voksne" },
  { id: "mann_25_50", label: "Mann 25–50 år", group: "voksne" },
  { id: "mann_51_70", label: "Mann 51–70 år", group: "voksne" },
  { id: "mann_70_plus", label: "Mann 70+ år", group: "voksne" },
  { id: "jente_0_5mnd", label: "Jente 0–5 mnd", group: "barn" },
  { id: "jente_6_11mnd", label: "Jente 6–11 mnd", group: "barn" },
  { id: "jente_1_3", label: "Jente 1–3 år", group: "barn" },
  { id: "jente_4_6", label: "Jente 4–6 år", group: "barn" },
  { id: "jente_7_10", label: "Jente 7–10 år", group: "barn" },
  { id: "jente_11_14", label: "Jente 11–14 år", group: "barn" },
  { id: "jente_15_17", label: "Jente 15–17 år", group: "barn" },
  { id: "gutt_0_5mnd", label: "Gutt 0–5 mnd", group: "barn" },
  { id: "gutt_6_11mnd", label: "Gutt 6–11 mnd", group: "barn" },
  { id: "gutt_1_3", label: "Gutt 1–3 år", group: "barn" },
  { id: "gutt_4_6", label: "Gutt 4–6 år", group: "barn" },
  { id: "gutt_7_10", label: "Gutt 7–10 år", group: "barn" },
  { id: "gutt_11_14", label: "Gutt 11–14 år", group: "barn" },
  { id: "gutt_15_17", label: "Gutt 15–17 år", group: "barn" },
  { id: "gravid", label: "Gravid", group: "spesial" },
  { id: "ammende", label: "Ammende", group: "spesial" },
  {
    id: "spedbarn_grunn_6mnd",
    label: "Spedbarn (grunnutrustning, 6 mnd før fødsel)",
    group: "spesial",
  },
];

/** Beløp per kategori og medlemstype (kr/mnd), fra Excel ark Individspes. */
export const SIFO_MEMBER_RATES: Record<SifoMemberType, SifoMemberRates> = {
  jente_0_5mnd: {
    matOgDrikke: 1_065,
    klaerOgSko: 730,
    personligPleie: 530,
    lekOgMediebruk: 160,
  },
  gutt_0_5mnd: {
    matOgDrikke: 1_065,
    klaerOgSko: 730,
    personligPleie: 530,
    lekOgMediebruk: 160,
  },
  jente_6_11mnd: {
    matOgDrikke: 2_500,
    klaerOgSko: 730,
    personligPleie: 530,
    lekOgMediebruk: 160,
  },
  gutt_6_11mnd: {
    matOgDrikke: 2_500,
    klaerOgSko: 730,
    personligPleie: 530,
    lekOgMediebruk: 160,
  },
  jente_1_3: {
    matOgDrikke: 2_180,
    klaerOgSko: 1_140,
    personligPleie: 630,
    lekOgMediebruk: 390,
  },
  gutt_1_3: {
    matOgDrikke: 2_180,
    klaerOgSko: 1_140,
    personligPleie: 630,
    lekOgMediebruk: 390,
  },
  jente_4_6: {
    matOgDrikke: 2_585,
    klaerOgSko: 900,
    personligPleie: 240,
    lekOgMediebruk: 810,
  },
  gutt_4_6: {
    matOgDrikke: 2_585,
    klaerOgSko: 900,
    personligPleie: 240,
    lekOgMediebruk: 810,
  },
  jente_7_10: {
    matOgDrikke: 3_190,
    klaerOgSko: 1_010,
    personligPleie: 270,
    lekOgMediebruk: 1_260,
  },
  gutt_7_10: {
    matOgDrikke: 3_190,
    klaerOgSko: 1_010,
    personligPleie: 270,
    lekOgMediebruk: 1_260,
  },
  jente_11_14: {
    matOgDrikke: 3_750,
    klaerOgSko: 880,
    personligPleie: 520,
    lekOgMediebruk: 1_570,
  },
  gutt_11_14: {
    matOgDrikke: 3_840,
    klaerOgSko: 860,
    personligPleie: 380,
    lekOgMediebruk: 1_570,
  },
  jente_15_17: {
    matOgDrikke: 4_120,
    klaerOgSko: 1_030,
    personligPleie: 630,
    lekOgMediebruk: 1_690,
  },
  gutt_15_17: {
    matOgDrikke: 4_640,
    klaerOgSko: 1_010,
    personligPleie: 510,
    lekOgMediebruk: 1_690,
  },
  kvinne_18_24: {
    matOgDrikke: 4_445,
    klaerOgSko: 1_090,
    personligPleie: 1_020,
    lekOgMediebruk: 1_080,
  },
  kvinne_25_50: {
    matOgDrikke: 4_280,
    klaerOgSko: 1_090,
    personligPleie: 1_020,
    lekOgMediebruk: 1_080,
  },
  kvinne_51_70: {
    matOgDrikke: 3_900,
    klaerOgSko: 1_090,
    personligPleie: 980,
    lekOgMediebruk: 1_080,
  },
  kvinne_70_plus: {
    matOgDrikke: 3_915,
    klaerOgSko: 1_090,
    personligPleie: 980,
    lekOgMediebruk: 1_080,
  },
  mann_18_24: {
    matOgDrikke: 4_945,
    klaerOgSko: 1_120,
    personligPleie: 820,
    lekOgMediebruk: 1_080,
  },
  mann_25_50: {
    matOgDrikke: 4_760,
    klaerOgSko: 1_120,
    personligPleie: 820,
    lekOgMediebruk: 1_080,
  },
  mann_51_70: {
    matOgDrikke: 4_355,
    klaerOgSko: 1_120,
    personligPleie: 820,
    lekOgMediebruk: 1_080,
  },
  mann_70_plus: {
    matOgDrikke: 4_290,
    klaerOgSko: 1_120,
    personligPleie: 820,
    lekOgMediebruk: 1_080,
  },
  gravid: {
    matOgDrikke: 4_895,
    klaerOgSko: 1_090,
    personligPleie: 1_020,
    lekOgMediebruk: 1_080,
  },
  ammende: {
    matOgDrikke: 5_950,
    klaerOgSko: 1_090,
    personligPleie: 1_020,
    lekOgMediebruk: 1_080,
  },
  spedbarn_grunn_6mnd: {
    matOgDrikke: 0,
    klaerOgSko: 730,
    personligPleie: 530,
    lekOgMediebruk: 160,
  },
};

/** Reisekostnader (Ruter 30-dagersbillett, Oslo, februar 2026). */
export const SIFO_REISEKOSTNADER = {
  barn_6_19: 338,
  voksen_20_66: 1_019,
  pensjonist_66_plus: 510,
  student_20_29: 612,
} as const;

export const SIFO_SPEDBARNSUTSTYR = {
  grunnutrustning_6mnd: 3_980,
  supplering_under_1: 535,
} as const;

/** Husholdningsspesifikke beløp per måned etter antall personer (1–7). */
export const SIFO_ANDRE_DAGLIGVARER = [
  400, 450, 630, 760, 940, 1_050, 1_120,
] as const;

export const SIFO_HUSHOLDNINGSARTIKLER = [
  590, 640, 725, 920, 995, 1_075, 1_145,
] as const;

export const SIFO_MOBler = [550, 680, 870, 990, 1_210, 1_430, 1_630] as const;

export const SIFO_MEDIEBRUK_FRITID = [
  2_570, 2_620, 2_760, 2_850, 2_880, 2_910, 2_910,
] as const;

export const SIFO_BILKOSTNADER = {
  bensin_1_4: 3_375,
  bensin_5_7: 5_105,
  el_1_4: 2_245,
  el_5_7: 3_085,
} as const;

/** Barnehage Oslo kommune, februar 2026, uten mattillegg. */
export const SIFO_BARNEHAGE = {
  hoyInntekt: { first: 1_200, second: 840, rest: 0 },
  lavInntekt: { first: 667, second: 466, rest: 0 },
  inntektGrense: 669_050,
  monthsPerYear: 11,
} as const;

/** Aktivitetsskolen (AKS) Oslo kommune, februar 2026. */
export const SIFO_AKS = {
  hoyInntekt: { heltid: 3_834, deltid: 2_589, delvisGratis: 1_242 },
  middelsInntekt: { heltid: 3_704, deltid: 2_504, delvisGratis: 537 },
  lavInntekt: { heltid: 3_704, deltid: 2_504, delvisGratis: 292 },
  grenseHoy: 520_640,
  grenseLav: 292_860,
} as const;

export interface SifoHouseholdPreset {
  id: string;
  label: string;
  description: string;
  members: SifoMemberType[];
}

export const SIFO_HOUSEHOLD_PRESETS: SifoHouseholdPreset[] = [
  {
    id: "enslig-kvinne",
    label: "Enslig kvinne 25–50 år",
    description: "Én voksen uten barn",
    members: ["kvinne_25_50"],
  },
  {
    id: "enslig-mann",
    label: "Enslig mann 25–50 år",
    description: "Én voksen uten barn",
    members: ["mann_25_50"],
  },
  {
    id: "par-uten-barn",
    label: "Par 25–50 år uten barn",
    description: "To voksne",
    members: ["kvinne_25_50", "mann_25_50"],
  },
  {
    id: "eksempelfamilie",
    label: "Eksempelfamilien Nordmann",
    description: "Par med barn på 5 og 11 år (fra rapporten)",
    members: ["kvinne_25_50", "mann_25_50", "gutt_4_6", "jente_11_14"],
  },
  {
    id: "par-barneskole",
    label: "Par med barn 7–10 år",
    description: "To voksne og ett barn",
    members: ["kvinne_25_50", "mann_25_50", "jente_7_10"],
  },
  {
    id: "enslig-med-barn",
    label: "Enslig med barn 4–6 år",
    description: "Én voksen og ett barn",
    members: ["kvinne_25_50", "gutt_4_6"],
  },
];

/**
 * Eksempelfamilie fra Excel ark Eksempelfamilie (uten barnehage/AKS i månedssum).
 * Kalkulatoren summerer tabellverdiene og gir 37 438 kr/mnd (+80 kr pga. klær i eksempelarket).
 */
export const SIFO_EXAMPLE_FAMILY = {
  members: ["kvinne_25_50", "mann_25_50", "gutt_4_6", "jente_11_14"] as const,
  monthlyTotalExcel: 37_358,
  yearlyTotalExcel: 448_296,
  barnehageYearlyExcel: 13_200,
  totalYearlyWithBarnehageExcel: 461_496,
} as const;
