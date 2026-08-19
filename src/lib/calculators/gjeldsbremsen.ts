import { formatCurrency } from "@/lib/calculators/loan";
import type {
  BrakeScheduleRow,
  BrakeStrategy,
  CurrentSituation,
  DebtTrend,
  DiagnosisResult,
  GapMeasures,
  HistorySummary,
  LoanRound,
  PlanCheckpoint,
  PlanFeasibility,
  RoundMetrics,
} from "@/types/gjeldsbremsen";

const MS_PER_DAY = 86_400_000;

export function parseIsoDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function daysBetween(fromIso: string, toIso: string): number | null {
  const from = parseIsoDate(fromIso);
  const to = parseIsoDate(toIso);
  if (!from || !to) return null;
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateNb(iso: string): string {
  const date = parseIsoDate(iso);
  if (!date) return "";
  return date.toLocaleDateString("nb-NO", { day: "numeric", month: "long" });
}

export function formatMonthNb(date: Date): string {
  return date.toLocaleDateString("nb-NO", { month: "long" });
}

export function formatAmountNb(amount: number): string {
  return Math.round(amount).toLocaleString("nb-NO");
}

export function formatKronerProse(amount: number): string {
  return `${formatAmountNb(amount)} kroner`;
}

export function formatDaysPhrase(days: number): string {
  const rounded = Math.round(days);
  if (rounded === 1) return "én dag";
  if (rounded === -1) return "én dag før betalingen";
  return `${rounded} dager`;
}

/** Renter og gebyrer. Tom overstyring bruker tilbakebetalt − opprinnelig lånebeløp. */
export function calculateLoanCost(
  principal: number,
  repaid: number,
  feesOverride: number | null = null,
): number {
  if (feesOverride !== null && Number.isFinite(feesOverride)) {
    return feesOverride;
  }
  return Math.max(0, repaid - principal);
}

/** Tidligere hovedstol − ny kredittbruk. Negativ verdi betyr at gjelden øker. */
export function calculateRealDebtReduction(
  previousPrincipal: number,
  newCredit: number,
): number {
  return previousPrincipal - newCredit;
}

/** Tilbakebetalt beløp − ny opplåning. */
export function calculateOwnLiquidityUsed(repaid: number, newCredit: number): number {
  return repaid - newCredit;
}

/**
 * Når ny kreditt er høyere enn beløpet som nettopp ble betalt,
 * øker saldoen midlertidig selv om hovedstolen kan øke.
 */
export function calculateTemporaryAccountLift(
  repaid: number,
  newCredit: number,
): number {
  return Math.max(0, newCredit - repaid);
}

export function calculateRoundMetrics(round: LoanRound): RoundMetrics {
  const loanCost = calculateLoanCost(
    round.principal,
    round.repaid,
    round.feesOverride,
  );
  const realDebtReduction = calculateRealDebtReduction(
    round.principal,
    round.newCredit,
  );
  const ownLiquidityUsed = calculateOwnLiquidityUsed(
    round.repaid,
    round.newCredit,
  );
  const temporaryAccountLift = calculateTemporaryAccountLift(
    round.repaid,
    round.newCredit,
  );
  const daysWithoutCredit =
    round.repaidDate && round.newCreditDate && round.newCredit > 0
      ? daysBetween(round.repaidDate, round.newCreditDate)
      : null;

  return {
    loanCost,
    realDebtReduction,
    ownLiquidityUsed,
    temporaryAccountLift,
    principalChange: round.newCredit - round.principal,
    daysWithoutCredit,
    followedByNewCredit: round.repaid > 0 && round.newCredit > 0,
  };
}

export function isActiveRound(round: LoanRound): boolean {
  return round.principal > 0 || round.repaid > 0 || round.newCredit > 0;
}

function trendFromChange(change: number): DebtTrend {
  if (Math.abs(change) < 1) return "stable";
  return change > 0 ? "increasing" : "decreasing";
}

export function summarizeLoanRounds(rounds: LoanRound[]): HistorySummary | null {
  const active = rounds.filter(isActiveRound);
  if (active.length === 0) return null;

  const metrics = active.map(calculateRoundMetrics);
  const first = active[0]!;
  const last = active.at(-1)!;
  const days = metrics
    .map((item) => item.daysWithoutCredit)
    .filter((value): value is number => value !== null);

  const liftRound = [...active]
    .reverse()
    .map((round, index) => ({ round, metrics: metrics[metrics.length - 1 - index]! }))
    .find((item) => item.metrics.temporaryAccountLift > 0);

  return {
    roundCount: active.length,
    totalCreditUsed: active.reduce((sum, round) => sum + round.principal, 0),
    totalRepaid: active.reduce((sum, round) => sum + round.repaid, 0),
    totalLoanCost: metrics.reduce((sum, item) => sum + item.loanCost, 0),
    realDebtReduction: calculateRealDebtReduction(first.principal, last.newCredit),
    averageDaysWithoutCredit:
      days.length > 0 ? days.reduce((sum, value) => sum + value, 0) / days.length : null,
    trend: trendFromChange(last.newCredit - first.principal),
    paymentsFollowedByNewCredit: metrics.filter((item) => item.followedByNewCredit)
      .length,
    allRegisteredAmountsPaid: active.every((round) => round.repaid > 0),
    startingPrincipal: first.principal,
    endingPrincipal: last.newCredit,
    latestLift: liftRound
      ? {
          repaid: liftRound.round.repaid,
          newCredit: liftRound.round.newCredit,
          temporaryAccountLift: liftRound.metrics.temporaryAccountLift,
          principalIncrease: Math.max(0, liftRound.metrics.principalChange),
        }
      : null,
  };
}

/** Penger på konto + sikre inntekter − nødvendige utgifter − planlagt tilbakebetaling. */
export function calculateLivingBalance(situation: CurrentSituation): number {
  return (
    situation.cashOnHand + situation.incomeBeforeDue - situation.expensesBeforeDue
  );
}

export function calculateFinancingGap(situation: CurrentSituation): number {
  return calculateLivingBalance(situation) - situation.amountDue;
}

export function calculateOrdinaryGap(situation: CurrentSituation): number {
  return Math.max(0, -calculateLivingBalance(situation));
}

export function financingGapMessage(gap: number): string {
  if (gap < 0) {
    return `Du mangler ${formatCurrency(Math.abs(gap))} for å dekke nødvendige utgifter og betale det avtalte beløpet uten å bruke ny kreditt.`;
  }

  return "Tallene dine viser at du kan komme frem til neste inntekt uten ny kreditt, dersom planen holder.";
}

export function sumMeasures(measures: GapMeasures): number {
  return (
    measures.reducedExpenses +
    measures.extraIncome +
    measures.expectedMoneyIn +
    measures.assetSales +
    measures.otherNonDebtFinance +
    measures.paymentAgreement
  );
}

export function evaluatePlanFeasibility(
  needed: number,
  covered: number,
): PlanFeasibility {
  const roundedNeeded = Math.max(0, Math.round(needed));
  const roundedCovered = Math.max(0, Math.round(covered));
  const remaining = Math.max(0, roundedNeeded - roundedCovered);

  return {
    needed: roundedNeeded,
    covered: roundedCovered,
    remaining,
    isFeasible: remaining === 0,
  };
}

export function calculateOwnFinancingNeeded(input: {
  strategy: BrakeStrategy;
  situation: CurrentSituation;
  reductionPerRound: number;
  feesPerRound: number;
}): number {
  const ordinaryGap = calculateOrdinaryGap(input.situation);
  const livingBalance = calculateLivingBalance(input.situation);

  if (input.strategy === "stop-next-income") {
    return Math.max(0, input.situation.amountDue - livingBalance);
  }

  if (input.strategy === "stop-growth") {
    return (
      Math.max(0, input.situation.amountDue - input.situation.currentPrincipal) +
      ordinaryGap
    );
  }

  return input.reductionPerRound + input.feesPerRound + ordinaryGap;
}

export function calculateMaxNewCredit(input: {
  strategy: BrakeStrategy;
  currentPrincipal: number;
  reductionPerRound: number;
}): number {
  if (input.strategy === "stop-next-income") return 0;
  if (input.strategy === "stop-growth") return input.currentPrincipal;
  return Math.max(0, input.currentPrincipal - input.reductionPerRound);
}

export function buildBrakeSchedule(input: {
  strategy: BrakeStrategy;
  currentPrincipal: number;
  feesPerRound: number;
  reductionPerRound: number;
  rounds: number;
}): BrakeScheduleRow[] {
  const debt = Math.max(0, input.currentPrincipal);
  const costs = Math.max(0, input.feesPerRound);

  if (input.strategy === "stop-next-income") {
    return [
      {
        label: "Nå",
        debtBefore: debt,
        costs,
        newCredit: 0,
        realReduction: debt,
      },
    ];
  }

  if (input.strategy === "stop-growth") {
    return [
      {
        label: "Nå",
        debtBefore: debt,
        costs,
        newCredit: debt,
        realReduction: 0,
      },
    ];
  }

  const roundCount = Math.min(4, Math.max(2, Math.round(input.rounds)));
  const rows: BrakeScheduleRow[] = [];
  let remaining = debt;

  for (let index = 0; index < roundCount; index += 1) {
    if (remaining <= 0) break;

    const reduction = Math.min(Math.max(0, input.reductionPerRound), remaining);
    const newCredit = Math.max(0, remaining - reduction);

    rows.push({
      label: index === 0 ? "Nå" : `Runde ${index + 1}`,
      debtBefore: remaining,
      costs,
      newCredit,
      realReduction: remaining - newCredit,
    });

    remaining = newCredit;
  }

  return rows;
}

export function plannedLoanFreeDate(input: {
  strategy: BrakeStrategy;
  nextIncomeDate: string;
  rounds: number;
}): Date | null {
  if (input.strategy === "stop-growth") return null;

  const nextIncome = parseIsoDate(input.nextIncomeDate);
  if (!nextIncome) return null;

  if (input.strategy === "stop-next-income") return nextIncome;

  const extraCycles = Math.max(0, Math.round(input.rounds) - 1);
  return addMonths(nextIncome, extraCycles);
}

export function firstCreditFreePeriodLabel(loanFreeDate: Date | null): string {
  if (!loanFreeDate) return "";
  return formatMonthNb(addMonths(loanFreeDate, 1));
}

export function buildDiagnosis(
  summary: HistorySummary | null,
  situation: CurrentSituation,
): DiagnosisResult {
  if (!summary) {
    const gap = calculateFinancingGap(situation);
    if (gap < 0) {
      return {
        headline: "Nåsituasjonen",
        body: financingGapMessage(gap),
        liftNote: null,
      };
    }

    return {
      headline: "Nåsituasjonen",
      body: "Uten historikk viser vi bare nåsituasjonen. Tallene dine viser at du kan komme frem til neste inntekt uten ny kreditt, dersom planen holder. Tidligere lånerunder gir et tydeligere bilde av den reelle gjeldsutviklingen.",
      liftNote: null,
    };
  }

  const liftNote = summary.latestLift
    ? `Det nye lånet gir deg ${formatKronerProse(summary.latestLift.temporaryAccountLift)} mer tilgjengelig akkurat nå, men hovedstolen øker samtidig med ${formatKronerProse(summary.latestLift.principalIncrease)} før nye kostnader.`
    : null;

  if (summary.trend === "increasing") {
    const daysPart =
      summary.averageDaysWithoutCredit === null
        ? "og ny kreditt er brukt etter betalingen"
        : `og du har i gjennomsnitt brukt ny kreditt etter ${formatDaysPhrase(summary.averageDaysWithoutCredit)}`;

    if (summary.allRegisteredAmountsPaid) {
      return {
        headline: "Betalingene er gjort, men gjelden øker",
        body: `Du har betalt alle registrerte beløp. Samtidig har gjelden økt fra ${formatAmountNb(summary.startingPrincipal)} til ${formatKronerProse(summary.endingPrincipal)}, ${daysPart}.`,
        liftNote,
      };
    }

    return {
      headline: "Gjelden øker",
      body: `Gjelden har økt fra ${formatKronerProse(summary.startingPrincipal)} til ${formatKronerProse(summary.endingPrincipal)}. ${daysPart.charAt(0).toUpperCase()}${daysPart.slice(1)}.`,
      liftNote,
    };
  }

  if (summary.trend === "stable") {
    return {
      headline: "Gjelden står stille",
      body: "Du betaler gjelden, men bruker omtrent like mye kreditt på nytt. Gjelden reduseres derfor ikke, samtidig som renter og gebyrer fortsetter å belaste økonomien.",
      liftNote,
    };
  }

  return {
    headline: "Gjelden reduseres",
    body: `Den reelle gjelden er redusert med ${formatKronerProse(summary.realDebtReduction)}. Fortsetter samme utvikling, er du på vei ut av kredittbehovet.`,
    liftNote,
  };
}

export function missingPlanMessage(remaining: number): string {
  return `Planen mangler fortsatt ${formatCurrency(remaining)}. Bremseplanen går ikke opp før dette beløpet er dekket eller nedtrappingen justeres.`;
}

export function buildPlanCheckpoints(input: {
  strategy: BrakeStrategy;
  amountToFreeThisPeriod: number;
  maxNewCredit: number;
  nextCheckpointDate: string;
  plannedReduction: number;
  firstCreditFreePeriod: string;
}): PlanCheckpoint[] {
  const checkpoints: PlanCheckpoint[] = [
    {
      label: "Beløp som må frigjøres denne perioden",
      value: formatCurrency(input.amountToFreeThisPeriod),
    },
    {
      label: "Maksimal ny kredittbruk",
      value: formatCurrency(input.maxNewCredit),
    },
  ];

  if (input.nextCheckpointDate) {
    checkpoints.push({
      label: "Neste kontrollpunkt",
      value: formatDateNb(input.nextCheckpointDate),
    });
  }

  if (input.strategy !== "stop-growth") {
    checkpoints.push({
      label: "Planlagt reduksjon",
      value: formatCurrency(input.plannedReduction),
    });
  }

  if (input.strategy === "stop-growth") {
    checkpoints.push({
      label: "Hva planen gjør",
      value: "Stanser forverringen, men gjør deg ikke gjeldsfri",
    });
  } else if (input.firstCreditFreePeriod) {
    checkpoints.push({
      label: "Forventet første periode uten ny kreditt",
      value: input.firstCreditFreePeriod,
    });
  }

  return checkpoints.slice(0, 5);
}

export function buildBrakePlanDownloadText(input: {
  currentDebt: number;
  amountDue: number;
  fees: number;
  financingGapShortfall: number;
  plannedReduction: number;
  amountToFree: number;
  loanFreeDateLabel: string;
  firstCreditFreePeriod: string;
  strategy: BrakeStrategy;
  schedule: BrakeScheduleRow[];
  checkpoints: PlanCheckpoint[];
  isFeasible: boolean;
  remaining: number;
}): string {
  const lines = [
    "Min Gjeldsbrems",
    "",
    `Nåværende gjeld: ${formatCurrency(input.currentDebt)}`,
    `Beløp som skal tilbakebetales: ${formatCurrency(input.amountDue)}`,
    `Renter og gebyrer: ${formatCurrency(input.fees)}`,
    `Faktisk finansieringsgap: ${formatCurrency(input.financingGapShortfall)}`,
    `Planlagt reduksjon per runde: ${formatCurrency(input.plannedReduction)}`,
    `Beløp som må frigjøres per runde: ${formatCurrency(input.amountToFree)}`,
  ];

  if (input.strategy === "stop-growth") {
    lines.push("Planlagt lånefri dato: ikke satt (planen stanser veksten først)");
    lines.push("Første inntektsperiode uten ny kreditt: ikke satt");
  } else {
    lines.push(
      `Planlagt lånefri dato: ${input.loanFreeDateLabel || "ikke satt"}`,
    );
    lines.push(
      `Første inntektsperiode uten ny kreditt: ${input.firstCreditFreePeriod || "ikke satt"}`,
    );
  }

  lines.push("");
  lines.push(
    input.isFeasible
      ? "Status: Bremseplanen går opp med tallene som er lagt inn."
      : `Status: ${missingPlanMessage(input.remaining)}`,
  );
  lines.push("");
  lines.push("Nedtrapping");

  for (const row of input.schedule) {
    lines.push(
      `${row.label}: gjeld før ${formatCurrency(row.debtBefore)}, kostnader ${formatCurrency(row.costs)}, ny kreditt ${formatCurrency(row.newCredit)}, reell reduksjon ${formatCurrency(row.realReduction)}`,
    );
  }

  if (input.checkpoints.length > 0) {
    lines.push("");
    lines.push("Sjekkpunkter");
    for (const checkpoint of input.checkpoints) {
      lines.push(`${checkpoint.label}: ${checkpoint.value}`);
    }
  }

  lines.push("");
  lines.push(
    "Målet er ikke bare å betale. Målet er at betalingen ikke etterfølges av ny kreditt.",
  );

  return `${lines.join("\n")}\n`;
}
