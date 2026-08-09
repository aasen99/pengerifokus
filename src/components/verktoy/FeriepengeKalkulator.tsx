"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateFeriepenger,
  estimateBaseFromMonthlySalary,
  type FerieWeeks,
} from "@/lib/calculators/feriepenger";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

type InputMode = "base" | "monthly";

export function FeriepengeKalkulator() {
  const [inputMode, setInputMode] = useState<InputMode>("base");
  const [base, setBase] = useState(formatIntegerInput(500_000));
  const [monthly, setMonthly] = useState(formatIntegerInput(42_000));
  const [weeks, setWeeks] = useState<FerieWeeks>(5);
  const [over60, setOver60] = useState(false);

  const result = useMemo(() => {
    const resolvedBase =
      inputMode === "base"
        ? parseIntegerInput(base)
        : estimateBaseFromMonthlySalary(parseIntegerInput(monthly));

    if (!Number.isFinite(resolvedBase) || resolvedBase < 0) return null;

    return calculateFeriepenger({
      base: resolvedBase,
      weeks,
      over60,
    });
  }, [inputMode, base, monthly, weeks, over60]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-xl border border-stone-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-stone-900">
          Feriepengegrunnlag
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Bruk tallene fra fjorårets lønnsslipp eller sammenstilling. Vet du ikke
          grunnlaget, kan du estimere fra månedslønn.
        </p>

        <div
          className="mt-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Inndatamodus"
        >
          {(
            [
              { id: "base" as const, label: "Grunnlag" },
              { id: "monthly" as const, label: "Månedslønn" },
            ] as const
          ).map((item) => {
            const active = inputMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setInputMode(item.id)}
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
          {inputMode === "base" ? (
            <CalculatorField
              label="Feriepengegrunnlag"
              hint="Står på lønnsslippen / årlig sammenstilling"
            >
              <FormattedNumberInput
                value={base}
                onChange={setBase}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          ) : (
            <CalculatorField
              label="Månedslønn (brutto)"
              hint="Estimat: månedslønn × 12. Bonus og andre tillegg kan mangle."
            >
              <FormattedNumberInput
                value={monthly}
                onChange={setMonthly}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          )}

          <div>
            <p className="text-sm font-medium text-stone-900">Ferielengde</p>
            <p className="mt-0.5 text-xs text-stone-500">
              De fleste med tariffavtale har 5 uker
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setWeeks(4)}
                className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  weeks === 4
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                4 uker + 1 dag
                <span className="mt-0.5 block text-xs font-normal opacity-80">
                  10,2 %
                </span>
              </button>
              <button
                type="button"
                onClick={() => setWeeks(5)}
                className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  weeks === 5
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                5 uker
                <span className="mt-0.5 block text-xs font-normal opacity-80">
                  12 %
                </span>
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3">
            <input
              type="checkbox"
              checked={over60}
              onChange={(e) => setOver60(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
            />
            <span>
              <span className="block text-sm font-medium text-stone-900">
                Fyller 60 år i ferieåret
              </span>
              <span className="mt-0.5 block text-xs text-stone-500">
                Gir ekstra ferieuke: satsen blir 12,5 % eller 14,3 %
              </span>
            </span>
          </label>
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
              <h2 className="text-lg font-semibold text-stone-900">
                Feriepenger
              </h2>
              <p className="mt-3 text-3xl font-bold text-stone-900">
                {formatCurrency(result.feriepenger)}
              </p>
              <p className="mt-2 text-sm text-stone-700">
                {result.ratePercent.toLocaleString("nb-NO", {
                  maximumFractionDigits: 1,
                })}{" "}
                % av {formatCurrency(result.base)}
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-stone-900">Detaljer</h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Grunnlag</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.base)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Sats</dt>
                  <dd className="font-semibold text-stone-900">
                    {result.ratePercent.toLocaleString("nb-NO", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    %
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Ferielengde</dt>
                  <dd className="font-semibold text-stone-900">
                    {result.weeks === 4 ? "4 uker + 1 dag" : "5 uker"}
                    {result.over60 ? " + ekstra uke (60+)" : ""}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-600 shadow-sm">
              <p>
                Feriepenger erstatter vanlig lønn mens du er i ferie, de er ikke
                «ekstra» på toppen. Utbetales vanligvis i juni/juli basert på
                fjorårets opptjening.
              </p>
              <p className="mt-3">
                Når feriepengene utbetales året etter opptjeningen, trekkes
                normalt ikke skatt der og da. Skatten er fordelt på resten av
                årets lønn via skattekortet. Feriepenger er likevel skattepliktig
                inntekt.
              </p>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600 shadow-sm">
            Fyll inn gyldige verdier for å se resultatet.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Veiledende beregning etter vanlige satser i ferieloven / tariff.
          Sjekk alltid lønnsslippen og arbeidsavtalen din for eksakt grunnlag
          og sats. Kilder: Arbeidstilsynet og Altinn.
        </p>
      </section>
    </div>
  );
}
