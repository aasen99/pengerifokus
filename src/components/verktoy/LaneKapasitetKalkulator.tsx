"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateLaneKapasitet,
  formatLaneKapasitetLimit,
  formatNetPositionFormula,
  INCOME_DEBT_MULTIPLIER,
} from "@/lib/calculators/lane-kapasitet";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
  calculatorMutedPanelClassName,
  calculatorPanelClassName,
} from "@/components/verktoy/calculator-ui";

export function LaneKapasitetKalkulator() {
  const [equity, setEquity] = useState(formatIntegerInput(400_000));
  const [existingDebt, setExistingDebt] = useState(formatIntegerInput(0));
  const [grossAnnualIncome, setGrossAnnualIncome] = useState(
    formatIntegerInput(600_000),
  );
  const [isPrimaryHome, setIsPrimaryHome] = useState(true);

  const result = useMemo(() => {
    const parsed = {
      equity: parseIntegerInput(equity),
      existingDebt: parseIntegerInput(existingDebt),
      grossAnnualIncome: parseIntegerInput(grossAnnualIncome),
      isPrimaryHome,
    };

    if (
      !Number.isFinite(parsed.equity) ||
      !Number.isFinite(parsed.existingDebt) ||
      !Number.isFinite(parsed.grossAnnualIncome) ||
      parsed.equity < 0 ||
      parsed.existingDebt < 0 ||
      parsed.grossAnnualIncome < 0
    ) {
      return null;
    }

    return calculateLaneKapasitet(parsed);
  }, [equity, existingDebt, grossAnnualIncome, isPrimaryHome]);

  const equityPercentLabel = isPrimaryHome ? "10 %" : "15 %";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className={calculatorPanelClassName}>
        <h2 className="text-lg font-semibold text-stone-900">Dine tall</h2>
        <p className="mt-1 text-sm text-stone-600">
          Start med egenkapital og gjeld. Deretter sjekker vi inntektsregelen og
          egenkapitalkravet for boligkjøp.
        </p>

        <div className="mt-6 space-y-5">
          <CalculatorField
            label="Egenkapital (EK)"
            hint="Penger du kan bruke som egenkapital: sparekonto, BSU, fond og lignende."
          >
            <FormattedNumberInput
              value={equity}
              onChange={setEquity}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Eksisterende gjeld (GJELD)"
            hint="Boliglån, studielån, forbruksgjeld og annen gjeld du allerede har."
          >
            <FormattedNumberInput
              value={existingDebt}
              onChange={setExistingDebt}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Brutto årsinntekt"
            hint="Samlet bruttoinntekt i husstanden før skatt."
          >
            <FormattedNumberInput
              value={grossAnnualIncome}
              onChange={setGrossAnnualIncome}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-stone-900">
              Type bolig
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 px-3 py-3 has-checked:border-orange-400 has-checked:bg-orange-50">
                <input
                  type="radio"
                  name="home-type"
                  checked={isPrimaryHome}
                  onChange={() => setIsPrimaryHome(true)}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-medium text-stone-900">
                    Egen bolig
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    Minst 10 % egenkapital
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 px-3 py-3 has-checked:border-orange-400 has-checked:bg-orange-50">
                <input
                  type="radio"
                  name="home-type"
                  checked={!isPrimaryHome}
                  onChange={() => setIsPrimaryHome(false)}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-medium text-stone-900">
                    Sekundærbolig
                  </span>
                  <span className="mt-0.5 block text-xs text-stone-500">
                    Minst 15 % egenkapital
                  </span>
                </span>
              </label>
            </div>
          </fieldset>
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className={calculatorPanelClassName}>
              <h2 className="text-lg font-semibold text-stone-900">
                EK − GJELD
              </h2>
              <p className="mt-2 font-mono text-sm text-stone-700">
                {formatNetPositionFormula(
                  parseIntegerInput(equity) || 0,
                  parseIntegerInput(existingDebt) || 0,
                  result.netPosition,
                )}
              </p>
              <p className="mt-3 text-sm text-stone-600">
                Dette er netto posisjonen før vi ser på inntekt og
                egenkapitalkrav. Negativt tall betyr at gjelden er høyere enn
                egenkapitalen du har lagt inn.
              </p>
            </div>

            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
              <h2 className="text-lg font-semibold text-stone-900">
                Anslag: hvor mye kan du låne?
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Maks boliglån</dt>
                  <dd className="text-2xl font-semibold text-stone-900">
                    {formatCurrency(result.maxLoan)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Maks kjøpesum</dt>
                  <dd className="text-lg font-semibold text-stone-900">
                    {formatCurrency(result.maxPurchase)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-orange-200 pt-4">
                  <dt className="text-sm text-stone-600">Det som begrenser</dt>
                  <dd className="text-right text-sm font-medium text-stone-900">
                    {formatLaneKapasitetLimit(result.limitingFactor)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className={calculatorMutedPanelClassName}>
              <h3 className="text-sm font-semibold text-stone-900">
                Slik er regnestykket
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-stone-600">
                    Fra inntekt ({INCOME_DEBT_MULTIPLIER} × brutto inntekt − gjeld)
                  </dt>
                  <dd className="font-medium text-stone-900">
                    {formatCurrency(result.maxLoanFromIncome)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-stone-600">
                    Fra egenkapital ({equityPercentLabel} krav)
                  </dt>
                  <dd className="font-medium text-stone-900">
                    {formatCurrency(result.maxLoanFromEquity)}
                  </dd>
                </div>
                {result.debtToIncomeRatioAfter !== null && result.maxLoan > 0 && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-stone-600">Gjeldsgrad etter lån</dt>
                    <dd className="font-medium text-stone-900">
                      {result.debtToIncomeRatioAfter
                        .toFixed(1)
                        .replace(".", ",")}
                      × inntekt
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        ) : (
          <div className={`${calculatorPanelClassName} text-sm text-stone-600`}>
            Fyll inn gyldige verdier for å se hvor mye du kan låne.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Beregningen er veiledende og følger Finanstilsynets hovedregler om{" "}
          {INCOME_DEBT_MULTIPLIER} ganger bruttoinntekt og minst {equityPercentLabel}{" "}
          egenkapital. Banken vurderer også betjeningsevne, rentestress og
          individuelle unntak. BSU og bankgaranti kan gi mer rom i praksis.
        </p>
      </section>
    </div>
  );
}
