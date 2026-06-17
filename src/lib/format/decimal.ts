/** Tillater tom streng, heltall og desimal med komma (f.eks. «5,» eller «5,5»). */
export function isValidPartialDecimal(raw: string): boolean {
  return raw === "" || /^[\d\s]*([,]\d*)?$/.test(raw);
}

export function parseDecimalInput(raw: string): number | null {
  const cleaned = raw.replace(/\s/g, "").replace(",", ".");
  if (cleaned === "" || cleaned === ".") return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

export function formatDecimalInput(value: number): string {
  return String(value).replace(".", ",");
}

export function decimalsRoughlyEqual(a: number, b: number, epsilon = 0.001): boolean {
  return Math.abs(a - b) < epsilon;
}
