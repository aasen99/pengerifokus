import type { WealthEstimate } from "@/types/formuesbygger";

export function formatWealthEstimate(estimate: WealthEstimate): string {
  const period = estimate.asOf ? ` (${estimate.asOf})` : "";
  return `ca. ${estimate.amount} ${estimate.unit} ${estimate.currency}${period}`;
}
