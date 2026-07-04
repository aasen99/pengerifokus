"use client";

import { useMemo, useState } from "react";
import { UTLEIEBOLIG_DEFAULTS } from "@/data/utleiebolig";
import { formatCurrency } from "@/lib/calculators/loan";
import { calculateUtleiebolig, projectUtleieboligVsFond } from "@/lib/calculators/utleiebolig";
import { assessUtleiebolig } from "@/lib/calculators/utleiebolig-vurdering";
import { formatIntegerInput } from "@/lib/format/number";
import type { UtleieboligInput } from "@/types/utleiebolig";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";
import { UtleieboligVurderingPanel } from "@/components/verktoy/UtleieboligVurdering";
import { UtleieboligSammenligningChart } from "@/components/verktoy/UtleieboligSammenligningChart";

function formatPercent(value: number): string {
  return `${value.toFixed(1).replace(".", ",")} %`;
}

export function UtleieboligKalkulator() {
  const d = UTLEIEBOLIG_DEFAULTS;

  const [purchasePrice, setPurchasePrice] = useState(
    formatIntegerInput(d.purchasePrice),
  );
  const [downPayment, setDownPayment] = useState(
    formatIntegerInput(d.downPayment),
  );
  const [purchaseCosts, setPurchaseCosts] = useState(
    formatIntegerInput(d.purchaseCosts),
  );
  const [rate, setRate] = useState(d.annualRatePercent.toString().replace(".", ","));
  const [termYears, setTermYears] = useState(String(d.termYears));
  const [monthlyRent, setMonthlyRent] = useState(
    formatIntegerInput(d.monthlyRent),
  );
  const [vacancyMonths, setVacancyMonths] = useState(
    d.vacancyMonthsPerYear.toString().replace(".", ","),
  );
  const [commonCosts, setCommonCosts] = useState(
    formatIntegerInput(d.monthlyCommonCosts),
  );
  const [insurance, setInsurance] = useState(
    formatIntegerInput(d.monthlyInsurance),
  );
  const [maintenance, setMaintenance] = useState(
    formatIntegerInput(d.monthlyMaintenance),
  );
  const [propertyTax, setPropertyTax] = useState(
    formatIntegerInput(d.monthlyPropertyTax),
  );
  const [managementFee, setManagementFee] = useState(
    formatIntegerInput(d.monthlyManagementFee),
  );
  const [taxRate, setTaxRate] = useState(
    d.taxRatePercent.toString().replace(".", ","),
  );
  const [ownerOccupiedOverHalf, setOwnerOccupiedOverHalf] = useState(false);
  const [alternativeRent, setAlternativeRent] = useState(
    formatIntegerInput(15_000),
  );
  const [propertyGrowth, setPropertyGrowth] = useState(
    d.propertyGrowthPercent.toString().replace(".", ","),
  );
  const [fundReturn, setFundReturn] = useState(
    d.fundReturnPercent.toString().replace(".", ","),
  );
  const [projectionYears, setProjectionYears] = useState(
    String(d.projectionYears),
  );

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

  return (
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
                onChange={setPurchasePrice}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Egenkapital"
              hint="Penger du legger inn selv (ikke lån)"
            >
              <FormattedNumberInput
                value={downPayment}
                onChange={setDownPayment}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Omkostninger ved kjøp"
              hint="Tinglysing, takst, meglerhonorar osv."
            >
              <FormattedNumberInput
                value={purchaseCosts}
                onChange={setPurchaseCosts}
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
                onChange={(e) => setRate(e.target.value.replace(".", ","))}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Nedbetalingstid" hint="Antall år">
              <FormattedNumberInput
                value={termYears}
                onChange={setTermYears}
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
                onChange={setMonthlyRent}
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
                onChange={(e) => setVacancyMonths(e.target.value.replace(".", ","))}
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
                  onChange={(e) => setOwnerOccupiedOverHalf(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
                />
                <span>
                  <span className="text-sm font-medium text-stone-900">
                    Jeg bor i mer enn halvparten av boligen
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    Hybel, etasje eller rom du leier ut — ikke ren utleiebolig.
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
                      onChange={setAlternativeRent}
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
                onChange={setCommonCosts}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Forsikring">
              <FormattedNumberInput
                value={insurance}
                onChange={setInsurance}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Vedlikehold"
              hint="Sett av til reparasjoner og slitasje"
            >
              <FormattedNumberInput
                value={maintenance}
                onChange={setMaintenance}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Kommunale avgifter / eiendomsskatt">
              <FormattedNumberInput
                value={propertyTax}
                onChange={setPropertyTax}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Forvaltningshonorar" hint="Valgfritt">
              <FormattedNumberInput
                value={managementFee}
                onChange={setManagementFee}
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
                onChange={(e) => setTaxRate(e.target.value.replace(".", ","))}
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
                onChange={(e) => setPropertyGrowth(e.target.value.replace(".", ","))}
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
                onChange={(e) => setFundReturn(e.target.value.replace(".", ","))}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Sammenligningsperiode"
              hint="Antall år frem i tid"
            >
              <FormattedNumberInput
                value={projectionYears}
                onChange={setProjectionYears}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </section>
      </div>

      <section className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        {result ? (
          <>
            <div
              className={`rounded-2xl border p-6 ${
                result.coversAllCosts
                  ? "border-green-200 bg-green-50"
                  : showHybridCashFlowWarning
                    ? "border-blue-200 bg-blue-50"
                    : "border-red-200 bg-red-50"
              }`}
            >
              <h2 className="text-lg font-semibold text-stone-900">
                {result.coversAllCosts
                  ? "Leien dekker lån og kostnader"
                  : showHybridCashFlowWarning
                    ? "Utleiedelen dekker ikke alt — men det er ikke hele bildet"
                    : "Leien dekker ikke alle kostnader"}
              </h2>
              <p className="mt-2 text-sm text-stone-600">
                {result.coversAllCosts
                  ? "Du har positiv kontantstrøm før skatt."
                  : showHybridCashFlowWarning
                    ? "Som ren investering ser det svakt ut. Sjekk netto boligkostnad og sammenligning med alternativ leie under."
                    : `Du må skyte inn ca. ${formatCurrency(result.monthlyShortfall)} per måned.`}
              </p>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Månedlig kontantstrøm</dt>
                  <dd
                    className={`text-2xl font-bold ${
                      result.monthlyCashFlow >= 0
                        ? "text-green-800"
                        : showHybridCashFlowWarning
                          ? "text-blue-800"
                          : "text-red-800"
                    }`}
                  >
                    {result.monthlyCashFlow >= 0 ? "+" : ""}
                    {formatCurrency(result.monthlyCashFlow)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Etter estimert skatt</dt>
                  <dd className="font-semibold text-stone-900">
                    {result.cashFlowAfterTaxMonthly >= 0 ? "+" : ""}
                    {formatCurrency(result.cashFlowAfterTaxMonthly)}/mnd
                  </dd>
                </div>
              </dl>
            </div>

            {vurdering && <UtleieboligVurderingPanel vurdering={vurdering} />}

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">Avkastning</h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Brutto leieavkastning</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatPercent(result.grossYieldPercent)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Netto leieavkastning</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatPercent(result.netYieldPercent)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">
                    Kontantavkastning (på egenkapital)
                  </dt>
                  <dd className="text-lg font-semibold text-orange-700">
                    {formatPercent(result.cashOnCashReturnPercent)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">
                Månedlig fordeling
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Leieinntekt (etter tomgang)</dt>
                  <dd className="font-semibold text-green-700">
                    +{formatCurrency(result.effectiveMonthlyRent)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Driftskostnader</dt>
                  <dd className="font-semibold text-stone-900">
                    −{formatCurrency(result.monthlyOperatingCosts)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Lånetermin</dt>
                  <dd className="font-semibold text-stone-900">
                    −{formatCurrency(result.monthlyLoanPayment)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <h2 className="text-lg font-semibold text-stone-900">Nøkkeltall</h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Lånebeløp</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.loanAmount)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Total egenkapital inn</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.equityInvested)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">
                    Break-even leie (før tomgang)
                  </dt>
                  <dd className="font-semibold text-orange-700">
                    {formatCurrency(result.breakEvenMonthlyRent)}/mnd
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Årlig kontantstrøm</dt>
                  <dd className="font-semibold text-stone-900">
                    {result.annualCashFlow >= 0 ? "+" : ""}
                    {formatCurrency(result.annualCashFlow)}
                  </dd>
                </div>
              </dl>
            </div>

            {projection && parsedInput && (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900">
                  Bolig vs. fond etter {parsedInput.projectionYears} år
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  Bolig: verdi − gjeld + oppsamlet kontantstrøm. Fond: egenkapital
                  med forventet avkastning.
                </p>

                <UtleieboligSammenligningChart
                  snapshots={projection.yearSnapshots}
                  projectionYears={parsedInput.projectionYears}
                />

                <dl className="mt-6 space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Nettoformue bolig</dt>
                    <dd className="text-lg font-semibold text-orange-700">
                      {formatCurrency(projection.propertyNetWorth)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 text-xs text-stone-500">
                    <span>Herav boligverdi</span>
                    <span>{formatCurrency(projection.propertyValue)}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 text-xs text-stone-500">
                    <span>Gjenstående lån</span>
                    <span>−{formatCurrency(projection.remainingLoan)}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 text-xs text-stone-500">
                    <span>Oppsamlet kontantstrøm</span>
                    <span>{formatCurrency(projection.cashReserve)}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-stone-100 pt-4">
                    <dt className="text-sm text-stone-600">
                      Fond (kun egenkapital)
                    </dt>
                    <dd className="font-semibold text-stone-900">
                      {formatCurrency(projection.fundNetWorth)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">
                      Fond med samme kontantstrøm
                    </dt>
                    <dd className="font-semibold text-stone-900">
                      {formatCurrency(projection.fundWithMonthlyFlows)}
                    </dd>
                  </div>
                  <p className="text-xs text-stone-500">
                    Alternativ 2: egenkapital i fond, pluss/minus samme månedlige
                    kontantstrøm som boligen gir (overskudd inn, underskudd ut).
                  </p>
                  <div
                    className={`flex items-baseline justify-between gap-4 rounded-xl p-4 ${
                      projection.differenceVsFund >= 0
                        ? "bg-green-50"
                        : "bg-red-50"
                    }`}
                  >
                    <dt className="text-sm font-medium text-stone-800">
                      Bolig slår fond (kun egenkapital) med
                    </dt>
                    <dd
                      className={`text-lg font-bold ${
                        projection.differenceVsFund >= 0
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {projection.differenceVsFund >= 0 ? "+" : ""}
                      {formatCurrency(projection.differenceVsFund)}
                    </dd>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-stone-50 p-3">
                      <dt className="text-xs text-stone-500">Bolig årlig avkastning</dt>
                      <dd className="mt-1 font-semibold text-stone-900">
                        {formatPercent(projection.propertyAnnualizedReturnPercent)}
                      </dd>
                    </div>
                    <div className="rounded-lg bg-stone-50 p-3">
                      <dt className="text-xs text-stone-500">Fond årlig avkastning</dt>
                      <dd className="mt-1 font-semibold text-stone-900">
                        {formatPercent(projection.fundAnnualizedReturnPercent)}
                      </dd>
                    </div>
                  </div>
                  {projection.totalSubsidiesPaid > 0 && (
                    <p className="text-xs text-stone-500">
                      Du må fylle på ca.{" "}
                      {formatCurrency(projection.totalSubsidiesPaid)} totalt over
                      perioden for å holde boligen flytende.
                    </p>
                  )}
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
          Beregningen er veiledende. Skatteestimatet er forenklet. Langsiktig
          sammenligning inkluderer forventet prisvekst, avdrag og kontantstrøm —
          men ikke salgskostnader, formueskatt eller renteendringer. Fondssammenligning
          er forenklet og tar ikke høyde for skatt på fond. Sjekk tallene med bank
          og regnskapsfører før du investerer.
        </p>
      </section>
    </div>
  );
}
