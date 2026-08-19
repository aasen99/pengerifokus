import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildBrakePlanDownloadText,
  buildBrakeSchedule,
  buildDiagnosis,
  calculateFinancingGap,
  calculateLoanCost,
  calculateOwnFinancingNeeded,
  calculateOwnLiquidityUsed,
  calculateRealDebtReduction,
  calculateRoundMetrics,
  calculateTemporaryAccountLift,
  evaluatePlanFeasibility,
  financingGapMessage,
  missingPlanMessage,
  sumMeasures,
  summarizeLoanRounds,
} from "./gjeldsbremsen";
import type { CurrentSituation, LoanRound } from "@/types/gjeldsbremsen";

function round(partial: Partial<LoanRound>): LoanRound {
  return {
    principal: 0,
    repaid: 0,
    feesOverride: null,
    newCredit: 0,
    usedDate: "",
    repaidDate: "",
    newCreditDate: "",
    ...partial,
  };
}

const emptySituation: CurrentSituation = {
  cashOnHand: 0,
  amountDue: 0,
  dueDate: "",
  incomeBeforeDue: 0,
  expensesBeforeDue: 0,
  currentPrincipal: 0,
  expectedFees: 0,
  nextIncomeDate: "",
  nextIncomeAmount: 0,
};

describe("kredittkort", () => {
  it("gir 3 000 kr reell gjeldsreduksjon når 10 000 betales og 7 000 brukes på nytt", () => {
    const metrics = calculateRoundMetrics(
      round({
        principal: 10_000,
        repaid: 10_000,
        feesOverride: 0,
        newCredit: 7_000,
      }),
    );

    assert.equal(calculateRealDebtReduction(10_000, 7_000), 3_000);
    assert.equal(metrics.realDebtReduction, 3_000);
    assert.equal(metrics.loanCost, 0);
  });
});

describe("privat lån uten reell reduksjon", () => {
  it("gir 0 kr reell reduksjon og 500 kr egen likviditet", () => {
    const metrics = calculateRoundMetrics(
      round({
        principal: 2_000,
        repaid: 2_500,
        feesOverride: 500,
        newCredit: 2_000,
      }),
    );

    assert.equal(metrics.realDebtReduction, 0);
    assert.equal(metrics.loanCost, 500);
    assert.equal(metrics.ownLiquidityUsed, 500);
    assert.equal(calculateOwnLiquidityUsed(2_500, 2_000), 500);
    assert.equal(calculateLoanCost(2_000, 2_500), 500);
  });
});

describe("økende lånespiral", () => {
  it("gir 1 000 kr gjeldsøkning og 700 kr midlertidig kontoløft", () => {
    const metrics = calculateRoundMetrics(
      round({
        principal: 1_000,
        repaid: 1_300,
        feesOverride: 300,
        newCredit: 2_000,
      }),
    );

    assert.equal(metrics.realDebtReduction, -1_000);
    assert.equal(metrics.principalChange, 1_000);
    assert.equal(metrics.temporaryAccountLift, 700);
    assert.equal(calculateTemporaryAccountLift(1_300, 2_000), 700);
  });
});

describe("full stopp", () => {
  it("gir 2 000 kr reell gjeldsreduksjon når ny kredittbruk er 0", () => {
    const metrics = calculateRoundMetrics(
      round({
        principal: 2_000,
        repaid: 2_500,
        newCredit: 0,
      }),
    );

    assert.equal(metrics.realDebtReduction, 2_000);
    assert.equal(metrics.loanCost, 500);
    assert.equal(metrics.followedByNewCredit, false);
  });
});

describe("ugyldig bremseplan", () => {
  it("viser 400 kr rest og er ikke gjennomførbar når 1 000 trengs og tiltak dekker 600", () => {
    const feasibility = evaluatePlanFeasibility(1_000, 600);

    assert.equal(feasibility.needed, 1_000);
    assert.equal(feasibility.covered, 600);
    assert.equal(feasibility.remaining, 400);
    assert.equal(feasibility.isFeasible, false);
    assert.match(missingPlanMessage(400), /400/);
  });

  it("markeres som gjennomførbar først når tiltakene dekker hele beløpet", () => {
    assert.equal(evaluatePlanFeasibility(1_000, 1_000).isFeasible, true);
    assert.equal(evaluatePlanFeasibility(1_000, 1_200).isFeasible, true);
    assert.equal(evaluatePlanFeasibility(0, 0).isFeasible, true);
  });
});

