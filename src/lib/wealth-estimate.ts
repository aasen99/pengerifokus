import type { WealthEstimate } from "@/types/formuesbygger";
import {
  FORBES_BILLIONAIRES_SOURCE,
  FORBES_BILLIONAIRES_URL,
  KAPITAL_400_SOURCE,
  KAPITAL_400_URL,
} from "@/data/formuesbyggere-labels";

/** Grovt valutakurs for sammenlignbar sortering (ikke fasit) */
const USD_TO_NOK = 10.5;

export function formatWealthEstimate(estimate: WealthEstimate): string {
  const period = estimate.asOf ? ` (${estimate.asOf})` : "";
  return `ca. ${estimate.amount} ${estimate.unit} ${estimate.currency}${period}`;
}

export function kapitalEstimate(amount: string, asOf = "2025"): WealthEstimate {
  return {
    amount,
    unit: "mrd",
    currency: "NOK",
    asOf,
    source: KAPITAL_400_SOURCE,
    sourceUrl: KAPITAL_400_URL,
  };
}

export function forbesEstimate(amount: string, asOf = "2025"): WealthEstimate {
  return {
    amount,
    unit: "mrd",
    currency: "USD",
    asOf,
    source: FORBES_BILLIONAIRES_SOURCE,
    sourceUrl: FORBES_BILLIONAIRES_URL,
  };
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
