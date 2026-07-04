export interface UtleieboligInput {
  purchasePrice: number;
  downPayment: number;
  purchaseCosts: number;
  annualRatePercent: number;
  termYears: number;
  monthlyRent: number;
  vacancyRatePercent: number;
  monthlyCommonCosts: number;
  monthlyInsurance: number;
  monthlyMaintenance: number;
  monthlyPropertyTax: number;
  monthlyManagementFee: number;
  taxRatePercent: number;
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
