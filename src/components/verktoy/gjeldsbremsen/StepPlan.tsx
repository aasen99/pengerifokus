"use client";

import { formatCurrency } from "@/lib/calculators/loan";
import { missingPlanMessage } from "@/lib/calculators/gjeldsbremsen";
import { MEASURE_FIELDS } from "@/data/gjeldsbremsen";
import type {
  BrakeScheduleRow,
  BrakeStrategy,
  PlanCheckpoint,
  PlanFeasibility,
} from "@/types/gjeldsbremsen";
import { MoneyField } from "@/components/verktoy/gjeldsbremsen/GjeldsbremsenFields";
import { DebtCycleChart } from "@/components/verktoy/gjeldsbremsen/DebtCycleChart";
import { WizardActions } from "@/components/verktoy/gjeldsbremsen/GjeldsbremsenFields";
import {
  calculatorMutedPanelClassName,
  calculatorPanelClassName,
} from "@/components/verktoy/calculator-ui";

export interface MeasuresForm {
  reducedExpenses: string;
  extraIncome: string;
  expectedMoneyIn: string;
  assetSales: string;
  otherNonDebtFinance: string;
  paymentAgreement: string;
}

interface StepPlanProps {
  strategy: BrakeStrategy | "";
  onStrategyChange: (strategy: BrakeStrategy) => void;
  stepDownRounds: number;
  onStepDownRoundsChange: (value: number) => void;
  reductionPerRound: string;
  onReductionPerRoundChange: (value: string) => void;
  feesPerRound: string;
  onFeesPerRoundChange: (value: string) => void;
  stopNowAmount: number;
  livingBalance: number;
  measures: MeasuresForm;
  onMeasureChange: (key: keyof MeasuresForm, value: string) => void;
  currentDebt: number;
  amountDue: number;
  fees: number;
  financingGapShortfall: number;
  plannedReduction: number;
  amountToFree: number;
  maxNewCredit: number;
  schedule: BrakeScheduleRow[];
  feasibility: PlanFeasibility;
  checkpoints: PlanCheckpoint[];
  loanFreeLabel: string;
  firstCreditFreePeriod: string;
  onBack: () => void;
}

const STRATEGIES: {
  id: BrakeStrategy;
  title: string;
  body: string;
}[] = [
  {
    id: "stop-next-income",
    title: "Stopp ved neste inntekt",
    body: "Frigjør nok til at neste betaling ikke etterfølges av ny kreditt.",
  },
  {
    id: "step-down",
    title: "Trapp ned over 2–4 runder",
    body: "Reduser hovedstolen i steg, med egenfinansiering i hver runde.",
  },
  {
    id: "stop-growth",
    title: "Stopp veksten først",
    body: "Neste gjeldsbeløp skal ikke være høyere enn dagens gjeld.",
  },
];

