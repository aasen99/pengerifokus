"use client";

import { useMemo, useState } from "react";
import {
  compareLoanScenarios,
  formatCurrency,
  formatYearsAndMonths,
} from "@/lib/calculators/loan";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

export function Rentekalkulator() {
  const [principal, setPrincipal] = useState(formatIntegerInput(500000));
  const [rate, setRate] = useState("5,5");
  const [years, setYears] = useState("25");
  const [extra, setExtra] = useState(formatIntegerInput(0));

  const result = useMemo(() => {
    const parsed = {
      principal: parseIntegerInput(principal),
      annualRatePercent: Number(rate.replace(",", ".")),
      termYears: Number(years.replace(/\s/g, "")),
      extraMonthlyPayment: parseIntegerInput(extra),
    };

    if (
      !Number.isFinite(parsed.principal) ||
      !Number.isFinite(parsed.annualRatePercent) ||
      !Number.isFinite(parsed.termYears) ||
      parsed.principal <= 0 ||
      parsed.termYears <= 0 ||
      parsed.annualRatePercent < 0
    ) {
      return null;
    }

    return compareLoanScenarios(parsed);
  }, [principal, rate, years, extra]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Lånedetaljer</h2>
        <p className="mt-1 text-sm text-stone-600">
          Regnestykket forutsetter annuitetslån med månedlige terminer.
        </p>

        <div className="mt-6 space-y-5">
          <CalculatorField label="Lånebeløp" hint="Gjenstående hovedstol i kroner">
            <FormattedNumberInput
              value={principal}
              onChange={setPrincipal}
              className={calculatorInputClassName}
            />
          </CalculatorField>

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
              value={years}
              onChange={setYears}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Ekstra månedlig innbetaling"
            hint="Valgfritt: i tillegg til ordinær termin"
          >
            <FormattedNumberInput
              value={extra}
              onChange={setExtra}
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
                Ordinær nedbetaling
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Månedlig terminbeløp</dt>
                  <dd className="text-lg font-semibold text-stone-900">
                    {formatCurrency(result.standard.monthlyPayment)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Total rentekostnad</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.standard.totalInterest)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Totalt tilbakebetalt</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.standard.totalPaid)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Nedbetalingstid</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatYearsAndMonths(result.standard.termMonths)}
                  </dd>
                </div>
              </dl>
            </div>

            {result.withExtra && (
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
                <h2 className="text-lg font-semibold text-stone-900">
                  Med ekstra innbetaling
                </h2>
                <dl className="mt-5 space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Ny nedbetalingstid</dt>
                    <dd className="font-semibold text-stone-900">
                      {formatYearsAndMonths(result.withExtra.termMonths)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Du sparer i renter</dt>
                    <dd className="text-lg font-semibold text-orange-700">
                      {formatCurrency(result.interestSaved)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Tid spart</dt>
                    <dd className="font-semibold text-orange-700">
                      {formatYearsAndMonths(result.monthsSaved)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Totalt tilbakebetalt</dt>
                    <dd className="font-semibold text-stone-900">
                      {formatCurrency(result.withExtra.totalPaid)}
                    </dd>
                  </div>
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
          Beregningen er veiledende og tar ikke høyde for gebyrer, terminoppgjør
          eller renteendringer. Sjekk alltid med banken din for eksakte tall.
        </p>
      </section>
    </div>
  );
}
