/** År til å doble ved regel 72 (tommelfingerregel) */
export function yearsToDoubleRule72(ratePercent: number): number | null {
  if (!Number.isFinite(ratePercent) || ratePercent <= 0) return null;
  return 72 / ratePercent;
}

/** Eksakt år til å doble med årlig rentes rente */
export function yearsToDoubleExact(ratePercent: number): number | null {
  if (!Number.isFinite(ratePercent) || ratePercent <= 0) return null;
  const rate = ratePercent / 100;
  return Math.log(2) / Math.log(1 + rate);
}

/** Nødvendig avkastning for å doble på X år (regel 72) */
export function rateToDoubleRule72(years: number): number | null {
  if (!Number.isFinite(years) || years <= 0) return null;
  return 72 / years;
}

export interface Regel72Result {
  ratePercent: number;
  yearsRule72: number;
  yearsExact: number;
  differenceYears: number;
}

export function calculateRegel72(ratePercent: number): Regel72Result | null {
  const yearsRule72 = yearsToDoubleRule72(ratePercent);
  const yearsExact = yearsToDoubleExact(ratePercent);

  if (yearsRule72 === null || yearsExact === null) return null;

  return {
    ratePercent,
    yearsRule72,
    yearsExact,
    differenceYears: yearsRule72 - yearsExact,
  };
}

export function projectDoublings(
  startAmount: number,
  ratePercent: number,
  years: number,
): number | null {
  if (
    !Number.isFinite(startAmount) ||
    !Number.isFinite(ratePercent) ||
    !Number.isFinite(years) ||
    startAmount <= 0 ||
    ratePercent <= 0 ||
    years < 0
  ) {
    return null;
  }

  return startAmount * (1 + ratePercent / 100) ** years;
}

export const COMMON_RATES = [3, 4, 5, 7, 8, 10] as const;
