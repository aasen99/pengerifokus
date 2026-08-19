"use client";

import { formatCurrency } from "@/lib/calculators/loan";
import { formatDaysPhrase } from "@/lib/calculators/gjeldsbremsen";
import type { DiagnosisResult, HistorySummary, LoanRound } from "@/types/gjeldsbremsen";
import { DebtCycleChart } from "@/components/verktoy/gjeldsbremsen/DebtCycleChart";
import { WizardActions } from "@/components/verktoy/gjeldsbremsen/GjeldsbremsenFields";
import { calculatorPanelClassName } from "@/components/verktoy/calculator-ui";

interface StepDiagnosisProps {
  summary: HistorySummary | null;
  diagnosis: DiagnosisResult;
  rounds: LoanRound[];
  expectedFees: number;
  onBack: () => void;
  onNext: () => void;
}

export function StepDiagnosis({
  summary,
  diagnosis,
  rounds,
  expectedFees,
  onBack,
  onNext,
}: StepDiagnosisProps) {
  const reduction = summary?.realDebtReduction ?? null;
  const costs = summary?.totalLoanCost ?? expectedFees;
  const days = summary?.averageDaysWithoutCredit ?? null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">
          Resultat og diagnose
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Tallene viser den økonomiske utviklingen, ikke om du har betalt i
          tide.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Reell gjeldsreduksjon"
          value={
            reduction === null ? "—" : formatCurrency(reduction)
          }
        />
        <StatCard
          label="Samlede lånekostnader"
          value={formatCurrency(costs)}
        />
        <StatCard
          label="Dager uten ny kreditt"
          value={
            days === null ? "—" : formatDaysPhrase(days)
          }
        />
      </div>

      <div className={calculatorPanelClassName}>
        <h3 className="text-sm font-semibold text-stone-900">
          {diagnosis.headline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          {diagnosis.body}
        </p>
        {diagnosis.liftNote && (
          <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2 text-sm leading-relaxed text-stone-700">
            {diagnosis.liftNote}
          </p>
        )}
      </div>

      <div className={calculatorPanelClassName}>
        <h3 className="text-sm font-semibold text-stone-900">
          Gjeld før betaling, betalt beløp og ny kredittbruk
        </h3>
        <div className="mt-4">
          {rounds.some(
            (round) =>
              round.principal > 0 || round.repaid > 0 || round.newCredit > 0,
          ) ? (
            <DebtCycleChart rounds={rounds} />
          ) : (
            <p className="text-sm text-stone-600">
              Legg inn tidligere lånerunder for å se om gjelden øker, står
              stille eller reduseres.
            </p>
          )}
        </div>
      </div>

      <WizardActions
        onBack={onBack}
        onNext={onNext}
        nextLabel="Velg bremsefart"
      />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-stone-900">
        {value}
      </p>
    </div>
  );
}
