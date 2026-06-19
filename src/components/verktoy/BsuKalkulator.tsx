"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  BSU_MAX_ANNUAL_DEPOSIT,
  BSU_MAX_ANNUAL_TAX_BENEFIT,
  calculateBsu,
} from "@/lib/calculators/bsu";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

export function BsuKalkulator() {
  const [currentBalance, setCurrentBalance] = useState(formatIntegerInput(0));
  const [annualDeposit, setAnnualDeposit] = useState(
    formatIntegerInput(BSU_MAX_ANNUAL_DEPOSIT),
  );
  const [years, setYears] = useState("5");
  const [rate, setRate] = useState("3,5");

  const result = useMemo(() => {
    const parsed = {
      currentBalance: parseIntegerInput(currentBalance) || 0,
      annualDeposit: parseIntegerInput(annualDeposit),
      years: Number(years.replace(/\s/g, "")),
      interestRatePercent: Number(rate.replace(",", ".")),
    };

    if (
      !Number.isFinite(parsed.annualDeposit) ||
      !Number.isFinite(parsed.years) ||
      !Number.isFinite(parsed.interestRatePercent) ||
      parsed.annualDeposit < 0 ||
      parsed.years <= 0 ||
      parsed.interestRatePercent < 0 ||
      parsed.currentBalance < 0
    ) {
      return null;
    }

    return calculateBsu(parsed);
  }, [currentBalance, annualDeposit, years, rate]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">BSU-detaljer</h2>
        <p className="mt-1 text-sm text-stone-600">
          Boligsparing for ungdom, maks {formatIntegerInput(BSU_MAX_ANNUAL_DEPOSIT)} kr
          innskudd per år gir opptil {formatIntegerInput(BSU_MAX_ANNUAL_TAX_BENEFIT)} kr i
          skattefradrag.
        </p>

        <div className="mt-6 space-y-5">
          <CalculatorField label="Saldo i dag" hint="Det du allerede har på BSU">
            <FormattedNumberInput
              value={currentBalance}
              onChange={setCurrentBalance}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Årlig innskudd"
            hint={`Maks ${formatIntegerInput(BSU_MAX_ANNUAL_DEPOSIT)} kr per år`}
          >
            <FormattedNumberInput
              value={annualDeposit}
              onChange={setAnnualDeposit}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField label="Antall år du sparer" hint="Før du fyller 34">
            <FormattedNumberInput
              value={years}
              onChange={setYears}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Forventet rente på BSU"
            hint="Årlig rente i prosent"
          >
            <input
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value.replace(".", ","))}
              className={calculatorInputClassName}
            />
          </CalculatorField>
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">
                Din BSU-sparing
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Saldo på BSU-konto</dt>
                  <dd className="text-lg font-semibold text-stone-900">
                    {formatCurrency(result.bsuBalance)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Totalt innskutt</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.totalDeposits)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Opptjent rente</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.totalInterest)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">
                    Skattefradrag totalt (10 %)
                  </dt>
                  <dd className="font-semibold text-orange-700">
                    {formatCurrency(result.totalTaxBenefit)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <h2 className="text-lg font-semibold text-stone-900">
                Samlet fordel med BSU
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">
                    Konto + skattefradrag
                  </dt>
                  <dd className="text-lg font-semibold text-stone-900">
                    {formatCurrency(result.totalValue)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">
                    Uten BSU (samme sparing)
                  </dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.regularSavingsBalance)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Du er foran med</dt>
                  <dd className="text-lg font-semibold text-orange-700">
                    +{formatCurrency(result.advantageOverRegular)}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
            Fyll inn gyldige verdier for å se resultatet.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Beregningen er veiledende. BSU gir 10 % skattefradrag på innskudd (opptil{" "}
          {formatIntegerInput(BSU_MAX_ANNUAL_TAX_BENEFIT)} kr per år). Pengene må brukes
          til bolig. Sjekk gjeldende regler hos Skatteetaten og banken din.
        </p>
      </section>
    </div>
  );
}
