export interface DopengeInput {
  monthlyNet: number;
  workHoursPerWeek: number;
  toiletMinutesPerDay: number;
  workDaysPerWeek: number;
  weeksPerYear: number;
}

export interface DopengeResult {
  hourlyRate: number;
  perMinute: number;
  perVisit: number;
  perWorkday: number;
  perMonth: number;
  perYear: number;
  toiletHoursPerYear: number;
  shareOfAnnualIncome: number;
}

export function calculateDopenge(input: DopengeInput): DopengeResult | null {
  const {
    monthlyNet,
    workHoursPerWeek,
    toiletMinutesPerDay,
    workDaysPerWeek,
    weeksPerYear,
  } = input;

  if (
    !Number.isFinite(monthlyNet) ||
    !Number.isFinite(workHoursPerWeek) ||
    !Number.isFinite(toiletMinutesPerDay) ||
    !Number.isFinite(workDaysPerWeek) ||
    !Number.isFinite(weeksPerYear) ||
    monthlyNet <= 0 ||
    workHoursPerWeek <= 0 ||
    toiletMinutesPerDay < 0 ||
    workDaysPerWeek <= 0 ||
    weeksPerYear <= 0
  ) {
    return null;
  }

  const annualNet = monthlyNet * 12;
  const annualWorkHours = workHoursPerWeek * weeksPerYear;
  const hourlyRate = annualNet / annualWorkHours;
  const perMinute = hourlyRate / 60;

  const toiletHoursPerYear =
    (toiletMinutesPerDay / 60) * workDaysPerWeek * weeksPerYear;
  const perYear = hourlyRate * toiletHoursPerYear;
  const perMonth = perYear / 12;
  const perWorkday = toiletMinutesPerDay * perMinute;
  const minutesPerVisit = 5;
  const perVisit = perMinute * minutesPerVisit;

  return {
    hourlyRate,
    perMinute,
    perVisit,
    perWorkday,
    perMonth,
    perYear,
    toiletHoursPerYear,
    shareOfAnnualIncome: annualNet > 0 ? (perYear / annualNet) * 100 : 0,
  };
}
