"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  compareSavingsScenarios,
  projectSavings,
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
import { SavingsGrowthChart } from "@/components/verktoy/SavingsGrowthChart";

export function Sparekalkulator() {
  const [initial, setInitial] = useState(formatIntegerInput(0));
  const [monthly, setMonthly] = useState(formatIntegerInput(1000));
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("20");
  const [extra, setExtra] = useState(formatIntegerInput(200));

  const parsed = useMemo(() => {
    const values = {
      initialBalance: parseIntegerInput(initial) || 0,
      monthlySaving: parseIntegerInput(monthly),
      annualReturnPercent: Number(rate.replace(",", ".")),
      years: Number(years.replace(/\s/g, "")),
      extraMonthlySaving: parseIntegerInput(extra) || 0,
    };

    if (
      !Number.isFinite(values.monthlySaving) ||
      !Number.isFinite(values.annualReturnPercent) ||
      !Number.isFinite(values.years) ||
      values.monthlySaving < 0 ||
      values.years <= 0 ||
      values.annualReturnPercent < 0 ||
      values.initialBalance < 0
    ) {
      return null;
    }

    return values;
  }, [initial, monthly, rate, years, extra]);

  const result = useMemo(() => {
    if (!parsed) return null;
    return compareSavingsScenarios(parsed);
  }, [parsed]);

  const projections = useMemo(() => {
    if (!parsed) return null;

    const standard = projectSavings({
      initialBalance: parsed.initialBalance,
      monthlySaving: parsed.monthlySaving,
      annualReturnPercent: parsed.annualReturnPercent,
      years: parsed.years,
    });

    const withExtra =
      parsed.extraMonthlySaving > 0
        ? projectSavings({
            initialBalance: parsed.initialBalance,
            monthlySaving: parsed.monthlySaving + parsed.extraMonthlySaving,
            annualReturnPercent: parsed.annualReturnPercent,
            years: parsed.years,
          })
        : null;

    return { standard, withExtra, years: parsed.years };
  }, [parsed]);

  const yearlyRows = projections?.standard.years.filter((row) => row.year > 0) ?? [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-xl border border-stone-200 bg-white p-4">
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
        {result && projections ? (
          <>
            <div className="rounded-xl border border-stone-200 bg-white p-4">
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
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
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
                    <dt className="text-sm text-stone-600">Ekstra avkastning</dt>
                    <dd className="font-semibold text-orange-700">
                      +{formatCurrency(result.extraReturnEarned)}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-stone-900">Vekst over tid</h2>
              <div className="mt-4">
                <SavingsGrowthChart
                  standard={projections.standard.years}
                  withExtra={projections.withExtra?.years ?? null}
                  years={projections.years}
                />
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-stone-900">År for år</h2>
              <div className="mt-4 max-h-72 overflow-auto">
                <table className="w-full min-w-[16rem] text-left text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-stone-200 text-stone-500">
                      <th className="pb-2 pr-3 font-medium">År</th>
                      <th className="pb-2 pr-3 font-medium">Saldo</th>
                      <th className="pb-2 font-medium">Innskutt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyRows.map((row) => (
                      <tr key={row.year} className="border-b border-stone-100">
                        <td className="py-2 pr-3 text-stone-900">{row.year}</td>
                        <td className="py-2 pr-3 font-medium text-stone-900">
                          {formatCurrency(row.balance)}
                        </td>
                        <td className="py-2 text-stone-600">
                          {formatCurrency(row.totalContributed)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600 shadow-sm">
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
