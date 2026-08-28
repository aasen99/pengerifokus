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
  equityPurchaseMultiplier: number;
  equityLoanMultiplier: number;
  equityRequirementPercent: number;
  maxTotalDebtFromIncome: number;
  maxLoanFromIncome: number;
  maxPurchaseFromIncome: number;
  maxPurchaseFromEquity: number;
  maxLoanFromEquity: number;
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

/** EK × 10 ved 10 % egenkapital, tilsvarende for sekundærbolig. */
export function getEquityPurchaseMultiplier(isPrimaryHome: boolean): number {
  return 1 / getEquityRequirementPercent(isPrimaryHome);
}

/** EK × 9 ved 10 % egenkapital: maks lån hvis egenkapitalen er det som begrenser. */
export function getEquityLoanMultiplier(isPrimaryHome: boolean): number {
  const requirement = getEquityRequirementPercent(isPrimaryHome);
  return (1 - requirement) / requirement;
}

export function calculateMaxPurchaseFromEquity(
  equity: number,
  existingDebt: number,
  isPrimaryHome: boolean,
): number {
  if (equity <= 0) return 0;
  return roundKr(
    equity * getEquityPurchaseMultiplier(isPrimaryHome) - existingDebt,
  );
}

export function calculateMaxLoanFromEquity(
  equity: number,
  existingDebt: number,
  isPrimaryHome: boolean,
): number {
  if (equity <= 0) return 0;
  return roundKr(equity * getEquityLoanMultiplier(isPrimaryHome) - existingDebt);
}

export function calculateMaxLoanFromIncome(
  grossAnnualIncome: number,
  existingDebt: number,
): number {
  return roundKr(
    grossAnnualIncome * INCOME_DEBT_MULTIPLIER - existingDebt,
  );
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
  const equityPurchaseMultiplier = getEquityPurchaseMultiplier(input.isPrimaryHome);
  const equityLoanMultiplier = getEquityLoanMultiplier(input.isPrimaryHome);

  const maxTotalDebtFromIncome = roundKr(
    grossAnnualIncome * INCOME_DEBT_MULTIPLIER,
  );
  const maxLoanFromIncome = calculateMaxLoanFromIncome(
    grossAnnualIncome,
    existingDebt,
  );
  const maxPurchaseFromIncome = roundKr(maxLoanFromIncome + equity);

  const maxPurchaseFromEquity = calculateMaxPurchaseFromEquity(
    equity,
    existingDebt,
    input.isPrimaryHome,
  );
  const maxLoanFromEquity = calculateMaxLoanFromEquity(
    equity,
    existingDebt,
    input.isPrimaryHome,
  );

  let maxLoan = 0;
  let maxPurchase = 0;
  let limitingFactor: LaneKapasitetLimitingFactor = "ingen";

  if (grossAnnualIncome <= 0) {
    limitingFactor = "inntekt";
  } else if (maxLoanFromIncome <= 0) {
    limitingFactor = "gjeld";
  } else if (equity <= 0) {
    limitingFactor = "egenkapital";
  } else {
    maxLoan = Math.min(maxLoanFromIncome, maxLoanFromEquity);
    maxPurchase = Math.min(maxPurchaseFromEquity, maxPurchaseFromIncome);

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
    equityPurchaseMultiplier,
    equityLoanMultiplier,
    equityRequirementPercent,
    maxTotalDebtFromIncome,
    maxLoanFromIncome,
    maxPurchaseFromIncome,
    maxPurchaseFromEquity,
    maxLoanFromEquity,
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
      return "inntektsregelen (lønn × 5 − gjeld)";
    case "egenkapital":
      return "egenkapitalkravet (EK × 10 − gjeld)";
    case "gjeld":
      return "eksisterende gjeld";
    default:
      return "ingen av reglene";
  }
}

export function formatEquityPurchaseFormula(
  equity: number,
  existingDebt: number,
  multiplier: number,
  result: number,
): string {
  return `${formatCurrency(equity)} × ${formatMultiplier(multiplier)} − ${formatCurrency(existingDebt)} = ${formatCurrency(result)}`;
}

export function formatIncomeLoanFormula(
  grossAnnualIncome: number,
  existingDebt: number,
  result: number,
): string {
  return `${formatCurrency(grossAnnualIncome)} × ${INCOME_DEBT_MULTIPLIER} − ${formatCurrency(existingDebt)} = ${formatCurrency(result)}`;
}

function formatMultiplier(value: number): string {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(1).replace(".", ",");
}
