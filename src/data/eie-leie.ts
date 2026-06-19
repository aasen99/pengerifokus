import type { EieLeieInput, ScenarioPreset, ScenarioValues } from "@/types/eie-leie";

export const EIE_LEIE_DISCLAIMER =
  "Kalkulatoren er en forenklet sammenligning og er ikke personlig økonomisk rådgivning. Faktiske renter, boligpriser, kostnader, skatter og investeringsresultater kan avvike betydelig.";

export const EIE_LEIE_INTRO_NOTE =
  "Kalkulatoren gir et estimat basert på forutsetningene du legger inn. Den kan ikke forutsi boligpriser, renter eller investeringsavkastning.";

export const EIE_LEIE_CASH_FLOW_NOTE =
  "Kalkulatoren sammenligner lik kontantstrøm måned for måned. Eier betaler terminbeløp, felleskostnader og vedlikehold. Leieren betaler husleie. Hvis eie koster mer enn leie, investerer leieren differansen. Hvis husleien er høyere, investerer eieren overskuddet. Avdrag er en utgift for eieren den måneden, men bygger egenkapital i boligen og investeres ikke på nytt.";

export const DOCUMENT_FEE_RATE = 0.025;

export const EIE_LEIE_TOOLTIPS = {
  alternativeReturn:
    "Avkastningen du forventer hvis pengene investeres i fond eller annet spareprodukt i stedet for å ligge i bolig.",
  netWorth:
    "Det du sitter igjen med når gjeld og salgskostnader er trukket fra: pluss eventuelle investeringer.",
  propertyGrowth:
    "Forventet årlig prisvekst på boligen. Historisk har det variert mye mellom regioner og perioder.",
  documentFee:
    "Statlig avgift ved kjøp av selveierbolig (2,5 % av kjøpesum). Borettslag har normalt ikke dokumentavgift.",
  maintenance:
    "Løpende kostnader til oppussing, reparasjoner og utskiftning over tid, ofte 0,5–2 % av verdien per år.",
  saleCosts:
    "Megler, markedsføring og andre kostnader ved salg. Trekkes fra boligverdien ved slutten av perioden.",
  sharedDebt:
    "Fellesgjeld i borettslag eller sameie. Legges til det du må finansiere, men følger ikke nødvendigvis boligprisveksten.",
} as const;

export const GROWTH_PRESETS = [
  { label: "Forsiktig", value: 0 },
  { label: "Normal", value: 2.5 },
  { label: "Optimistisk", value: 5 },
] as const;

export const INVESTMENT_PRESETS = [
  { label: "Forsiktig", value: 3 },
  { label: "Normal", value: 6 },
  { label: "Optimistisk", value: 8 },
] as const;

export const SCENARIO_PRESETS: Record<ScenarioPreset, ScenarioValues> = {
  forsiktig: {
    label: "Forsiktig",
    propertyGrowthPercent: 0,
    nominalRatePercent: 6.5,
    investmentReturnPercent: 4,
  },
  normal: {
    label: "Normal",
    propertyGrowthPercent: 2.5,
    nominalRatePercent: 5,
    investmentReturnPercent: 6,
  },
  optimistisk: {
    label: "Optimistisk",
    propertyGrowthPercent: 5,
    nominalRatePercent: 4,
    investmentReturnPercent: 8,
  },
};

export const WIZARD_STEPS = [
  { id: "horizon", title: "Tidshorisont" },
  { id: "bolig", title: "Boligen" },
  { id: "lan", title: "Lånet" },
  { id: "eier", title: "Eierkostnader" },
  { id: "leie", title: "Leiealternativet" },
  { id: "invest", title: "Investering" },
  { id: "result", title: "Resultat" },
] as const;

export function createDefaultEieLeieInput(): EieLeieInput {
  const purchasePrice = 4_000_000;
  const equity = 800_000;

  return {
    horizonYears: 5,
    purchasePrice,
    equity,
    sharedDebt: 0,
    isBorettslag: false,
    autoDocumentFee: true,
    documentFee: Math.round(purchasePrice * DOCUMENT_FEE_RATE),
    registrationAndFees: 15_000,
    loanEstablishmentCost: 5_000,
    otherPurchaseCosts: 0,
    nominalRatePercent: 5,
    loanTermYears: 25,
    loanType: "annuitet",
    interestOnlyMonths: 0,
    commonFees: 4_000,
    municipalFees: 0,
    propertyTax: 0,
    insurance: 500,
    includeUtilities: false,
    utilities: 2_000,
    includeInternet: false,
    internet: 600,
    otherOwnerFixed: 0,
    maintenanceMode: "percent",
    maintenanceMonthly: 3_000,
    maintenancePercentAnnual: 1,
    propertyGrowthPercent: 2.5,
    saleCostMode: "percent",
    saleCostFixed: 0,
    saleCostPercent: 2,
    monthlyRent: 15_000,
    annualRentIncreasePercent: 2.5,
    depositAmount: 45_000,
    depositReturnPercent: 3,
    investmentReturnPercent: 6,
    investmentCostPercent: 0,
  };
}
