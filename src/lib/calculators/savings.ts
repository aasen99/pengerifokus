export interface SavingsInput {
  initialBalance: number;
  monthlySaving: number;
  annualReturnPercent: number;
  years: number;
  extraMonthlySaving?: number;
}

export interface SavingsSummary {
  finalBalance: number;
  totalContributed: number;
  returnEarned: number;
  monthlySaving: number;
}

export interface SavingsComparison {
  standard: SavingsSummary;
  withExtra: SavingsSummary | null;
  extraContributed: number;
  extraReturnEarned: number;
  balanceDifference: number;
}

export interface SavingsYearSnapshot {
  year: number;
  balance: number;
  totalContributed: number;
  returnEarned: number;
}

export interface SavingsProjection {
  years: SavingsYearSnapshot[];
  final: SavingsSummary;
}

export interface MonthsToTargetResult {
  months: number;
  years: number;
  remainingMonths: number;
  finalBalance: number;
  totalContributed: number;
  returnEarned: number;
  reachable: boolean;
}

const MAX_MONTHS = 100 * 12;

function calculateFutureValue(
  initial: number,
  monthlyPayment: number,
  annualReturnPercent: number,
  months: number,
): { finalBalance: number; totalContributed: number } {
  if (months <= 0) {
    return { finalBalance: initial, totalContributed: initial };
  }

  const monthlyRate = annualReturnPercent / 100 / 12;
  let balance = initial;

  for (let month = 0; month < months; month += 1) {
    balance = balance * (1 + monthlyRate) + monthlyPayment;
  }

  return {
    finalBalance: balance,
    totalContributed: initial + monthlyPayment * months,
  };
}

function toSummary(
  calc: { finalBalance: number; totalContributed: number },
  monthlySaving: number,
): SavingsSummary {
  return {
    ...calc,
    returnEarned: calc.finalBalance - calc.totalContributed,
    monthlySaving,
  };
}

export function compareSavingsScenarios(
  input: SavingsInput,
): SavingsComparison {
  const months = Math.round(input.years * 12);

  const standardCalc = calculateFutureValue(
    input.initialBalance,
    input.monthlySaving,
    input.annualReturnPercent,
    months,
  );

  const standard = toSummary(standardCalc, input.monthlySaving);

  const extra = input.extraMonthlySaving ?? 0;
  if (extra <= 0) {
    return {
      standard,
      withExtra: null,
      extraContributed: 0,
      extraReturnEarned: 0,
      balanceDifference: 0,
    };
  }

  const withExtraCalc = calculateFutureValue(
    input.initialBalance,
    input.monthlySaving + extra,
    input.annualReturnPercent,
    months,
  );

  const withExtra = toSummary(withExtraCalc, input.monthlySaving + extra);

  return {
    standard,
    withExtra,
    extraContributed: extra * months,
    extraReturnEarned: withExtra.returnEarned - standard.returnEarned,
    balanceDifference: withExtra.finalBalance - standard.finalBalance,
  };
}

export function projectSavings(input: {
  initialBalance: number;
  monthlySaving: number;
  annualReturnPercent: number;
  years: number;
}): SavingsProjection {
  const totalMonths = Math.max(0, Math.round(input.years * 12));
  const monthlyRate = input.annualReturnPercent / 100 / 12;
  const years: SavingsYearSnapshot[] = [
    {
      year: 0,
      balance: input.initialBalance,
      totalContributed: input.initialBalance,
      returnEarned: 0,
    },
  ];

  let balance = input.initialBalance;
  let totalContributed = input.initialBalance;

  for (let month = 1; month <= totalMonths; month += 1) {
    balance = balance * (1 + monthlyRate) + input.monthlySaving;
    totalContributed += input.monthlySaving;

    if (month % 12 === 0 || month === totalMonths) {
      const year = month / 12;
      years.push({
        year: Number.isInteger(year) ? year : Math.round(year * 10) / 10,
        balance,
        totalContributed,
        returnEarned: balance - totalContributed,
      });
    }
  }

  return {
    years,
    final: toSummary(
      { finalBalance: balance, totalContributed },
      input.monthlySaving,
    ),
  };
}

