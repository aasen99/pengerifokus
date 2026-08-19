export type DebtType =
  | "kredittkort"
  | "smalan"
  | "faktura"
  | "kontokreditt"
  | "privat"
  | "annet";

export type BrakeStrategy = "stop-next-income" | "step-down" | "stop-growth";

export type DebtTrend = "increasing" | "stable" | "decreasing";

export interface LoanRound {
  principal: number;
  repaid: number;
  /** Hvis satt, overstyrer automatisk lånekostnad (tilbakebetalt − hovedstol). */
  feesOverride: number | null;
  newCredit: number;
  usedDate: string;
  repaidDate: string;
  newCreditDate: string;
}

export interface CurrentSituation {
  cashOnHand: number;
  amountDue: number;
  dueDate: string;
  incomeBeforeDue: number;
  expensesBeforeDue: number;
  currentPrincipal: number;
  expectedFees: number;
  nextIncomeDate: string;
  nextIncomeAmount: number;
}

export interface GapMeasures {
  reducedExpenses: number;
  extraIncome: number;
  expectedMoneyIn: number;
  assetSales: number;
  otherNonDebtFinance: number;
  paymentAgreement: number;
}

export interface RoundMetrics {
  loanCost: number;
  realDebtReduction: number;
  ownLiquidityUsed: number;
  temporaryAccountLift: number;
  principalChange: number;
  daysWithoutCredit: number | null;
  followedByNewCredit: boolean;
}

export interface HistorySummary {
  roundCount: number;
  totalCreditUsed: number;
  totalRepaid: number;
  totalLoanCost: number;
  realDebtReduction: number;
  averageDaysWithoutCredit: number | null;
  trend: DebtTrend;
  paymentsFollowedByNewCredit: number;
  allRegisteredAmountsPaid: boolean;
  startingPrincipal: number;
  endingPrincipal: number;
  latestLift: {
    repaid: number;
    newCredit: number;
    temporaryAccountLift: number;
    principalIncrease: number;
  } | null;
}

export interface BrakeScheduleRow {
  label: string;
  debtBefore: number;
  costs: number;
  newCredit: number;
  realReduction: number;
}

export interface PlanFeasibility {
  needed: number;
  covered: number;
  remaining: number;
  isFeasible: boolean;
}

export interface DiagnosisResult {
  headline: string;
  body: string;
  liftNote: string | null;
}

export interface PlanCheckpoint {
  label: string;
  value: string;
}