describe("finansieringsgap", () => {
  it("oppdateres som konto + inntekt − utgifter − tilbakebetaling", () => {
    const gap = calculateFinancingGap({
      ...emptySituation,
      cashOnHand: 2_000,
      incomeBeforeDue: 1_500,
      expensesBeforeDue: 2_000,
      amountDue: 2_500,
    });

    assert.equal(gap, -1_000);
    assert.match(financingGapMessage(gap), /1\s000/);
  });

  it("gir positivt gap når inntektene dekker utgifter og betaling", () => {
    const gap = calculateFinancingGap({
      ...emptySituation,
      cashOnHand: 3_000,
      incomeBeforeDue: 4_000,
      expensesBeforeDue: 2_000,
      amountDue: 2_500,
    });

    assert.equal(gap, 2_500);
    assert.match(financingGapMessage(gap), /uten ny kreditt/);
  });
});

describe("summarizeLoanRounds", () => {
  it("summerer kredittbruk, tilbakebetaling og dager uten ny kreditt", () => {
    const summary = summarizeLoanRounds([
      round({
        principal: 1_000,
        repaid: 1_300,
        feesOverride: 300,
        newCredit: 2_000,
        repaidDate: "2026-08-01",
        newCreditDate: "2026-08-02",
      }),
      round({
        principal: 2_000,
        repaid: 2_500,
        feesOverride: 500,
        newCredit: 2_000,
        repaidDate: "2026-08-15",
        newCreditDate: "2026-08-16",
      }),
    ]);

    assert.ok(summary);
    assert.equal(summary.totalCreditUsed, 3_000);
    assert.equal(summary.totalRepaid, 3_800);
    assert.equal(summary.totalLoanCost, 800);
    assert.equal(summary.realDebtReduction, -1_000);
    assert.equal(summary.trend, "increasing");
    assert.equal(summary.averageDaysWithoutCredit, 1);
    assert.equal(summary.paymentsFollowedByNewCredit, 2);
    assert.equal(summary.allRegisteredAmountsPaid, true);
    assert.ok(summary.latestLift);
    assert.equal(summary.latestLift.temporaryAccountLift, 700);
  });
});

describe("buildDiagnosis", () => {
  it("skiller betalingshistorikk fra negativ økonomisk utvikling", () => {
    const summary = summarizeLoanRounds([
      round({
        principal: 1_000,
        repaid: 1_300,
        feesOverride: 300,
        newCredit: 2_000,
        repaidDate: "2026-08-01",
        newCreditDate: "2026-08-02",
      }),
    ]);

    const diagnosis = buildDiagnosis(summary, emptySituation);
    assert.match(diagnosis.body, /betalt alle registrerte beløp/i);
    assert.match(
      diagnosis.body.replace(/\u00a0/g, " "),
      /økt fra 1 000 til 2 000 kroner/,
    );
    assert.match(diagnosis.body, /én dag/);
  });

  it("beskriver stille gjeld uten å moralisere", () => {
    const summary = summarizeLoanRounds([
      round({
        principal: 2_000,
        repaid: 2_500,
        feesOverride: 500,
        newCredit: 2_000,
      }),
    ]);

    const diagnosis = buildDiagnosis(summary, emptySituation);
    assert.match(diagnosis.body, /reduseres derfor ikke/);
  });

  it("beskriver positiv reell gjeldsreduksjon", () => {
    const summary = summarizeLoanRounds([
      round({
        principal: 10_000,
        repaid: 10_000,
        feesOverride: 0,
        newCredit: 7_000,
      }),
    ]);

    const diagnosis = buildDiagnosis(summary, emptySituation);
    assert.match(diagnosis.body, /redusert med 3\s000 kroner/);
  });

  it("forklarer midlertidig kontoløft når nytt lån er større enn innbetalingen", () => {
    const summary = summarizeLoanRounds([
      round({
        principal: 1_000,
        repaid: 1_300,
        newCredit: 2_000,
      }),
    ]);

    const diagnosis = buildDiagnosis(summary, emptySituation);
    assert.ok(diagnosis.liftNote);
    assert.match(diagnosis.liftNote, /700 kroner mer tilgjengelig/);
    assert.match(diagnosis.liftNote, /1\s000 kroner/);
  });
});

