import { UTLEIEBOLIG_MELDINGER } from "@/data/utleiebolig-meldinger";
import type { UtleieboligVurderingContext } from "@/data/utleiebolig-meldinger";
import type { UtleieboligInput } from "@/types/utleiebolig";
import type { UtleieboligResult } from "@/types/utleiebolig";
import type {
  UtleieboligVurdering,
  UtleieboligVerdict,
} from "@/types/utleiebolig-vurdering";

export interface UtleieboligVurderingOptions {
  input: UtleieboligInput;
  ownerOccupiedOverHalf: boolean;
  alternativeMonthlyRent: number | null;
}

function breakEvenMarginPercent(
  breakEvenRent: number,
  monthlyRent: number,
): number {
  if (monthlyRent <= 0) return -100;
  return ((monthlyRent - breakEvenRent) / monthlyRent) * 100;
}

export function buildVurderingContext(
  input: UtleieboligInput,
  result: UtleieboligResult,
  options: Pick<
    UtleieboligVurderingOptions,
    "ownerOccupiedOverHalf" | "alternativeMonthlyRent"
  >,
): UtleieboligVurderingContext {
  const ltvPercent =
    input.purchasePrice > 0
      ? (result.loanAmount / input.purchasePrice) * 100
      : 0;

  const netHousingCostMonthly = options.ownerOccupiedOverHalf
    ? result.monthlyLoanPayment +
      result.monthlyOperatingCosts -
      result.effectiveMonthlyRent
    : null;

  const housingSavingsMonthly =
    options.ownerOccupiedOverHalf &&
    options.alternativeMonthlyRent !== null
      ? options.alternativeMonthlyRent - (netHousingCostMonthly ?? 0)
      : null;

  const effectiveRent = result.effectiveMonthlyRent;
  const cashFlowBeforeTax = result.monthlyCashFlow * 12;

  return {
    input,
    result,
    ownerOccupiedOverHalf: options.ownerOccupiedOverHalf,
    alternativeMonthlyRent: options.alternativeMonthlyRent,
    ltvPercent,
    equityPercent: 100 - ltvPercent,
    breakEvenMarginPercent: breakEvenMarginPercent(
      result.breakEvenMonthlyRent,
      input.monthlyRent,
    ),
    rentCoversLoan: effectiveRent >= result.monthlyLoanPayment,
    rentCoversOperating: effectiveRent >= result.monthlyOperatingCosts,
    operatingCostShareOfRent:
      effectiveRent > 0
        ? (result.monthlyOperatingCosts / effectiveRent) * 100
        : 0,
    loanPaymentShareOfRent:
      effectiveRent > 0
        ? (result.monthlyLoanPayment / effectiveRent) * 100
        : 0,
    maintenanceShareOfValue:
      input.purchasePrice > 0
        ? ((input.monthlyMaintenance * 12) / input.purchasePrice) * 100
        : 0,
    purchaseCostsShareOfEquity:
      result.equityInvested > 0
        ? (input.purchaseCosts / result.equityInvested) * 100
        : 0,
    netHousingCostMonthly,
    housingSavingsMonthly,
    taxShareOfCashFlow:
      cashFlowBeforeTax > 0
        ? (result.estimatedTaxAnnual / cashFlowBeforeTax) * 100
        : 0,
    rentGapToBreakEven: input.monthlyRent - result.breakEvenMonthlyRent,
  };
}

type MeldingKategori =
  | "summary"
  | "pro"
  | "con"
  | "risk"
  | "insight"
  | "whenOk";

function pickMessages(
  ctx: UtleieboligVurderingContext,
  kategori: MeldingKategori,
  limit: number,
): string[] {
  return UTLEIEBOLIG_MELDINGER.filter(
    (m) => m.kategori === kategori && m.when(ctx),
  )
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit)
    .map((m) => m.text(ctx));
}

function deriveVerdict(ctx: UtleieboligVurderingContext): {
  verdict: UtleieboligVerdict;
  verdictLabel: string;
} {
  const { result: r, ownerOccupiedOverHalf: hybrid } = ctx;

  if (hybrid) {
    if (r.coversAllCosts) {
      return { verdict: "strong", verdictLabel: "Sterkt hybrid-case" };
    }
    if (
      ctx.housingSavingsMonthly !== null &&
      ctx.housingSavingsMonthly > 500
    ) {
      return {
        verdict: "acceptable-hybrid",
        verdictLabel: "Greit som egen bolig + utleie",
      };
    }
    if (
      ctx.housingSavingsMonthly !== null &&
      ctx.housingSavingsMonthly >= -2_500
    ) {
      return {
        verdict: "acceptable-hybrid",
        verdictLabel: "Akseptabelt hybrid-case",
      };
    }
    if (ctx.housingSavingsMonthly !== null && ctx.housingSavingsMonthly < -2_500) {
      return { verdict: "weak", verdictLabel: "Tungt, selv med utleie" };
    }
    return {
      verdict: "acceptable",
      verdictLabel: "Hybrid — annen logikk enn ren utleie",
    };
  }

  if (
    r.coversAllCosts &&
    r.cashOnCashReturnPercent >= 5 &&
    r.grossYieldPercent >= 4.5 &&
    ctx.breakEvenMarginPercent >= 10
  ) {
    return { verdict: "strong", verdictLabel: "Sterkt utleiecase" };
  }
  if (r.coversAllCosts && ctx.breakEvenMarginPercent >= 0) {
    return { verdict: "acceptable", verdictLabel: "Akseptabelt utleiecase" };
  }
  if (!r.coversAllCosts && r.monthlyShortfall <= 3_000) {
    return { verdict: "weak", verdictLabel: "Svakt som ren investering" };
  }
  return { verdict: "risky", verdictLabel: "Høy risiko som ren investering" };
}

export function assessUtleiebolig(
  result: UtleieboligResult,
  options: UtleieboligVurderingOptions,
): UtleieboligVurdering {
  const ctx = buildVurderingContext(options.input, result, {
    ownerOccupiedOverHalf: options.ownerOccupiedOverHalf,
    alternativeMonthlyRent: options.alternativeMonthlyRent,
  });

  const { verdict, verdictLabel } = deriveVerdict(ctx);

  const summaries = pickMessages(ctx, "summary", 1);
  const pros = pickMessages(ctx, "pro", 5);
  const cons = pickMessages(ctx, "con", 5);
  const risks = pickMessages(ctx, "risk", 5);
  const insights = pickMessages(ctx, "insight", 6);
  const whenBadIsOk = pickMessages(ctx, "whenOk", 5);

  return {
    scenario: options.ownerOccupiedOverHalf
      ? "owner-hybrid"
      : "pure-investment",
    verdict,
    verdictLabel,
    verdictSummary:
      summaries[0] ??
      "Fyll inn flere detaljer for en mer presis vurdering av caset ditt.",
    pros,
    cons,
    insights,
    whenBadIsOk,
    risks,
    netHousingCostMonthly: ctx.netHousingCostMonthly,
    housingSavingsMonthly: ctx.housingSavingsMonthly,
  };
}
