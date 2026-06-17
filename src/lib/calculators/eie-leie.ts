import type {
  EieLeieInput,
  EieLeieResult,
  LoanType,
  MonthlySnapshot,
  SensitivityCase,
} from "@/types/eie-leie";
import { DOCUMENT_FEE_RATE } from "@/data/eie-leie";
import { calculateMonthlyPayment } from "@/lib/calculators/loan";

function monthlyRate(annualPercent: number): number {
  return annualPercent / 100 / 12;
}

function netInvestmentMonthlyRate(
  returnPercent: number,
  costPercent: number,
): number {
  return (returnPercent - costPercent) / 100 / 12;
}

export function calculateDocumentFee(input: EieLeieInput): number {
  if (input.isBorettslag) return 0;
  if (input.autoDocumentFee) {
    return Math.round(input.purchasePrice * DOCUMENT_FEE_RATE);
  }
  return input.documentFee;
}

export function calculateTotalPurchaseCosts(input: EieLeieInput): number {
  return (
    calculateDocumentFee(input) +
    input.registrationAndFees +
    input.loanEstablishmentCost +
    input.otherPurchaseCosts
  );
}

export function calculateLoanAmount(input: EieLeieInput): number {
  const totalFinanced = input.purchasePrice + input.sharedDebt;
  return Math.max(0, totalFinanced - input.equity);
}

export function calculateTotalFinancedAmount(input: EieLeieInput): number {
  return input.purchasePrice + input.sharedDebt;
}

export function calculateStartInvestment(input: EieLeieInput): number {
  return Math.max(
    0,
    input.equity + calculateTotalPurchaseCosts(input) - input.depositAmount,
  );
}

function ownerMonthlyFixedCosts(input: EieLeieInput): number {
  let total =
    input.commonFees +
    input.municipalFees +
    input.propertyTax +
    input.insurance +
    input.otherOwnerFixed;

  if (input.includeUtilities) total += input.utilities;
  if (input.includeInternet) total += input.internet;

  return total;
}

function maintenanceForMonth(
  input: EieLeieInput,
  propertyValue: number,
): number {
  if (input.maintenanceMode === "fixed") {
    return input.maintenanceMonthly;
  }

  return (propertyValue * (input.maintenancePercentAnnual / 100)) / 12;
}

function calculateSaleCosts(propertyValue: number, input: EieLeieInput): number {
  if (input.saleCostMode === "fixed") {
    return input.saleCostFixed;
  }

  return input.saleCostFixed + propertyValue * (input.saleCostPercent / 100);
}

function applyInvestmentGrowth(
  balance: number,
  contribution: number,
  rate: number,
): number {
  return balance * (1 + rate) + contribution;
}

interface LoanMonthResult {
  interest: number;
  principal: number;
  payment: number;
  balance: number;
}

function simulateLoanMonth(
  balance: number,
  annualRatePercent: number,
  loanType: LoanType,
  annuityPayment: number,
  serialPrincipal: number,
  interestOnly: boolean,
): LoanMonthResult {
  if (balance <= 0) {
    return { interest: 0, principal: 0, payment: 0, balance: 0 };
  }

  const interest = balance * monthlyRate(annualRatePercent);

  if (interestOnly) {
    return {
      interest,
      principal: 0,
      payment: interest,
      balance,
    };
  }

  if (loanType === "serie") {
    const principal = Math.min(serialPrincipal, balance);
    const payment = interest + principal;
    return {
      interest,
      principal,
      payment,
      balance: balance - principal,
    };
  }

  const principal = Math.min(annuityPayment - interest, balance);
  const payment = interest + principal;

  return {
    interest,
    principal,
    payment,
    balance: balance - principal,
  };
}

