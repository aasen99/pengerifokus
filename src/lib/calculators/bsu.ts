/** BSU-regler brukt i kalkulatoren: verifiser mot gjeldende regelverk */
export const BSU_MAX_ANNUAL_DEPOSIT = 27_500;
export const BSU_TAX_DEDUCTION_RATE = 0.1;
export const BSU_MAX_ANNUAL_TAX_BENEFIT = 2_750;
/** BSU-kontoer har typisk ca. 1 prosentpoeng høyere rente enn vanlige sparekontoer */
export const BSU_TYPICAL_RATE_PREMIUM_OVER_REGULAR = 1;

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
  regularSavingsRatePercent: number;
  regularSavingsInterest: number;
  advantageFromTax: number;
  advantageFromInterest: number;
  advantageOverRegular: number;
}

export function calculateBsu(input: BsuInput): BsuResult {
  const annualDeposit = Math.min(
    Math.max(input.annualDeposit, 0),
    BSU_MAX_ANNUAL_DEPOSIT,
  );
  const years = Math.max(Math.floor(input.years), 0);
  const bsuRate = input.interestRatePercent / 100;
  const regularRate = Math.max(
    0,
    (input.interestRatePercent - BSU_TYPICAL_RATE_PREMIUM_OVER_REGULAR) / 100,
  );

  let bsuBalance = Math.max(input.currentBalance, 0);
  let regularBalance = Math.max(input.currentBalance, 0);
  let totalDeposits = 0;
  let totalTaxBenefit = 0;

  for (let year = 0; year < years; year += 1) {
    bsuBalance *= 1 + bsuRate;
    regularBalance *= 1 + regularRate;

    bsuBalance += annualDeposit;
    regularBalance += annualDeposit;
    totalDeposits += annualDeposit;
    totalTaxBenefit += annualDeposit * BSU_TAX_DEDUCTION_RATE;
  }

  const totalInterest = bsuBalance - input.currentBalance - totalDeposits;
  const regularSavingsInterest =
    regularBalance - input.currentBalance - totalDeposits;
  const totalValue = bsuBalance + totalTaxBenefit;
  const advantageFromTax = totalTaxBenefit;
  const advantageFromInterest = bsuBalance - regularBalance;
  const advantageOverRegular = totalValue - regularBalance;

  return {
    bsuBalance,
    totalDeposits,
    totalInterest,
    totalTaxBenefit,
    totalValue,
    regularSavingsBalance: regularBalance,
    regularSavingsRatePercent: regularRate * 100,
    regularSavingsInterest,
    advantageFromTax,
    advantageFromInterest,
    advantageOverRegular,
  };
}
