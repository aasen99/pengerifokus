import type { UtleieboligInput } from "@/types/utleiebolig";

export const UTLEIEBOLIG_DEFAULTS: UtleieboligInput = {
  purchasePrice: 3_000_000,
  downPayment: 600_000,
  purchaseCosts: 50_000,
  annualRatePercent: 5.5,
  termYears: 25,
  monthlyRent: 18_000,
  vacancyRatePercent: 5,
  monthlyCommonCosts: 3_000,
  monthlyInsurance: 500,
  monthlyMaintenance: 2_500,
  monthlyPropertyTax: 500,
  monthlyManagementFee: 0,
  taxRatePercent: 22,
};
