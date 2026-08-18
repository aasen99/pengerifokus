export type FerieWeeks = 4 | 5;

export const FERIEPENGE_RATES = {
  weeks4: 10.2,
  weeks5: 12,
  weeks4Over60: 12.5,
  weeks5Over60: 14.3,
} as const;

/**
 * 5-dagersuke: 52 × 5 = 260 virkedager i året.
 * 260 / 12 ≈ 21,67 virkedager per måned — samme modell som Skatteetaten
 * bruker for trekk i fastlønn når feriepengene avregnes i juni.
 */
export const WORKING_DAYS_PER_YEAR = 260;
export const WORKING_DAYS_PER_MONTH = WORKING_DAYS_PER_YEAR / 12;

/** Feriedager i 5-dagersuke (Skatteetaten / vanlig lønnskjøring). */
export const HOLIDAY_WORKING_DAYS = {
  /** Ferieloven: 4 uker + 1 dag */
  weeks4: 21,
  /** Vanlig tariff: 5 uker */
  weeks5: 25,
  /** Ekstra uke fra året du fyller 60 */
  extraOver60: 5,
} as const;

export interface FeriepengerInput {
  /** Feriepengegrunnlag (arbeidsvederlag i opptjeningsåret) */
  base: number;
  /** 4 = lovens minstekrav (4 uker + 1 dag), 5 = vanlig tariff */
  weeks: FerieWeeks;
  /** Fyller 60 år i ferieåret */
  over60: boolean;
}

export interface FeriepengerResult {
  ratePercent: number;
  feriepenger: number;
  weeks: FerieWeeks;
  over60: boolean;
  base: number;
  /** Ordinær månedslønn i ferieåret, modellert som grunnlag / 12 */
  monthlySalary: number;
  /** 21 eller 25 virkedager etter ferielengde (uten 60+-uken) */
  baseHolidayDays: number;
  /** 5 virkedager når over60, ellers 0 */
  extraDaysOver60: number;
  /** Totalt antall feriedager som trekkes */
  holidayDays: number;
  /** Trekk for avtalt ferie (21 eller 25 dager) */
  baseHolidayDeduction: number;
  /** Trekk for ekstra uke fra 60 år */
  extraWeekDeduction: number;
  /** Samlet trekk for feriedager */
  holidayDeduction: number;
  /**
   * Anslått bruttoutbetaling i juni:
   * feriepenger + månedslønn − trekk for feriedager.
   * Forutsetter at alle feriedagene trekkes i juni.
   */
  juneGrossPayout: number;
}

export function getFeriepengeRate(
  weeks: FerieWeeks,
  over60: boolean,
): number {
  if (weeks === 5) {
    return over60
      ? FERIEPENGE_RATES.weeks5Over60
      : FERIEPENGE_RATES.weeks5;
  }
  return over60
    ? FERIEPENGE_RATES.weeks4Over60
    : FERIEPENGE_RATES.weeks4;
}

export function getBaseHolidayDays(weeks: FerieWeeks): number {
  return weeks === 5
    ? HOLIDAY_WORKING_DAYS.weeks5
    : HOLIDAY_WORKING_DAYS.weeks4;
}

export function getExtraHolidayDays(over60: boolean): number {
  return over60 ? HOLIDAY_WORKING_DAYS.extraOver60 : 0;
}

export function getHolidayWorkingDays(
  weeks: FerieWeeks,
  over60: boolean,
): number {
  return getBaseHolidayDays(weeks) + getExtraHolidayDays(over60);
}

/**
 * Trekk for et gitt antall feriedager.
 * dagslønn = månedslønn / 21,67 = årslønn / 260
 */
export function holidayDeductionForDays(
  monthlySalary: number,
  days: number,
): number {
  return (monthlySalary * days) / WORKING_DAYS_PER_MONTH;
}

export function calculateFeriepenger(
  input: FeriepengerInput,
): FeriepengerResult | null {
  const { base, weeks, over60 } = input;

  if (!Number.isFinite(base) || base < 0) return null;
  if (weeks !== 4 && weeks !== 5) return null;

  const ratePercent = getFeriepengeRate(weeks, over60);
  const feriepenger = (base * ratePercent) / 100;
  const monthlySalary = base / 12;
  const baseHolidayDays = getBaseHolidayDays(weeks);
  const extraDaysOver60 = getExtraHolidayDays(over60);
  const holidayDays = baseHolidayDays + extraDaysOver60;
  const baseHolidayDeduction = holidayDeductionForDays(
    monthlySalary,
    baseHolidayDays,
  );
  const extraWeekDeduction = holidayDeductionForDays(
    monthlySalary,
    extraDaysOver60,
  );
  const holidayDeduction = baseHolidayDeduction + extraWeekDeduction;
  const juneGrossPayout = feriepenger + monthlySalary - holidayDeduction;

  return {
    ratePercent,
    feriepenger,
    weeks,
    over60,
    base,
    monthlySalary,
    baseHolidayDays,
    extraDaysOver60,
    holidayDays,
    baseHolidayDeduction,
    extraWeekDeduction,
    holidayDeduction,
    juneGrossPayout,
  };
}

/** Grove estimat: månedslønn × 12 når du ikke har grunnlaget fra lønnsslippen */
export function estimateBaseFromMonthlySalary(monthlySalary: number): number {
  return monthlySalary * 12;
}
