"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  BSU_MAX_ANNUAL_DEPOSIT,
  BSU_MAX_ANNUAL_TAX_BENEFIT,
  BSU_MAX_SAVING_AGE,
  BSU_MAX_TOTAL_DEPOSIT,
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
  const [totalDeposited, setTotalDeposited] = useState(formatIntegerInput(0));
  const [annualDeposit, setAnnualDeposit] = useState(
    formatIntegerInput(BSU_MAX_ANNUAL_DEPOSIT),
  );
  const [years, setYears] = useState("5");
  const [age, setAge] = useState("25");
  const [rate, setRate] = useState("3,5");
  const [regularRate, setRegularRate] = useState("2,5");
  const [ownsHome, setOwnsHome] = useState(false);
  const [paysEnoughTax, setPaysEnoughTax] = useState(true);
  const [annualTaxAvailable, setAnnualTaxAvailable] = useState(
    formatIntegerInput(BSU_MAX_ANNUAL_TAX_BENEFIT),
  );

  const result = useMemo(() => {
    const parsed = {
      currentBalance: parseIntegerInput(currentBalance) || 0,
      totalDeposited: parseIntegerInput(totalDeposited) || 0,
      annualDeposit: parseIntegerInput(annualDeposit),
      years: Number(years.replace(/\s/g, "")),
      age: Number(age.replace(/\s/g, "")),
      interestRatePercent: Number(rate.replace(",", ".")),
      regularSavingsRatePercent: Number(regularRate.replace(",", ".")),
      ownsHomeOnDecember31: ownsHome,
      paysEnoughTax,
      annualTaxAvailable: parseIntegerInput(annualTaxAvailable) || 0,
    };

    if (
      !Number.isFinite(parsed.annualDeposit) ||
      !Number.isFinite(parsed.years) ||
      !Number.isFinite(parsed.age) ||
      !Number.isFinite(parsed.interestRatePercent) ||
      !Number.isFinite(parsed.regularSavingsRatePercent) ||
      parsed.annualDeposit < 0 ||
      parsed.years <= 0 ||
      parsed.age < 0 ||
      parsed.interestRatePercent < 0 ||
      parsed.regularSavingsRatePercent < 0 ||
      parsed.currentBalance < 0 ||
      parsed.totalDeposited < 0
    ) {
      return null;
    }

    return calculateBsu(parsed);
  }, [
    currentBalance,
    totalDeposited,
    annualDeposit,
    years,
    age,
    rate,
    regularRate,
    ownsHome,
    paysEnoughTax,
    annualTaxAvailable,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-xl border border-stone-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-stone-900">BSU-detaljer</h2>
        <p className="mt-1 text-sm text-stone-600">
          Maks {formatIntegerInput(BSU_MAX_ANNUAL_DEPOSIT)} kr innskudd per år og{" "}
          {formatIntegerInput(BSU_MAX_TOTAL_DEPOSIT)} kr samlet innbetalt. Du kan
          spare til og med året du fyller {BSU_MAX_SAVING_AGE}. Skattefradraget er
          10 % av innskuddet, opptil {formatIntegerInput(BSU_MAX_ANNUAL_TAX_BENEFIT)}{" "}
          kr per år, når vilkårene er oppfylt.
        </p>

        <div className="mt-6 space-y-5">
          <CalculatorField
            label="Saldo på BSU i dag"
            hint="Innskudd pluss opptjente renter"
          >
            <FormattedNumberInput
              value={currentBalance}
              onChange={setCurrentBalance}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Hvor mye har du totalt satt inn?"
            hint={`Uten renter. Maks ${formatIntegerInput(BSU_MAX_TOTAL_DEPOSIT)} kr`}
          >
            <FormattedNumberInput
              value={totalDeposited}
              onChange={setTotalDeposited}
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

          <CalculatorField
            label="Alder i år"
            hint={`Du kan spare til og med året du fyller ${BSU_MAX_SAVING_AGE}`}
          >
            <FormattedNumberInput
              value={age}
              onChange={setAge}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField label="Antall år du planlegger å spare">
            <FormattedNumberInput
              value={years}
              onChange={setYears}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField label="Forventet rente på BSU" hint="Årlig rente i prosent">
            <input
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value.replace(".", ","))}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Rente på vanlig sparekonto"
            hint="Brukes som sammenligning, ikke et fast påslag"
          >
            <input
              type="text"
              inputMode="decimal"
              value={regularRate}
              onChange={(e) => setRegularRate(e.target.value.replace(".", ","))}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <label className="flex items-start gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={ownsHome}
              onChange={(event) => setOwnsHome(event.target.checked)}
              className="mt-0.5 rounded border-stone-300 text-orange-600"
            />
            <span>Eier du bolig 31. desember?</span>
          </label>

          <label className="flex items-start gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={paysEnoughTax}
              onChange={(event) => setPaysEnoughTax(event.target.checked)}
              className="mt-0.5 rounded border-stone-300 text-orange-600"
            />
            <span>Betaler du nok skatt til å bruke hele fradraget?</span>
          </label>

          {!paysEnoughTax && (
            <CalculatorField
              label="Skatt du kan motregne per år"
              hint="Fradraget kan ikke bli høyere enn skatten du faktisk betaler"
            >
              <FormattedNumberInput
                value={annualTaxAvailable}
                onChange={setAnnualTaxAvailable}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          )}
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-xl border border-stone-200 bg-white p-4">
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
                  <dt className="text-sm text-stone-600">Nye innskudd i perioden</dt>
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
                    {result.taxDeductionIncluded
                      ? "Skattefradrag totalt (10 %)"
                      : "Skattefradrag (ikke med)"}
                  </dt>
                  <dd className="font-semibold text-orange-700">
                    {formatCurrency(result.totalTaxBenefit)}
                  </dd>
                </div>
              </dl>
              {result.depositsStoppedEarly && (
                <p className="mt-4 text-sm text-stone-600">
                  Innskuddene stopper når samlet innbetalt BSU når{" "}
                  {formatIntegerInput(BSU_MAX_TOTAL_DEPOSIT)} kr. Renter fortsetter
                  å løpe på saldoen.
                </p>
              )}
              {result.yearsUsed < Number(years.replace(/\s/g, "") || 0) && (
                <p className="mt-2 text-sm text-stone-600">
                  Med oppgitt alder kan du spare i {result.eligibleYears} år til og
                  med året du fyller {BSU_MAX_SAVING_AGE}.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
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
                    Vanlig sparekonto (
                    {result.regularSavingsRatePercent.toFixed(1).replace(".", ",")}{" "}
                    % rente)
                  </dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.regularSavingsBalance)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-orange-200 pt-4">
                  <dt className="text-sm text-stone-600">Fordel fra skattefradrag</dt>
                  <dd className="font-semibold text-orange-700">
                    +{formatCurrency(result.advantageFromTax)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Fordel fra høyere rente</dt>
                  <dd className="font-semibold text-orange-700">
                    +{formatCurrency(result.advantageFromInterest)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-orange-200 pt-4">
                  <dt className="text-sm font-medium text-stone-700">Du er foran med</dt>
                  <dd className="text-lg font-semibold text-orange-700">
                    +{formatCurrency(result.advantageOverRegular)}
                  </dd>
                </div>
              </dl>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600 shadow-sm">
            Fyll inn gyldige verdier for å se resultatet.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Beregningen er veiledende. Innskudd stopper ved{" "}
          {formatIntegerInput(BSU_MAX_TOTAL_DEPOSIT)} kr samlet innbetalt. Fullt
          skattefradrag vises bare når du ikke eier bolig 31. desember og betaler
          nok skatt. Pengene må brukes til bolig. Sjekk gjeldende regler hos
          Skatteetaten og banken din.
        </p>
      </section>
    </div>
  );
}
