"use client";

import Link from "next/link";
import { useState } from "react";
import { EIE_LEIE_DISCLAIMER, SCENARIO_PRESETS } from "@/data/eie-leie";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateEieLeie,
  calculateSensitivityCases,
  formatEieLeieCopyText,
  formatYearsAndMonthsFromMonth,
} from "@/lib/calculators/eie-leie";
import type { EieLeieInput, EieLeieResult, ScenarioPreset } from "@/types/eie-leie";
import { NettoformueChart } from "@/components/verktoy/eie-leie/NettoformueChart";

interface EieLeieResultViewProps {
  input: EieLeieInput;
  result: EieLeieResult;
  onRestart: () => void;
  onEdit: () => void;
}

function ResultRow({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <span className="text-stone-600">{label}</span>
      <span
        className={
          emphasize
            ? "text-right font-semibold text-stone-900"
            : "text-right text-stone-900"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function EieLeieResultView({
  input,
  result,
  onRestart,
  onEdit,
}: EieLeieResultViewProps) {
  const [copied, setCopied] = useState(false);
  const sensitivity = calculateSensitivityCases(input);
  const scenarioResults = (Object.keys(SCENARIO_PRESETS) as ScenarioPreset[]).map(
    (preset) => {
      const values = SCENARIO_PRESETS[preset];
      const scenarioInput: EieLeieInput = {
        ...input,
        propertyGrowthPercent: values.propertyGrowthPercent,
        nominalRatePercent: values.nominalRatePercent,
        investmentReturnPercent: values.investmentReturnPercent,
      };
      return {
        preset,
        label: values.label,
        result: calculateEieLeie(scenarioInput),
      };
    },
  );
  const diff = Math.abs(Math.round(result.netWorthDifference));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        formatEieLeieCopyText(result, input.horizonYears),
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
          {result.betterOption === "eie" && (
            <>
              Etter {input.horizonYears} år gir eie anslagsvis{" "}
              {formatCurrency(diff)} høyere nettoformue enn leie.
            </>
          )}
          {result.betterOption === "leie" && (
            <>
              Etter {input.horizonYears} år gir leie og investering anslagsvis{" "}
              {formatCurrency(diff)} høyere nettoformue enn eie.
            </>
          )}
          {result.betterOption === "lik" && (
            <>
              Etter {input.horizonYears} år gir eie og leie omtrent lik
              nettoformue basert på dine forutsetninger.
            </>
          )}
        </h2>

        {result.crossoverMonth ? (
          <p className="mt-3 text-sm text-stone-600">
            Eie går forbi leie etter omtrent{" "}
            {formatYearsAndMonthsFromMonth(result.crossoverMonth)}.
          </p>
        ) : result.ownerAheadFromStart ? (
          <p className="mt-3 text-sm text-stone-600">
            Med disse forutsetningene ligger eie foran leie gjennom hele
            perioden.
          </p>
        ) : (
          <p className="mt-3 text-sm text-stone-600">
            Med disse forutsetningene går eie ikke forbi leie i løpet av
            perioden.
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-stone-900">Eie</h3>
          <div className="mt-4 divide-y divide-stone-100">
            <ResultRow
              label="Boligverdi"
              value={formatCurrency(result.owner.propertyValue)}
            />
            <ResultRow
              label="Restgjeld"
              value={formatCurrency(result.owner.remainingDebt)}
            />
            <ResultRow
              label="Opparbeidet egenkapital"
              value={formatCurrency(result.owner.equityBuilt)}
            />
            <ResultRow
              label="Betalte renter"
              value={formatCurrency(result.owner.totalInterestPaid)}
            />
            <ResultRow
              label="Betalte avdrag"
              value={formatCurrency(result.owner.totalPrincipalPaid)}
            />
            <ResultRow
              label="Vedlikehold"
              value={formatCurrency(result.owner.totalMaintenance)}
            />
            <ResultRow
              label="Kjøps- og salgskostnader"
              value={formatCurrency(
                result.owner.totalPurchaseCosts + result.owner.totalSaleCosts,
              )}
            />
            <ResultRow
              label="Nettoformue"
              value={formatCurrency(result.owner.netWorth)}
              emphasize
            />
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-stone-900">Leie</h3>
          <div className="mt-4 divide-y divide-stone-100">
            <ResultRow
              label="Samlet betalt husleie"
              value={formatCurrency(result.renter.totalRentPaid)}
            />
            <ResultRow
              label="Startinvestering"
              value={formatCurrency(result.renter.startInvestment)}
            />
            <ResultRow
              label="Månedlige investeringer"
              value={formatCurrency(result.renter.totalMonthlyInvestments)}
            />
            <ResultRow
              label="Investeringsverdi"
              value={formatCurrency(result.renter.investmentValue)}
            />
            <ResultRow
              label="Tilbakebetalt depositum"
              value={formatCurrency(result.renter.depositReturned)}
            />
            <ResultRow
              label="Nettoformue"
              value={formatCurrency(result.renter.netWorth)}
              emphasize
            />
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold text-stone-900">
          Nettoformue over tid
        </h3>
        <div className="mt-5">
          <NettoformueChart
            snapshots={result.monthlySnapshots}
            horizonYears={input.horizonYears}
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-stone-900">
            Kostnadsfordeling – eie
          </h3>
          <div className="mt-4 space-y-3">
            {[
              { label: "Renter", value: result.ownerCostBreakdown.interest },
              {
                label: "Vedlikehold",
                value: result.ownerCostBreakdown.maintenance,
              },
              {
                label: "Faste eierkostnader",
                value: result.ownerCostBreakdown.fixedCosts,
              },
              {
                label: "Kjøpskostnader",
                value: result.ownerCostBreakdown.purchaseCosts,
              },
              {
                label: "Salgskostnader",
                value: result.ownerCostBreakdown.saleCosts,
              },
            ].map((item) => {
              const total =
                result.ownerCostBreakdown.interest +
                result.ownerCostBreakdown.maintenance +
                result.ownerCostBreakdown.fixedCosts +
                result.ownerCostBreakdown.purchaseCosts +
                result.ownerCostBreakdown.saleCosts;
              const percent = total > 0 ? (item.value / total) * 100 : 0;

              return (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-stone-600">{item.label}</span>
                    <span className="font-medium text-stone-900">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-orange-400"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-stone-500">
            Avdrag er ikke med her – det bygger egenkapital, ikke ren kostnad.
          </p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-stone-900">
            Kostnadsfordeling – leie
          </h3>
          <div className="mt-4">
            <ResultRow
              label="Husleie"
              value={formatCurrency(result.totalRentPaid)}
            />
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold text-stone-900">Tre scenarioer</h3>
        <p className="mt-1 text-sm text-stone-600">
          Samme bolig og leie, men med forsiktige, normale og optimistiske
          antagelser om prisvekst, rente og avkastning.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {scenarioResults.map(({ preset, label, result: scenario }) => (
            <div
              key={preset}
              className="rounded-xl border border-stone-100 bg-stone-50 p-4"
            >
              <p className="text-sm font-semibold text-stone-900">{label}</p>
              <p className="mt-2 text-xs text-stone-500">
                Prisvekst {SCENARIO_PRESETS[preset].propertyGrowthPercent} % ·
                Rente {SCENARIO_PRESETS[preset].nominalRatePercent} % ·
                Avkastning {SCENARIO_PRESETS[preset].investmentReturnPercent} %
              </p>
              <p className="mt-3 text-sm font-medium text-stone-800">
                {scenario.betterOption === "eie" && (
                  <>Eie +{formatCurrency(Math.abs(scenario.netWorthDifference))}</>
                )}
                {scenario.betterOption === "leie" && (
                  <>Leie +{formatCurrency(Math.abs(scenario.netWorthDifference))}</>
                )}
                {scenario.betterOption === "lik" && <>Omtrent likt</>}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold text-stone-900">
          Hva skjer dersom forutsetningene endrer seg?
        </h3>
        <div className="mt-4 space-y-3">
          {sensitivity.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm text-stone-700">{item.label}</span>
              <span className="text-sm font-medium text-stone-900">
                {item.betterOption === "eie" && (
                  <>Eie +{formatCurrency(Math.abs(item.netWorthDifference))}</>
                )}
                {item.betterOption === "leie" && (
                  <>Leie +{formatCurrency(Math.abs(item.netWorthDifference))}</>
                )}
                {item.betterOption === "lik" && <>Omtrent likt</>}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
        >
          {copied ? "Kopiert!" : "Kopier resultat"}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-50"
        >
          Endre forutsetninger
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-50"
        >
          Start på nytt
        </button>
        <Link
          href="/verktoy"
          className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-center text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-50"
        >
          Se flere verktøy
        </Link>
      </div>

      <p className="text-xs leading-relaxed text-stone-500">{EIE_LEIE_DISCLAIMER}</p>
    </div>
  );
}
