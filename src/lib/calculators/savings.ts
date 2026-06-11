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

  const standard: SavingsSummary = {
    ...standardCalc,
    returnEarned: standardCalc.finalBalance - standardCalc.totalContributed,
    monthlySaving: input.monthlySaving,
  };

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

  const withExtra: SavingsSummary = {
    ...withExtraCalc,
    returnEarned: withExtraCalc.finalBalance - withExtraCalc.totalContributed,
    monthlySaving: input.monthlySaving + extra,
  };

  return {
    standard,
    withExtra,
    extraContributed: extra * months,
    extraReturnEarned: withExtra.returnEarned - standard.returnEarned,
    balanceDifference: withExtra.finalBalance - standard.finalBalance,
  };
}
