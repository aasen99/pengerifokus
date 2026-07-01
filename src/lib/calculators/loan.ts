export interface LoanInput {
  principal: number;
  annualRatePercent: number;
  termYears: number;
  extraMonthlyPayment?: number;
  lumpSumPayment?: number;
}

export interface LoanSummary {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  termMonths: number;
}

export interface LoanComparison {
  standard: LoanSummary;
  withExtra: LoanSummary | null;
  withLumpSum: LoanSummary | null;
  withExtraAndLumpSum: LoanSummary | null;
  monthsSaved: number;
  interestSaved: number;
  lumpSumMonthsSaved: number;
  lumpSumInterestSaved: number;
  combinedMonthsSaved: number;
  combinedInterestSaved: number;
}

/** Månedlig terminbeløp for annuitetslån */
export function calculateMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  termMonths: number,
): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  if (annualRatePercent === 0) return principal / termMonths;

  const monthlyRate = annualRatePercent / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

/** Simulerer nedbetaling måned for måned */
export function simulateLoan(
  principal: number,
  annualRatePercent: number,
  monthlyPayment: number,
  extraMonthlyPayment = 0,
): LoanSummary {
  const monthlyRate = annualRatePercent / 100 / 12;
  let balance = principal;
  let months = 0;
  let totalInterest = 0;
  const maxMonths = 600;

  while (balance > 0.01 && months < maxMonths) {
    months += 1;
    const interest = balance * monthlyRate;
    totalInterest += interest;

    let payment = monthlyPayment + extraMonthlyPayment;
    const minimumDue = balance + interest;
    if (payment > minimumDue) payment = minimumDue;

    balance -= payment - interest;
  }

  return {
    monthlyPayment,
    totalPaid: principal + totalInterest,
    totalInterest,
    termMonths: months,
  };
}

function applyLumpSum(principal: number, lumpSumPayment?: number): number {
  const lump = lumpSumPayment ?? 0;
  if (lump <= 0) return principal;
  return Math.max(0, principal - lump);
}

export function compareLoanScenarios(input: LoanInput): LoanComparison {
  const termMonths = Math.round(input.termYears * 12);
  const monthlyPayment = calculateMonthlyPayment(
    input.principal,
    input.annualRatePercent,
    termMonths,
  );

  const standard = simulateLoan(
    input.principal,
    input.annualRatePercent,
    monthlyPayment,
  );

  const extra = input.extraMonthlyPayment ?? 0;
  const lumpSum = input.lumpSumPayment ?? 0;

  const withExtra =
    extra > 0
      ? simulateLoan(input.principal, input.annualRatePercent, monthlyPayment, extra)
      : null;

  const principalAfterLumpSum = applyLumpSum(input.principal, lumpSum);
  const withLumpSum =
    lumpSum > 0
      ? simulateLoan(principalAfterLumpSum, input.annualRatePercent, monthlyPayment)
      : null;

  const withExtraAndLumpSum =
    extra > 0 && lumpSum > 0
      ? simulateLoan(
          principalAfterLumpSum,
          input.annualRatePercent,
          monthlyPayment,
          extra,
        )
      : null;

  return {
    standard,
    withExtra,
    withLumpSum,
    withExtraAndLumpSum,
    monthsSaved: withExtra ? standard.termMonths - withExtra.termMonths : 0,
    interestSaved: withExtra ? standard.totalInterest - withExtra.totalInterest : 0,
    lumpSumMonthsSaved: withLumpSum ? standard.termMonths - withLumpSum.termMonths : 0,
    lumpSumInterestSaved: withLumpSum ? standard.totalInterest - withLumpSum.totalInterest : 0,
    combinedMonthsSaved: withExtraAndLumpSum
      ? standard.termMonths - withExtraAndLumpSum.termMonths
      : 0,
    combinedInterestSaved: withExtraAndLumpSum
      ? standard.totalInterest - withExtraAndLumpSum.totalInterest
      : 0,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatYearsAndMonths(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} mnd`;
  if (months === 0) return `${years} år`;
  return `${years} år og ${months} mnd`;
}