export function monthsToTarget(input: {
  initialBalance: number;
  monthlySaving: number;
  annualReturnPercent: number;
  targetAmount: number;
}): MonthsToTargetResult | null {
  const {
    initialBalance,
    monthlySaving,
    annualReturnPercent,
    targetAmount,
  } = input;

  if (
    !Number.isFinite(initialBalance) ||
    !Number.isFinite(monthlySaving) ||
    !Number.isFinite(annualReturnPercent) ||
    !Number.isFinite(targetAmount) ||
    initialBalance < 0 ||
    monthlySaving < 0 ||
    annualReturnPercent < 0 ||
    targetAmount <= 0
  ) {
    return null;
  }

  if (initialBalance >= targetAmount) {
    return {
      months: 0,
      years: 0,
      remainingMonths: 0,
      finalBalance: initialBalance,
      totalContributed: initialBalance,
      returnEarned: 0,
      reachable: true,
    };
  }

  if (monthlySaving === 0 && annualReturnPercent === 0) {
    return {
      months: MAX_MONTHS,
      years: 100,
      remainingMonths: 0,
      finalBalance: initialBalance,
      totalContributed: initialBalance,
      returnEarned: 0,
      reachable: false,
    };
  }

  const monthlyRate = annualReturnPercent / 100 / 12;
  let balance = initialBalance;
  let totalContributed = initialBalance;

  for (let month = 1; month <= MAX_MONTHS; month += 1) {
    balance = balance * (1 + monthlyRate) + monthlySaving;
    totalContributed += monthlySaving;

    if (balance >= targetAmount) {
      return {
        months: month,
        years: Math.floor(month / 12),
        remainingMonths: month % 12,
        finalBalance: balance,
        totalContributed,
        returnEarned: balance - totalContributed,
        reachable: true,
      };
    }
  }

  return {
    months: MAX_MONTHS,
    years: 100,
    remainingMonths: 0,
    finalBalance: balance,
    totalContributed,
    returnEarned: balance - totalContributed,
    reachable: false,
  };
}

export function monthlyToReachTarget(input: {
  initialBalance: number;
  annualReturnPercent: number;
  years: number;
  targetAmount: number;
}): number | null {
  const { initialBalance, annualReturnPercent, years, targetAmount } = input;

  if (
    !Number.isFinite(initialBalance) ||
    !Number.isFinite(annualReturnPercent) ||
    !Number.isFinite(years) ||
    !Number.isFinite(targetAmount) ||
    initialBalance < 0 ||
    annualReturnPercent < 0 ||
    years <= 0 ||
    targetAmount <= 0
  ) {
    return null;
  }

  const months = Math.round(years * 12);
  if (months <= 0) return null;

  const monthlyRate = annualReturnPercent / 100 / 12;
  const futureOfInitial =
    monthlyRate === 0
      ? initialBalance
      : initialBalance * Math.pow(1 + monthlyRate, months);

  const remaining = targetAmount - futureOfInitial;
  if (remaining <= 0) return 0;

  if (monthlyRate === 0) {
    return remaining / months;
  }

  const annuityFactor =
    (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  return remaining / annuityFactor;
}

export function rateToReachTarget(input: {
  initialBalance: number;
  monthlySaving: number;
  years: number;
  targetAmount: number;
}): number | null {
  const { initialBalance, monthlySaving, years, targetAmount } = input;

  if (
    !Number.isFinite(initialBalance) ||
    !Number.isFinite(monthlySaving) ||
    !Number.isFinite(years) ||
    !Number.isFinite(targetAmount) ||
    initialBalance < 0 ||
    monthlySaving < 0 ||
    years <= 0 ||
    targetAmount <= 0
  ) {
    return null;
  }

  const months = Math.round(years * 12);
  if (months <= 0) return null;

  const contributedOnly = initialBalance + monthlySaving * months;
  if (contributedOnly >= targetAmount) {
    return 0;
  }

  // Without any return, contributions alone never reach target — need positive rate.
  // Binary search annual return percent in [0, 100].
  let low = 0;
  let high = 100;

  const balanceAt = (annualPercent: number) =>
    calculateFutureValue(
      initialBalance,
      monthlySaving,
      annualPercent,
      months,
    ).finalBalance;

  if (balanceAt(high) < targetAmount) {
    // Even 100 % annual is not enough — still return the best estimate via wider search
    high = 500;
    if (balanceAt(high) < targetAmount) return null;
  }

  for (let i = 0; i < 80; i += 1) {
    const mid = (low + high) / 2;
    if (balanceAt(mid) >= targetAmount) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return high;
}
