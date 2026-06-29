import type { RedemptionType } from "@/types/bonus-poeng";

export const BONUS_WIZARD_STEPS = [
  {
    id: "earn",
    title: "Opptjening",
    description: "Hva har poengene kostet å tjene?",
  },
  {
    id: "redeem",
    title: "Innløsning",
    description: "Hva er tilbudet du vurderer verdt?",
  },
  {
    id: "result",
    title: "Resultat",
    description: "Bruk poeng eller betal kontant?",
  },
] as const;

export type BonusWizardStepId = (typeof BONUS_WIZARD_STEPS)[number]["id"];

export interface BonusScenarioPreset {
  label: string;
  description: string;
  step: BonusWizardStepId;
  values: Partial<BonusPresetValues>;
}

export interface BonusPresetValues {
  pointsEarned: number;
  campaignBonusPoints: number;
  periodMonths: number;
  monthlyCardCost: number;
  annualFeeYearly: number;
  paymentFeePercent: number;
  feeBearingAmount: number;
  fixedTransactionFees: number;
  opportunityCostCashback: number;
  otherCosts: number;
  cardBenefits: number;
  redemptionType: RedemptionType;
  cashPrice: number;
  pointsRequired: number;
  redemptionFees: number;
  cashCoPay: number;
  targetValuePerPoint: number;
}

export const DEFAULT_BONUS_VALUES: BonusPresetValues = {
  pointsEarned: 10_000,
  campaignBonusPoints: 0,
  periodMonths: 12,
  monthlyCardCost: 0,
  annualFeeYearly: 0,
  paymentFeePercent: 2.5,
  feeBearingAmount: 0,
  fixedTransactionFees: 0,
  opportunityCostCashback: 0,
  otherCosts: 0,
  cardBenefits: 0,
  redemptionType: "hotell",
  cashPrice: 1_200,
  pointsRequired: 18_000,
  redemptionFees: 0,
  cashCoPay: 0,
  targetValuePerPoint: 0.1,
};

export const BONUS_SCENARIO_PRESETS: BonusScenarioPreset[] = [
  {
    label: "Hotell",
    description: "1 200 kr eller 18 000 poeng",
    step: "redeem",
    values: {
      redemptionType: "hotell",
      cashPrice: 1_200,
      pointsRequired: 18_000,
      redemptionFees: 0,
      cashCoPay: 0,
    },
  },
  {
    label: "Fly",
    description: "4 000 kr eller 30 000 poeng + 800 kr avgifter",
    step: "redeem",
    values: {
      redemptionType: "fly",
      cashPrice: 4_000,
      pointsRequired: 30_000,
      redemptionFees: 800,
      cashCoPay: 0,
    },
  },
  {
    label: "Trumf → poeng",
    description: "500 kr kontant eller 5 000 poeng",
    step: "earn",
    values: {
      pointsEarned: 5_000,
      opportunityCostCashback: 500,
      targetValuePerPoint: 0.1,
    },
  },
];

export const BONUS_TOOLTIPS = {
  pointsEarned:
    "Poeng du har fått fra vanlig bruk, uten ekstra kampanjebonus.",
  opportunityCostCashback:
    "Hvis du kunne tatt Trumf eller cashback som kroner i stedet, er det en reell kostnad å velge poeng.",
  cashPrice:
    "Prisen du faktisk ville betalt kontant. Ikke en urealistisk listepris.",
  targetValuePerPoint:
    "Verdien du helst vil ha per poeng før du bruker dem. Ofte rundt 10 øre (0,10 kr).",
} as const;
