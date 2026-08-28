"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateLaneKapasitet,
  formatEquityPurchaseFormula,
  formatIncomeLoanFormula,
  formatLaneKapasitetLimit,
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
  const equityPurchaseMultiplierLabel = isPrimaryHome
    ? "10"
    : result?.equityPurchaseMultiplier.toFixed(1).replace(".", ",") ?? "6,7";
  const equityLoanMultiplierLabel = isPrimaryHome
    ? "9"
    : result?.equityLoanMultiplier.toFixed(1).replace(".", ",") ?? "5,7";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className={calculatorPanelClassName}>
        <h2 className="text-lg font-semibold text-stone-900">Dine tall</h2>
        <p className="mt-1 text-sm text-stone-600">
          Banken vurderer egenkapital og inntekt hver for seg. Begge reglene
          trekker fra gjeld du allerede har.
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
            label="Brutto årsinntekt (LØNN)"
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
                    EK × 10 − gjeld
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
                De to reglene
              </h2>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-sm font-medium text-stone-900">
                    EK × {equityPurchaseMultiplierLabel} − gjeld
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-stone-700">
                    {formatEquityPurchaseFormula(
                      parseIntegerInput(equity) || 0,
                      parseIntegerInput(existingDebt) || 0,
                      result.equityPurchaseMultiplier,
                      result.maxPurchaseFromEquity,
                    )}
                  </dd>
                  <dd className="mt-1 text-xs text-stone-500">
                    Maks kjøpesum ut fra egenkapital ({equityPercentLabel}{" "}
                    krav)
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-stone-900">
                    Lønn × {INCOME_DEBT_MULTIPLIER} − gjeld
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-stone-700">
                    {formatIncomeLoanFormula(
                      parseIntegerInput(grossAnnualIncome) || 0,
                      parseIntegerInput(existingDebt) || 0,
                      result.maxLoanFromIncome,
                    )}
                  </dd>
                  <dd className="mt-1 text-xs text-stone-500">
                    Maks nytt lån ut fra inntekt
                  </dd>
                </div>
              </dl>
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
                Slik henger det sammen
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-stone-600">
                    Maks lån fra EK (× {equityLoanMultiplierLabel} − gjeld)
                  </dt>
                  <dd className="font-medium text-stone-900">
                    {formatCurrency(result.maxLoanFromEquity)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-stone-600">
                    Maks lån fra lønn (× {INCOME_DEBT_MULTIPLIER} − gjeld)
                  </dt>
                  <dd className="font-medium text-stone-900">
                    {formatCurrency(result.maxLoanFromIncome)}
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

            <aside className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-sm leading-relaxed text-stone-700">
                Nærmer du deg boligkjøp, kan det lønne seg å holde penger på
                konto som egenkapital fremfor å betale ned billig gjeld. EK × 10
                gir mer kjøpekraft per krone enn lønn × 5.
              </p>
              <Link
                href="/guider/laneramme-for-boligkjop"
                className="mt-3 inline-block text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                Les mer om låneramme før boligkjøp →
              </Link>
            </aside>
          </>
        ) : (
          <div className={`${calculatorPanelClassName} text-sm text-stone-600`}>
            Fyll inn gyldige verdier for å se hvor mye du kan låne.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Beregningen er veiledende og følger Finanstilsynets hovedregler om lønn
          × {INCOME_DEBT_MULTIPLIER} og minst {equityPercentLabel} egenkapital.
          Banken vurderer også betjeningsevne, rentestress og individuelle
          unntak. BSU og bankgaranti kan gi mer rom i praksis.
        </p>
      </section>
    </div>
  );
}
