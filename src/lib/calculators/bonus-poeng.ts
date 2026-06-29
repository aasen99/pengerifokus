import type {
  BonusCalculatorResult,
  BonusRecommendation,
  EarningCostInput,
  EarningCostResult,
  RedemptionInput,
  RedemptionResult,
} from "@/types/bonus-poeng";

export function calculateEarningCost(input: EarningCostInput): EarningCostResult | null {
  const totalPoints = input.pointsEarned + input.campaignBonusPoints;

  if (totalPoints <= 0) return null;

  const periodMonths = Math.max(input.periodMonths, 0);
  const recurringCosts =
    (input.monthlyCardCost + input.annualFeeMonthly) * periodMonths;

  const paymentFeeAmount =
    input.feeBearingAmount * (Math.max(input.paymentFeePercent, 0) / 100);
  const feeRelatedCosts = paymentFeeAmount + Math.max(input.fixedTransactionFees, 0);

  const totalCost =
    recurringCosts +
    feeRelatedCosts +
    Math.max(input.opportunityCostCashback, 0) +
    Math.max(input.otherCosts, 0) -
    Math.max(input.cardBenefits, 0);

  const costPerPoint = totalCost / totalPoints;
  const marginalCostPerPointFromFees = feeRelatedCosts / totalPoints;

  return {
    totalPoints,
    recurringCosts,
    paymentFeeAmount,
    feeRelatedCosts,
    totalCost,
    costPerPoint,
    costPer1000Points: costPerPoint * 1000,
    marginalCostPerPointFromFees,
    breakEvenValuePerPoint: costPerPoint,
  };
}

export function getBonusRecommendation(
  redemptionValuePerPoint: number,
  costPerPoint: number,
  targetValuePerPoint: number,
): BonusRecommendation {
  if (!Number.isFinite(redemptionValuePerPoint)) return "pay_cash";

  if (redemptionValuePerPoint < costPerPoint) return "pay_cash";

  if (
    redemptionValuePerPoint >= costPerPoint &&
    redemptionValuePerPoint >= targetValuePerPoint
  ) {
    return "use_points";
  }

  if (
    redemptionValuePerPoint >= costPerPoint &&
    redemptionValuePerPoint < targetValuePerPoint
  ) {
    return "consider_saving";
  }

  return "pay_cash";
}

export function calculateRedemption(
  input: RedemptionInput,
  costPerPoint: number,
): RedemptionResult | null {
  if (input.pointsRequired <= 0) return null;

  const netCashValue =
    input.cashPrice - input.redemptionFees - input.cashCoPay;
  const redemptionValuePerPoint = netCashValue / input.pointsRequired;
  const gainVsCost =
    (redemptionValuePerPoint - costPerPoint) * input.pointsRequired;
  const gainVsTarget =
    (redemptionValuePerPoint - input.targetValuePerPoint) *
    input.pointsRequired;

  return {
    netCashValue,
    cashSaved: netCashValue,
    redemptionValuePerPoint,
    redemptionValuePer1000Points: redemptionValuePerPoint * 1000,
    gainVsCost,
    gainVsTarget,
    recommendation: getBonusRecommendation(
      redemptionValuePerPoint,
      costPerPoint,
      input.targetValuePerPoint,
    ),
  };
}

export function calculateBonusPoints(
  earningInput: EarningCostInput,
  redemptionInput: RedemptionInput | null,
): BonusCalculatorResult | null {
  const earning = calculateEarningCost(earningInput);
  if (!earning) return null;

  const redemption = redemptionInput
    ? calculateRedemption(redemptionInput, earning.costPerPoint)
    : null;

  return { earning, redemption };
}

export function formatPointValue(amount: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(amount);
}

export const RECOMMENDATION_LABELS: Record<BonusRecommendation, string> = {
  use_points: "Bruk poeng",
  pay_cash: "Betal kontant",
  consider_saving: "Vurder å spare poengene",
};

export const RECOMMENDATION_SUMMARY: Record<BonusRecommendation, string> = {
  use_points:
    "Innløsningen gir bedre verdi enn både kostprisen og målverdien din. Poengbruk ser fornuftig ut.",
  pay_cash:
    "Du taper sammenlignet med hva poengene har kostet å opptjene, eller innløsningen er for svak. Betal kontant, eller finn en bedre innløsning.",
  consider_saving:
    "Innløsningen er bedre enn kostprisen, men under målverdien din. Du kan bruke poeng, men det kan lønne seg å vente på en bedre deal.",
};

export const REDEMPTION_TYPE_LABELS = {
  hotell: "Hotell",
  fly: "Fly",
  annet: "Annet",
} as const;
