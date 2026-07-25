"use client";

import { useMemo, useState } from "react";
import {
  adjustByPercent,
  findWhole,
  isPercentOf,
  percentChange,
  percentOf,
  type ProsentMode,
} from "@/lib/calculators/prosent";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

const modes: { id: ProsentMode; label: string }[] = [
  { id: "of", label: "X % av Y" },
  { id: "isPercentOf", label: "X er % av Y" },
  { id: "findWhole", label: "Finn hele" },
  { id: "change", label: "Endring" },
  { id: "adjust", label: "Øk / reduser" },
];

function parseDecimal(value: string): number {
  return Number(value.replace(/\s/g, "").replace(",", "."));
}

function formatNumber(value: number): string {
  return value.toLocaleString("nb-NO", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

function formatPercent(value: number): string {
  return `${formatNumber(value)} %`;
}

interface Example {
  label: string;
  apply: () => void;
}

export function ProsentKalkulator({
  initialMode = "of",
  initialAdjustDirection = "decrease",
}: {
  initialMode?: ProsentMode;
  initialAdjustDirection?: "increase" | "decrease";
} = {}) {
  const [mode, setMode] = useState<ProsentMode>(initialMode);

  // of
  const [ofPercent, setOfPercent] = useState("15");
  const [ofValue, setOfValue] = useState(formatIntegerInput(899));

  // isPercentOf
  const [part, setPart] = useState(formatIntegerInput(15_000));
  const [whole, setWhole] = useState(formatIntegerInput(500_000));

  // findWhole
  const [findPart, setFindPart] = useState(formatIntegerInput(250_000));
  const [findPercent, setFindPercent] = useState("10");

  // change
  const [fromValue, setFromValue] = useState(formatIntegerInput(450_000));
  const [toValue, setToValue] = useState(formatIntegerInput(495_000));

  // adjust
  const [adjustValue, setAdjustValue] = useState(formatIntegerInput(899));
  const [adjustPercent, setAdjustPercent] = useState("15");
  const [adjustDirection, setAdjustDirection] = useState<"increase" | "decrease">(
    initialAdjustDirection,
  );

  const examples: Example[] = useMemo(() => {
    switch (mode) {
      case "of":
        return [
          {
            label: "15 % rabatt på 899 kr",
            apply: () => {
              setOfPercent("15");
              setOfValue(formatIntegerInput(899));
            },
          },
          {
            label: "25 % av 12 000 kr",
            apply: () => {
              setOfPercent("25");
              setOfValue(formatIntegerInput(12_000));
            },
          },
          {
            label: "2,5 % av 2 mill.",
            apply: () => {
              setOfPercent("2,5");
              setOfValue(formatIntegerInput(2_000_000));
            },
          },
        ];
      case "isPercentOf":
        return [
          {
            label: "15 000 av 500 000 i lønn",
            apply: () => {
              setPart(formatIntegerInput(15_000));
              setWhole(formatIntegerInput(500_000));
            },
          },
          {
            label: "80 av 100 poeng",
            apply: () => {
              setPart(formatIntegerInput(80));
              setWhole(formatIntegerInput(100));
            },
          },
        ];
      case "findWhole":
        return [
          {
            label: "250 000 er 10 %",
            apply: () => {
              setFindPart(formatIntegerInput(250_000));
              setFindPercent("10");
            },
          },
          {
            label: "1 200 er 8 %",
            apply: () => {
              setFindPart(formatIntegerInput(1_200));
              setFindPercent("8");
            },
          },
        ];
      case "change":
        return [
          {
            label: "Lønn 450k → 495k",
            apply: () => {
              setFromValue(formatIntegerInput(450_000));
              setToValue(formatIntegerInput(495_000));
            },
          },
          {
            label: "Pris 1 200 → 999",
            apply: () => {
              setFromValue(formatIntegerInput(1_200));
              setToValue(formatIntegerInput(999));
            },
          },
        ];
      case "adjust":
        return [
          {
            label: "15 % rabatt på 899 kr",
            apply: () => {
              setAdjustValue(formatIntegerInput(899));
              setAdjustPercent("15");
              setAdjustDirection("decrease");
            },
          },
          {
            label: "3 % lønnsøkning på 520k",
            apply: () => {
              setAdjustValue(formatIntegerInput(520_000));
              setAdjustPercent("3");
              setAdjustDirection("increase");
            },
          },
        ];
      default:
        return [];
    }
  }, [mode]);

  const result = useMemo(() => {
    switch (mode) {
      case "of": {
        const percent = parseDecimal(ofPercent);
        const value = parseIntegerInput(ofValue);
        if (!Number.isFinite(value)) return null;
        return percentOf(percent, value);
      }
      case "isPercentOf": {
        const p = parseIntegerInput(part);
        const w = parseIntegerInput(whole);
        if (!Number.isFinite(p) || !Number.isFinite(w)) return null;
        return isPercentOf(p, w);
      }
      case "findWhole": {
        const p = parseIntegerInput(findPart);
        const percent = parseDecimal(findPercent);
        if (!Number.isFinite(p)) return null;
        return findWhole(p, percent);
      }
      case "change": {
        const from = parseIntegerInput(fromValue);
        const to = parseIntegerInput(toValue);
        if (!Number.isFinite(from) || !Number.isFinite(to)) return null;
        return percentChange(from, to);
      }
      case "adjust": {
        const value = parseIntegerInput(adjustValue);
        const percent = parseDecimal(adjustPercent);
        if (!Number.isFinite(value)) return null;
        return adjustByPercent(value, percent, adjustDirection);
      }
      default:
        return null;
    }
  }, [
    mode,
    ofPercent,
    ofValue,
    part,
    whole,
    findPart,
    findPercent,
    fromValue,
    toValue,
    adjustValue,
    adjustPercent,
    adjustDirection,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Prosentregning</h2>
        <p className="mt-1 text-sm text-stone-600">
          Velg hva du vil regne ut. Svaret oppdateres med en gang.
        </p>

        <div
          className="mt-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Prosentmodus"
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
          {mode === "of" && (
            <>
              <CalculatorField label="Prosent">
                <input
                  type="text"
                  inputMode="decimal"
                  value={ofPercent}
                  onChange={(e) =>
                    setOfPercent(e.target.value.replace(".", ","))
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <CalculatorField label="Av tallet">
                <FormattedNumberInput
                  value={ofValue}
                  onChange={setOfValue}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </>
          )}

          {mode === "isPercentOf" && (
            <>
              <CalculatorField label="Delen" hint="F.eks. økningen i kroner">
                <FormattedNumberInput
                  value={part}
                  onChange={setPart}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <CalculatorField label="Det hele" hint="F.eks. lønn før økning">
                <FormattedNumberInput
                  value={whole}
                  onChange={setWhole}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </>
          )}

          {mode === "findWhole" && (
            <>
              <CalculatorField label="Delen">
                <FormattedNumberInput
                  value={findPart}
                  onChange={setFindPart}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <CalculatorField label="Prosent">
                <input
                  type="text"
                  inputMode="decimal"
                  value={findPercent}
                  onChange={(e) =>
                    setFindPercent(e.target.value.replace(".", ","))
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </>
          )}

          {mode === "change" && (
            <>
              <CalculatorField label="Fra" hint="Opprinnelig verdi">
                <FormattedNumberInput
                  value={fromValue}
                  onChange={setFromValue}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <CalculatorField label="Til" hint="Ny verdi">
                <FormattedNumberInput
                  value={toValue}
                  onChange={setToValue}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </>
          )}

          {mode === "adjust" && (
            <>
              <CalculatorField label="Verdi">
                <FormattedNumberInput
                  value={adjustValue}
                  onChange={setAdjustValue}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <CalculatorField label="Prosent">
                <input
                  type="text"
                  inputMode="decimal"
                  value={adjustPercent}
                  onChange={(e) =>
                    setAdjustPercent(e.target.value.replace(".", ","))
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustDirection("increase")}
                  className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    adjustDirection === "increase"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Øk
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustDirection("decrease")}
                  className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    adjustDirection === "decrease"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Reduser
                </button>
              </div>
            </>
          )}
        </div>

        {examples.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Eksempler
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={example.apply}
                  className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        {result ? (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
            <h2 className="text-lg font-semibold text-stone-900">Svar</h2>

            {result.mode === "of" && (
              <p className="mt-3 text-3xl font-bold text-stone-900">
                {formatNumber(result.value)}
              </p>
            )}

            {result.mode === "isPercentOf" && (
              <p className="mt-3 text-3xl font-bold text-stone-900">
                {formatPercent(result.percent)}
              </p>
            )}

            {result.mode === "findWhole" && (
              <p className="mt-3 text-3xl font-bold text-stone-900">
                {formatNumber(result.whole)}
              </p>
            )}

            {result.mode === "change" && (
              <>
                <p className="mt-3 text-3xl font-bold text-stone-900">
                  {formatPercent(Math.abs(result.percent))}
                </p>
                <p className="mt-2 text-sm font-medium text-stone-700">
                  {result.direction === "increase" && "Økning"}
                  {result.direction === "decrease" && "Nedgang"}
                  {result.direction === "unchanged" && "Ingen endring"}
                  {result.difference !== 0 && (
                    <> · {formatNumber(Math.abs(result.difference))} i differanse</>
                  )}
                </p>
              </>
            )}

            {result.mode === "adjust" && (
              <>
                <p className="mt-3 text-3xl font-bold text-stone-900">
                  {formatNumber(result.newValue)}
                </p>
                <p className="mt-2 text-sm font-medium text-stone-700">
                  {result.difference >= 0 ? "+" : "−"}
                  {formatNumber(Math.abs(result.difference))} i endring
                </p>
              </>
            )}

            <p className="mt-5 text-sm text-stone-600">{result.formula}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
            Fyll inn gyldige verdier for å se resultatet.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Rask prosentregning for rabatt, lønn, pris og andre tall i
          hverdagsøkonomien.
        </p>
      </section>
    </div>
  );
}
