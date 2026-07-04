import { calculateMonthlyPayment } from "@/lib/calculators/loan";
import type { UtleieboligInput, UtleieboligResult } from "@/types/utleiebolig";

/** Estimerer første års rentekostnad på annuitetslån */
function estimateFirstYearInterest(
  principal: number,
  annualRatePercent: number,
  monthlyPayment: number,
): number {
  if (principal <= 0) return 0;

  const monthlyRate = annualRatePercent / 100 / 12;
  let balance = principal;
  let interest = 0;

  for (let month = 0; month < 12; month += 1) {
    const monthInterest = balance * monthlyRate;
    interest += monthInterest;
    balance -= monthlyPayment - monthInterest;
  }

  return interest;
}

export function calculateUtleiebolig(input: UtleieboligInput): UtleieboligResult {
  const loanAmount = Math.max(0, input.purchasePrice - input.downPayment);
  const equityInvested = input.downPayment + input.purchaseCosts;
  const termMonths = Math.round(input.termYears * 12);
  const monthlyLoanPayment = calculateMonthlyPayment(
    loanAmount,
    input.annualRatePercent,
    termMonths,
  );

  const vacancyFactor = 1 - input.vacancyRatePercent / 100;
  const effectiveMonthlyRent = input.monthlyRent * vacancyFactor;
  const monthlyOperatingCosts =
    input.monthlyCommonCosts +
    input.monthlyInsurance +
    input.monthlyMaintenance +
    input.monthlyPropertyTax +
    input.monthlyManagementFee;

  const monthlyCashFlow =
    effectiveMonthlyRent - monthlyOperatingCosts - monthlyLoanPayment;
  const annualCashFlow = monthlyCashFlow * 12;

  const annualRentGross = input.monthlyRent * 12;
  const annualRentNet = effectiveMonthlyRent * 12;
  const annualOperatingCosts = monthlyOperatingCosts * 12;

  const grossYieldPercent =
    input.purchasePrice > 0 ? (annualRentGross / input.purchasePrice) * 100 : 0;
  const netYieldPercent =
    input.purchasePrice > 0
      ? ((annualRentNet - annualOperatingCosts) / input.purchasePrice) * 100
      : 0;
  const cashOnCashReturnPercent =
    equityInvested > 0 ? (annualCashFlow / equityInvested) * 100 : 0;

  const breakEvenMonthlyRent =
    vacancyFactor > 0
      ? (monthlyOperatingCosts + monthlyLoanPayment) / vacancyFactor
      : 0;

  const annualLoanInterestFirstYear = estimateFirstYearInterest(
    loanAmount,
    input.annualRatePercent,
    monthlyLoanPayment,
  );

  const taxableSurplusAnnual = Math.max(
    0,
    annualRentNet - annualOperatingCosts - annualLoanInterestFirstYear,
  );
  const estimatedTaxAnnual = taxableSurplusAnnual * (input.taxRatePercent / 100);
  const cashFlowAfterTaxAnnual = annualCashFlow - estimatedTaxAnnual;
  const cashFlowAfterTaxMonthly = cashFlowAfterTaxAnnual / 12;

  const coversAllCosts = monthlyCashFlow >= 0;
  const monthlyShortfall = coversAllCosts ? 0 : Math.abs(monthlyCashFlow);

  return {
    loanAmount,
    equityInvested,
    monthlyLoanPayment,
    effectiveMonthlyRent,
    monthlyOperatingCosts,
    monthlyCashFlow,
    annualCashFlow,
    grossYieldPercent,
    netYieldPercent,
    cashOnCashReturnPercent,
    breakEvenMonthlyRent,
    annualRentGross,
    annualRentNet,
    annualLoanInterestFirstYear,
    annualOperatingCosts,
    taxableSurplusAnnual,
    estimatedTaxAnnual,
    cashFlowAfterTaxAnnual,
    cashFlowAfterTaxMonthly,
    coversAllCosts,
    monthlyShortfall,
  };
}