export function calculateEieLeie(input: EieLeieInput): EieLeieResult {
  const totalMonths = Math.round(input.horizonYears * 12);
  const loanAmount = calculateLoanAmount(input);
  const totalPurchaseCosts = calculateTotalPurchaseCosts(input);
  const startInvestment = calculateStartInvestment(input);
  const investmentRate = netInvestmentMonthlyRate(
    input.investmentReturnPercent,
    input.investmentCostPercent,
  );
  const depositMonthlyRate = monthlyRate(input.depositReturnPercent);

  const loanTermMonths = Math.round(input.loanTermYears * 12);
  const annuityPayment =
    loanAmount > 0 && loanTermMonths > 0
      ? calculateMonthlyPayment(
          loanAmount,
          input.nominalRatePercent,
          loanTermMonths,
        )
      : 0;
  const serialPrincipal =
    loanAmount > 0 && loanTermMonths > 0 ? loanAmount / loanTermMonths : 0;

  let propertyValue = input.purchasePrice;
  let loanBalance = loanAmount;
  let currentRent = input.monthlyRent;
  let ownerInvestment = 0;
  let renterInvestment = startInvestment;
  let depositBalance = input.depositAmount;

  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let totalMaintenance = 0;
  let totalFixedOwnerCosts = 0;
  let totalRentPaid = 0;
  let totalMonthlyInvestments = 0;
  let crossoverMonth: number | null = null;
  let ownerAheadFromStart = false;

  const monthlySnapshots: MonthlySnapshot[] = [];

  const snapshotAtMonth = (
    month: number,
    saleCosts = 0,
  ): { ownerNetWorth: number; renterNetWorth: number } => {
    const ownerNetWorth =
      propertyValue -
      loanBalance -
      saleCosts +
      ownerInvestment -
      totalPurchaseCosts;

    const renterNetWorth = renterInvestment + depositBalance;

    return { ownerNetWorth, renterNetWorth };
  };

  for (let month = 1; month <= totalMonths; month += 1) {
    if (month > 1 && (month - 1) % 12 === 0) {
      propertyValue *= 1 + input.propertyGrowthPercent / 100;
      currentRent *= 1 + input.annualRentIncreasePercent / 100;
    }

    const interestOnly = month <= input.interestOnlyMonths;
    const loanMonth = simulateLoanMonth(
      loanBalance,
      input.nominalRatePercent,
      input.loanType,
      annuityPayment,
      serialPrincipal,
      interestOnly,
    );

    loanBalance = loanMonth.balance;
    totalInterestPaid += loanMonth.interest;
    totalPrincipalPaid += loanMonth.principal;

    const maintenance = maintenanceForMonth(input, propertyValue);
    const fixedCosts = ownerMonthlyFixedCosts(input);
    totalMaintenance += maintenance;
    totalFixedOwnerCosts += fixedCosts;

    const ownerCashOut =
      loanMonth.payment + fixedCosts + maintenance;
    const renterCashOut = currentRent;
    totalRentPaid += currentRent;

    if (ownerCashOut > renterCashOut) {
      const diff = ownerCashOut - renterCashOut;
      renterInvestment = applyInvestmentGrowth(
        renterInvestment,
        diff,
        investmentRate,
      );
      totalMonthlyInvestments += diff;
      ownerInvestment = applyInvestmentGrowth(ownerInvestment, 0, investmentRate);
    } else if (renterCashOut > ownerCashOut) {
      const diff = renterCashOut - ownerCashOut;
      ownerInvestment = applyInvestmentGrowth(
        ownerInvestment,
        diff,
        investmentRate,
      );
      renterInvestment = applyInvestmentGrowth(
        renterInvestment,
        0,
        investmentRate,
      );
    } else {
      ownerInvestment = applyInvestmentGrowth(ownerInvestment, 0, investmentRate);
      renterInvestment = applyInvestmentGrowth(
        renterInvestment,
        0,
        investmentRate,
      );
    }

    depositBalance *= 1 + depositMonthlyRate;

    const saleCosts =
      month === totalMonths ? calculateSaleCosts(propertyValue, input) : 0;
    const { ownerNetWorth, renterNetWorth } = snapshotAtMonth(
      month,
      saleCosts,
    );

    if (
      crossoverMonth === null &&
      month > 1 &&
      ownerNetWorth > renterNetWorth
    ) {
      const previous = monthlySnapshots[month - 2];
      if (previous && previous.ownerNetWorth <= previous.renterNetWorth) {
        crossoverMonth = month;
      }
    }

    monthlySnapshots.push({
      month,
      ownerNetWorth,
      renterNetWorth,
      propertyValue,
      loanBalance,
    });
  }

  const finalPropertyValue = propertyValue;
  const saleCosts = calculateSaleCosts(finalPropertyValue, input);
  const ownerNetWorth =
    finalPropertyValue -
    loanBalance -
    saleCosts +
    ownerInvestment -
    totalPurchaseCosts;
  const depositReturned = depositBalance;
  const renterNetWorth = renterInvestment + depositReturned;
  const netWorthDifference = ownerNetWorth - renterNetWorth;

  let betterOption: EieLeieResult["betterOption"] = "lik";
  if (netWorthDifference > 500) betterOption = "eie";
  if (netWorthDifference < -500) betterOption = "leie";

  if (monthlySnapshots.length > 0) {
    const first = monthlySnapshots[0];
    ownerAheadFromStart = first.ownerNetWorth > first.renterNetWorth;
  }

  return {
    loanAmount,
    totalFinancedAmount: calculateTotalFinancedAmount(input),
    totalPurchaseCosts,
    startInvestment,
    owner: {
      propertyValue: finalPropertyValue,
      remainingDebt: loanBalance,
      equityBuilt: finalPropertyValue - loanBalance,
      totalInterestPaid,
      totalPrincipalPaid,
      totalMaintenance,
      totalPurchaseCosts,
      totalSaleCosts: saleCosts,
      totalFixedOwnerCosts,
      ownerInvestmentValue: ownerInvestment,
      netWorth: ownerNetWorth,
    },
    renter: {
      totalRentPaid,
      startInvestment,
      totalMonthlyInvestments,
      investmentValue: renterInvestment,
      depositReturned,
      netWorth: renterNetWorth,
    },
    netWorthDifference,
    betterOption,
    crossoverMonth,
    ownerAheadFromStart,
    monthlySnapshots,
    ownerCostBreakdown: {
      interest: totalInterestPaid,
      maintenance: totalMaintenance,
      fixedCosts: totalFixedOwnerCosts,
      purchaseCosts: totalPurchaseCosts,
      saleCosts,
    },
    totalRentPaid,
  };
}

