/** BSU-regler brukt i kalkulatoren: verifiser mot gjeldende regelverk */
export const BSU_MAX_ANNUAL_DEPOSIT = 27_500;
export const BSU_TAX_DEDUCTION_RATE = 0.1;
export const BSU_MAX_ANNUAL_TAX_BENEFIT = 2_750;

export interface BsuInput {
  annualDeposit: number;
  years: number;
  currentBalance: number;
  interestRatePercent: number;
}

export interface BsuResult {
  bsuBalance: number;
  totalDeposits: number;
  totalInterest: number;
  totalTaxBenefit: number;
  totalValue: number;
  regularSavingsBalance: number;
  advantageOverRegular: number;
}

export function calculateBsu(input: BsuInput): BsuResult {
  const annualDeposit = Math.min(
    Math.max(input.annualDeposit, 0),
    BSU_MAX_ANNUAL_DEPOSIT,
  );
  const years = Math.max(Math.floor(input.years), 0);
  const rate = input.interestRatePercent / 100;

  let bsuBalance = Math.max(input.currentBalance, 0);
  let regularBalance = Math.max(input.currentBalance, 0);
  let totalDeposits = 0;
  let totalTaxBenefit = 0;

  for (let year = 0; year < years; year += 1) {
    bsuBalance *= 1 + rate;
    regularBalance *= 1 + rate;

    bsuBalance += annualDeposit;
    regularBalance += annualDeposit;
    totalDeposits += annualDeposit;
    totalTaxBenefit += annualDeposit * BSU_TAX_DEDUCTION_RATE;
  }

  const totalInterest = bsuBalance - input.currentBalance - totalDeposits;
  const totalValue = bsuBalance + totalTaxBenefit;

  return {
    bsuBalance,
    totalDeposits,
    totalInterest,
    totalTaxBenefit,
    totalValue,
    regularSavingsBalance: regularBalance,
    advantageOverRegular: totalValue - regularBalance,
  };
}
