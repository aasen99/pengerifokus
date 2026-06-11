/** Formaterer heltall med tusenskille (f.eks. 500 000) */
export function formatIntegerInput(value: number): string {
  return new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: 0,
  }).format(value);
}

/** Parser formatert streng tilbake til tall */
export function parseIntegerInput(value: string): number {
  const cleaned = value.replace(/\s/g, "").replace(/\u00a0/g, "");
  if (cleaned === "") return NaN;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : NaN;
}

/** Oppdaterer visningsverdi mens brukeren skriver */
export function handleIntegerInputChange(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits === "") return "";
  return formatIntegerInput(Number(digits));
}
