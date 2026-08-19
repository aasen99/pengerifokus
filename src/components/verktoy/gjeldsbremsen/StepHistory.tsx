"use client";

import { formatCurrency } from "@/lib/calculators/loan";
import { calculateLoanCost } from "@/lib/calculators/gjeldsbremsen";
import type { DebtTypeCopy } from "@/data/gjeldsbremsen";
import type { HistorySummary } from "@/types/gjeldsbremsen";
import {
  DateField,
  MoneyField,
  WizardActions,
} from "@/components/verktoy/gjeldsbremsen/GjeldsbremsenFields";
import {
  calculatorInputClassName,
  calculatorMutedPanelClassName,
} from "@/components/verktoy/calculator-ui";
import { parseIntegerInput } from "@/lib/format/number";

export interface LoanRoundForm {
  id: string;
  usedDate: string;
  principal: string;
  repaid: string;
  fees: string;
  repaidDate: string;
  newCredit: string;
  newCreditDate: string;
}

interface StepHistoryProps {
  copy: DebtTypeCopy;
  rounds: LoanRoundForm[];
  summary: HistorySummary | null;
  onChangeRound: (id: string, key: keyof LoanRoundForm, value: string) => void;
  onAddRound: () => void;
  onRemoveRound: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

function money(value: string): number {
  const parsed = parseIntegerInput(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function StepHistory({
  copy,
  rounds,
  summary,
  onChangeRound,
  onAddRound,
  onRemoveRound,
  onBack,
  onNext,
  onSkip,
}: StepHistoryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">
          Tidligere lånerunder
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Valgfritt, men anbefalt. Registrer de siste 3–10 rundene for å se om
          gjelden faktisk faller.
        </p>
      </div>

      {rounds.length === 0 && (
        <p className="text-sm text-stone-600">
          Ingen runder er lagt inn ennå. Du kan hoppe over dette steget, eller
          legge til den siste runden du husker.
        </p>
      )}

      <div className="space-y-4">
        {rounds.map((round, index) => {
          const autoCost = calculateLoanCost(
            money(round.principal),
            money(round.repaid),
            null,
          );

          return (
            <section
              key={round.id}
              className="rounded-xl border border-stone-200 bg-white p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-stone-900">
                  {copy.roundTitle} {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => onRemoveRound(round.id)}
                  className="text-sm font-medium text-stone-500 hover:text-stone-800"
                >
                  Fjern
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <DateField
                  label={copy.usedDate}
                  value={round.usedDate}
                  onChange={(value) => onChangeRound(round.id, "usedDate", value)}
                />
                <MoneyField
                  label="Hovedstol eller beløp mottatt"
                  value={round.principal}
                  onChange={(value) =>
                    onChangeRound(round.id, "principal", value)
                  }
                />
                <MoneyField
                  label="Beløp tilbakebetalt"
                  value={round.repaid}
                  onChange={(value) => onChangeRound(round.id, "repaid", value)}
                />
                <div>
                  <MoneyField
                    label="Renter og gebyrer"
                    hint={
                      round.fees
                        ? "Manuelt beløp"
                        : `Beregnet ${formatCurrency(autoCost)}. Du kan overstyre.`
                    }
                    value={round.fees}
                    onChange={(value) => onChangeRound(round.id, "fees", value)}
                  />
                </div>
                <DateField
                  label={copy.repaidDate}
                  value={round.repaidDate}
                  onChange={(value) =>
                    onChangeRound(round.id, "repaidDate", value)
                  }
                />
                <MoneyField
                  label={copy.newCredit}
                  value={round.newCredit}
                  onChange={(value) =>
                    onChangeRound(round.id, "newCredit", value)
                  }
                />
                <DateField
                  label={copy.newCreditDate}
                  value={round.newCreditDate}
                  onChange={(value) =>
                    onChangeRound(round.id, "newCreditDate", value)
                  }
                />
              </div>
            </section>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onAddRound}
        disabled={rounds.length >= 10}
        className={`${calculatorInputClassName} border-dashed font-medium text-stone-700 hover:border-orange-300 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        Legg til ny lånerunde
      </button>

      {summary && (
        <div className={calculatorMutedPanelClassName}>
          <h3 className="text-sm font-semibold text-stone-900">
            Oppsummert historikk
          </h3>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <SummaryItem
              label="Samlet låne- og kredittbruk"
              value={formatCurrency(summary.totalCreditUsed)}
            />
            <SummaryItem
              label="Samlet tilbakebetalt"
              value={formatCurrency(summary.totalRepaid)}
            />
            <SummaryItem
              label="Samlede renter og gebyrer"
              value={formatCurrency(summary.totalLoanCost)}
            />
            <SummaryItem
              label="Reell gjeldsreduksjon"
              value={formatCurrency(summary.realDebtReduction)}
            />
            <SummaryItem
              label="Gjennomsnittlig dager uten ny kreditt"
              value={
                summary.averageDaysWithoutCredit === null
                  ? "—"
                  : `${Math.round(summary.averageDaysWithoutCredit)}`
              }
            />
            <SummaryItem
              label="Utvikling"
              value={
                summary.trend === "increasing"
                  ? "Øker"
                  : summary.trend === "decreasing"
                    ? "Reduseres"
                    : "Står stille"
              }
            />
            <SummaryItem
              label="Betalinger fulgt av ny kredittbruk"
              value={`${summary.paymentsFollowedByNewCredit} av ${summary.roundCount}`}
            />
          </dl>
        </div>
      )}

      <WizardActions
        onBack={onBack}
        onNext={onNext}
        nextLabel="Se diagnose"
        secondaryLabel={rounds.length === 0 ? "Hopp over" : undefined}
        onSecondary={rounds.length === 0 ? onSkip : undefined}
      />
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-stone-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold tabular-nums text-stone-900">
        {value}
      </dd>
    </div>
  );
}
