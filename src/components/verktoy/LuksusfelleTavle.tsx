"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateTavle,
  createTavleLine,
  EMPTY_TAVLE_LINES,
  TAVLE_CATEGORIES,
  type TavleCategory,
  type TavleLine,
} from "@/lib/calculators/luksusfelle-tavle";
import { formatIntegerInput } from "@/lib/format/number";
import { FormattedNumberInput } from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

function CategoryEditor({
  category,
  lines,
  onChange,
}: {
  category: (typeof TAVLE_CATEGORIES)[number];
  lines: TavleLine[];
  onChange: (lines: TavleLine[]) => void;
}) {
  const updateLine = (id: string, patch: Partial<TavleLine>) => {
    onChange(lines.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  };

  const removeLine = (id: string) => {
    onChange(lines.filter((line) => line.id !== id));
  };

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-stone-900">{category.label}</h3>
          <p className="mt-0.5 text-xs text-stone-500">{category.hint}</p>
        </div>
        <button
          type="button"
          onClick={() => onChange([...lines, createTavleLine()])}
          className="shrink-0 rounded-lg bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-200"
        >
          + Legg til
        </button>
      </div>

      {lines.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {lines.map((line) => (
            <li key={line.id} className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                value={line.label}
                onChange={(e) => updateLine(line.id, { label: e.target.value })}
                placeholder="Beskrivelse, f.eks. husleie"
                className={`${calculatorInputClassName} sm:flex-1`}
              />
              <div className="flex items-center gap-2 sm:w-40">
                <FormattedNumberInput
                  value={line.amount}
                  onChange={(value) => updateLine(line.id, { amount: value })}
                  placeholder="0"
                  aria-label={`Beløp for ${line.label || category.label}`}
                  className={calculatorInputClassName}
                />
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="rounded-lg px-2 py-2 text-sm text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                  aria-label="Fjern post"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-stone-500">
          Ingen poster ennå. Legg til de største utgiftene i denne kategorien.
        </p>
      )}
    </section>
  );
}

function BoardBar({
  label,
  amount,
  share,
  tone,
}: {
  label: string;
  amount: number;
  share: number;
  tone: TavleCategory;
}) {
  const toneClasses: Record<TavleCategory, string> = {
    fixed: "bg-red-400",
    variable: "bg-amber-400",
    debt: "bg-rose-400",
    savings: "bg-emerald-400",
  };

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-stone-100">{label}</span>
        <span className="text-stone-300">
          {formatCurrency(amount)}
          {share > 0 && (
            <span className="ml-1 text-stone-400">({Math.round(share)} %)</span>
          )}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-700">
        <div
          className={`h-full rounded-full transition-all ${toneClasses[tone]}`}
          style={{ width: `${Math.min(share, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function LuksusfelleTavle() {
  const [income, setIncome] = useState(formatIntegerInput(35_000));
  const [linesByCategory, setLinesByCategory] =
    useState<Record<TavleCategory, TavleLine[]>>(EMPTY_TAVLE_LINES);

  const summary = useMemo(
    () => calculateTavle(income, linesByCategory),
    [income, linesByCategory],
  );

  const updateCategory = (category: TavleCategory, lines: TavleLine[]) => {
    setLinesByCategory((prev) => ({ ...prev, [category]: lines }));
  };

  const loadExample = () => {
    setIncome(formatIntegerInput(42_000));
    setLinesByCategory({
      fixed: [
        createTavleLine("Husleie"),
        createTavleLine("Forsikring"),
        createTavleLine("Mobil"),
      ].map((line, index) => ({
        ...line,
        amount: formatIntegerInput([12_500, 1_200, 499][index]),
      })),
      variable: [
        createTavleLine("Mat"),
        createTavleLine("Transport"),
        createTavleLine("Streaming"),
      ].map((line, index) => ({
        ...line,
        amount: formatIntegerInput([5_500, 1_800, 399][index]),
      })),
      debt: [createTavleLine("Forbrukslån")].map((line) => ({
        ...line,
        amount: formatIntegerInput(3_200),
      })),
      savings: [createTavleLine("Buffer")].map((line) => ({
        ...line,
        amount: formatIntegerInput(2_000),
      })),
    });
  };

  const hasAnyLines = TAVLE_CATEGORIES.some(
    (category) => linesByCategory[category.id].length > 0,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-sm text-stone-600">
          Inspirert av pengetavlen fra Luksusfellen: fyll inn inntekt og utgifter,
          og se med en gang om måneden går i balanse, overskudd eller minus.
        </p>
        <button
          type="button"
          onClick={loadExample}
          className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50"
        >
          Last inn eksempel
        </button>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <CalculatorField
              label="Nettoinntekt per måned"
              hint="Lønn etter skatt, pluss eventuelle faste ytelser"
            >
              <FormattedNumberInput
                value={income}
                onChange={setIncome}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </section>

          <div className="space-y-4">
            {TAVLE_CATEGORIES.map((category) => (
              <CategoryEditor
                key={category.id}
                category={category}
                lines={linesByCategory[category.id]}
                onChange={(lines) => updateCategory(category.id, lines)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 xl:sticky xl:top-8 xl:self-start">
          <section className="overflow-hidden rounded-2xl border border-stone-700 bg-stone-800 p-6 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Pengetavle
            </p>

            <div className="mt-4 rounded-xl border border-stone-600 bg-stone-900/60 p-5">
              <p className="text-xs uppercase tracking-wider text-stone-400">
                Inntekt per måned
              </p>
              <p className="mt-1 text-3xl font-bold text-white">
                {summary ? formatCurrency(summary.income) : "–"}
              </p>
            </div>

            {summary && hasAnyLines ? (
              <div className="mt-5 space-y-4">
                {TAVLE_CATEGORIES.map((category) =>
                  summary.categoryTotals[category.id] > 0 ? (
                    <BoardBar
                      key={category.id}
                      label={category.boardLabel}
                      amount={summary.categoryTotals[category.id]}
                      share={summary.shareOfIncome[category.id]}
                      tone={category.id}
                    />
                  ) : null,
                )}
              </div>
            ) : (
              <p className="mt-5 text-sm text-stone-400">
                Legg til utgifter for å fylle tavlen.
              </p>
            )}

            {summary && (
              <>
                <div className="mt-6 border-t border-stone-600 pt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-stone-300">Totalt ut</span>
                    <span className="font-semibold text-white">
                      {formatCurrency(summary.totalOut)}
                    </span>
                  </div>
                </div>

                <div
                  className={`mt-4 rounded-xl border p-5 ${
                    summary.isDeficit
                      ? "border-red-500/40 bg-red-950/40"
                      : summary.remainder > 0
                        ? "border-emerald-500/40 bg-emerald-950/40"
                        : "border-stone-600 bg-stone-900/60"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wider text-stone-400">
                    {summary.isDeficit
                      ? "Underskudd"
                      : summary.remainder > 0
                        ? "Overskudd"
                        : "Balanse"}
                  </p>
                  <p
                    className={`mt-1 text-2xl font-bold ${
                      summary.isDeficit
                        ? "text-red-300"
                        : summary.remainder > 0
                          ? "text-emerald-300"
                          : "text-white"
                    }`}
                  >
                    {formatCurrency(summary.remainder)}
                  </p>
                  <p className="mt-2 text-sm text-stone-400">
                    {summary.isDeficit
                      ? "Du bruker mer enn du får inn. Se på variable utgifter og gjeld først."
                      : summary.remainder > 0
                        ? "Penger igjen – vurder om de skal til buffer, nedbetaling eller forbruk."
                        : "Inntekt og utgifter går opp – bra utgangspunkt for å finjustere."}
                  </p>
                </div>
              </>
            )}
          </section>

          {summary && summary.income > 0 && (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm text-stone-700">
              <p className="font-semibold text-orange-900">Tommelfingerregel 50/30/20</p>
              <ul className="mt-3 space-y-2">
                <li>
                  Behov (faste):{" "}
                  <span className="font-medium">
                    {Math.round(summary.shareOfIncome.fixed)} %
                  </span>{" "}
                  – mål rundt 50 %
                </li>
                <li>
                  Ønsker (variable):{" "}
                  <span className="font-medium">
                    {Math.round(summary.shareOfIncome.variable)} %
                  </span>{" "}
                  – mål rundt 30 %
                </li>
                <li>
                  Sparing + gjeld:{" "}
                  <span className="font-medium">
                    {Math.round(
                      summary.shareOfIncome.savings + summary.shareOfIncome.debt,
                    )}{" "}
                    %
                  </span>{" "}
                  – mål rundt 20 %
                </li>
              </ul>
              <p className="mt-3 text-xs text-stone-600">
                I Norge tar bolig ofte mer enn 50 % – juster etter din situasjon.
              </p>
            </div>
          )}

          <p className="text-xs leading-relaxed text-stone-500">
            Verktøyet er veiledende og erstatter ikke profesjonell rådgivning.
            Tallene lagres ikke – skriv gjerne ned eller ta skjermbilde av tavlen.
          </p>
        </div>
      </div>
    </div>
  );
}