describe("bremseplan", () => {
  it("beregner egenfinansiering som reduksjon + kostnader + ordinært gap", () => {
    const needed = calculateOwnFinancingNeeded({
      strategy: "step-down",
      situation: {
        ...emptySituation,
        cashOnHand: 1_500,
        incomeBeforeDue: 0,
        expensesBeforeDue: 0,
        amountDue: 2_500,
        currentPrincipal: 2_000,
        expectedFees: 500,
      },
      reductionPerRound: 500,
      feesPerRound: 500,
    });

    assert.equal(needed, 1_000);
  });

  it("krever hele finansieringsgapet ved stopp ved neste inntekt", () => {
    const needed = calculateOwnFinancingNeeded({
      strategy: "stop-next-income",
      situation: {
        ...emptySituation,
        cashOnHand: 1_500,
        expensesBeforeDue: 0,
        amountDue: 2_500,
        currentPrincipal: 2_000,
      },
      reductionPerRound: 2_000,
      feesPerRound: 500,
    });

    assert.equal(needed, 1_000);
  });

  it("lager nedtrapping der siste runde kan nå 0 kr ny kreditt", () => {
    const schedule = buildBrakeSchedule({
      strategy: "step-down",
      currentPrincipal: 2_000,
      feesPerRound: 500,
      reductionPerRound: 500,
      rounds: 4,
    });

    assert.equal(schedule.length, 4);
    assert.equal(schedule[0]?.debtBefore, 2_000);
    assert.equal(schedule[0]?.newCredit, 1_500);
    assert.equal(schedule[0]?.realReduction, 500);
    assert.equal(schedule.at(-1)?.newCredit, 0);
    assert.equal(schedule.at(-1)?.realReduction, 500);
  });

  it("stopper veksten uten å love gjeldsfrihet", () => {
    const schedule = buildBrakeSchedule({
      strategy: "stop-growth",
      currentPrincipal: 2_000,
      feesPerRound: 500,
      reductionPerRound: 0,
      rounds: 1,
    });

    assert.equal(schedule[0]?.newCredit, 2_000);
    assert.equal(schedule[0]?.realReduction, 0);
  });

  it("summerer tiltak uten å fylle inn beløp automatisk", () => {
    assert.equal(
      sumMeasures({
        reducedExpenses: 200,
        extraIncome: 100,
        expectedMoneyIn: 300,
        assetSales: 0,
        otherNonDebtFinance: 0,
        paymentAgreement: 0,
      }),
      600,
    );
  });
});

describe("nedlasting", () => {
  it("inneholder planen uten teknisk metadata", () => {
    const text = buildBrakePlanDownloadText({
      currentDebt: 2_000,
      amountDue: 2_500,
      fees: 500,
      financingGapShortfall: 1_000,
      plannedReduction: 500,
      amountToFree: 1_000,
      loanFreeDateLabel: "15. oktober",
      firstCreditFreePeriod: "november",
      strategy: "step-down",
      schedule: [
        {
          label: "Nå",
          debtBefore: 2_000,
          costs: 500,
          newCredit: 1_500,
          realReduction: 500,
        },
      ],
      checkpoints: [
        { label: "Beløp som må frigjøres denne perioden", value: "1 000 kr" },
      ],
      isFeasible: false,
      remaining: 400,
    });

    assert.match(text, /Nåværende gjeld: 2\s000/);
    assert.match(text, /15\. oktober/);
    assert.match(text, /november/);
    assert.doesNotMatch(text, /localStorage|user-agent|pengerifokus\.no/i);
    assert.doesNotMatch(text, /Status: Bremseplanen går opp/);
  });
});
