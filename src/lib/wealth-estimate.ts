import type { WealthEstimate } from "@/types/formuesbygger";

/** Grovt valutakurs for sammenlignbar sortering (ikke fasit) */
const USD_TO_NOK = 10.5;

export function formatWealthEstimate(estimate: WealthEstimate): string {
  const period = estimate.asOf ? ` (${estimate.asOf})` : "";
  return `ca. ${estimate.amount} ${estimate.unit} ${estimate.currency}${period}`;
}

/** Trekker ut høyeste tall fra amount, f.eks. «12–15» → 15 */
export function parseWealthAmount(amount: string): number {
  const matches = amount.match(/\d+[,.]?\d*/g);
  if (!matches?.length) return 0;

  return Math.max(...matches.map((match) => parseFloat(match.replace(",", "."))));
}

/** Normaliserer formue til NOK milliarder for sammenligning på tvers av valuta */
export function getWealthSortValue(estimate: WealthEstimate): number {
  const amount = parseWealthAmount(estimate.amount);
  const inBillions = estimate.unit === "mill" ? amount / 1000 : amount;
  const inNok = estimate.currency === "USD" ? inBillions * USD_TO_NOK : inBillions;
  return inNok;
}
