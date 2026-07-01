"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DecimalNumberInput } from "@/components/ui/DecimalNumberInput";
import { FormattedNumberInput } from "@/components/ui/FormattedNumberInput";
import { formatIntegerInput, parseIntegerInput } from "@/lib/format/number";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";
import {
  compareDebtPayoffPlans,
  DEFAULT_DEBTS,
  formatStrategyLabel,
  type DebtLine,
  type DebtPayoffSummary,
} from "@/lib/calculators/nedbetalingsplan";
import { formatCurrency, formatYearsAndMonths } from "@/lib/calculators/loan";

function createDebtId(): string {
  return `debt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function parseDebts(debts: DebtLine[]): DebtLine[] | null {
  const parsed = debts
    .map((debt) => ({
      ...debt,
      name: debt.name.trim() || "Lån",
    }))
    .filter((debt) => debt.balance > 0);

  if (parsed.length === 0) return null;

  for (const debt of parsed) {
    if (
      !Number.isFinite(debt.balance) ||
      !Number.isFinite(debt.annualRatePercent) ||
      !Number.isFinite(debt.minimumMonthlyPayment) ||
      debt.balance <= 0 ||
      debt.annualRatePercent < 0 ||
      debt.minimumMonthlyPayment < 0
    ) {
      return null;
    }
  }

  return parsed;
}

function StrategyResultCard({
  title,
  summary,
  minimumOnly,
}: {
  title: string;
  summary: DebtPayoffSummary;
  minimumOnly: DebtPayoffSummary;
}) {
  const monthsSaved = minimumOnly.monthsToDebtFree - summary.monthsToDebtFree;
  const interestSaved = minimumOnly.totalInterestPaid - summary.totalInterestPaid;

  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
      <h2 className="text-lg font-semibold text-stone-900">{title}</h2>

      {!summary.debtFree ? (
        <p className="mt-4 text-sm text-stone-700">
          {summary.hasGrowingDebt
            ? "Minimumsbeløpet dekker ikke renten på minst ett lån. Gjelden vil vokse – øk innbetalingen eller refinansier."
            : "Kunne ikke beregne full nedbetaling innen 50 år. Sjekk tallene eller øk ekstra innbetaling."}
        </p>
      ) : (
        <dl className="mt-5 space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-stone-600">Gjeldsfri om</dt>
            <dd className="text-lg font-semibold text-stone-900">
              {formatYearsAndMonths(summary.monthsToDebtFree)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-stone-600">Total rentekostnad</dt>
            <dd className="font-semibold text-stone-900">
              {formatCurrency(summary.totalInterestPaid)}
            </dd>
          </div>
          {monthsSaved > 0 && (
            <>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-stone-600">Tid spart vs. kun minimum</dt>
                <dd className="font-semibold text-orange-700">
                  {formatYearsAndMonths(monthsSaved)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-stone-600">Renter spart vs. kun minimum</dt>
                <dd className="text-lg font-semibold text-orange-700">
                  {formatCurrency(interestSaved)}
                </dd>
              </div>
            </>
          )}
        </dl>
      )}

      {summary.payoffOrder.length > 0 && (
        <div className="mt-5 border-t border-orange-200 pt-4">
          <p className="text-sm font-medium text-stone-900">Rekkefølge lån blir borte</p>
          <ol className="mt-2 space-y-1 text-sm text-stone-700">
            {summary.payoffOrder.map((item, index) => (
              <li key={`${item.name}-${item.monthPaidOff}`}>
                {index + 1}. {item.name} – måned {item.monthPaidOff} (
                {formatYearsAndMonths(item.monthPaidOff)})
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export function Nedbetalingskalkulator() {
  const [debts, setDebts] = useState<DebtLine[]>(DEFAULT_DEBTS);
  const [extra, setExtra] = useState(formatIntegerInput(2_000));

  const result = useMemo(() => {
    const parsedDebts = parseDebts(debts);
    const extraMonthly = parseIntegerInput(extra);

    if (!parsedDebts || !Number.isFinite(extraMonthly) || extraMonthly < 0) {
      return null;
    }

    return compareDebtPayoffPlans(parsedDebts, extraMonthly);
  }, [debts, extra]);

  const updateDebt = (id: string, patch: Partial<DebtLine>) => {
    setDebts((current) =>
      current.map((debt) => (debt.id === id ? { ...debt, ...patch } : debt)),
    );
  };

  const addDebt = () => {
    setDebts((current) => [
      ...current,
      {
        id: createDebtId(),
        name: "Nytt lån",
        balance: 0,
        annualRatePercent: 10,
        minimumMonthlyPayment: 500,
      },
    ]);
  };

  const removeDebt = (id: string) => {
    setDebts((current) =>
      current.length > 1 ? current.filter((debt) => debt.id !== id) : current,
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Dine lån</h2>
        <p className="mt-1 text-sm text-stone-600">
          Legg inn alle gjeldsposter. Betal minimum på alt, og legg ekstra på ett
          lån om gangen etter lavine- eller snøball-metoden.
        </p>

        <div className="mt-6 space-y-5">
          {debts.map((debt, index) => (
            <div
              key={debt.id}
              className="rounded-xl border border-stone-200 bg-stone-50 p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-stone-900">
                  Lån {index + 1}
                </p>
                {debts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDebt(debt.id)}
                    className="text-xs font-medium text-stone-500 hover:text-stone-800"
                  >
                    Fjern
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <CalculatorField label="Navn">
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(event) =>
                      updateDebt(debt.id, { name: event.target.value })
                    }
                    className={calculatorInputClassName}
                  />
                </CalculatorField>

                <CalculatorField label="Restgjeld">
                  <FormattedNumberInput
                    value={formatIntegerInput(debt.balance)}
                    onChange={(value) =>
                      updateDebt(debt.id, {
                        balance: parseIntegerInput(value),
                      })
                    }
                    className={calculatorInputClassName}
                  />
                </CalculatorField>

                <div className="grid gap-4 sm:grid-cols-2">
                  <CalculatorField label="Nominell rente" hint="Årlig rente i %">
                    <DecimalNumberInput
                      value={debt.annualRatePercent}
                      onChange={(value) =>
                        updateDebt(debt.id, { annualRatePercent: value })
                      }
                      min={0}
                      max={50}
                      className={calculatorInputClassName}
                    />
                  </CalculatorField>

                  <CalculatorField label="Minimum per måned">
                    <FormattedNumberInput
                      value={formatIntegerInput(debt.minimumMonthlyPayment)}
                      onChange={(value) =>
                        updateDebt(debt.id, {
                          minimumMonthlyPayment: parseIntegerInput(value),
                        })
                      }
                      className={calculatorInputClassName}
                    />
                  </CalculatorField>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addDebt}
            className="w-full rounded-lg border border-dashed border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:border-orange-300 hover:text-orange-700"
          >
            + Legg til lån
          </button>

          <CalculatorField
            label="Ekstra per måned"
            hint="I tillegg til alle minimumsbeløp – går til ett valgt lån"
          >
            <FormattedNumberInput
              value={extra}
              onChange={setExtra}
              className={calculatorInputClassName}
            />
          </CalculatorField>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-stone-500">
          Har du bare ett boliglån med annuitet? Bruk{" "}
          <Link
            href="/verktoy/rentekalkulator"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            rentekalkulatoren
          </Link>{" "}
          for terminbeløp, engangsinnbetaling og renter spart.
        </p>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">
                Kun minimum på alt
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Gjeldsfri om</dt>
                  <dd className="font-semibold text-stone-900">
                    {result.minimumOnly.debtFree
                      ? formatYearsAndMonths(result.minimumOnly.monthsToDebtFree)
                      : "—"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Total rentekostnad</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.minimumOnly.totalInterestPaid)}
                  </dd>
                </div>
              </dl>
            </div>

            <StrategyResultCard
              title={`${formatStrategyLabel("avalanche")} (høyest rente først)`}
              summary={result.avalanche}
              minimumOnly={result.minimumOnly}
            />

            <StrategyResultCard
              title={`${formatStrategyLabel("snowball")} (minst gjeld først)`}
              summary={result.snowball}
              minimumOnly={result.minimumOnly}
            />

            {result.avalanche.debtFree &&
              result.snowball.debtFree &&
              result.avalanche.totalInterestPaid !==
                result.snowball.totalInterestPaid && (
                <div className="rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-700 shadow-sm">
                  {result.avalanche.totalInterestPaid <
                  result.snowball.totalInterestPaid ? (
                    <>
                      <span className="font-semibold text-stone-900">Lavine</span>{" "}
                      sparer{" "}
                      {formatCurrency(
                        result.snowball.totalInterestPaid -
                          result.avalanche.totalInterestPaid,
                      )}{" "}
                      mer i renter enn snøball med samme ekstra beløp.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-stone-900">Snøball</span>{" "}
                      gir raskere synlig fremgang, men lavine er billigst når
                      renteforskjellene er store.
                    </>
                  )}
                </div>
              )}
          </>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
            Fyll inn minst ett lån med gyldige tall for å se planen.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Beregningen er veiledende. Den tar ikke høyde for gebyrer,
          renteendringer eller refinansiering. Sjekk alltid med banken din.
        </p>
      </section>
    </div>
  );
}
