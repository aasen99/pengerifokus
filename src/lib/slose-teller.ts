/**
 * Illustrativ «sløseteller» for forsiden.
 * Tallene er grove snitt for å gjøre poenget synlig, ikke offisiell statistikk.
 */

export type SloseScenario = {
  id: string;
  /** Kort merkelapp over tallet */
  eyebrow: string;
  /** Hovedpåstand */
  headline: string;
  /** Antall personer i beregningen */
  people: number;
  /** Enheter per person per uke */
  unitsPerPersonPerWeek: number;
  /** Kroner per enhet */
  kronerPerUnit: number;
  /** Hva enheten heter i forklaring */
  unitLabel: string;
  /** Kort fotnote om kilder/antakelser */
  footnote: string;
};

/** Kjøpekaffe: 1 kopp/uke i snitt × 50 kr × 4,5 mill. voksne. */
export const KAFFE_SLOSE: SloseScenario = {
  id: "kaffe",
  eyebrow: "Hittil i år",
  headline: "Så mye har nordmenn brukt på kjøpekaffe",
  people: 4_500_000,
  unitsPerPersonPerWeek: 1,
  kronerPerUnit: 50,
  unitLabel: "kopp",
  footnote:
    "Illustrasjon: 4,5 mill. voksne × 1 kjøpekaffe/uke × 50 kr. Snittet er inspirert av Kaffeundersøkelsen (ca. én kopp ukentlig på kafé/kiosk). Ikke offisiell statistikk.",
};

export function annualSlose(scenario: SloseScenario): number {
  return (
    scenario.people *
    scenario.unitsPerPersonPerWeek *
    52 *
    scenario.kronerPerUnit
  );
}

export function kronerPerSecond(scenario: SloseScenario): number {
  const secondsPerYear = 365.25 * 24 * 60 * 60;
  return annualSlose(scenario) / secondsPerYear;
}

/** Millisekunder siden 1. januar lokal tid. */
export function msSinceYearStart(now = new Date()): number {
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.max(0, now.getTime() - start.getTime());
}

export function yearProgress(now = new Date()): number {
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  return (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
}

export function spentSoFar(scenario: SloseScenario, now = new Date()): number {
  return annualSlose(scenario) * yearProgress(now);
}
