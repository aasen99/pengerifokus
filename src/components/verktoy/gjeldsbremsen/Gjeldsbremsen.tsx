"use client";

import { useMemo } from "react";
import { parseIntegerInput, formatIntegerInput } from "@/lib/format/number";
import { useToolPersistence } from "@/lib/verktoy-persistence";
import { getDebtTypeCopy } from "@/data/gjeldsbremsen";
import {
  buildBrakePlanDownloadText,
  buildBrakeSchedule,
  buildDiagnosis,
  buildPlanCheckpoints,
  calculateFinancingGap,
  calculateLivingBalance,
  calculateMaxNewCredit,
  calculateOwnFinancingNeeded,
  evaluatePlanFeasibility,
  firstCreditFreePeriodLabel,
  formatDateNb,
  plannedLoanFreeDate,
  sumMeasures,
  summarizeLoanRounds,
  toIsoDate,
} from "@/lib/calculators/gjeldsbremsen";
import type {
  BrakeStrategy,
  CurrentSituation,
  DebtType,
  GapMeasures,
  LoanRound,
} from "@/types/gjeldsbremsen";
import { GjeldsbremsenIntro } from "@/components/verktoy/gjeldsbremsen/GjeldsbremsenIntro";
import { GjeldsbremsenStepNav } from "@/components/verktoy/gjeldsbremsen/GjeldsbremsenStepNav";
import { PrivacyBar } from "@/components/verktoy/gjeldsbremsen/PrivacyBar";
import { StepDebtType } from "@/components/verktoy/gjeldsbremsen/StepDebtType";
import { StepSituation } from "@/components/verktoy/gjeldsbremsen/StepSituation";
import {
  StepHistory,
  type LoanRoundForm,
} from "@/components/verktoy/gjeldsbremsen/StepHistory";
import { StepDiagnosis } from "@/components/verktoy/gjeldsbremsen/StepDiagnosis";
import { StepPlan } from "@/components/verktoy/gjeldsbremsen/StepPlan";

interface GjeldsbremsenState extends Record<string, unknown> {
  step: number;
  maxReachedStep: number;
  debtType: DebtType | "";
  cashOnHand: string;
  amountDue: string;
  dueDate: string;
  incomeBeforeDue: string;
  expensesBeforeDue: string;
  currentPrincipal: string;
  expectedFees: string;
  nextIncomeDate: string;
  nextIncomeAmount: string;
  rounds: LoanRoundForm[];
  strategy: BrakeStrategy | "";
  stepDownRounds: number;
  reductionPerRound: string;
  feesPerRound: string;
  reducedExpenses: string;
  extraIncome: string;
  expectedMoneyIn: string;
  assetSales: string;
  otherNonDebtFinance: string;
  paymentAgreement: string;
}

