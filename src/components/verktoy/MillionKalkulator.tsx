"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  monthlyToReachTarget,
  monthsToTarget,
  rateToReachTarget,
} from "@/lib/calculators/savings";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

type MillionMode = "time" | "monthly" | "rate";

const modes: { id: MillionMode; label: string }[] = [
  { id: "time", label: "Tid" },
  { id: "monthly", label: "Månedlig" },
  { id: "rate", label: "Avkastning" },
];

function formatDuration(years: number, months: number): string {
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} år`);
  if (months > 0) parts.push(`${months} mnd`);
  if (parts.length === 0) return "0 mnd";
  return parts.join(" ");
}

function formatPercent(value: number): string {
  return value.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function MillionKalkulator() {
  const [mode, setMode] = useState<MillionMode>("time");
  const [target, setTarget] = useState(formatIntegerInput(1_000_000));
  const [initial, setInitial] = useState(formatIntegerInput(0));
  const [monthly, setMonthly] = useState(formatIntegerInput(5_000));
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("15");

  const result = useMemo(() => {
    const targetAmount = parseIntegerInput(target);
    const initialBalance = parseIntegerInput(initial) || 0;
    const monthlySaving = parseIntegerInput(monthly);
    const annualReturnPercent = Number(rate.replace(",", "."));
    const yearsNum = Number(years.replace(/\s/g, "").replace(",", "."));

    if (!Number.isFinite(targetAmount) || targetAmount <= 0) return null;
    if (initialBalance < 0) return null;

    if (mode === "time") {
      if (
        !Number.isFinite(monthlySaving) ||
        monthlySaving < 0 ||
        !Number.isFinite(annualReturnPercent) ||
        annualReturnPercent < 0
      ) {
        return null;
      }

      const time = monthsToTarget({
        initialBalance,
        monthlySaving,
        annualReturnPercent,
        targetAmount,
      });
      if (!time) return null;

      return {
        mode: "time" as const,
        time,
        monthlySaving,
        annualReturnPercent,
        targetAmount,
        initialBalance,
      };
    }

    if (mode === "monthly") {
      if (
        !Number.isFinite(yearsNum) ||
        yearsNum <= 0 ||
        !Number.isFinite(annualReturnPercent) ||
        annualReturnPercent < 0
      ) {
        return null;
      }

      const needed = monthlyToReachTarget({
        initialBalance,
        annualReturnPercent,
        years: yearsNum,
        targetAmount,
      });
      if (needed === null) return null;

      const months = Math.round(yearsNum * 12);
      const totalContributed = initialBalance + needed * months;
      const finalBalance = targetAmount;
      const returnEarned = Math.max(0, finalBalance - totalContributed);

      return {
        mode: "monthly" as const,
        monthlyNeeded: needed,
        years: yearsNum,
        annualReturnPercent,
        targetAmount,
        initialBalance,
        totalContributed,
        returnEarned,
      };
    }

    if (
      !Number.isFinite(yearsNum) ||
      yearsNum <= 0 ||
      !Number.isFinite(monthlySaving) ||
      monthlySaving < 0
    ) {
      return null;
    }

    const neededRate = rateToReachTarget({
      initialBalance,
      monthlySaving,
      years: yearsNum,
      targetAmount,
    });

    const months = Math.round(yearsNum * 12);
    const totalContributed = initialBalance + monthlySaving * months;

    if (neededRate === null) {
      return {
        mode: "rate" as const,
        rateNeeded: null,
        years: yearsNum,
        monthlySaving,
        targetAmount,
        initialBalance,
        totalContributed,
        returnEarned: 0,
      };
    }

    return {
      mode: "rate" as const,
      rateNeeded: neededRate,
      years: yearsNum,
      monthlySaving,
      targetAmount,
      initialBalance,
      totalContributed,
      returnEarned: Math.max(0, targetAmount - totalContributed),
    };
  }, [mode, target, initial, monthly, rate, years]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Hva vil du finne?</h2>
        <p className="mt-1 text-sm text-stone-600">
          Velg modus, fyll inn det du vet, og se det som mangler.
        </p>

        <div
          className="mt-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Beregningsmodus"
        >
          {modes.map((item) => {
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(item.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-5">
          <CalculatorField
            label="Målsum"
            hint="Standard er 1 million, men du kan sette et hvilket som helst mål"
          >
            <FormattedNumberInput
              value={target}
              onChange={setTarget}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField label="Startbeløp" hint="Det du allerede har spart">
            <FormattedNumberInput
              value={initial}
              onChange={setInitial}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          {mode === "time" && (
            <>
              <CalculatorField label="Månedlig sparing">
                <FormattedNumberInput
                  value={monthly}
                  onChange={setMonthly}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <CalculatorField
                label="Forventet årlig avkastning"
                hint="I prosent, f.eks. 7 for fond"
              >
                <input
                  type="text"
                  inputMode="decimal"
                  value={rate}
                  onChange={(e) => setRate(e.target.value.replace(".", ","))}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </>
          )}

          {mode === "monthly" && (
            <>
              <CalculatorField label="Sparetid" hint="Antall år">
                <input
                  type="text"
                  inputMode="decimal"
                  value={years}
                  onChange={(e) => setYears(e.target.value.replace(".", ","))}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <CalculatorField
                label="Forventet årlig avkastning"
                hint="I prosent, f.eks. 7 for fond"
              >
                <input
                  type="text"
                  inputMode="decimal"
                  value={rate}
                  onChange={(e) => setRate(e.target.value.replace(".", ","))}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </>
          )}

          {mode === "rate" && (
            <>
              <CalculatorField label="Sparetid" hint="Antall år">
                <input
                  type="text"
                  inputMode="decimal"
                  value={years}
                  onChange={(e) => setYears(e.target.value.replace(".", ","))}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <CalculatorField label="Månedlig sparing">
                <FormattedNumberInput
                  value={monthly}
                  onChange={setMonthly}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </>
          )}
        </div>
      </section>

      <section className="space-y-4">
        {result?.mode === "time" && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
            <h2 className="text-lg font-semibold text-stone-900">
              Tid til {formatCurrency(result.targetAmount)}
            </h2>
            {result.time.reachable ? (
              <>
                <p className="mt-3 text-3xl font-bold text-stone-900">
                  {formatDuration(result.time.years, result.time.remainingMonths)}
                </p>
                <dl className="mt-5 space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Totalt innskutt</dt>
                    <dd className="font-semibold text-stone-900">
                      {formatCurrency(result.time.totalContributed)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Opptjent avkastning</dt>
                    <dd className="font-semibold text-stone-900">
                      {formatCurrency(result.time.returnEarned)}
                    </dd>
                  </div>
                </dl>
              </>
            ) : (
              <p className="mt-3 text-sm text-stone-700">
                Med disse tallene når du ikke målet innen 100 år. Øk den
                månedlige sparingen eller avkastningen.
              </p>
            )}
          </div>
        )}

        {result?.mode === "monthly" && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
            <h2 className="text-lg font-semibold text-stone-900">
              Månedlig sparing for {formatCurrency(result.targetAmount)}
            </h2>
            <p className="mt-3 text-3xl font-bold text-stone-900">
              {formatCurrency(Math.ceil(result.monthlyNeeded))}
              <span className="text-lg font-semibold text-stone-600"> / mnd</span>
            </p>
            <p className="mt-2 text-sm text-stone-700">
              Over {formatPercent(result.years)} år med{" "}
              {formatPercent(result.annualReturnPercent)} % avkastning.
            </p>
            <dl className="mt-5 space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-stone-600">Totalt innskutt</dt>
                <dd className="font-semibold text-stone-900">
                  {formatCurrency(result.totalContributed)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-stone-600">Opptjent avkastning</dt>
                <dd className="font-semibold text-stone-900">
                  {formatCurrency(result.returnEarned)}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {result?.mode === "rate" && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
            <h2 className="text-lg font-semibold text-stone-900">
              Avkastning for {formatCurrency(result.targetAmount)}
            </h2>
            {result.rateNeeded === null ? (
              <p className="mt-3 text-sm text-stone-700">
                Med denne sparingen når du ikke målet innen tidsrammen, selv med
                svært høy avkastning. Øk beløpet eller tiden.
              </p>
            ) : (
              <>
                <p className="mt-3 text-3xl font-bold text-stone-900">
                  {formatPercent(result.rateNeeded)} %
                  <span className="text-lg font-semibold text-stone-600">
                    {" "}
                    per år
                  </span>
                </p>
                <p className="mt-2 text-sm text-stone-700">
                  Med {formatCurrency(result.monthlySaving)} / mnd i{" "}
                  {formatPercent(result.years)} år.
                </p>
                <dl className="mt-5 space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Totalt innskutt</dt>
                    <dd className="font-semibold text-stone-900">
                      {formatCurrency(result.totalContributed)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Opptjent avkastning</dt>
                    <dd className="font-semibold text-stone-900">
                      {formatCurrency(result.returnEarned)}
                    </dd>
                  </div>
                </dl>
              </>
            )}
          </div>
        )}

        {!result && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
            Fyll inn gyldige verdier for å se resultatet.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Beregningen er veiledende og forutsetter jevn månedlig sparing med
          fast avkastning. Faktisk avkastning vil variere over tid.
        </p>
      </section>
    </div>
  );
}
