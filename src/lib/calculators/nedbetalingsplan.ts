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

function pickTarget(debts: SimDebt[], strategy: PayoffStrategy): SimDebt {
  const active = debts.filter((debt) => debt.balance > 0.01);

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
    debtFree: true,
  };
}

export function simulateDebtPayoff(
  debts: DebtLine[],
  extraMonthlyPayment: number,
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
  let rolledExtra = Math.max(0, extraMonthlyPayment);
  let hasGrowingDebt = false;
  const payoffOrder: { name: string; monthPaidOff: number }[] = [];
  const totalPrincipal = simDebts.reduce((sum, debt) => sum + debt.balance, 0);

  while (simDebts.some((debt) => debt.balance > 0.01) && months < MAX_MONTHS) {
    months += 1;
    const target = pickTarget(simDebts, strategy);

    for (const debt of simDebts) {
      if (debt.balance <= 0.01) continue;

      const monthlyRate = debt.annualRatePercent / 100 / 12;
      const interest = debt.balance * monthlyRate;
      totalInterest += interest;

      const isTarget = debt.id === target.id;
      let payment = debt.minimumMonthlyPayment + (isTarget ? rolledExtra : 0);
      const amountDue = debt.balance + interest;

      if (payment < interest - 0.01) {
        hasGrowingDebt = true;
      }

      payment = Math.min(payment, amountDue);
      debt.balance = amountDue - payment;
    }

    for (const debt of simDebts) {
      if (debt.balance <= 0.01 && debt.paidOffAt === undefined) {
        debt.balance = 0;
        debt.paidOffAt = months;
        payoffOrder.push({ name: debt.name, monthPaidOff: months });
        rolledExtra += debt.minimumMonthlyPayment;
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
    debtFree,
  };
}

export function compareDebtPayoffPlans(
  debts: DebtLine[],
  extraMonthlyPayment: number,
): CompareDebtPayoff {
  const minimumOnly = simulateDebtPayoff(debts, 0, "avalanche");

  return {
    minimumOnly,
    avalanche: simulateDebtPayoff(debts, extraMonthlyPayment, "avalanche"),
    snowball: simulateDebtPayoff(debts, extraMonthlyPayment, "snowball"),
  };
}

export function formatStrategyLabel(strategy: PayoffStrategy): string {
  return strategy === "avalanche" ? "Lavine" : "Snøball";
}

export function formatPayoffSummaryLine(summary: DebtPayoffSummary): string {
  if (!summary.debtFree) {
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
