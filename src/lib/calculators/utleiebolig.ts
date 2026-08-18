import { calculateMonthlyPayment } from "@/lib/calculators/loan";
import { calculateDocumentFeeForPrice } from "@/lib/calculators/dokumentavgift";
import type {
  UtleieboligInput,
  UtleieboligProjection,
  UtleieboligResult,
  UtleieboligYearSnapshot,
} from "@/types/utleiebolig";

export function resolvedDocumentFee(input: UtleieboligInput): number {
  if (input.autoDocumentFee) {
    return calculateDocumentFeeForPrice(input.purchasePrice, input.housingType);
  }
  return Math.max(0, input.documentFee);
}

/** Buyer-side purchase costs only. Meglerhonorar is a seller cost and is not included. */
export function calculateUtleieboligBuyerCosts(input: UtleieboligInput): number {
  return (
    resolvedDocumentFee(input) +
    Math.max(0, input.registrationFee) +
    Math.max(0, input.appraisalFee) +
    Math.max(0, input.otherBuyerCosts)
  );
}

export function calculateUtleieboligSaleCosts(
  propertyValue: number,
  input: Pick<UtleieboligInput, "saleCostPercent" | "saleCostFixed">,
): number {
  return Math.max(
    0,
    input.saleCostFixed + propertyValue * (input.saleCostPercent / 100),
  );
}

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
  const documentFee = resolvedDocumentFee(input);
  const purchaseCosts = calculateUtleieboligBuyerCosts(input);
  const loanAmount = Math.max(0, input.purchasePrice - input.downPayment);
  const equityInvested = input.downPayment + purchaseCosts;
  const termMonths = Math.round(input.termYears * 12);
  const monthlyLoanPayment = calculateMonthlyPayment(
    loanAmount,
    input.annualRatePercent,
    termMonths,
  );

  const vacancyMonths = Math.min(
    Math.max(input.vacancyMonthsPerYear, 0),
    12,
  );
  const vacancyFactor = (12 - vacancyMonths) / 12;
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
  const taxRate = input.taxRatePercent / 100;
  const estimatedTaxAnnual = taxableSurplusAnnual * taxRate;
  const interestDeductionBenefitAnnual =
    annualLoanInterestFirstYear * taxRate;
  const cashFlowAfterTaxAnnual = annualCashFlow - estimatedTaxAnnual;
  const cashFlowAfterTaxMonthly = cashFlowAfterTaxAnnual / 12;

  const coversAllCosts = monthlyCashFlow >= 0;
  const monthlyShortfall = coversAllCosts ? 0 : Math.abs(monthlyCashFlow);

  return {
    loanAmount,
    equityInvested,
    purchaseCosts,
    documentFee,
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
    interestDeductionBenefitAnnual,
    cashFlowAfterTaxAnnual,
    cashFlowAfterTaxMonthly,
    coversAllCosts,
    monthlyShortfall,
  };
}

function annualizedReturn(
  initial: number,
  final: number,
  years: number,
): number {
  if (initial <= 0 || years <= 0) return 0;
  if (final <= 0) return -100;
  return (Math.pow(final / initial, 1 / years) - 1) * 100;
}

function fundLatentTax(
  investmentValue: number,
  contributed: number,
  taxPercent: number,
): number {
  const gain = Math.max(0, investmentValue - contributed);
  return gain * (taxPercent / 100);
}

export function projectUtleieboligVsFond(
  input: UtleieboligInput,
  base: UtleieboligResult,
): UtleieboligProjection {
  const years = Math.max(1, Math.floor(input.projectionYears));
  const months = years * 12;
  const termMonths = Math.round(input.termYears * 12);
  const monthlyLoanPayment = base.monthlyLoanPayment;
  const monthlyLoanRate = input.annualRatePercent / 100 / 12;
  const monthlyFundRate = input.fundReturnPercent / 100 / 12;
  const annualPropertyGrowth = input.propertyGrowthPercent / 100;

  const vacancyMonths = Math.min(
    Math.max(input.vacancyMonthsPerYear, 0),
    12,
  );
  const vacancyFactor = (12 - vacancyMonths) / 12;
  const effectiveMonthlyRent = input.monthlyRent * vacancyFactor;
  const monthlyOperatingCosts = base.monthlyOperatingCosts;
  const taxRate = input.taxRatePercent / 100;

  let propertyValue = input.purchasePrice;
  let loanBalance = base.loanAmount;
  let cashReserve = 0;
  let totalSubsidiesPaid = 0;

  let fundNetWorth = base.equityInvested;
  let fundWithMonthlyFlows = base.equityInvested;

  const yearSnapshots: UtleieboligYearSnapshot[] = [];

  for (let month = 1; month <= months; month += 1) {
    const interest = loanBalance * monthlyLoanRate;
    let loanPayment = 0;

    if (loanBalance > 0 && month <= termMonths) {
      loanPayment = monthlyLoanPayment;
      const principalPaid = Math.min(loanBalance, loanPayment - interest);
      loanBalance = Math.max(0, loanBalance - principalPaid);
    }

    const cashBeforeTax =
      effectiveMonthlyRent - monthlyOperatingCosts - loanPayment;
    const estimatedTax =
      Math.max(0, effectiveMonthlyRent - monthlyOperatingCosts - interest) *
      taxRate;
    const cashAfterTax = cashBeforeTax - estimatedTax;

    cashReserve += cashAfterTax;
    if (cashAfterTax < 0) {
      totalSubsidiesPaid += Math.abs(cashAfterTax);
    }

    fundNetWorth *= 1 + monthlyFundRate;
    fundWithMonthlyFlows =
      fundWithMonthlyFlows * (1 + monthlyFundRate) + cashAfterTax;

    if (month % 12 === 0) {
      propertyValue *= 1 + annualPropertyGrowth;
      const yearSaleCosts = calculateUtleieboligSaleCosts(propertyValue, input);

      yearSnapshots.push({
        year: month / 12,
        propertyValue,
        loanBalance,
        cashReserve,
        saleCosts: yearSaleCosts,
        propertyNetWorth:
          propertyValue - loanBalance - yearSaleCosts + cashReserve,
        fundNetWorth,
      });
    }
  }

  const saleCosts = calculateUtleieboligSaleCosts(propertyValue, input);
  const propertyNetWorth =
    propertyValue - loanBalance - saleCosts + cashReserve;
  const latentFundTax = fundLatentTax(
    fundNetWorth,
    base.equityInvested,
    input.shareGainTaxPercent,
  );
  const fundNetWorthAfterTax = fundNetWorth - latentFundTax;

  return {
    propertyNetWorth,
    propertyValue,
    remainingLoan: loanBalance,
    cashReserve,
    saleCosts,
    fundNetWorth,
    fundWithMonthlyFlows,
    fundLatentTax: latentFundTax,
    fundNetWorthAfterTax,
    differenceVsFund: propertyNetWorth - fundNetWorth,
    differenceVsFundWithFlows: propertyNetWorth - fundWithMonthlyFlows,
    differenceVsFundAfterTax: propertyNetWorth - fundNetWorthAfterTax,
    totalSubsidiesPaid,
    propertyGain: propertyNetWorth - base.equityInvested,
    fundGain: fundNetWorth - base.equityInvested,
    propertyAnnualizedReturnPercent: annualizedReturn(
      base.equityInvested,
      propertyNetWorth,
      years,
    ),
    fundAnnualizedReturnPercent: annualizedReturn(
      base.equityInvested,
      fundNetWorth,
      years,
    ),
    yearSnapshots,
  };
}
