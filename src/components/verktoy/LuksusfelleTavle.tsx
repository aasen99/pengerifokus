"use client";

import { useMemo } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  breakIntoBills,
  billsFromBreakdown,
  calculateTavle,
  createTavleLine,
  TAVLE_CATEGORIES,
  type TavleCategory,
  type TavleLine,
} from "@/lib/calculators/luksusfelle-tavle";
import { formatIntegerInput, parseIntegerInput } from "@/lib/format/number";
import {
  openPrintReport,
  reportRows,
  reportSection,
} from "@/lib/print-report";
import { useToolPersistence } from "@/lib/verktoy-persistence";
import { FormattedNumberInput } from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";
import { ToolPersistenceBar } from "@/components/verktoy/ToolPersistenceBar";

type BoardView = "bars" | "bills";

interface LuksusfelleState {
  income: string;
  boardView: BoardView;
  linesByCategory: Record<TavleCategory, TavleLine[]>;
  [key: string]: unknown;
}

const DEFAULT_STATE: LuksusfelleState = {
  income: formatIntegerInput(35_000),
  boardView: "bars",
  linesByCategory: {
    fixed: [],
    variable: [],
    debt: [],
    savings: [],
  },
};

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

function MoneyBill({
  value,
  variant = "default",
  rotation = 0,
}: {
  value: 500 | 1000;
  variant?: "default" | "income" | "remainder" | "deficit";
  rotation?: number;
}) {
  const isThousand = value === 1000;

  const palette = {
    default: isThousand
      ? "border-purple-300 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 text-purple-900 shadow-purple-200/50"
      : "border-sky-300 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 text-sky-900 shadow-sky-200/50",
    income: isThousand
      ? "border-emerald-400 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 text-emerald-900 shadow-emerald-200/50"
      : "border-teal-400 bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 text-teal-900 shadow-teal-200/50",
    remainder: isThousand
      ? "border-lime-400 bg-gradient-to-br from-lime-50 via-lime-100 to-lime-200 text-lime-900 shadow-lime-200/50"
      : "border-green-400 bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-green-900 shadow-green-200/50",
    deficit:
      "border-red-400 bg-gradient-to-br from-red-50 via-red-100 to-red-200 text-red-900 shadow-red-200/50",
  };

  return (
    <div
      className={`relative flex h-9 w-16 shrink-0 flex-col items-center justify-center rounded-sm border shadow-sm sm:h-11 sm:w-[4.75rem] ${palette[variant]}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      title={`${value} kr`}
      aria-hidden="true"
    >
      <span className="text-[8px] font-semibold uppercase tracking-wide opacity-70">
        kr
      </span>
      <span className="text-xs font-bold leading-none sm:text-sm">{value}</span>
    </div>
  );
}

function BillVisualizer({
  amount,
  variant = "default",
  maxVisible = 24,
}: {
  amount: number;
  variant?: "default" | "income" | "remainder" | "deficit";
  maxVisible?: number;
}) {
  const breakdown = breakIntoBills(amount);
  const bills = billsFromBreakdown(breakdown);
  const visible = bills.slice(0, maxVisible);
  const hidden = bills.length - visible.length;

  if (amount <= 0 && breakdown.remainder === 0) {
    return null;
  }

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-1.5">
        {visible.map((value, index) => (
          <MoneyBill
            key={`${value}-${index}`}
            value={value}
            variant={variant}
            rotation={(index % 7) - 3}
          />
        ))}
        {hidden > 0 && (
          <span className="self-center rounded-full bg-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600">
            +{hidden} lapper
          </span>
        )}
      </div>
      {breakdown.remainder > 0 && (
        <p className="text-xs text-stone-500">+ {breakdown.remainder} kr</p>
      )}
    </div>
  );
}

function BoardBillSection({
  label,
  amount,
  share,
  tone,
  billVariant = "default",
}: {
  label: string;
  amount: number;
  share: number;
  tone: TavleCategory | "income" | "remainder" | "deficit";
  billVariant?: "default" | "income" | "remainder" | "deficit";
}) {
  const labelColors: Record<string, string> = {
    income: "bg-emerald-600",
    fixed: "bg-red-500",
    variable: "bg-amber-500",
    debt: "bg-rose-500",
    savings: "bg-emerald-500",
    remainder: "bg-lime-600",
    deficit: "bg-red-600",
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-white/90 p-3 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white ${labelColors[tone]}`}
        >
          {label}
        </span>
        <span className="text-sm font-semibold text-stone-800">
          {formatCurrency(amount)}
          {share > 0 && tone !== "income" && tone !== "remainder" && tone !== "deficit" && (
            <span className="ml-1 font-normal text-stone-500">
              ({Math.round(share)} %)
            </span>
          )}
        </span>
      </div>
      <BillVisualizer amount={amount} variant={billVariant} />
    </div>
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

function BoardSummaryFooter({
  summary,
}: {
  summary: NonNullable<ReturnType<typeof calculateTavle>>;
}) {
  return (
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
              ? "Penger igjen: vurder om de skal til buffer, nedbetaling eller forbruk."
              : "Inntekt og utgifter går opp: bra utgangspunkt for å finjustere."}
        </p>
      </div>
    </>
  );
}

function BarsBoard({
  summary,
  hasAnyLines,
}: {
  summary: NonNullable<ReturnType<typeof calculateTavle>>;
  hasAnyLines: boolean;
}) {
  return (
    <>
      <div className="mt-4 rounded-xl border border-stone-600 bg-stone-900/60 p-5">
        <p className="text-xs uppercase tracking-wider text-stone-400">
          Inntekt per måned
        </p>
        <p className="mt-1 text-3xl font-bold text-white">
          {formatCurrency(summary.income)}
        </p>
      </div>

      {hasAnyLines ? (
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

      <BoardSummaryFooter summary={summary} />
    </>
  );
}

function BillsBoard({
  summary,
  hasAnyLines,
}: {
  summary: NonNullable<ReturnType<typeof calculateTavle>>;
  hasAnyLines: boolean;
}) {
  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-stone-400">
        <span className="flex items-center gap-1.5">
          <MoneyBill value={1000} rotation={-2} />
          <span>= 1 000 kr</span>
        </span>
        <span className="flex items-center gap-1.5">
          <MoneyBill value={500} rotation={2} />
          <span>= 500 kr</span>
        </span>
      </div>

      <div className="mt-4 space-y-3 rounded-xl border-2 border-dashed border-stone-400 bg-stone-100 p-4">
        <BoardBillSection
          label="Inntekt"
          amount={summary.income}
          share={100}
          tone="income"
          billVariant="income"
        />

        {hasAnyLines ? (
          <>
            {TAVLE_CATEGORIES.map((category) =>
              summary.categoryTotals[category.id] > 0 ? (
                <BoardBillSection
                  key={category.id}
                  label={category.boardLabel}
                  amount={summary.categoryTotals[category.id]}
                  share={summary.shareOfIncome[category.id]}
                  tone={category.id}
                />
              ) : null,
            )}

            {summary.remainder > 0 && (
              <BoardBillSection
                label="Igjen"
                amount={summary.remainder}
                share={0}
                tone="remainder"
                billVariant="remainder"
              />
            )}

            {summary.isDeficit && (
              <BoardBillSection
                label="Mangler"
                amount={Math.abs(summary.remainder)}
                share={0}
                tone="deficit"
                billVariant="deficit"
              />
            )}
          </>
        ) : (
          <p className="py-6 text-center text-sm text-stone-500">
            Legg til utgifter. Da dukker 1000- og 500-lappene opp her.
          </p>
        )}
      </div>

      <BoardSummaryFooter summary={summary} />
    </>
  );
}

function buildLuksusfellePdf(
  summary: NonNullable<ReturnType<typeof calculateTavle>>,
  linesByCategory: Record<TavleCategory, TavleLine[]>,
) {
  const lineSections = TAVLE_CATEGORIES.map((category) => {
    const lines = linesByCategory[category.id].filter(
      (line) => line.label.trim() || line.amount.trim(),
    );
    if (lines.length === 0) return "";

    const items = lines
      .map((line) => {
        const amount = parseIntegerInput(line.amount);
        return `<li>${line.label.trim() || "Uten navn"}: ${formatCurrency(
          Number.isFinite(amount) ? amount : 0,
        )}</li>`;
      })
      .join("");

    return reportSection(
      `${category.label} (${formatCurrency(summary.categoryTotals[category.id])})`,
      `<ul>${items}</ul>`,
    );
  }).join("");

  const statusLabel = summary.isDeficit
    ? "Underskudd"
    : summary.remainder > 0
      ? "Overskudd"
      : "Balanse";

  openPrintReport({
    title: "Luksusfellen-tavle",
    subtitle: "Månedlig oversikt over inntekt, utgifter og overskudd",
    bodyHtml: [
      reportSection(
        "Oppsummering",
        reportRows([
          { label: "Nettoinntekt", value: formatCurrency(summary.income) },
          { label: "Totalt ut", value: formatCurrency(summary.totalOut) },
          {
            label: statusLabel,
            value: formatCurrency(summary.remainder),
            tone: summary.isDeficit
              ? "negative"
              : summary.remainder > 0
                ? "positive"
                : undefined,
          },
        ]),
      ),
      lineSections,
      reportSection(
        "50/30/20-fordeling",
        reportRows([
          {
            label: "Faste (mål ~50 %)",
            value: `${Math.round(summary.shareOfIncome.fixed)} %`,
          },
          {
            label: "Variable (mål ~30 %)",
            value: `${Math.round(summary.shareOfIncome.variable)} %`,
          },
          {
            label: "Sparing + gjeld (mål ~20 %)",
            value: `${Math.round(
              summary.shareOfIncome.savings + summary.shareOfIncome.debt,
            )} %`,
          },
        ]),
      ),
    ].join(""),
  });
}

export function LuksusfelleTavle() {
  const { state, setState, update, source, clearSaved, copyShareLink } =
    useToolPersistence<LuksusfelleState>("luksusfelle-tavle", DEFAULT_STATE);

  const { income, boardView, linesByCategory } = state;

  const summary = useMemo(
    () => calculateTavle(income, linesByCategory),
    [income, linesByCategory],
  );

  const updateCategory = (category: TavleCategory, lines: TavleLine[]) => {
    setState((prev) => ({
      ...prev,
      linesByCategory: { ...prev.linesByCategory, [category]: lines },
    }));
  };

  const loadExample = () => {
    setState({
      income: formatIntegerInput(42_000),
      boardView,
      linesByCategory: {
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
      },
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

      <ToolPersistenceBar
        source={source}
        onCopyShareLink={copyShareLink}
        onClearSaved={clearSaved}
        onExportPdf={
          summary ? () => buildLuksusfellePdf(summary, linesByCategory) : undefined
        }
        exportDisabled={!summary || summary.income <= 0}
      />

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <CalculatorField
              label="Nettoinntekt per måned"
              hint="Lønn etter skatt, pluss eventuelle faste ytelser"
            >
              <FormattedNumberInput
                value={income}
                onChange={(value) => update("income", value)}
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Pengetavle
              </p>
              <div
                className="flex rounded-lg border border-stone-600 bg-stone-900/60 p-0.5"
                role="group"
                aria-label="Velg visning"
              >
                <button
                  type="button"
                  onClick={() => update("boardView", "bars")}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    boardView === "bars"
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Oversikt
                </button>
                <button
                  type="button"
                  onClick={() => update("boardView", "bills")}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    boardView === "bills"
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Lapper
                </button>
              </div>
            </div>

            {summary ? (
              boardView === "bars" ? (
                <BarsBoard summary={summary} hasAnyLines={hasAnyLines} />
              ) : (
                <BillsBoard summary={summary} hasAnyLines={hasAnyLines} />
              )
            ) : (
              <p className="mt-5 text-sm text-stone-400">
                Fyll inn inntekt for å starte tavlen.
              </p>
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
                 , mål rundt 50 %
                </li>
                <li>
                  Ønsker (variable):{" "}
                  <span className="font-medium">
                    {Math.round(summary.shareOfIncome.variable)} %
                  </span>{" "}
                 , mål rundt 30 %
                </li>
                <li>
                  Sparing + gjeld:{" "}
                  <span className="font-medium">
                    {Math.round(
                      summary.shareOfIncome.savings + summary.shareOfIncome.debt,
                    )}{" "}
                    %
                  </span>{" "}
                 , mål rundt 20 %
                </li>
              </ul>
              <p className="mt-3 text-xs text-stone-600">
                I Norge tar bolig ofte mer enn 50 %, juster etter din situasjon.
              </p>
            </div>
          )}

          <p className="text-xs leading-relaxed text-stone-500">
            Verktøyet er veiledende og erstatter ikke profesjonell rådgivning.
            Tallene lagres lokalt i nettleseren. Bruk «Last ned PDF» eller delbar
            lenke for å ta med oversikten videre.
          </p>
        </div>
      </div>
    </div>
  );
}
