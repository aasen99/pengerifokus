export interface InflationLoanInputs {
  currentDebt: number;
  years: number;
  inflationRate: number;
  nominalInterestRate: number;
}

export interface SalaryGrowthLoanInputs {
  currentDebt: number;
  nominalInterestRate: number;
  repaymentYears: number;
  salaryGrowthRate: number;
  salaryGrowthShare: number;
}

export interface YearlyRealValue {
  year: number;
  nominalDebt: number;
  realValue: number;
}

export interface InflationLoanResult {
  realDebtValue: number;
  reductionInRealValue: number;
  reductionPercent: number;
  realInterestRate: number;
  yearlyValues: YearlyRealValue[];
}

export interface LoanScheduleEntry {
  month: number;
  payment: number;
  interest: number;
  principalPayment: number;
  balance: number;
}

export interface LoanSimulationResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  extraPaid: number;
  schedule: LoanScheduleEntry[];
}

export interface LoanStrategyComparison {
  standard: LoanSimulationResult;
  withSalaryGrowth: LoanSimulationResult;
  monthlyPayment: number;
  annualPaymentIncreaseRate: number;
  monthsSaved: number;
  interestSaved: number;
  paymentAfter5Years: number | null;
  paymentAfter10Years: number | null;
}
