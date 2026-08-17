import type { SifoMemberType } from "./data";

export type SifoCarType = "none" | "bensin" | "el";
export type SifoBarnehageInntekt = "hoy" | "lav";
export type SifoAksInntekt = "hoy" | "middels" | "lav";
export type SifoAksPlass = "heltid" | "deltid" | "delvisGratis";

export interface SifoCalculatorInput {
  members: SifoMemberType[];
  /** Kollektivtransport for medlemmer som har rett (6+ år). */
  includeKollektiv: boolean;
  /** Studentrabatt for voksne 20–29. */
  studentKollektiv: boolean;
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
