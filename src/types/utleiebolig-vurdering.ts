export type UtleieboligScenario = "pure-investment" | "owner-hybrid";

export type UtleieboligVerdict =
  | "strong"
  | "acceptable"
  | "weak"
  | "risky"
  | "acceptable-hybrid";

export interface UtleieboligVurdering {
  scenario: UtleieboligScenario;
  verdict: UtleieboligVerdict;
  verdictLabel: string;
  verdictSummary: string;
  pros: string[];
  cons: string[];
  insights: string[];
  whenBadIsOk: string[];
  risks: string[];
  netHousingCostMonthly: number | null;
  housingSavingsMonthly: number | null;
}