export function StepPlan({
  strategy,
  onStrategyChange,
  stepDownRounds,
  onStepDownRoundsChange,
  reductionPerRound,
  onReductionPerRoundChange,
  feesPerRound,
  onFeesPerRoundChange,
  stopNowAmount,
  livingBalance,
  measures,
  onMeasureChange,
  currentDebt,
  amountDue,
  fees,
  financingGapShortfall,
  plannedReduction,
  amountToFree,
  maxNewCredit,
  schedule,
  feasibility,
  checkpoints,
  loanFreeLabel,
  firstCreditFreePeriod,
  onBack,
}: StepPlanProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Velg bremsefart</h2>
        <p className="mt-1 text-sm text-stone-600">
          Planen vises først som gjennomførbar når tiltakene dekker beløpet som
          må frigjøres.
        </p>
      </div>

      <div className="grid gap-3">
        {STRATEGIES.map((item) => {
          const selected = strategy === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onStrategyChange(item.id)}
              className={`rounded-xl border px-4 py-4 text-left transition-colors ${
                selected
                  ? "border-orange-400 bg-orange-50 ring-2 ring-orange-200"
                  : "border-stone-200 bg-white hover:border-orange-300"
              }`}
            >
              <span className="block text-sm font-semibold text-stone-900">
                {item.title}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-stone-600">
                {item.body}
              </span>
              {item.id === "stop-next-income" && selected && (
                <span className="mt-2 block text-sm text-stone-800">
                  Du må frigjøre {formatCurrency(stopNowAmount)} før neste
                  inntekt for å unngå ny kreditt.
                </span>
              )}
              {item.id === "stop-growth" && selected && (
                <span className="mt-2 block text-sm text-stone-800">
                  Dette stanser forverringen, men gjør deg ikke gjeldsfri.
                  Maksimal ny kredittbruk er {formatCurrency(maxNewCredit)}.
                </span>
              )}
            </button>
          );
        })}
      </div>

      {strategy === "step-down" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-medium text-stone-900">
              Antall runder
            </span>
            <select
              value={stepDownRounds}
              onChange={(event) =>
                onStepDownRoundsChange(Number(event.target.value))
              }
              className="mt-2 w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-stone-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              <option value={2}>2 runder</option>
              <option value={3}>3 runder</option>
              <option value={4}>4 runder</option>
            </select>
          </label>
          <MoneyField
            label="Hvor mye gjelden skal falle per runde"
            hint="Hvor mye lavere utestående gjeld skal være etter hver runde."
            value={reductionPerRound}
            onChange={onReductionPerRoundChange}
          />
          <MoneyField
            label="Renter og gebyrer per runde"
            hint="Kostnaden som kommer i tillegg hver gang. Tomt felt bruker beløpet fra nåsituasjonen."
            value={feesPerRound}
            onChange={onFeesPerRoundChange}
          />
        </div>
      )}

      {strategy && (
        <>
          <section className={calculatorPanelClassName}>
            <h3 className="text-sm font-semibold text-stone-900">
              Tiltak for å fylle gapet
            </h3>
            <p className="mt-1 text-sm text-stone-600">
              Her legger du inn tiltak du kan gjøre nå, utover inntektene og
              utgiftene du allerede har fylt inn. Ikke før inn samme lønn to
              ganger.
              {livingBalance > 0
                ? ` Etter andre utgifter har du ${formatCurrency(livingBalance)} tilgjengelig før gjeldsbetalingen.`
                : ""}
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {MEASURE_FIELDS.map((field) => (
                <MoneyField
                  key={field.key}
                  label={field.label}
                  hint={field.hint}
                  value={measures[field.key]}
                  onChange={(value) => onMeasureChange(field.key, value)}
                />
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-stone-50 px-3 py-3">
              {feasibility.isFeasible ? (
                <p className="text-sm font-medium text-stone-800">
                  Tiltakene dekker {formatCurrency(feasibility.needed)}.
                  Bremseplanen går opp med tallene du har lagt inn.
                </p>
              ) : (
                <p className="text-sm font-medium text-stone-800">
                  {missingPlanMessage(feasibility.remaining)}
                </p>
              )}
            </div>
          </section>

          <section className={calculatorPanelClassName}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-stone-900">
                Min Gjeldsbrems
              </h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  feasibility.isFeasible
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-stone-100 text-stone-700"
                }`}
              >
                {feasibility.isFeasible
                  ? "Planen går opp"
                  : "Ikke gjennomførbar ennå"}
              </span>
            </div>

            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <PlanRow label="Nåværende gjeld" value={formatCurrency(currentDebt)} />
              <PlanRow
                label="Beløp som skal tilbakebetales"
                value={formatCurrency(amountDue)}
              />
              <PlanRow label="Renter og gebyrer" value={formatCurrency(fees)} />
              <PlanRow
                label="Faktisk finansieringsgap"
                value={formatCurrency(financingGapShortfall)}
              />
              <PlanRow
                label="Planlagt reduksjon per runde"
                value={formatCurrency(plannedReduction)}
              />
              <PlanRow
                label="Beløp som må frigjøres per runde"
                value={formatCurrency(amountToFree)}
              />
              <PlanRow
                label="Planlagt lånefri dato"
                value={
                  strategy === "stop-growth"
                    ? "Ikke satt — veksten stanses først"
                    : loanFreeLabel || "Sett neste inntektsdato"
                }
              />
              <PlanRow
                label="Første inntektsperiode uten ny kreditt"
                value={
                  strategy === "stop-growth"
                    ? "Ikke satt"
                    : firstCreditFreePeriod || "Sett neste inntektsdato"
                }
              />
            </dl>

            {schedule.length > 0 && (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[32rem] text-sm">
                  <caption className="mb-2 text-left text-sm font-semibold text-stone-900">
                    Nedtrapping
                  </caption>
                  <thead>
                    <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wider text-stone-500">
                      <th className="py-2 pr-3 font-semibold">Runde</th>
                      <th className="py-2 pr-3 text-right font-semibold">
                        Gjeld før betaling
                      </th>
                      <th className="py-2 pr-3 text-right font-semibold">
                        Kostnader
                      </th>
                      <th className="py-2 pr-3 text-right font-semibold">
                        Ny kreditt
                      </th>
                      <th className="py-2 text-right font-semibold">
                        Reell reduksjon
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row) => (
                      <tr key={row.label} className="border-b border-stone-100">
                        <td className="py-2 pr-3 font-medium text-stone-900">
                          {row.label}
                        </td>
                        <td className="py-2 pr-3 text-right tabular-nums">
                          {formatCurrency(row.debtBefore)}
                        </td>
                        <td className="py-2 pr-3 text-right tabular-nums">
                          {formatCurrency(row.costs)}
                        </td>
                        <td className="py-2 pr-3 text-right tabular-nums">
                          {formatCurrency(row.newCredit)}
                        </td>
                        <td className="py-2 text-right tabular-nums font-medium">
                          {formatCurrency(row.realReduction)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6">
              <DebtCycleChart rounds={[]} schedule={schedule} />
            </div>
          </section>

          <section className={calculatorMutedPanelClassName}>
            <h3 className="text-sm font-semibold text-stone-900">Sjekkpunkter</h3>
            <ul className="mt-3 space-y-2">
              {checkpoints.map((item) => (
                <li key={item.label} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                  <span className="text-sm text-stone-600">{item.label}</span>
                  <span className="text-sm font-semibold text-stone-900">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium leading-relaxed text-stone-800">
              Målet er ikke bare å betale. Målet er at betalingen ikke
              etterfølges av ny kreditt.
            </p>
          </section>
        </>
      )}

      <WizardActions onBack={onBack} />
    </div>
  );
}

function PlanRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-stone-600">{label}</dt>
      <dd className="font-semibold tabular-nums text-stone-900">{value}</dd>
    </div>
  );
}
