import {
  DOCUMENT_FEE_RATE,
  INTEREST_DEDUCTION_RATE,
  SHARE_GAIN_TAX_RATE,
} from "@/data/eie-leie";
import type {
  UtleieboligHousingType,
  UtleieboligInput,
} from "@/types/utleiebolig";

/** Typical seller-side costs (megler, markedsføring) as % of sale price. */
export const UTLEIEBOLIG_DEFAULT_SALE_COST_PERCENT = 2;

/** Tinglysing of deed + mortgage document, rounded with a small buffer. */
export const UTLEIEBOLIG_DEFAULT_REGISTRATION_FEE = 2_000;

export const UTLEIEBOLIG_HOUSING_TYPES: ReadonlyArray<{
  value: UtleieboligHousingType;
  label: string;
  hint: string;
}> = [
  {
    value: "selveier",
    label: "Selveier",
    hint: "Dokumentavgift 2,5 % av kjøpesum",
  },
  {
    value: "andelsbolig",
    label: "Andelsbolig (borettslag)",
    hint: "Normalt ingen dokumentavgift",
  },
  {
    value: "aksjeleilighet",
    label: "Aksjeleilighet",
    hint: "Normalt ingen dokumentavgift",
  },
];

export const UTLEIEBOLIG_TOOLTIPS = {
  documentFee:
    "Statlig avgift ved kjøp av selveierbolig (2,5 % av kjøpesum). Borettslag og aksjeleiligheter har normalt ikke dokumentavgift.",
  registrationFee:
    "Tinglysing av skjøte og pantedokument som kjøper betaler. Meglerhonorar betales av selger og er ikke med her.",
  appraisalFee:
    "Takst, due diligence eller andre undersøkelser du som kjøper faktisk betaler. Tilstandsrapport betales ofte av selger.",
  saleCosts:
    "Megler, markedsføring og andre kostnader ved salg. Trekkes fra boligverdien i den langsiktige sammenligningen. Selger betaler normalt dette, ikke kjøper ved innkjøp.",
} as const;

export function createDefaultUtleieboligInput(): UtleieboligInput {
  const purchasePrice = 3_000_000;
  const housingType: UtleieboligHousingType = "selveier";

  return {
    purchasePrice,
    downPayment: 600_000,
    housingType,
    autoDocumentFee: true,
    documentFee: Math.round(purchasePrice * DOCUMENT_FEE_RATE),
    registrationFee: UTLEIEBOLIG_DEFAULT_REGISTRATION_FEE,
    appraisalFee: 0,
    otherBuyerCosts: 0,
    annualRatePercent: 5.5,
    termYears: 25,
    monthlyRent: 18_000,
    vacancyMonthsPerYear: 0.6,
    monthlyCommonCosts: 3_000,
    monthlyInsurance: 500,
    monthlyMaintenance: 2_500,
    monthlyPropertyTax: 500,
    monthlyManagementFee: 0,
    taxRatePercent: INTEREST_DEDUCTION_RATE * 100,
    shareGainTaxPercent: Math.round(SHARE_GAIN_TAX_RATE * 10000) / 100,
    propertyGrowthPercent: 3,
    fundReturnPercent: 7,
    projectionYears: 10,
    saleCostPercent: UTLEIEBOLIG_DEFAULT_SALE_COST_PERCENT,
    saleCostFixed: 0,
  };
}

export const UTLEIEBOLIG_DEFAULTS = createDefaultUtleieboligInput();
