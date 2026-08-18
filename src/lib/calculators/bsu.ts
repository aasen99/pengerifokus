/** BSU-regler brukt i kalkulatoren: verifiser mot gjeldende regelverk */
export const BSU_MAX_ANNUAL_DEPOSIT = 27_500;
export const BSU_MAX_TOTAL_DEPOSIT = 300_000;
export const BSU_TAX_DEDUCTION_RATE = 0.1;
export const BSU_MAX_ANNUAL_TAX_BENEFIT = 2_750;
/** Siste år man kan spare i BSU er året man fyller 33. */
export const BSU_MAX_SAVING_AGE = 33;

export interface BsuInput {
  annualDeposit: number;
  years: number;
  currentBalance: number;
  /** Totalt innbetalt på BSU-kontoen så langt, uten renter. */
  totalDeposited: number;
  interestRatePercent: number;
  regularSavingsRatePercent: number;
  age: number;
  ownsHomeOnDecember31: boolean;
  paysEnoughTax: boolean;
  /** Årlig skatt som kan brukes mot BSU-fradraget når paysEnoughTax er false. */
  annualTaxAvailable?: number;
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
  remainingDepositRoom: number;
  eligibleYears: number;
  yearsUsed: number;
  depositsStoppedEarly: boolean;
  taxDeductionIncluded: boolean;
}

export function remainingBsuDepositRoom(totalDeposited: number): number {
  return Math.max(0, BSU_MAX_TOTAL_DEPOSIT - Math.max(0, totalDeposited));
}

export function eligibleBsuYears(age: number): number {
  if (!Number.isFinite(age)) return 0;
  return Math.max(0, BSU_MAX_SAVING_AGE + 1 - Math.floor(age));
}

function taxBenefitForDeposit(
  deposit: number,
  ownsHomeOnDecember31: boolean,
  paysEnoughTax: boolean,
  annualTaxAvailable: number,
): number {
  if (ownsHomeOnDecember31 || deposit <= 0) return 0;

  const fullBenefit = deposit * BSU_TAX_DEDUCTION_RATE;
  if (paysEnoughTax) return fullBenefit;

  return Math.max(0, Math.min(fullBenefit, annualTaxAvailable));
}

export function calculateBsu(input: BsuInput): BsuResult {
  const plannedDeposit = Math.min(
    Math.max(input.annualDeposit, 0),
    BSU_MAX_ANNUAL_DEPOSIT,
  );
  const requestedYears = Math.max(Math.floor(input.years), 0);
  const eligibleYears = eligibleBsuYears(input.age);
  const years = Math.min(requestedYears, eligibleYears);
  const bsuRate = Math.max(0, input.interestRatePercent) / 100;
  const regularRate = Math.max(0, input.regularSavingsRatePercent) / 100;
  const annualTaxAvailable = Math.max(0, input.annualTaxAvailable ?? 0);

  let remainingRoom = remainingBsuDepositRoom(input.totalDeposited);
  let bsuBalance = Math.max(input.currentBalance, 0);
  let regularBalance = Math.max(input.currentBalance, 0);
  let totalDeposits = 0;
  let totalTaxBenefit = 0;

  for (let year = 0; year < years; year += 1) {
    bsuBalance *= 1 + bsuRate;
    regularBalance *= 1 + regularRate;

    const deposit = Math.min(plannedDeposit, remainingRoom);
    bsuBalance += deposit;
    regularBalance += deposit;
    totalDeposits += deposit;
    remainingRoom = Math.max(0, remainingRoom - deposit);
    totalTaxBenefit += taxBenefitForDeposit(
      deposit,
      input.ownsHomeOnDecember31,
      input.paysEnoughTax,
      annualTaxAvailable,
    );
  }

  const startingBalance = Math.max(input.currentBalance, 0);
  const totalInterest = bsuBalance - startingBalance - totalDeposits;
  const regularSavingsInterest =
    regularBalance - startingBalance - totalDeposits;
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
    remainingDepositRoom: remainingRoom,
    eligibleYears,
    yearsUsed: years,
    depositsStoppedEarly: remainingRoom === 0 && plannedDeposit > 0 && years > 0,
    taxDeductionIncluded: totalTaxBenefit > 0,
  };
}
