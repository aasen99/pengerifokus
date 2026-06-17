export type LoanType = "annuitet" | "serie";
export type MaintenanceMode = "fixed" | "percent";
export type SaleCostMode = "fixed" | "percent";
export type EieLeieMode = "simple" | "advanced";
export type ScenarioPreset = "forsiktig" | "normal" | "optimistisk";

export interface EieLeieInput {
  horizonYears: number;

  purchasePrice: number;
  equity: number;
  sharedDebt: number;

  isBorettslag: boolean;
  autoDocumentFee: boolean;
  documentFee: number;
  registrationAndFees: number;
  loanEstablishmentCost: number;
  otherPurchaseCosts: number;

  nominalRatePercent: number;
  loanTermYears: number;
  loanType: LoanType;
  interestOnlyMonths: number;

  commonFees: number;
  municipalFees: number;
  propertyTax: number;
  insurance: number;
  includeUtilities: boolean;
  utilities: number;
  includeInternet: boolean;
  internet: number;
  otherOwnerFixed: number;

  maintenanceMode: MaintenanceMode;
  maintenanceMonthly: number;
  maintenancePercentAnnual: number;

  propertyGrowthPercent: number;

  saleCostMode: SaleCostMode;
  saleCostFixed: number;
  saleCostPercent: number;

  monthlyRent: number;
  annualRentIncreasePercent: number;
  depositAmount: number;
  depositReturnPercent: number;

  investmentReturnPercent: number;
  investmentCostPercent: number;
}

export interface MonthlySnapshot {
  month: number;
  ownerNetWorth: number;
  renterNetWorth: number;
  propertyValue: number;
  loanBalance: number;
}

export interface EieLeieOwnerSummary {
  propertyValue: number;
  remainingDebt: number;
  equityBuilt: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalMaintenance: number;
  totalPurchaseCosts: number;
  totalSaleCosts: number;
  totalFixedOwnerCosts: number;
  ownerInvestmentValue: number;
  netWorth: number;
}

export interface EieLeieRenterSummary {
  totalRentPaid: number;
  startInvestment: number;
  totalMonthlyInvestments: number;
  investmentValue: number;
  depositReturned: number;
  netWorth: number;
}

export interface EieLeieCostBreakdown {
  interest: number;
  maintenance: number;
  fixedCosts: number;
  purchaseCosts: number;
  saleCosts: number;
}

export interface EieLeieResult {
  loanAmount: number;
  totalFinancedAmount: number;
  totalPurchaseCosts: number;
  startInvestment: number;
  owner: EieLeieOwnerSummary;
  renter: EieLeieRenterSummary;
  netWorthDifference: number;
  betterOption: "eie" | "leie" | "lik";
  crossoverMonth: number | null;
  ownerAheadFromStart: boolean;
  monthlySnapshots: MonthlySnapshot[];
  ownerCostBreakdown: EieLeieCostBreakdown;
  totalRentPaid: number;
}

export interface SensitivityCase {
  id: string;
  label: string;
  netWorthDifference: number;
  betterOption: "eie" | "leie" | "lik";
}

export interface ScenarioValues {
  propertyGrowthPercent: number;
  nominalRatePercent: number;
  investmentReturnPercent: number;
  label: string;
}
