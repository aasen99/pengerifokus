export interface UtleieboligInput {
  purchasePrice: number;
  downPayment: number;
  purchaseCosts: number;
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
  propertyGrowthPercent: number;
  fundReturnPercent: number;
  projectionYears: number;
}

export interface UtleieboligResult {
  loanAmount: number;
  equityInvested: number;
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
  propertyNetWorth: number;
  fundNetWorth: number;
}

export interface UtleieboligProjection {
  propertyNetWorth: number;
  propertyValue: number;
  remainingLoan: number;
  cashReserve: number;
  fundNetWorth: number;
  fundWithMonthlyFlows: number;
  differenceVsFund: number;
  differenceVsFundWithFlows: number;
  totalSubsidiesPaid: number;
  propertyGain: number;
  fundGain: number;
  propertyAnnualizedReturnPercent: number;
  fundAnnualizedReturnPercent: number;
  yearSnapshots: UtleieboligYearSnapshot[];
}