function money(value: string): number {
  const parsed = parseIntegerInput(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function createRound(): LoanRoundForm {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `runde-${Date.now()}`,
    usedDate: "",
    principal: "",
    repaid: "",
    fees: "",
    repaidDate: "",
    newCredit: "",
    newCreditDate: "",
  };
}

function parseRound(round: LoanRoundForm): LoanRound {
  return {
    principal: money(round.principal),
    repaid: money(round.repaid),
    feesOverride: round.fees === "" ? null : money(round.fees),
    newCredit: money(round.newCredit),
    usedDate: round.usedDate,
    repaidDate: round.repaidDate,
    newCreditDate: round.newCreditDate,
  };
}

const EMPTY_ROUNDS: LoanRoundForm[] = [];

const DEFAULT_STATE: GjeldsbremsenState = {
  step: 0,
  maxReachedStep: 1,
  debtType: "",
  cashOnHand: "",
  amountDue: "",
  dueDate: "",
  incomeBeforeDue: "",
  expensesBeforeDue: "",
  currentPrincipal: "",
  expectedFees: "",
  nextIncomeDate: "",
  nextIncomeAmount: "",
  rounds: [],
  strategy: "",
  stepDownRounds: 3,
  reductionPerRound: "",
  feesPerRound: "",
  reducedExpenses: "",
  extraIncome: "",
  expectedMoneyIn: "",
  assetSales: "",
  otherNonDebtFinance: "",
  paymentAgreement: "",
};

function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function Gjeldsbremsen() {
  const { state, setState, update, clearSaved, source } =
    useToolPersistence<GjeldsbremsenState>("gjeldsbremsen", DEFAULT_STATE);

  const copy = getDebtTypeCopy(state.debtType);
  const rounds = Array.isArray(state.rounds) ? state.rounds : EMPTY_ROUNDS;
  const parsedRounds = useMemo(() => rounds.map(parseRound), [rounds]);
  const summary = useMemo(
    () => summarizeLoanRounds(parsedRounds),
    [parsedRounds],
  );

  const situation: CurrentSituation = {
    cashOnHand: money(state.cashOnHand),
    amountDue: money(state.amountDue),
    dueDate: state.dueDate,
    incomeBeforeDue: money(state.incomeBeforeDue),
    expensesBeforeDue: money(state.expensesBeforeDue),
    currentPrincipal: money(state.currentPrincipal),
    expectedFees: money(state.expectedFees),
    nextIncomeDate: state.nextIncomeDate,
    nextIncomeAmount: money(state.nextIncomeAmount),
  };

  const gap = calculateFinancingGap(situation);
  const livingBalance = calculateLivingBalance(situation);
  const diagnosis = buildDiagnosis(summary, situation);

  const strategy = state.strategy;
  const feesPerRound =
    state.feesPerRound === ""
      ? situation.expectedFees
      : money(state.feesPerRound);
  const reductionPerRound =
    strategy === "stop-next-income"
      ? situation.currentPrincipal
      : strategy === "stop-growth"
        ? 0
        : money(state.reductionPerRound);
  const ownNeeded = strategy
    ? calculateOwnFinancingNeeded({
        strategy,
        situation,
        reductionPerRound,
        feesPerRound,
      })
    : 0;
  const measures: GapMeasures = {
    reducedExpenses: money(state.reducedExpenses),
    extraIncome: money(state.extraIncome),
    expectedMoneyIn: money(state.expectedMoneyIn),
    assetSales: money(state.assetSales),
    otherNonDebtFinance: money(state.otherNonDebtFinance),
    paymentAgreement: money(state.paymentAgreement),
  };
  const feasibility = evaluatePlanFeasibility(ownNeeded, sumMeasures(measures));
  const maxNewCredit = strategy
    ? calculateMaxNewCredit({
        strategy,
        currentPrincipal: situation.currentPrincipal,
        reductionPerRound,
      })
    : 0;
  const schedule = strategy
    ? buildBrakeSchedule({
        strategy,
        currentPrincipal: situation.currentPrincipal,
        feesPerRound,
        reductionPerRound,
        rounds: state.stepDownRounds,
      })
    : [];
  const loanFreeDate = strategy
    ? plannedLoanFreeDate({
        strategy,
        nextIncomeDate: situation.nextIncomeDate,
        rounds: state.stepDownRounds,
      })
    : null;
  const loanFreeLabel = loanFreeDate ? formatDateNb(toIsoDate(loanFreeDate)) : "";
  const firstCreditFreePeriod = firstCreditFreePeriodLabel(loanFreeDate);
  const nextCheckpoint = situation.dueDate || situation.nextIncomeDate;
  const checkpoints = strategy
    ? buildPlanCheckpoints({
        strategy,
        amountToFreeThisPeriod: ownNeeded,
        maxNewCredit,
        nextCheckpointDate: nextCheckpoint,
        plannedReduction: reductionPerRound,
        firstCreditFreePeriod,
      })
    : [];

  const maxReachableStep = Math.max(1, Number(state.maxReachedStep) || 1);

  const goTo = (step: number) => {
    setState((prev) => ({
      ...prev,
      step,
      maxReachedStep: Math.max(Number(prev.maxReachedStep) || 1, step),
    }));
  };

  const handleDownload = () => {
    if (!strategy) return;
    downloadTextFile(
      "gjeldsbrems.txt",
      buildBrakePlanDownloadText({
        currentDebt: situation.currentPrincipal,
        amountDue: situation.amountDue,
        fees: feesPerRound,
        financingGapShortfall: Math.max(0, -gap),
        plannedReduction: reductionPerRound,
        amountToFree: ownNeeded,
        loanFreeDateLabel: loanFreeLabel,
        firstCreditFreePeriod,
        strategy,
        schedule,
        checkpoints,
        isFeasible: feasibility.isFeasible,
        remaining: feasibility.remaining,
      }),
    );
  };

  if (state.step === 0) {
    return (
      <div className="space-y-4">
        <GjeldsbremsenIntro onStart={() => goTo(1)} />
        {(source === "local" || rounds.length > 0 || state.debtType) && (
          <PrivacyBar hasStoredData={source === "local"} onClear={clearSaved} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <GjeldsbremsenStepNav
        currentStep={state.step}
        maxReachableStep={maxReachableStep}
        onStepChange={goTo}
      />

      <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-8">
        {state.step === 1 && (
          <StepDebtType
            value={state.debtType}
            onChange={(value) => update("debtType", value)}
            onNext={() => goTo(2)}
          />
        )}

        {state.step === 2 && (
          <StepSituation
            copy={copy}
            form={{
              cashOnHand: state.cashOnHand,
              amountDue: state.amountDue,
              dueDate: state.dueDate,
              incomeBeforeDue: state.incomeBeforeDue,
              expensesBeforeDue: state.expensesBeforeDue,
              currentPrincipal: state.currentPrincipal,
              expectedFees: state.expectedFees,
              nextIncomeDate: state.nextIncomeDate,
              nextIncomeAmount: state.nextIncomeAmount,
            }}
            onChange={(key, value) => update(key, value)}
            gap={gap}
            onBack={() => goTo(1)}
            onNext={() => goTo(3)}
          />
        )}

        {state.step === 3 && (
          <StepHistory
            copy={copy}
            rounds={rounds}
            summary={summary}
            onChangeRound={(id, key, value) =>
              setState((prev) => ({
                ...prev,
                rounds: (Array.isArray(prev.rounds) ? prev.rounds : []).map(
                  (round) =>
                    round.id === id ? { ...round, [key]: value } : round,
                ),
              }))
            }
            onAddRound={() =>
              setState((prev) => ({
                ...prev,
                rounds: [
                  ...(Array.isArray(prev.rounds) ? prev.rounds : []),
                  createRound(),
                ],
              }))
            }
            onRemoveRound={(id) =>
              setState((prev) => ({
                ...prev,
                rounds: (Array.isArray(prev.rounds) ? prev.rounds : []).filter(
                  (round) => round.id !== id,
                ),
              }))
            }
            onBack={() => goTo(2)}
            onNext={() => goTo(4)}
            onSkip={() => goTo(4)}
          />
        )}

        {state.step === 4 && (
          <StepDiagnosis
            summary={summary}
            diagnosis={diagnosis}
            rounds={parsedRounds}
            expectedFees={situation.expectedFees}
            onBack={() => goTo(3)}
            onNext={() => {
              setState((prev) => ({
                ...prev,
                step: 5,
                maxReachedStep: Math.max(Number(prev.maxReachedStep) || 1, 5),
                feesPerRound:
                  prev.feesPerRound ||
                  (situation.expectedFees > 0
                    ? formatIntegerInput(situation.expectedFees)
                    : ""),
              }));
            }}
          />
        )}

        {state.step === 5 && (
          <StepPlan
            strategy={strategy}
            onStrategyChange={(value) => update("strategy", value)}
            stepDownRounds={state.stepDownRounds}
            onStepDownRoundsChange={(value) => update("stepDownRounds", value)}
            reductionPerRound={state.reductionPerRound}
            onReductionPerRoundChange={(value) =>
              update("reductionPerRound", value)
            }
            feesPerRound={state.feesPerRound}
            onFeesPerRoundChange={(value) => update("feesPerRound", value)}
            stopNowAmount={Math.max(0, -gap)}
            livingBalance={Math.max(0, livingBalance)}
            measures={{
              reducedExpenses: state.reducedExpenses,
              extraIncome: state.extraIncome,
              expectedMoneyIn: state.expectedMoneyIn,
              assetSales: state.assetSales,
              otherNonDebtFinance: state.otherNonDebtFinance,
              paymentAgreement: state.paymentAgreement,
            }}
            onMeasureChange={(key, value) => update(key, value)}
            currentDebt={situation.currentPrincipal}
            amountDue={situation.amountDue}
            fees={feesPerRound}
            financingGapShortfall={Math.max(0, -gap)}
            plannedReduction={reductionPerRound}
            amountToFree={ownNeeded}
            maxNewCredit={maxNewCredit}
            schedule={schedule}
            feasibility={feasibility}
            checkpoints={checkpoints}
            loanFreeLabel={loanFreeLabel}
            firstCreditFreePeriod={firstCreditFreePeriod}
            onBack={() => goTo(4)}
          />
        )}
      </div>

      <PrivacyBar
        hasStoredData={source === "local"}
        onClear={clearSaved}
        onDownload={strategy ? handleDownload : undefined}
        downloadDisabled={!strategy}
      />
    </div>
  );
}
