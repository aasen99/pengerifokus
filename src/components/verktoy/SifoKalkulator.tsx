"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  buildSifoSummaryComparison,
  calculateSifoBudget,
  compareSifoHouseholds,
  compareToSifo,
  SIFO_HOUSEHOLD_PRESETS,
  SIFO_LAST_VERIFIED,
  SIFO_REPORT_YEAR,
  SIFO_SOURCE_URL,
  type SifoCategoryDiff,
  type SifoComparisonResult,
  type SifoHouseholdComparison,
} from "@/lib/calculators/sifo";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
  calculatorPanelClassName,
} from "@/components/verktoy/calculator-ui";
import {
  createSifoHouseholdFromPreset,
  SifoHouseholdPanel,
  sifoStateToInput,
  type SifoHouseholdState,
} from "@/components/verktoy/SifoHouseholdPanel";

type CalculatorMode = "single" | "dual";

const DEFAULT_PRESET = SIFO_HOUSEHOLD_PRESETS.find(
  (p) => p.id === "eksempelfamilie",
)!;

function formatComparisonDiff(comparison: SifoComparisonResult): string {
  const sign = comparison.diff > 0 ? "+" : "";
  const percent =
    comparison.diffPercent !== null
      ? ` (${sign}${comparison.diffPercent.toLocaleString("nb-NO", { maximumFractionDigits: 1 })} %)`
      : "";
  return `${sign}${formatCurrency(comparison.diff)}${percent}`;
}

function comparisonDiffClassName(diff: number): string {
  return diff > 0 ? "text-red-700" : diff === 0 ? "text-stone-600" : "text-emerald-700";
}

function groupBadgeClassName(group: SifoCategoryDiff["group"]): string {
  if (group === "husholdning") return "bg-blue-100 text-blue-800";
  if (group === "valgfritt") return "bg-purple-100 text-purple-800";
  return "bg-stone-100 text-stone-700";
}

function groupLabel(group: SifoCategoryDiff["group"]): string {
  if (group === "husholdning") return "Husholdning";
  if (group === "valgfritt") return "Barnehage/AKS";
  return "Individ";
}

