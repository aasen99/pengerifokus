export interface TidErPengerInput {
  monthlyNet: number;
  monthlyWorkCosts: number;
  workHoursPerWeek: number;
  commuteMinutesPerDay: number;
  workDaysPerWeek: number;
  weeksPerYear: number;
}

export interface TidErPengerResult {
  annualNet: number;
  annualWorkCosts: number;
  adjustedAnnualNet: number;
  workHoursPerYear: number;
  commuteHoursPerYear: number;
  totalHoursPerYear: number;
  nominalHourly: number;
  realHourly: number;
  hourlyDifference: number;
  commuteShareOfTime: number;
}

export function calculateTidErPenger(input: TidErPengerInput): TidErPengerResult {
  const annualNet = input.monthlyNet * 12;
  const annualWorkCosts = input.monthlyWorkCosts * 12;
  const adjustedAnnualNet = annualNet - annualWorkCosts;

  const workHoursPerYear = input.workHoursPerWeek * input.weeksPerYear;
  const commuteHoursPerYear =
    (input.commuteMinutesPerDay / 60) *
    input.workDaysPerWeek *
    input.weeksPerYear;
  const totalHoursPerYear = workHoursPerYear + commuteHoursPerYear;

  const nominalHourly =
    workHoursPerYear > 0 ? annualNet / workHoursPerYear : 0;
  const realHourly =
    totalHoursPerYear > 0 ? adjustedAnnualNet / totalHoursPerYear : 0;

  return {
    annualNet,
    annualWorkCosts,
    adjustedAnnualNet,
    workHoursPerYear,
    commuteHoursPerYear,
    totalHoursPerYear,
    nominalHourly,
    realHourly,
    hourlyDifference: nominalHourly - realHourly,
    commuteShareOfTime:
      totalHoursPerYear > 0
        ? (commuteHoursPerYear / totalHoursPerYear) * 100
        : 0,
  };
}

/** Minutter arbeidstid (inkl. pendling) en utgift tilsvarer */
export function minutesOfLifeForPurchase(
  amount: number,
  realHourly: number,
): number | null {
  if (realHourly <= 0 || amount <= 0) return null;
  return (amount / realHourly) * 60;
}

export function grossToNetMonthly(
  monthlyGross: number,
  taxPercent: number,
): number {
  const rate = Math.min(Math.max(taxPercent, 0), 100) / 100;
  return monthlyGross * (1 - rate);
}
