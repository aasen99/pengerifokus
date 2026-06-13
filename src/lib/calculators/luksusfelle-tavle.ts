import { parseIntegerInput } from "@/lib/format/number";

export type TavleCategory = "fixed" | "variable" | "debt" | "savings";

export interface TavleLine {
  id: string;
  label: string;
  amount: string;
}

export interface TavleCategoryConfig {
  id: TavleCategory;
  label: string;
  hint: string;
  boardLabel: string;
}

export const TAVLE_CATEGORIES: TavleCategoryConfig[] = [
  {
    id: "fixed",
    label: "Faste utgifter",
    hint: "Husleie, forsikring, mobil, strøm",
    boardLabel: "Faste",
  },
  {
    id: "variable",
    label: "Variable utgifter",
    hint: "Mat, transport, klær, fritid",
    boardLabel: "Variable",
  },
  {
    id: "debt",
    label: "Gjeld",
    hint: "Lån, kredittkort, delbetaling",
    boardLabel: "Gjeld",
  },
  {
    id: "savings",
    label: "Sparing & mål",
    hint: "Buffer, BSU, fond, ferie",
    boardLabel: "Sparing",
  },
];

export function sumTavleLines(lines: TavleLine[]): number {
  return lines.reduce((sum, line) => {
    const amount = parseIntegerInput(line.amount);
    return sum + (Number.isFinite(amount) && amount > 0 ? amount : 0);
  }, 0);
}

export interface TavleSummary {
  income: number;
  categoryTotals: Record<TavleCategory, number>;
  totalOut: number;
  remainder: number;
  shareOfIncome: Record<TavleCategory, number>;
  isBalanced: boolean;
  isDeficit: boolean;
}

export function calculateTavle(
  incomeRaw: string,
  linesByCategory: Record<TavleCategory, TavleLine[]>,
): TavleSummary | null {
  const income = parseIntegerInput(incomeRaw);

  if (!Number.isFinite(income) || income < 0) {
    return null;
  }

  const categoryTotals = TAVLE_CATEGORIES.reduce(
    (acc, category) => {
      acc[category.id] = sumTavleLines(linesByCategory[category.id]);
      return acc;
    },
    {} as Record<TavleCategory, number>,
  );

  const totalOut = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);
  const remainder = income - totalOut;

  const shareOfIncome = TAVLE_CATEGORIES.reduce(
    (acc, category) => {
      acc[category.id] =
        income > 0 ? (categoryTotals[category.id] / income) * 100 : 0;
      return acc;
    },
    {} as Record<TavleCategory, number>,
  );

  return {
    income,
    categoryTotals,
    totalOut,
    remainder,
    shareOfIncome,
    isBalanced: remainder === 0,
    isDeficit: remainder < 0,
  };
}

export function createTavleLine(label = ""): TavleLine {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    label,
    amount: "",
  };
}

export const EMPTY_TAVLE_LINES: Record<TavleCategory, TavleLine[]> = {
  fixed: [],
  variable: [],
  debt: [],
  savings: [],
};

export interface BillBreakdown {
  thousands: number;
  fives: number;
  remainder: number;
}

/** Deler beløp i 1000- og 500-lapper som på pengetavlen i Luksusfellen */
export function breakIntoBills(amount: number): BillBreakdown {
  const safeAmount = Math.max(0, Math.round(amount));
  const thousands = Math.floor(safeAmount / 1000);
  let rest = safeAmount % 1000;
  const fives = Math.floor(rest / 500);
  rest %= 500;

  return { thousands, fives, remainder: rest };
}

export function billsFromBreakdown(breakdown: BillBreakdown): Array<500 | 1000> {
  return [
    ...Array.from({ length: breakdown.thousands }, () => 1000 as const),
    ...Array.from({ length: breakdown.fives }, () => 500 as const),
  ];
}
