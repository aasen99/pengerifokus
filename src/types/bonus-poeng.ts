export type RedemptionType = "hotell" | "fly" | "annet";

export type BonusRecommendation = "use_points" | "pay_cash" | "consider_saving";

export interface EarningCostInput {
  pointsEarned: number;
  campaignBonusPoints: number;
  periodMonths: number;
  monthlyCardCost: number;
  annualFeeMonthly: number;
  paymentFeePercent: number;
  feeBearingAmount: number;
  fixedTransactionFees: number;
  opportunityCostCashback: number;
  otherCosts: number;
  cardBenefits: number;
}

export interface EarningCostResult {
  totalPoints: number;
  recurringCosts: number;
  paymentFeeAmount: number;
  feeRelatedCosts: number;
  totalCost: number;
  costPerPoint: number;
  costPer1000Points: number;
  marginalCostPerPointFromFees: number;
  breakEvenValuePerPoint: number;
}

export interface RedemptionInput {
  redemptionType: RedemptionType;
  cashPrice: number;
  pointsRequired: number;
  redemptionFees: number;
  cashCoPay: number;
  targetValuePerPoint: number;
}

export interface RedemptionResult {
  netCashValue: number;
  cashSaved: number;
  redemptionValuePerPoint: number;
  redemptionValuePer1000Points: number;
  gainVsCost: number;
  gainVsTarget: number;
  recommendation: BonusRecommendation;
}

export interface BonusCalculatorResult {
  earning: EarningCostResult;
  redemption: RedemptionResult | null;
}
