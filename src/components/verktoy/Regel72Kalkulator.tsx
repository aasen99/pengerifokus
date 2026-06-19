"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateRegel72,
  COMMON_RATES,
  projectDoublings,
  rateToDoubleRule72,
} from "@/lib/calculators/regel-72";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

function formatYears(years: number): string {
  return years.toLocaleString("nb-NO", { maximumFractionDigits: 1 });
}

function formatPercent(value: number): string {
  return value.toLocaleString("nb-NO", { maximumFractionDigits: 1 });
}

export function Regel72Kalkulator() {
  const [rate, setRate] = useState("7");
  const [targetYears, setTargetYears] = useState("10");
  const [startAmount, setStartAmount] = useState(formatIntegerInput(100_000));

  const result = useMemo(() => {
    const ratePercent = Number(rate.replace(",", "."));
    if (!Number.isFinite(ratePercent) || ratePercent <= 0) return null;
    return calculateRegel72(ratePercent);
  }, [rate]);

  const requiredRate = useMemo(() => {
    const years = Number(targetYears.replace(",", "."));
    if (!Number.isFinite(years) || years <= 0) return null;
    return rateToDoubleRule72(years);
  }, [targetYears]);

  const projectedAmount = useMemo(() => {
    if (!result) return null;
    const amount = parseIntegerInput(startAmount);
    if (!Number.isFinite(amount) || amount <= 0) return null;
    return projectDoublings(amount, result.ratePercent, result.yearsExact);
  }, [result, startAmount]);

  const referenceRows = useMemo(
    () =>
      COMMON_RATES.map((ratePercent) => calculateRegel72(ratePercent)).filter(
        (row): row is NonNullable<typeof row> => row !== null,
      ),
    [],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Hvor lang tid til å doble?
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Regel 72: del 72 på avkastningen i prosent for et raskt estimat.
          </p>

          <div className="mt-6">
            <CalculatorField
              label="Forventet årlig avkastning"
              hint="I prosent, f.eks. 7 for fondssparing"
            >
              <input
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) => setRate(e.target.value.replace(".", ","))}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Hvilken avkastning trengs?
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Snudd på hodet: hvor høy avkastning for å doble på X år?
          </p>

          <div className="mt-6">
            <CalculatorField label="Mål: doble på antall år">
              <input
                type="text"
                inputMode="decimal"
                value={targetYears}
                onChange={(e) =>
                  setTargetYears(e.target.value.replace(".", ","))
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Hva blir pengene?
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Se hva et startbeløp blir når det har doblet seg.
          </p>

          <div className="mt-6">
            <CalculatorField label="Startbeløp">
              <FormattedNumberInput
                value={startAmount}
                onChange={setStartAmount}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <h2 className="text-lg font-semibold text-stone-900">Regel 72</h2>
              <p className="mt-3 text-3xl font-bold text-stone-900">
                {formatYears(result.yearsRule72)} år
              </p>
              <p className="mt-2 text-sm text-stone-700">
                Ved {formatPercent(result.ratePercent)} % avkastning dobler
                pengene seg omtrent på {formatYears(result.yearsRule72)} år.
              </p>
              <p className="mt-4 text-xs text-stone-600">
                72 ÷ {formatPercent(result.ratePercent)} ={" "}
                {formatYears(result.yearsRule72)}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">
                Eksakt beregning
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Faktisk tid til å doble</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatYears(result.yearsExact)} år
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Avvik fra regel 72</dt>
                  <dd className="font-semibold text-stone-900">
                    {Math.abs(result.differenceYears) < 0.05
                      ? "Ingen"
                      : `${formatYears(Math.abs(result.differenceYears))} år`}
                  </dd>
                </div>
                {projectedAmount !== null && (
                  <div className="flex items-baseline justify-between gap-4 border-t border-stone-100 pt-4">
                    <dt className="text-sm text-stone-600">
                      {formatCurrency(parseIntegerInput(startAmount))} blir
                    </dt>
                    <dd className="text-lg font-semibold text-stone-900">
                      {formatCurrency(projectedAmount)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
            Fyll inn en avkastning over 0 % for å se resultatet.
          </div>
        )}

        {requiredRate !== null && (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-900">
              For å doble på {formatYears(Number(targetYears.replace(",", ".")))}{" "}
              år
            </h2>
            <p className="mt-3 text-2xl font-bold text-orange-700">
              ca. {formatPercent(requiredRate)} % avkastning
            </p>
            <p className="mt-2 text-sm text-stone-600">
              72 ÷ {formatYears(Number(targetYears.replace(",", ".")))} ={" "}
              {formatPercent(requiredRate)} %
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Vanlige avkastninger
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[16rem] text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500">
                  <th className="pb-2 pr-4 font-medium">Avkastning</th>
                  <th className="pb-2 font-medium">År til å doble</th>
                </tr>
              </thead>
              <tbody>
                {referenceRows.map((row) => (
                  <tr key={row.ratePercent} className="border-b border-stone-100">
                    <td className="py-2.5 pr-4 text-stone-900">
                      {row.ratePercent} %
                    </td>
                    <td className="py-2.5 font-medium text-stone-900">
                      {formatYears(row.yearsRule72)} år
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-stone-500">
          Regel 72 er en tomelfingerregel og passer best mellom ca. 4–15 %
          avkastning. Faktisk avkastning varierer: særlig i fond og aksjer.
        </p>
      </section>
    </div>
  );
}