export function calculateSensitivityCases(
  baseInput: EieLeieInput,
): SensitivityCase[] {
  const cases: Array<{ id: string; label: string; input: EieLeieInput }> = [
    {
      id: "rate-up",
      label: "Renten øker med 2 prosentpoeng",
      input: {
        ...baseInput,
        nominalRatePercent: baseInput.nominalRatePercent + 2,
      },
    },
    {
      id: "flat-prices",
      label: "Boligprisene står stille",
      input: { ...baseInput, propertyGrowthPercent: 0 },
    },
    {
      id: "price-drop",
      label: "Boligprisene faller 10 % totalt",
      input: {
        ...baseInput,
        propertyGrowthPercent:
          baseInput.horizonYears > 0
            ? (Math.pow(0.9, 1 / baseInput.horizonYears) - 1) * 100
            : -10,
      },
    },
    {
      id: "low-return",
      label: "Fondsavkastningen blir 3 %",
      input: { ...baseInput, investmentReturnPercent: 3 },
    },
    {
      id: "move-early",
      label: "Du flytter to år tidligere",
      input: {
        ...baseInput,
        horizonYears: Math.max(1, baseInput.horizonYears - 2),
      },
    },
  ];

  return cases.map(({ id, label, input }) => {
    const result = calculateEieLeie(input);

    return {
      id,
      label,
      netWorthDifference: result.netWorthDifference,
      betterOption: result.betterOption,
    };
  });
}

export function formatEieLeieCopyText(
  result: EieLeieResult,
  horizonYears: number,
): string {
  const diff = Math.abs(Math.round(result.netWorthDifference));
  const formatted = new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: 0,
  }).format(diff);

  if (result.betterOption === "eie") {
    return `Med mine forutsetninger gir eie anslagsvis ${formatted} kr høyere nettoformue etter ${horizonYears} år.`;
  }

  if (result.betterOption === "leie") {
    return `Med mine forutsetninger gir leie og investering anslagsvis ${formatted} kr høyere nettoformue etter ${horizonYears} år.`;
  }

  return `Med mine forutsetninger gir eie og leie omtrent lik nettoformue etter ${horizonYears} år.`;
}

export function formatYearsAndMonthsFromMonth(month: number): string {
  const years = Math.floor(month / 12);
  const months = month % 12;

  if (years === 0) return `${months} mnd`;
  if (months === 0) return `${years} år`;
  return `${years} år og ${months} mnd`;
}
