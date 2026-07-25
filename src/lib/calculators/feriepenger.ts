export type FerieWeeks = 4 | 5;

export const FERIEPENGE_RATES = {
  weeks4: 10.2,
  weeks5: 12,
  weeks4Over60: 12.5,
  weeks5Over60: 14.3,
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

export function calculateFeriepenger(
  input: FeriepengerInput,
): FeriepengerResult | null {
  const { base, weeks, over60 } = input;

  if (!Number.isFinite(base) || base < 0) return null;
  if (weeks !== 4 && weeks !== 5) return null;

  const ratePercent = getFeriepengeRate(weeks, over60);
  const feriepenger = (base * ratePercent) / 100;

  return {
    ratePercent,
    feriepenger,
    weeks,
    over60,
    base,
  };
}

/** Grove estimat: månedslønn × 12 når du ikke har grunnlaget fra lønnsslippen */
export function estimateBaseFromMonthlySalary(monthlySalary: number): number {
  return monthlySalary * 12;
}
