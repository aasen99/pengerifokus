import { formatCurrency } from "@/lib/calculators/loan";

/** Finanstilsynets veiledende tak: total gjeld opptil 5 × brutto årsinntekt. */
export const INCOME_DEBT_MULTIPLIER = 5;

export const PRIMARY_HOME_EQUITY_REQUIREMENT = 0.1;
export const SECONDARY_HOME_EQUITY_REQUIREMENT = 0.15;

export type LaneKapasitetLimitingFactor =
  | "inntekt"
  | "egenkapital"
  | "gjeld"
  | "ingen";

export interface LaneKapasitetInput {
  /** Egenkapital (EK) tilgjengelig til kjøp. */
  equity: number;
  /** Eksisterende gjeld (GJELD). */
  existingDebt: number;
  /** Brutto årsinntekt for husstanden. */
  grossAnnualIncome: number;
  isPrimaryHome: boolean;
}

export interface LaneKapasitetResult {
  netPosition: number;
  equityRequirementPercent: number;
  maxTotalDebtFromIncome: number;
  remainingDebtRoomFromIncome: number;
  maxPurchaseFromEquity: number;
  maxLoanFromEquity: number;
  maxPurchaseFromIncome: number;
  maxLoanFromIncome: number;
  maxPurchase: number;
  maxLoan: number;
  limitingFactor: LaneKapasitetLimitingFactor;
  debtToIncomeRatioAfter: number | null;
}

function roundKr(value: number): number {
  return Math.max(0, Math.round(value));
}

export function getEquityRequirementPercent(isPrimaryHome: boolean): number {
  return isPrimaryHome
    ? PRIMARY_HOME_EQUITY_REQUIREMENT
    : SECONDARY_HOME_EQUITY_REQUIREMENT;
}

export function calculateNetPosition(equity: number, existingDebt: number): number {
  return equity - existingDebt;
}

export function calculateLaneKapasitet(
  input: LaneKapasitetInput,
): LaneKapasitetResult | null {
  const equity = Math.max(0, input.equity);
  const existingDebt = Math.max(0, input.existingDebt);
  const grossAnnualIncome = Math.max(0, input.grossAnnualIncome);

  if (
    !Number.isFinite(equity) ||
    !Number.isFinite(existingDebt) ||
    !Number.isFinite(grossAnnualIncome)
  ) {
    return null;
  }

  const equityRequirementPercent = getEquityRequirementPercent(input.isPrimaryHome);
  const netPosition = calculateNetPosition(equity, existingDebt);

  const maxTotalDebtFromIncome = roundKr(
    grossAnnualIncome * INCOME_DEBT_MULTIPLIER,
  );
  const remainingDebtRoomFromIncome = roundKr(
    maxTotalDebtFromIncome - existingDebt,
  );

  const maxPurchaseFromEquity =
    equity > 0 ? roundKr(equity / equityRequirementPercent) : 0;
  const maxLoanFromEquity = roundKr(maxPurchaseFromEquity - equity);

  const maxLoanFromIncome = remainingDebtRoomFromIncome;
  const maxPurchaseFromIncome = roundKr(maxLoanFromIncome + equity);

  let maxLoan = 0;
  let maxPurchase = 0;
  let limitingFactor: LaneKapasitetLimitingFactor = "ingen";

  if (grossAnnualIncome <= 0) {
    limitingFactor = "inntekt";
  } else if (remainingDebtRoomFromIncome <= 0) {
    limitingFactor = "gjeld";
  } else if (equity <= 0) {
    maxLoan = 0;
    maxPurchase = 0;
    limitingFactor = "egenkapital";
  } else {
    maxLoan = Math.min(maxLoanFromIncome, maxLoanFromEquity);
    maxPurchase = roundKr(maxLoan + equity);

    if (maxLoanFromEquity < maxLoanFromIncome) {
      limitingFactor = "egenkapital";
    } else if (maxLoanFromIncome < maxLoanFromEquity) {
      limitingFactor = "inntekt";
    } else {
      limitingFactor = maxLoan > 0 ? "inntekt" : "ingen";
    }
  }

  const debtToIncomeRatioAfter =
    grossAnnualIncome > 0 && maxLoan > 0
      ? (existingDebt + maxLoan) / grossAnnualIncome
      : null;

  return {
    netPosition,
    equityRequirementPercent,
    maxTotalDebtFromIncome,
    remainingDebtRoomFromIncome,
    maxPurchaseFromEquity,
    maxLoanFromEquity,
    maxPurchaseFromIncome,
    maxLoanFromIncome,
    maxPurchase,
    maxLoan,
    limitingFactor,
    debtToIncomeRatioAfter,
  };
}

export function formatLaneKapasitetLimit(
  factor: LaneKapasitetLimitingFactor,
): string {
  switch (factor) {
    case "inntekt":
      return "inntektsregelen (5 × brutto inntekt)";
    case "egenkapital":
      return "egenkapitalkravet";
    case "gjeld":
      return "eksisterende gjeld";
    default:
      return "ingen av reglene";
  }
}

export function formatNetPositionFormula(
  equity: number,
  existingDebt: number,
  netPosition: number,
): string {
  return `${formatCurrency(equity)} − ${formatCurrency(existingDebt)} = ${formatCurrency(netPosition)}`;
}
