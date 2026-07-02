import { formatCurrency, formatYearsAndMonths } from "@/lib/calculators/loan";

export interface DebtLine {
  id: string;
  name: string;
  balance: number;
  annualRatePercent: number;
  minimumMonthlyPayment: number;
}

export type PayoffStrategy = "avalanche" | "snowball";

export interface DebtPayoffSummary {
  strategy: PayoffStrategy;
  monthsToDebtFree: number;
  totalInterestPaid: number;
  totalPaid: number;
  payoffOrder: { name: string; monthPaidOff: number }[];
  hasGrowingDebt: boolean;
  hasInsufficientBudget: boolean;
  debtFree: boolean;
}

export interface CompareDebtPayoff {
  avalanche: DebtPayoffSummary;
  snowball: DebtPayoffSummary;
  minimumOnly: DebtPayoffSummary;
}

interface SimDebt extends DebtLine {
  paidOffAt?: number;
}

const MAX_MONTHS = 600;

function pickTarget(debts: SimDebt[], strategy: PayoffStrategy): SimDebt | null {
  const active = debts.filter((debt) => debt.balance > 0.01);
  if (active.length === 0) return null;

  if (strategy === "avalanche") {
    return [...active].sort(
      (a, b) =>
        b.annualRatePercent - a.annualRatePercent || a.balance - b.balance,
    )[0];
  }

  return [...active].sort(
    (a, b) =>
      a.balance - b.balance || b.annualRatePercent - a.annualRatePercent,
  )[0];
}

function emptySummary(strategy: PayoffStrategy): DebtPayoffSummary {
  return {
    strategy,
    monthsToDebtFree: 0,
    totalInterestPaid: 0,
    totalPaid: 0,
    payoffOrder: [],
    hasGrowingDebt: false,
    hasInsufficientBudget: false,
    debtFree: true,
  };
}

export function getMinimumPaymentsTotal(debts: DebtLine[]): number {
  return debts
    .filter((debt) => debt.balance > 0)
    .reduce((sum, debt) => sum + debt.minimumMonthlyPayment, 0);
}

export function simulateDebtPayoff(
  debts: DebtLine[],
  totalMonthlyBudget: number | "minimum-only",
  strategy: PayoffStrategy,
): DebtPayoffSummary {
  const simDebts: SimDebt[] = debts
    .filter((debt) => debt.balance > 0 && debt.minimumMonthlyPayment >= 0)
    .map((debt) => ({ ...debt }));

  if (simDebts.length === 0) {
    return emptySummary(strategy);
  }

  let months = 0;
  let totalInterest = 0;
  let hasGrowingDebt = false;
  let hasInsufficientBudget = false;
  const payoffOrder: { name: string; monthPaidOff: number }[] = [];
  const totalPrincipal = simDebts.reduce((sum, debt) => sum + debt.balance, 0);

  while (simDebts.some((debt) => debt.balance > 0.01) && months < MAX_MONTHS) {
    months += 1;

    const monthState: {
      debt: SimDebt;
      amountDue: number;
      minimumDue: number;
      interest: number;
    }[] = [];

    for (const debt of simDebts) {
      if (debt.balance <= 0.01) continue;

      const monthlyRate = debt.annualRatePercent / 100 / 12;
      const interest = debt.balance * monthlyRate;
      const amountDue = debt.balance + interest;
      const minimumDue = Math.min(debt.minimumMonthlyPayment, amountDue);

      monthState.push({ debt, amountDue, minimumDue, interest });
    }

    const minimumTotal = monthState.reduce(
      (sum, item) => sum + item.minimumDue,
      0,
    );
    const budget =
      totalMonthlyBudget === "minimum-only"
        ? minimumTotal
        : Math.max(0, totalMonthlyBudget);

    if (budget < minimumTotal - 0.01) {
      hasInsufficientBudget = true;
    }

    let remaining = budget;

    for (const item of monthState) {
      totalInterest += item.interest;

      if (item.minimumDue < item.interest - 0.01) {
        hasGrowingDebt = true;
      }

      const payment = Math.min(item.minimumDue, remaining, item.amountDue);
      remaining -= payment;
      item.debt.balance = item.amountDue - payment;
    }

    while (remaining > 0.01) {
      const target = pickTarget(simDebts, strategy);
      if (!target || target.balance <= 0.01) break;

      const payment = Math.min(remaining, target.balance);
      target.balance -= payment;
      remaining -= payment;
    }

    for (const debt of simDebts) {
      if (debt.balance <= 0.01 && debt.paidOffAt === undefined) {
        debt.balance = 0;
        debt.paidOffAt = months;
        payoffOrder.push({ name: debt.name, monthPaidOff: months });
      }
    }
  }

  const debtFree = simDebts.every((debt) => debt.balance <= 0.01);

  return {
    strategy,
    monthsToDebtFree: debtFree ? months : MAX_MONTHS,
    totalInterestPaid: totalInterest,
    totalPaid: totalPrincipal + totalInterest,
    payoffOrder,
    hasGrowingDebt,
    hasInsufficientBudget,
    debtFree,
  };
}

export function compareDebtPayoffPlans(
  debts: DebtLine[],
  totalMonthlyBudget: number,
): CompareDebtPayoff {
  const minimumOnly = simulateDebtPayoff(debts, "minimum-only", "avalanche");

  return {
    minimumOnly,
    avalanche: simulateDebtPayoff(debts, totalMonthlyBudget, "avalanche"),
    snowball: simulateDebtPayoff(debts, totalMonthlyBudget, "snowball"),
  };
}

export function formatStrategyLabel(strategy: PayoffStrategy): string {
  return strategy === "avalanche" ? "Lavine" : "Snøball";
}

export function formatPayoffSummaryLine(summary: DebtPayoffSummary): string {
  if (!summary.debtFree) {
    if (summary.hasInsufficientBudget) {
      return "Månedsbudsjettet dekker ikke alle minimumsbeløp.";
    }
    return summary.hasGrowingDebt
      ? "Gjelden vokser – minimumsbeløp dekker ikke renten på minst ett lån."
      : `Gjeldsfri innen ${formatYearsAndMonths(summary.monthsToDebtFree)} (estimat)`;
  }

  return `Gjeldsfri på ${formatYearsAndMonths(summary.monthsToDebtFree)} · ${formatCurrency(summary.totalInterestPaid)} i renter`;
}

export const DEFAULT_DEBTS: DebtLine[] = [
  {
    id: "debt-1",
    name: "Kredittkort",
    balance: 45_000,
    annualRatePercent: 22,
    minimumMonthlyPayment: 1_500,
  },
  {
    id: "debt-2",
    name: "Forbrukslån",
    balance: 120_000,
    annualRatePercent: 12,
    minimumMonthlyPayment: 2_500,
  },
  {
    id: "debt-3",
    name: "Studielån",
    balance: 80_000,
    annualRatePercent: 4,
    minimumMonthlyPayment: 1_200,
  },
];

export const DEFAULT_MONTHLY_LOAN_BUDGET =
  getMinimumPaymentsTotal(DEFAULT_DEBTS) + 2_000;
