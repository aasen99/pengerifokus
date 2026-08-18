export type UtleieboligHousingType =
  | "selveier"
  | "andelsbolig"
  | "aksjeleilighet";

export type UtleieboligMode = "simple" | "advanced";

export interface UtleieboligInput {
  purchasePrice: number;
  downPayment: number;
  housingType: UtleieboligHousingType;
  autoDocumentFee: boolean;
  documentFee: number;
  registrationFee: number;
  appraisalFee: number;
  otherBuyerCosts: number;
  annualRatePercent: number;
  termYears: number;
  monthlyRent: number;
  vacancyMonthsPerYear: number;
  monthlyCommonCosts: number;
  monthlyInsurance: number;
  monthlyMaintenance: number;
  monthlyPropertyTax: number;
  monthlyManagementFee: number;
  taxRatePercent: number;
  shareGainTaxPercent: number;
  propertyGrowthPercent: number;
  fundReturnPercent: number;
  projectionYears: number;
  saleCostPercent: number;
  saleCostFixed: number;
}

export interface UtleieboligResult {
  loanAmount: number;
  equityInvested: number;
  purchaseCosts: number;
  documentFee: number;
  monthlyLoanPayment: number;
  effectiveMonthlyRent: number;
  monthlyOperatingCosts: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  grossYieldPercent: number;
  netYieldPercent: number;
  cashOnCashReturnPercent: number;
  breakEvenMonthlyRent: number;
  annualRentGross: number;
  annualRentNet: number;
  annualLoanInterestFirstYear: number;
  annualOperatingCosts: number;
  taxableSurplusAnnual: number;
  estimatedTaxAnnual: number;
  interestDeductionBenefitAnnual: number;
  cashFlowAfterTaxAnnual: number;
  cashFlowAfterTaxMonthly: number;
  coversAllCosts: boolean;
  monthlyShortfall: number;
}

export interface UtleieboligYearSnapshot {
  year: number;
  propertyValue: number;
  loanBalance: number;
  cashReserve: number;
  saleCosts: number;
  propertyNetWorth: number;
  fundNetWorth: number;
}

export interface UtleieboligProjection {
  propertyNetWorth: number;
  propertyValue: number;
  remainingLoan: number;
  cashReserve: number;
  saleCosts: number;
  fundNetWorth: number;
  fundWithMonthlyFlows: number;
  fundLatentTax: number;
  fundNetWorthAfterTax: number;
  differenceVsFund: number;
  differenceVsFundWithFlows: number;
  differenceVsFundAfterTax: number;
  totalSubsidiesPaid: number;
  propertyGain: number;
  fundGain: number;
  propertyAnnualizedReturnPercent: number;
  fundAnnualizedReturnPercent: number;
  yearSnapshots: UtleieboligYearSnapshot[];
}
