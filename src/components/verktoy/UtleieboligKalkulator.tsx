"use client";

import { useMemo } from "react";
import { UTLEIEBOLIG_DEFAULTS } from "@/data/utleiebolig";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateUtleiebolig,
  projectUtleieboligVsFond,
} from "@/lib/calculators/utleiebolig";
import { assessUtleiebolig } from "@/lib/calculators/utleiebolig-vurdering";
import { formatIntegerInput } from "@/lib/format/number";
import {
  openPrintReport,
  reportRows,
  reportSection,
} from "@/lib/print-report";
import { useToolPersistence } from "@/lib/verktoy-persistence";
import type { UtleieboligInput } from "@/types/utleiebolig";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";
import { ToolPersistenceBar } from "@/components/verktoy/ToolPersistenceBar";
import { UtleieboligVurderingPanel } from "@/components/verktoy/UtleieboligVurdering";
import { UtleieboligSammenligningChart } from "@/components/verktoy/UtleieboligSammenligningChart";

function formatPercent(value: number): string {
  return `${value.toFixed(1).replace(".", ",")} %`;
}

interface UtleieboligFormState {
  purchasePrice: string;
  downPayment: string;
  purchaseCosts: string;
  rate: string;
  termYears: string;
  monthlyRent: string;
  vacancyMonths: string;
  commonCosts: string;
  insurance: string;
  maintenance: string;
  propertyTax: string;
  managementFee: string;
  taxRate: string;
  ownerOccupiedOverHalf: boolean;
  alternativeRent: string;
  propertyGrowth: string;
  fundReturn: string;
  projectionYears: string;
  [key: string]: unknown;
}

function createDefaultFormState(): UtleieboligFormState {
  const d = UTLEIEBOLIG_DEFAULTS;
  return {
    purchasePrice: formatIntegerInput(d.purchasePrice),
    downPayment: formatIntegerInput(d.downPayment),
    purchaseCosts: formatIntegerInput(d.purchaseCosts),
    rate: d.annualRatePercent.toString().replace(".", ","),
    termYears: String(d.termYears),
    monthlyRent: formatIntegerInput(d.monthlyRent),
    vacancyMonths: d.vacancyMonthsPerYear.toString().replace(".", ","),
    commonCosts: formatIntegerInput(d.monthlyCommonCosts),
    insurance: formatIntegerInput(d.monthlyInsurance),
    maintenance: formatIntegerInput(d.monthlyMaintenance),
    propertyTax: formatIntegerInput(d.monthlyPropertyTax),
    managementFee: formatIntegerInput(d.monthlyManagementFee),
    taxRate: d.taxRatePercent.toString().replace(".", ","),
    ownerOccupiedOverHalf: false,
    alternativeRent: formatIntegerInput(15_000),
    propertyGrowth: d.propertyGrowthPercent.toString().replace(".", ","),
    fundReturn: d.fundReturnPercent.toString().replace(".", ","),
    projectionYears: String(d.projectionYears),
  };
}

const DEFAULT_FORM_STATE = createDefaultFormState();