function SifoDualComparison({ comparison }: { comparison: SifoHouseholdComparison }) {
  const { scenarioA, scenarioB, monthlyDiff, yearlyDiff, topChanges, groupDiffs, insights } =
    comparison;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
        <h2 className="text-lg font-semibold text-stone-900">
          Sammenligning: {scenarioA.label} → {scenarioB.label}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              {scenarioA.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900">
              {formatCurrency(scenarioA.result.monthlyTotal)}
              <span className="text-sm font-normal text-stone-600"> / mnd</span>
            </p>
            <p className="text-sm text-stone-600">
              {formatCurrency(scenarioA.result.yearlyTotal)} / år ·{" "}
              {scenarioA.result.personCount} pers.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              {scenarioB.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900">
              {formatCurrency(scenarioB.result.monthlyTotal)}
              <span className="text-sm font-normal text-stone-600"> / mnd</span>
            </p>
            <p className="text-sm text-stone-600">
              {formatCurrency(scenarioB.result.yearlyTotal)} / år ·{" "}
              {scenarioB.result.personCount} pers.
            </p>
          </div>
        </div>
        <div className="mt-4 border-t border-orange-200 pt-4">
          <p className="text-sm text-stone-700">
            Endring per måned:{" "}
            <span className={`font-semibold ${comparisonDiffClassName(monthlyDiff.diff)}`}>
              {formatComparisonDiff(monthlyDiff)}
            </span>
          </p>
          <p className="mt-1 text-sm text-stone-700">
            Endring per år:{" "}
            <span className={`font-semibold ${comparisonDiffClassName(yearlyDiff.diff)}`}>
              {formatComparisonDiff(yearlyDiff)}
            </span>
          </p>
        </div>
      </div>

      {insights.length > 0 && (
        <div className={calculatorPanelClassName}>
          <h3 className="text-base font-semibold text-stone-900">Kort oppsummert</h3>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            {insights.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-orange-500">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={calculatorPanelClassName}>
        <h3 className="text-base font-semibold text-stone-900">
          Individ vs. husholdning
        </h3>
        <dl className="mt-4 space-y-3 text-sm">
          {(
            [
              ["Individposter", groupDiffs.individ, scenarioA.result.individTotal, scenarioB.result.individTotal],
              ["Husholdningsposter", groupDiffs.husholdning, scenarioA.result.husholdTotal, scenarioB.result.husholdTotal],
              [
                "Barnehage og AKS",
                groupDiffs.valgfritt,
                scenarioA.result.barnehageTotal + scenarioA.result.aksTotal,
                scenarioB.result.barnehageTotal + scenarioB.result.aksTotal,
              ],
            ] as const
          ).map(([label, diff, amountA, amountB]) => (
            <div
              key={label}
              className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-100 pb-3 last:border-0"
            >
              <dt className="text-stone-600">{label}</dt>
              <dd className="text-right">
                <span className="text-stone-500">
                  {formatCurrency(amountA)} → {formatCurrency(amountB)}
                </span>
                <span
                  className={`ml-2 font-medium ${comparisonDiffClassName(diff.diff)}`}
                >
                  ({formatComparisonDiff(diff)})
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={calculatorPanelClassName}>
        <h3 className="text-base font-semibold text-stone-900">
          Per kategori (størst endring først)
        </h3>
        <dl className="mt-4 space-y-4">
          {topChanges
            .filter((c) => c.diff !== 0 || c.amountA > 0 || c.amountB > 0)
            .map((category) => (
              <div
                key={category.id}
                className="border-b border-stone-100 pb-4 last:border-0"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <dt className="text-sm text-stone-900">{category.label}</dt>
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs font-medium ${groupBadgeClassName(category.group)}`}
                  >
                    {groupLabel(category.group)}
                  </span>
                </div>
                <dd className="mt-2 flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="text-stone-600">
                    {formatCurrency(category.amountA)} → {formatCurrency(category.amountB)}
                  </span>
                  <span
                    className={`font-medium ${comparisonDiffClassName(category.diff)}`}
                  >
                    {formatComparisonDiff({
                      diff: category.diff,
                      diffPercent: category.diffPercent,
                    })}
                  </span>
                </dd>
              </div>
            ))}
        </dl>
      </div>
    </div>
  );
}

export function SifoKalkulator() {
  const [mode, setMode] = useState<CalculatorMode>("single");

  const [singleState, setSingleState] = useState<SifoHouseholdState>(() =>
    createSifoHouseholdFromPreset("eksempelfamilie", "Min husholdning"),
  );
  const [scenarioA, setScenarioA] = useState<SifoHouseholdState>(() =>
    createSifoHouseholdFromPreset("enslig-kvinne", "Alene"),
  );
  const [scenarioB, setScenarioB] = useState<SifoHouseholdState>(() =>
    createSifoHouseholdFromPreset("par-uten-barn", "Samboer"),
  );

  const [compareEnabled, setCompareEnabled] = useState(false);
  const [userMonthlyTotal, setUserMonthlyTotal] = useState("");
  const [userCategoryAmounts, setUserCategoryAmounts] = useState<
    Record<string, string>
  >({});

  const singleInput = useMemo(() => sifoStateToInput(singleState), [singleState]);
  const result = useMemo(() => calculateSifoBudget(singleInput), [singleInput]);

  const dualComparison = useMemo(() => {
    if (mode !== "dual") return null;
    return compareSifoHouseholds(
      sifoStateToInput(scenarioA),
      sifoStateToInput(scenarioB),
      scenarioA.label,
      scenarioB.label,
    );
  }, [mode, scenarioA, scenarioB]);

  const summaryComparison = useMemo(() => {
    if (!result || !compareEnabled || mode !== "single") return null;
    return buildSifoSummaryComparison(
      result,
      userMonthlyTotal,
      userCategoryAmounts,
    );
  }, [result, compareEnabled, userMonthlyTotal, userCategoryAmounts, mode]);

  function updateUserCategory(id: string, value: string) {
    setUserCategoryAmounts((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 rounded-xl border border-stone-200 bg-stone-50 p-1">
        <button
          type="button"
          onClick={() => setMode("single")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors sm:flex-none ${
            mode === "single"
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          Én husholdning
        </button>
        <button
          type="button"
          onClick={() => setMode("dual")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors sm:flex-none ${
            mode === "dual"
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          Sammenlign to husholdninger
        </button>
      </div>

      {mode === "single" ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-stone-900">Husholdning</h2>
            <SifoHouseholdPanel state={singleState} onChange={setSingleState} />

            <div className={`mt-4 ${calculatorPanelClassName}`}>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={compareEnabled}
                  onChange={(e) => setCompareEnabled(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-orange-600"
                />
                <span>
                  <span className="block text-sm font-medium text-stone-900">
                    Sammenlign med egne utgifter
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    Totalt og per kategori, uten bolig og strøm
                  </span>
                </span>
              </label>

              {compareEnabled && (
                <div className="mt-4">
                  <CalculatorField label="Dine forbruksutgifter per måned (totalt)">
                    <FormattedNumberInput
                      value={userMonthlyTotal}
                      onChange={setUserMonthlyTotal}
                      className={calculatorInputClassName}
                      placeholder={formatIntegerInput(35_000)}
                    />
                  </CalculatorField>
                </div>
              )}
            </div>
          </div>

          <section className="space-y-4">
            {result ? (
              <>
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                  <h2 className="text-lg font-semibold text-stone-900">
                    SIFO referansebudsjett {SIFO_REPORT_YEAR}
                  </h2>
                  <p className="mt-3 text-3xl font-bold text-stone-900">
                    {formatCurrency(result.monthlyTotal)}
                    <span className="text-base font-normal text-stone-600">
                      {" "}
                      / mnd
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-stone-700">
                    {formatCurrency(result.yearlyTotal)} per år ·{" "}
                    {result.personCount} personer i husholdningen
                  </p>
                  {result.matStordriftRabatt > 0 && (
                    <p className="mt-2 text-xs text-stone-600">
                      12 % stordriftseffekt på mat:{" "}
                      {formatCurrency(result.matStordriftRabatt)} trukket fra.
                    </p>
                  )}
                </div>

                {summaryComparison && (
                  <div className={calculatorPanelClassName}>
                    <h2 className="text-lg font-semibold text-stone-900">
                      Sammenligning
                    </h2>
                    <p className="mt-1 text-sm text-stone-600">
                      SIFO referanse mot dine egne tall, uten bolig og strøm.
                    </p>

                    <dl className="mt-5 space-y-4">
                      <div className="rounded-lg bg-stone-50 px-3 py-3">
                        <dt className="text-sm font-medium text-stone-900">
                          SIFO referanse
                        </dt>
                        <dd className="mt-2 space-y-1 text-sm">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-stone-600">Per måned</span>
                            <span className="font-semibold text-stone-900">
                              {formatCurrency(summaryComparison.sifoMonthly)}
                            </span>
                          </div>
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-stone-600">Per år</span>
                            <span className="font-semibold text-stone-900">
                              {formatCurrency(summaryComparison.sifoYearly)}
                            </span>
                          </div>
                        </dd>
                      </div>

                      {summaryComparison.lines.length === 0 ? (
                        <p className="text-sm text-stone-500">
                          Fyll inn totalbeløp eller beløp per kategori for å se
                          avvik.
                        </p>
                      ) : (
                        summaryComparison.lines.map((line) => (
                          <div
                            key={line.id}
                            className="border-t border-stone-100 pt-4"
                          >
                            <dt className="text-sm font-medium text-stone-900">
                              {line.label}
                              {line.id === "categories" &&
                                line.filledCategoryCount !== undefined &&
                                line.totalCategoryCount !== undefined &&
                                line.filledCategoryCount <
                                  line.totalCategoryCount && (
                                  <span className="mt-0.5 block text-xs font-normal text-stone-500">
                                    {line.filledCategoryCount} av{" "}
                                    {line.totalCategoryCount} kategorier fylt ut
                                  </span>
                                )}
                            </dt>
                            <dd className="mt-2 space-y-2 text-sm">
                              <div className="flex items-baseline justify-between gap-4">
                                <span className="text-stone-600">Per måned</span>
                                <span className="font-semibold text-stone-900">
                                  {formatCurrency(line.userMonthly)}
                                </span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                <span className="text-stone-600">Per år</span>
                                <span className="font-semibold text-stone-900">
                                  {formatCurrency(line.userYearly)}
                                </span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                <span className="text-stone-600">
                                  Avvik per måned
                                </span>
                                <span
                                  className={`font-medium ${comparisonDiffClassName(line.monthlyDiff.diff)}`}
                                >
                                  {formatComparisonDiff(line.monthlyDiff)}
                                </span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                <span className="text-stone-600">Avvik per år</span>
                                <span
                                  className={`font-medium ${comparisonDiffClassName(line.yearlyDiff.diff)}`}
                                >
                                  {formatComparisonDiff(line.yearlyDiff)}
                                </span>
                              </div>
                            </dd>
                          </div>
                        ))
                      )}
                    </dl>
                  </div>
                )}

                <div className={calculatorPanelClassName}>
                  <h2 className="text-lg font-semibold text-stone-900">
                    Per kategori
                  </h2>
                  <dl className="mt-5 space-y-4">
                    {result.categories.map((category) => {
                      const userRaw = userCategoryAmounts[category.id] ?? "";
                      const userAmount = compareEnabled
                        ? parseIntegerInput(userRaw)
                        : NaN;
                      const categoryComparison =
                        compareEnabled &&
                        Number.isFinite(userAmount) &&
                        userAmount >= 0
                          ? compareToSifo(userAmount, category.amount)
                          : null;

                      return (
                        <div
                          key={category.id}
                          className="border-b border-stone-100 pb-4 last:border-0"
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-sm text-stone-600">
                              {category.label}
                            </dt>
                            <dd className="text-right">
                              <span className="font-semibold text-stone-900">
                                {formatCurrency(category.amount)}
                              </span>
                              <span className="block text-xs text-stone-500">
                                {formatCurrency(category.amount * 12)} / år
                              </span>
                            </dd>
                          </div>
                          {compareEnabled && (
                            <div className="mt-2">
                              <label className="sr-only">
                                Ditt beløp for {category.label}
                              </label>
                              <FormattedNumberInput
                                value={userRaw}
                                onChange={(value) =>
                                  updateUserCategory(category.id, value)
                                }
                                className={
                                  calculatorInputClassName + " text-sm py-2"
                                }
                                placeholder="Ditt beløp (valgfritt)"
                              />
                              {categoryComparison && userRaw.trim() !== "" && (
                                <p
                                  className={`mt-1 text-xs font-medium ${comparisonDiffClassName(categoryComparison.diff)}`}
                                >
                                  {formatComparisonDiff(categoryComparison)} vs.
                                  SIFO
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </dl>

                  <div className="mt-4 border-t border-stone-200 pt-4 text-sm text-stone-600">
                    <div className="flex justify-between">
                      <span>Individspesifikke utgifter</span>
                      <span className="font-medium text-stone-900">
                        {formatCurrency(result.individTotal)}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span>Husholdningsspesifikke utgifter</span>
                      <span className="font-medium text-stone-900">
                        {formatCurrency(result.husholdTotal)}
                      </span>
                    </div>
                    {(result.barnehageTotal > 0 || result.aksTotal > 0) && (
                      <div className="mt-2 flex justify-between">
                        <span>Barnehage og AKS</span>
                        <span className="font-medium text-stone-900">
                          {formatCurrency(result.barnehageTotal + result.aksTotal)}
                        </span>
                      </div>
                    )}
                    <div className="mt-3 flex justify-between border-t border-stone-100 pt-3 font-semibold text-stone-900">
                      <span>Totalt (SIFO)</span>
                      <span className="text-right">
                        {formatCurrency(result.monthlyTotal)}
                        <span className="block text-xs font-normal text-stone-500">
                          {formatCurrency(result.yearlyTotal)} / år
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-600 shadow-sm">
                  <p>
                    Referansebudsjettet dekker nødvendig forbruk på et akseptabelt
                    nivå. Bolig, strøm, forsikring, lån, ferie og alkohol er ikke
                    med.
                  </p>
                  <p className="mt-3">
                    Kollektiv, barnehage og AKS er basert på Oslo-priser. Tilpass
                    til din kommune og faktiske avtaler.
                  </p>
                </div>
              </>
            ) : (
              <div
                className={calculatorPanelClassName + " text-sm text-stone-600"}
              >
                Legg til minst én person for å beregne referansebudsjettet.
              </div>
            )}
          </section>
        </div>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-stone-900">
                Scenario A
              </h2>
              <SifoHouseholdPanel
                state={scenarioA}
                onChange={setScenarioA}
                showLabel
              />
            </div>
            <div>
              <h2 className="mb-4 text-lg font-semibold text-stone-900">
                Scenario B
              </h2>
              <SifoHouseholdPanel
                state={scenarioB}
                onChange={setScenarioB}
                showLabel
              />
            </div>
          </div>

          {dualComparison ? (
            <SifoDualComparison comparison={dualComparison} />
          ) : (
            <div className={calculatorPanelClassName + " text-sm text-stone-600"}>
              Legg til minst én person i begge scenarioer for å sammenligne.
            </div>
          )}
        </>
      )}

      <p className="text-xs leading-relaxed text-stone-500">
        Tall fra SIFO-rapport 9-{SIFO_REPORT_YEAR} (februar {SIFO_REPORT_YEAR}
        -priser). Sist verifisert {SIFO_LAST_VERIFIED}. Offisiell kalkulator
        og Excel finnes hos{" "}
        <a
          href={SIFO_SOURCE_URL}
          className="text-orange-600 hover:text-orange-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          OsloMet SIFO
        </a>
        .
      </p>
    </div>
  );
}
