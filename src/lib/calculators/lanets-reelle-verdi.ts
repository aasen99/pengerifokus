import type {
  InflationLoanInputs,
  InflationLoanResult,
  LoanScheduleEntry,
  LoanSimulationResult,
  LoanStrategyComparison,
  SalaryGrowthLoanInputs,
} from "@/types/lanets-reelle-verdi";

const MAX_SIMULATION_MONTHS = 600;

export function calculateRealDebtValue(
  currentDebt: number,
  inflationRate: number,
  years: number,
): number {
  if (years <= 0 || inflationRate <= 0) return currentDebt;
  return currentDebt / Math.pow(1 + inflationRate / 100, years);
}

export function calculateRealInterestRate(
  nominalInterestRate: number,
  inflationRate: number,
): number {
  return (
    ((1 + nominalInterestRate / 100) / (1 + inflationRate / 100) - 1) * 100
  );
}

export function calculateInflationLoanResult(
  input: InflationLoanInputs,
): InflationLoanResult {
  const realDebtValue = calculateRealDebtValue(
    input.currentDebt,
    input.inflationRate,
    input.years,
  );
  const reductionInRealValue = input.currentDebt - realDebtValue;
  const reductionPercent =
    input.currentDebt > 0
      ? (reductionInRealValue / input.currentDebt) * 100
      : 0;
  const realInterestRate = calculateRealInterestRate(
    input.nominalInterestRate,
    input.inflationRate,
  );

  const yearlyValues = Array.from({ length: input.years + 1 }, (_, year) => ({
    year,
    nominalDebt: input.currentDebt,
    realValue: calculateRealDebtValue(
      input.currentDebt,
      input.inflationRate,
      year,
    ),
  }));

  return {
    realDebtValue,
    reductionInRealValue,
    reductionPercent,
    realInterestRate,
    yearlyValues,
  };
}

export function calculateAnnuityPayment(
  principal: number,
  annualInterestRate: number,
  repaymentYears: number,
): number {
  if (principal <= 0 || repaymentYears <= 0) return 0;

  const numberOfPayments = repaymentYears * 12;
  const monthlyRate = annualInterestRate / 100 / 12;

  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  const factor = Math.pow(1 + monthlyRate, numberOfPayments);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function simulateLoan({
  principal,
  annualInterestRate,
  monthlyPayment,
  annualPaymentIncreaseRate = 0,
  maxMonths = MAX_SIMULATION_MONTHS,
}: {
  principal: number;
  annualInterestRate: number;
  monthlyPayment: number;
  annualPaymentIncreaseRate?: number;
  maxMonths?: number;
}): LoanSimulationResult {
  const monthlyRate = annualInterestRate / 100 / 12;

  let balance = principal;
  let payment = monthlyPayment;
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  const schedule: LoanScheduleEntry[] = [];
  const initialPayment = monthlyPayment;

  while (balance > 0.01 && month < maxMonths) {
    if (month > 0 && month % 12 === 0) {
      payment *= 1 + annualPaymentIncreaseRate;
    }

    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const actualPayment = Math.min(payment, balance + interest);
    const principalPayment = actualPayment - interest;

    balance = Math.max(0, balance - principalPayment);
    totalInterest += interest;
    totalPaid += actualPayment;
    month += 1;

    schedule.push({
      month,
      payment: actualPayment,
      interest,
      principalPayment,
      balance,
    });
  }

  const extraPaid =
    annualPaymentIncreaseRate > 0
      ? schedule.reduce(
          (sum, entry) => sum + Math.max(0, entry.payment - initialPayment),
          0,
        )
      : 0;

  return {
    months: month,
    totalInterest,
    totalPaid,
    extraPaid,
    schedule,
  };
}

function paymentAtYear(
  schedule: LoanScheduleEntry[],
  year: number,
): number | null {
  const targetMonth = year * 12;
  const lastMonth = schedule.at(-1)?.month ?? 0;
  if (targetMonth > lastMonth) return null;

  const entry = schedule.find((item) => item.month === targetMonth);
  return entry?.payment ?? schedule.at(-1)?.payment ?? null;
}

export function compareLoanStrategies(
  input: SalaryGrowthLoanInputs,
): LoanStrategyComparison | null {
  if (
    input.currentDebt < 1_000 ||
    input.repaymentYears < 1 ||
    input.nominalInterestRate < 0
  ) {
    return null;
  }

  const monthlyPayment = calculateAnnuityPayment(
    input.currentDebt,
    input.nominalInterestRate,
    input.repaymentYears,
  );

  const annualPaymentIncreaseRate =
    (input.salaryGrowthRate / 100) * (input.salaryGrowthShare / 100);

  const standard = simulateLoan({
    principal: input.currentDebt,
    annualInterestRate: input.nominalInterestRate,
    monthlyPayment,
    annualPaymentIncreaseRate: 0,
  });

  const withSalaryGrowth = simulateLoan({
    principal: input.currentDebt,
    annualInterestRate: input.nominalInterestRate,
    monthlyPayment,
    annualPaymentIncreaseRate,
  });

  return {
    standard: { ...standard, extraPaid: 0 },
    withSalaryGrowth,
    monthlyPayment,
    annualPaymentIncreaseRate,
    monthsSaved: Math.max(0, standard.months - withSalaryGrowth.months),
    interestSaved: Math.max(
      0,
      standard.totalInterest - withSalaryGrowth.totalInterest,
    ),
    paymentAfter5Years: paymentAtYear(withSalaryGrowth.schedule, 5),
    paymentAfter10Years: paymentAtYear(withSalaryGrowth.schedule, 10),
  };
}

export function formatPercentage(value: number, decimals = 2): string {
  return new Intl.NumberFormat("nb-NO", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatMonths(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} måneder`;
  if (months === 0) return `${years} år`;
  return `${years} år og ${months} måneder`;
}

export function formatLrvCopyText(
  inflation: InflationLoanResult,
  input: InflationLoanInputs,
  salaryComparison: LoanStrategyComparison | null,
  salaryEnabled: boolean,
  salaryGrowthRate: number,
  salaryGrowthShare: number,
): string {
  const debt = new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: 0,
  }).format(Math.round(input.currentDebt));
  const real = new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: 0,
  }).format(Math.round(inflation.realDebtValue));

  let text = `En gjeld på ${debt} kroner om ${input.years} år tilsvarer omtrent ${real} kroner i dagens pengeverdi ved ${formatPercentage(input.inflationRate)} % årlig inflasjon.`;

  if (salaryEnabled && salaryComparison && salaryComparison.monthsSaved > 0) {
    const annualIncrease =
      salaryGrowthRate * (salaryGrowthShare / 100);
    const saved = new Intl.NumberFormat("nb-NO", {
      maximumFractionDigits: 0,
    }).format(Math.round(salaryComparison.interestSaved));

    text += ` Ved å øke låneinnbetalingen med ${formatPercentage(annualIncrease)} % årlig kan lånet bli nedbetalt omtrent ${formatMonths(salaryComparison.monthsSaved)} tidligere og spare omtrent ${saved} kroner i renter.`;
  }

  return text;
}

export function balanceAtYear(
  schedule: LoanScheduleEntry[],
  year: number,
): number | null {
  const targetMonth = year * 12;
  const entry = schedule.find((item) => item.month === targetMonth);
  if (entry) return entry.balance;

  const last = schedule.at(-1);
  if (!last || targetMonth > last.month) return null;

  return last.balance;
}
