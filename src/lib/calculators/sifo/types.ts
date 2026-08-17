import type { SifoMemberType } from "./data";

export type SifoCarType = "none" | "bensin" | "el";
export type SifoBarnehageInntekt = "hoy" | "lav";
export type SifoAksInntekt = "hoy" | "middels" | "lav";
export type SifoAksPlass = "heltid" | "deltid" | "delvisGratis";

export interface SifoCalculatorInput {
  members: SifoMemberType[];
  car: SifoCarType;
  barnehageBarn: number;
  barnehageInntekt: SifoBarnehageInntekt;
  aksBarn: number;
  aksPlass: SifoAksPlass;
  aksInntekt: SifoAksInntekt;
}

export interface SifoCategoryAmount {
  id: string;
  label: string;
  amount: number;
  group: "individ" | "husholdning" | "valgfritt";
}

export interface SifoCalculatorResult {
  personCount: number;
  categories: SifoCategoryAmount[];
  individTotal: number;
  husholdTotal: number;
  barnehageTotal: number;
  aksTotal: number;
  monthlyTotal: number;
  yearlyTotal: number;
  matStordriftRabatt: number;
}

export interface SifoComparisonResult {
  diff: number;
  diffPercent: number | null;
}

export type SifoUserTotalSource = "direct" | "categories";

export interface SifoSummaryComparisonLine {
  id: SifoUserTotalSource;
  label: string;
  userMonthly: number;
  userYearly: number;
  monthlyDiff: SifoComparisonResult;
  yearlyDiff: SifoComparisonResult;
  filledCategoryCount?: number;
  totalCategoryCount?: number;
}

export interface SifoSummaryComparison {
  sifoMonthly: number;
  sifoYearly: number;
  lines: SifoSummaryComparisonLine[];
}

export interface SifoCategoryDiff {
  id: string;
  label: string;
  group: SifoCategoryAmount["group"];
  amountA: number;
  amountB: number;
  diff: number;
  diffPercent: number | null;
}

export interface SifoHouseholdGroupDiffs {
  individ: SifoComparisonResult;
  husholdning: SifoComparisonResult;
  valgfritt: SifoComparisonResult;
}

export interface SifoHouseholdComparison {
  scenarioA: { label: string; result: SifoCalculatorResult };
  scenarioB: { label: string; result: SifoCalculatorResult };
  monthlyDiff: SifoComparisonResult;
  yearlyDiff: SifoComparisonResult;
  categoryDiffs: SifoCategoryDiff[];
  topChanges: SifoCategoryDiff[];
  groupDiffs: SifoHouseholdGroupDiffs;
  insights: string[];
}
