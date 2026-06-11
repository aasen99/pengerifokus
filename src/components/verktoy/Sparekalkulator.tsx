"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import { compareSavingsScenarios } from "@/lib/calculators/savings";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

export function Sparekalkulator() {
  const [initial, setInitial] = useState(formatIntegerInput(0));
  const [monthly, setMonthly] = useState(formatIntegerInput(1000));
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("20");
  const [extra, setExtra] = useState(formatIntegerInput(200));

  const result = useMemo(() => {
    const parsed = {
      initialBalance: parseIntegerInput(initial) || 0,
      monthlySaving: parseIntegerInput(monthly),
      annualReturnPercent: Number(rate.replace(",", ".")),
      years: Number(years.replace(/\s/g, "")),
      extraMonthlySaving: parseIntegerInput(extra) || 0,
    };

    if (
      !Number.isFinite(parsed.monthlySaving) ||
      !Number.isFinite(parsed.annualReturnPercent) ||
      !Number.isFinite(parsed.years) ||
      parsed.monthlySaving < 0 ||
      parsed.years <= 0 ||
      parsed.annualReturnPercent < 0 ||
      parsed.initialBalance < 0
    ) {
      return null;
    }

    return compareSavingsScenarios(parsed);
  }, [initial, monthly, rate, years, extra]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Sparedetaljer</h2>
        <p className="mt-1 text-sm text-stone-600">
          Sammenlign vanlig månedlig sparing med et ekstra beløp oppå.
        </p>

        <div className="mt-6 space-y-5">
          <CalculatorField label="Startbeløp" hint="Det du allerede har spart">
            <FormattedNumberInput
              value={initial}
              onChange={setInitial}
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

          <CalculatorField
            label="Forventet årlig avkastning"
            hint="I prosent – f.eks. 7 for fond"
          >
            <input
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value.replace(".", ","))}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField label="Sparetid" hint="Antall år">
            <FormattedNumberInput
              value={years}
              onChange={setYears}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Ekstra månedlig sparing"
            hint="Hva skjer om du legger til litt ekstra?"
          >
            <FormattedNumberInput
              value={extra}
              onChange={setExtra}
              className={calculatorInputClassName}
            />
          </CalculatorField>
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">
                Med {formatCurrency(result.standard.monthlySaving)} / mnd
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Sluttbeløp</dt>
                  <dd className="text-lg font-semibold text-stone-900">
                    {formatCurrency(result.standard.finalBalance)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Totalt innskutt</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.standard.totalContributed)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Opptjent avkastning</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.standard.returnEarned)}
                  </dd>
                </div>
              </dl>
            </div>

            {result.withExtra && (
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
                <h2 className="text-lg font-semibold text-stone-900">
                  Med {formatCurrency(result.withExtra.monthlySaving)} / mnd
                </h2>
                <dl className="mt-5 space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Sluttbeløp</dt>
                    <dd className="text-lg font-semibold text-stone-900">
                      {formatCurrency(result.withExtra.finalBalance)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Mer på konto</dt>
                    <dd className="text-lg font-semibold text-orange-700">
                      +{formatCurrency(result.balanceDifference)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">
                      Ekstra innskutt over tid
                    </dt>
                    <dd className="font-semibold text-stone-900">
                      {formatCurrency(result.extraContributed)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">
                      Ekstra avkastning
                    </dt>
                    <dd className="font-semibold text-orange-700">
                      +{formatCurrency(result.extraReturnEarned)}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </>
        ) : (
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
