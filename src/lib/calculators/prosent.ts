export type ProsentMode =
  | "of"
  | "isPercentOf"
  | "findWhole"
  | "change"
  | "adjust";

export interface ProsentOfResult {
  mode: "of";
  value: number;
  formula: string;
}

export interface ProsentIsPercentOfResult {
  mode: "isPercentOf";
  percent: number;
  formula: string;
}

export interface ProsentFindWholeResult {
  mode: "findWhole";
  whole: number;
  formula: string;
}

export interface ProsentChangeResult {
  mode: "change";
  percent: number;
  difference: number;
  direction: "increase" | "decrease" | "unchanged";
  formula: string;
}

export interface ProsentAdjustResult {
  mode: "adjust";
  newValue: number;
  difference: number;
  formula: string;
}

export type ProsentResult =
  | ProsentOfResult
  | ProsentIsPercentOfResult
  | ProsentFindWholeResult
  | ProsentChangeResult
  | ProsentAdjustResult;

function formatNb(value: number, digits = 2): string {
  return value.toLocaleString("nb-NO", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}

/** Hva er X % av Y? */
export function percentOf(percent: number, of: number): ProsentOfResult | null {
  if (!Number.isFinite(percent) || !Number.isFinite(of)) return null;
  const value = (percent / 100) * of;
  return {
    mode: "of",
    value,
    formula: `${formatNb(percent)} % av ${formatNb(of)} = ${formatNb(value)}`,
  };
}

/** X er hvor mange % av Y? */
export function isPercentOf(
  part: number,
  whole: number,
): ProsentIsPercentOfResult | null {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole === 0) {
    return null;
  }
  const percent = (part / whole) * 100;
  return {
    mode: "isPercentOf",
    percent,
    formula: `${formatNb(part)} ÷ ${formatNb(whole)} × 100 = ${formatNb(percent)} %`,
  };
}

/** X er P % av hva? */
export function findWhole(
  part: number,
  percent: number,
): ProsentFindWholeResult | null {
  if (!Number.isFinite(part) || !Number.isFinite(percent) || percent === 0) {
    return null;
  }
  const whole = (part / percent) * 100;
  return {
    mode: "findWhole",
    whole,
    formula: `${formatNb(part)} ÷ ${formatNb(percent)} × 100 = ${formatNb(whole)}`,
  };
}

/** Prosentendring fra A til B */
export function percentChange(
  from: number,
  to: number,
): ProsentChangeResult | null {
  if (!Number.isFinite(from) || !Number.isFinite(to) || from === 0) return null;
  const difference = to - from;
  const percent = (difference / from) * 100;
  const direction =
    difference > 0 ? "increase" : difference < 0 ? "decrease" : "unchanged";
  return {
    mode: "change",
    percent,
    difference,
    direction,
    formula: `(${formatNb(to)} − ${formatNb(from)}) ÷ ${formatNb(from)} × 100 = ${formatNb(percent)} %`,
  };
}

/** Øk eller reduser verdi med prosent */
export function adjustByPercent(
  value: number,
  percent: number,
  direction: "increase" | "decrease",
): ProsentAdjustResult | null {
  if (!Number.isFinite(value) || !Number.isFinite(percent)) return null;
  const factor = direction === "increase" ? 1 + percent / 100 : 1 - percent / 100;
  const newValue = value * factor;
  const difference = newValue - value;
  const verb = direction === "increase" ? "økt" : "redusert";
  return {
    mode: "adjust",
    newValue,
    difference,
    formula: `${formatNb(value)} ${verb} med ${formatNb(percent)} % = ${formatNb(newValue)}`,
  };
}