export function UtleieboligKalkulator() {
  const { state, update, source, clearSaved, copyShareLink } =
    useToolPersistence<UtleieboligFormState>(
      "utleiebolig-kalkulator",
      DEFAULT_FORM_STATE,
    );

  const {
    purchasePrice,
    downPayment,
    purchaseCosts,
    rate,
    termYears,
    monthlyRent,
    vacancyMonths,
    commonCosts,
    insurance,
    maintenance,
    propertyTax,
    managementFee,
    taxRate,
    ownerOccupiedOverHalf,
    alternativeRent,
    propertyGrowth,
    fundReturn,
    projectionYears,
  } = state;


  const parsedInput = useMemo((): UtleieboligInput | null => {
    const parsed = {
      purchasePrice: parseIntegerInput(purchasePrice),
      downPayment: parseIntegerInput(downPayment),
      purchaseCosts: parseIntegerInput(purchaseCosts) || 0,
      annualRatePercent: Number(rate.replace(",", ".")),
      termYears: Number(termYears.replace(/\s/g, "")),
      monthlyRent: parseIntegerInput(monthlyRent),
      vacancyMonthsPerYear: Number(vacancyMonths.replace(",", ".")),
      monthlyCommonCosts: parseIntegerInput(commonCosts) || 0,
      monthlyInsurance: parseIntegerInput(insurance) || 0,
      monthlyMaintenance: parseIntegerInput(maintenance) || 0,
      monthlyPropertyTax: parseIntegerInput(propertyTax) || 0,
      monthlyManagementFee: parseIntegerInput(managementFee) || 0,
      taxRatePercent: Number(taxRate.replace(",", ".")),
      propertyGrowthPercent: Number(propertyGrowth.replace(",", ".")),
      fundReturnPercent: Number(fundReturn.replace(",", ".")),
      projectionYears: Number(projectionYears.replace(/\s/g, "")),
    };

    if (
      !Number.isFinite(parsed.purchasePrice) ||
      !Number.isFinite(parsed.downPayment) ||
      !Number.isFinite(parsed.annualRatePercent) ||
      !Number.isFinite(parsed.termYears) ||
      !Number.isFinite(parsed.monthlyRent) ||
      !Number.isFinite(parsed.vacancyMonthsPerYear) ||
      !Number.isFinite(parsed.taxRatePercent) ||
      !Number.isFinite(parsed.propertyGrowthPercent) ||
      !Number.isFinite(parsed.fundReturnPercent) ||
      !Number.isFinite(parsed.projectionYears) ||
      parsed.purchasePrice <= 0 ||
      parsed.downPayment < 0 ||
      parsed.downPayment > parsed.purchasePrice ||
      parsed.termYears <= 0 ||
      parsed.monthlyRent < 0 ||
      parsed.annualRatePercent < 0 ||
      parsed.vacancyMonthsPerYear < 0 ||
      parsed.vacancyMonthsPerYear > 12 ||
      parsed.taxRatePercent < 0 ||
      parsed.projectionYears <= 0 ||
      parsed.projectionYears > 40
    ) {
      return null;
    }

    return parsed;
  }, [
    purchasePrice,
    downPayment,
    purchaseCosts,
    rate,
    termYears,
    monthlyRent,
    vacancyMonths,
    commonCosts,
    insurance,
    maintenance,
    propertyTax,
    managementFee,
    taxRate,
    propertyGrowth,
    fundReturn,
    projectionYears,
  ]);

  const result = useMemo(() => {
    if (!parsedInput) return null;
    return calculateUtleiebolig(parsedInput);
  }, [parsedInput]);

  const projection = useMemo(() => {
    if (!parsedInput || !result) return null;
    return projectUtleieboligVsFond(parsedInput, result);
  }, [parsedInput, result]);

  const vurdering = useMemo(() => {
    if (!result || !parsedInput) return null;

    const altRent = ownerOccupiedOverHalf
      ? parseIntegerInput(alternativeRent)
      : null;

    return assessUtleiebolig(result, {
      input: parsedInput,
      ownerOccupiedOverHalf,
      alternativeMonthlyRent:
        altRent !== null && Number.isFinite(altRent) && altRent > 0
          ? altRent
          : null,
    });
  }, [result, parsedInput, ownerOccupiedOverHalf, alternativeRent]);

  const showHybridCashFlowWarning =
    result &&
    vurdering &&
    !result.coversAllCosts &&
    vurdering.scenario === "owner-hybrid";

  const handleExportPdf = () => {
    if (!result || !parsedInput) return;

    const leverage =
      result.equityInvested > 0
        ? result.loanAmount / result.equityInvested
        : 0;

    openPrintReport({
      title: "Utleiebolig-kalkulator",
      subtitle: "Kontantstrøm, avkastning og bolig vs. fond",
      bodyHtml: [
        reportSection(
          "Nøkkeltall",
          reportRows([
            {
              label: "Månedlig kontantstrøm",
              value: `${result.monthlyCashFlow >= 0 ? "+" : ""}${formatCurrency(result.monthlyCashFlow)}`,
              tone:
                result.monthlyCashFlow >= 0 ? "positive" : "negative",
            },
            {
              label: "Etter skatt",
              value: `${result.cashFlowAfterTaxMonthly >= 0 ? "+" : ""}${formatCurrency(result.cashFlowAfterTaxMonthly)}`,
            },
            {
              label: "Brutto leieavkastning",
              value: formatPercent(result.grossYieldPercent),
            },
            {
              label: "Netto leieavkastning",
              value: formatPercent(result.netYieldPercent),
            },
            {
              label: "Kontantavkastning",
              value: formatPercent(result.cashOnCashReturnPercent),
            },
            {
              label: "Break-even leie",
              value: formatCurrency(result.breakEvenMonthlyRent),
            },
            { label: "Lånebeløp", value: formatCurrency(result.loanAmount) },
            {
              label: "Egenkapital inn",
              value: formatCurrency(result.equityInvested),
            },
          ]),
        ),
        projection
          ? reportSection(
              `Bolig vs. fond (${parsedInput.projectionYears} år)`,
              reportRows([
                {
                  label: "Nettoformue bolig",
                  value: formatCurrency(projection.propertyNetWorth),
                },
                {
                  label: "Fond (egenkapital)",
                  value: formatCurrency(projection.fundNetWorth),
                },
                {
                  label: "Differanse",
                  value: `${projection.differenceVsFund >= 0 ? "+" : ""}${formatCurrency(projection.differenceVsFund)}`,
                  tone:
                    projection.differenceVsFund >= 0 ? "positive" : "negative",
                },
              ]) +
                `<p style="margin:12px 0 0;font-size:0.85rem;color:#57534e">Bolig kan slå fond selv med lavere prisvekst fordi du er gearet: lånet forsterker både oppside og nedsiden. Her er lånet ca. ${leverage.toFixed(1).replace(".", ",")}× egenkapitalen.</p>`,
            )
          : "",
        vurdering
          ? reportSection(
              `Vurdering: ${vurdering.verdictLabel}`,
              `<p>${vurdering.verdictSummary}</p>`,
            )
          : "",
      ].join(""),
    });
  };

  return (
    <div className="space-y-6">
      <ToolPersistenceBar
        source={source}
        onCopyShareLink={copyShareLink}
        onClearSaved={clearSaved}
        onExportPdf={handleExportPdf}
        exportDisabled={!result}
      />

    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Boligen</h2>
          <p className="mt-1 text-sm text-stone-600">
            Kjøpesum, egenkapital og engangsomkostninger ved kjøp.
          </p>

          <div className="mt-6 space-y-5">
            <CalculatorField label="Kjøpesum" hint="Total pris for boligen">
              <FormattedNumberInput
                value={purchasePrice}
                onChange={(value) => update("purchasePrice", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Egenkapital"
              hint="Penger du legger inn selv (ikke lån)"
            >
              <FormattedNumberInput
                value={downPayment}
                onChange={(value) => update("downPayment", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Omkostninger ved kjøp"
              hint="Tinglysing, takst, meglerhonorar osv."
            >
              <FormattedNumberInput
                value={purchaseCosts}
                onChange={(value) => update("purchaseCosts", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Finansiering</h2>
          <p className="mt-1 text-sm text-stone-600">
            Annuitetslån med månedlige terminer.
          </p>

          <div className="mt-6 space-y-5">
            <CalculatorField label="Nominell rente" hint="Årlig rente i prosent">
              <input
                type="text"
                inputMode="decimal"
                value={rate}
                onChange={(e) =>
                  update("rate", e.target.value.replace(".", ","))
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Nedbetalingstid" hint="Antall år">
              <FormattedNumberInput
                value={termYears}
                onChange={(value) => update("termYears", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">Leie</h2>

          <div className="mt-6 space-y-5">
            <CalculatorField
              label="Månedlig leieinntekt"
              hint="Kontraktsleie før tomgang"
            >
              <FormattedNumberInput
                value={monthlyRent}
                onChange={(value) => update("monthlyRent", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Tomgang per år"
              hint="Måneder uten leietaker (0,5 ≈ 2 uker, 1 ≈ 1 måned)"
            >
              <input
                type="text"
                inputMode="decimal"
                value={vacancyMonths}
                onChange={(e) =>
                  update("vacancyMonths", e.target.value.replace(".", ","))
                }
                className={calculatorInputClassName}
              />
              {parsedInput && parsedInput.vacancyMonthsPerYear > 0 && (
                <p className="mt-1.5 text-xs text-stone-500">
                  Tilsvarer ca.{" "}
                  {Math.round((parsedInput.vacancyMonthsPerYear / 12) * 365)} dager
                  uten leieinntekt per år.
                </p>
              )}
            </CalculatorField>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={ownerOccupiedOverHalf}
                  onChange={(e) =>
                    update("ownerOccupiedOverHalf", e.target.checked)
                  }
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
                />
                <span>
                  <span className="text-sm font-medium text-stone-900">
                    Jeg bor i mer enn halvparten av boligen
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    Hybel, etasje eller rom du leier ut. Ikke ren utleiebolig.
                    Vurderingen tilpasses deretter.
                  </span>
                </span>
              </label>

              {ownerOccupiedOverHalf && (
                <div className="mt-4 border-t border-stone-200 pt-4">
                  <CalculatorField
                    label="Alternativ månedsleie"
                    hint="Hva hadde det kostet å leie tilsvarende bolig uten utleie?"
                  >
                    <FormattedNumberInput
                      value={alternativeRent}
                      onChange={(value) => update("alternativeRent", value)}
                      className={calculatorInputClassName}
                    />
                  </CalculatorField>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Månedlige driftskostnader
          </h2>

          <div className="mt-6 space-y-5">
            <CalculatorField label="Felleskostnader">
              <FormattedNumberInput
                value={commonCosts}
                onChange={(value) => update("commonCosts", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Forsikring">
              <FormattedNumberInput
                value={insurance}
                onChange={(value) => update("insurance", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Vedlikehold"
              hint="Sett av til reparasjoner og slitasje"
            >
              <FormattedNumberInput
                value={maintenance}
                onChange={(value) => update("maintenance", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Kommunale avgifter / eiendomsskatt">
              <FormattedNumberInput
                value={propertyTax}
                onChange={(value) => update("propertyTax", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Forvaltningshonorar" hint="Valgfritt">
              <FormattedNumberInput
                value={managementFee}
                onChange={(value) => update("managementFee", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Skattesats på overskudd"
              hint="Forenklet: leieinntekt minus kostnader og rente"
            >
              <input
                type="text"
                inputMode="decimal"
                value={taxRate}
                onChange={(e) =>
                  update("taxRate", e.target.value.replace(".", ","))
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Langsiktig sammenligning
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Sammenlign nettoformue i bolig med å plassere egenkapitalen i fond.
          </p>

          <div className="mt-6 space-y-5">
            <CalculatorField
              label="Forventet prisvekst bolig"
              hint="Årlig verdistigning i prosent"
            >
              <input
                type="text"
                inputMode="decimal"
                value={propertyGrowth}
                onChange={(e) =>
                  update("propertyGrowth", e.target.value.replace(".", ","))
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Forventet fondsavkastning"
              hint="Årlig avkastning på globalt indeksfond (f.eks. 7 %)"
            >
              <input
                type="text"
                inputMode="decimal"
                value={fundReturn}
                onChange={(e) =>
                  update("fundReturn", e.target.value.replace(".", ","))
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Sammenligningsperiode"
              hint="Antall år frem i tid"
            >
              <FormattedNumberInput
                value={projectionYears}
                onChange={(value) => update("projectionYears", value)}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </section>
      </div>

      <section className="space-y-3 lg:sticky lg:top-6 lg:self-start">
        {result ? (
          <>
            <div
              className={`rounded-xl border p-4 ${
                result.coversAllCosts
                  ? "border-green-200 bg-green-50"
                  : showHybridCashFlowWarning
                    ? "border-blue-200 bg-blue-50"
                    : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-sm font-semibold text-stone-900">
                  {result.coversAllCosts
                    ? "Leien dekker lån og kostnader"
                    : showHybridCashFlowWarning
                      ? "Utleiedelen dekker ikke alt"
                      : "Leien dekker ikke alt"}
                </h2>
                <p
                  className={`text-xl font-bold ${
                    result.monthlyCashFlow >= 0
                      ? "text-green-800"
                      : showHybridCashFlowWarning
                        ? "text-blue-800"
                        : "text-red-800"
                  }`}
                >
                  {result.monthlyCashFlow >= 0 ? "+" : ""}
                  {formatCurrency(result.monthlyCashFlow)}
                  <span className="text-xs font-normal text-stone-500">/mnd</span>
                </p>
              </div>
              <p className="mt-1 text-xs text-stone-600">
                {result.coversAllCosts
                  ? "Positiv kontantstrøm før skatt."
                  : showHybridCashFlowWarning
                    ? "Sjekk netto boligkostnad og vurdering."
                    : `Du må fylle på ca. ${formatCurrency(result.monthlyShortfall)}/mnd.`}
                {" "}
                Etter skatt:{" "}
                <span className="font-medium text-stone-800">
                  {result.cashFlowAfterTaxMonthly >= 0 ? "+" : ""}
                  {formatCurrency(result.cashFlowAfterTaxMonthly)}/mnd
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-stone-900">Nøkkeltall</h2>
              <dl className="mt-2 grid gap-x-4 gap-y-1.5 text-xs sm:grid-cols-2">
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-stone-500">Brutto leieavk.</dt>
                  <dd className="font-medium text-stone-900">
                    {formatPercent(result.grossYieldPercent)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-stone-500">Netto leieavk.</dt>
                  <dd className="font-medium text-stone-900">
                    {formatPercent(result.netYieldPercent)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-stone-500">Kontantavkastning</dt>
                  <dd className="font-semibold text-orange-700">
                    {formatPercent(result.cashOnCashReturnPercent)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-stone-500">Break-even leie</dt>
                  <dd className="font-medium text-stone-900">
                    {formatCurrency(result.breakEvenMonthlyRent)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-stone-500">Lånebeløp</dt>
                  <dd className="font-medium text-stone-900">
                    {formatCurrency(result.loanAmount)}
                  </dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-stone-500">Egenkapital inn</dt>
                  <dd className="font-medium text-stone-900">
                    {formatCurrency(result.equityInvested)}
                  </dd>
                </div>
              </dl>

              <div className="mt-3 border-t border-stone-100 pt-3">
                <p className="text-xs font-medium text-stone-500">
                  Månedlig fordeling
                </p>
                <dl className="mt-1.5 space-y-1 text-xs">
                  <div className="flex justify-between gap-2">
                    <dt className="text-stone-500">Leie (etter tomgang)</dt>
                    <dd className="font-medium text-green-700">
                      +{formatCurrency(result.effectiveMonthlyRent)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-stone-500">Drift + lån</dt>
                    <dd className="font-medium text-stone-900">
                      −
                      {formatCurrency(
                        result.monthlyOperatingCosts + result.monthlyLoanPayment,
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {vurdering && <UtleieboligVurderingPanel vurdering={vurdering} />}

            {projection && parsedInput && (
              <details className="group rounded-xl border border-stone-200 bg-white shadow-sm">
                <summary className="cursor-pointer list-none p-4 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-semibold text-stone-900">
                        Bolig vs. fond ({parsedInput.projectionYears} år)
                      </h2>
                      <p className="mt-0.5 text-xs text-stone-500">
                        Bolig{" "}
                        <span className="font-medium text-orange-700">
                          {formatCurrency(projection.propertyNetWorth)}
                        </span>
                        {" · "}
                        Fond{" "}
                        <span className="font-medium text-stone-700">
                          {formatCurrency(projection.fundNetWorth)}
                        </span>
                        {" · "}
                        <span
                          className={
                            projection.differenceVsFund >= 0
                              ? "font-medium text-green-700"
                              : "font-medium text-red-700"
                          }
                        >
                          {projection.differenceVsFund >= 0 ? "+" : ""}
                          {formatCurrency(projection.differenceVsFund)}
                        </span>
                      </p>
                    </div>
                    <span
                      className="shrink-0 text-sm text-stone-400 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </div>
                </summary>

                <div className="border-t border-stone-100 px-4 pb-4 pt-3">
                  <UtleieboligSammenligningChart
                    snapshots={projection.yearSnapshots}
                    projectionYears={parsedInput.projectionYears}
                  />

                  <p className="mt-4 rounded-lg border border-stone-100 bg-stone-50 px-3 py-2.5 text-xs leading-relaxed text-stone-600">
                    At bolig ofte kommer bedre ut enn fond her, skyldes i stor
                    grad <span className="font-medium text-stone-800">giring</span>
                    : du eier hele boligen, men har bare lagt inn egenkapitalen.
                    Lånet forsterker både gevinst og tap. Med{" "}
                    {formatCurrency(result.equityInvested)} i egenkapital og{" "}
                    {formatCurrency(result.loanAmount)} i lån er du gearet ca.{" "}
                    {(result.loanAmount / Math.max(result.equityInvested, 1))
                      .toFixed(1)
                      .replace(".", ",")}
                    ×. Fondssammenligningen er uten tilsvarende belåning.
                  </p>

                  <dl className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between gap-2">
                      <dt className="text-stone-500">Nettoformue bolig</dt>
                      <dd className="font-semibold text-orange-700">
                        {formatCurrency(projection.propertyNetWorth)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2 text-stone-500">
                      <span>Boligverdi / lån / kontantstrøm</span>
                      <span>
                        {formatCurrency(projection.propertyValue)} / −
                        {formatCurrency(projection.remainingLoan)} /{" "}
                        {formatCurrency(projection.cashReserve)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-stone-500">Fond (egenkapital)</dt>
                      <dd className="font-medium text-stone-900">
                        {formatCurrency(projection.fundNetWorth)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-stone-500">Fond m/ kontantstrøm</dt>
                      <dd className="font-medium text-stone-900">
                        {formatCurrency(projection.fundWithMonthlyFlows)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2 rounded-lg bg-stone-50 px-2 py-1.5">
                      <dt className="font-medium text-stone-700">
                        Årlig avkastning bolig / fond
                      </dt>
                      <dd className="font-medium text-stone-900">
                        {formatPercent(projection.propertyAnnualizedReturnPercent)}{" "}
                        / {formatPercent(projection.fundAnnualizedReturnPercent)}
                      </dd>
                    </div>
                    {projection.totalSubsidiesPaid > 0 && (
                      <p className="text-stone-500">
                        Fyll på ca.{" "}
                        {formatCurrency(projection.totalSubsidiesPaid)} totalt i
                        perioden.
                      </p>
                    )}
                  </dl>
                </div>
              </details>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
            Fyll inn gyldige verdier for å se resultatet.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Beregningen er veiledende. Skatteestimatet er forenklet. Langsiktig
          sammenligning inkluderer forventet prisvekst, avdrag og kontantstrøm,
          men ikke salgskostnader, formueskatt eller renteendringer. Fondssammenligning
          er forenklet og tar ikke høyde for skatt på fond. Sjekk tallene med bank
          og regnskapsfører før du investerer.
        </p>
      </section>
    </div>
    </div>
  );
}
