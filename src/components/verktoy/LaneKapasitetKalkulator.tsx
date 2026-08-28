"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateLaneKapasitet,
  formatLaneKapasitetLimit,
  getEquityPurchaseMultiplier,
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
  calculatorPanelClassName,
} from "@/components/verktoy/calculator-ui";

function RuleRow({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 rounded-lg px-3 py-2 ${
        active ? "bg-orange-50 ring-1 ring-orange-200" : ""
      }`}
    >
      <dt className="text-sm text-stone-600">{label}</dt>
      <dd
        className={`text-right text-sm font-medium ${
          active ? "text-stone-900" : "text-stone-700"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

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

  const purchaseMultiplier = getEquityPurchaseMultiplier(isPrimaryHome);
  const purchaseMultiplierLabel = Number.isInteger(purchaseMultiplier)
    ? String(purchaseMultiplier)
    : purchaseMultiplier.toFixed(1).replace(".", ",");

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className={calculatorPanelClassName}>
        <h2 className="text-lg font-semibold text-stone-900">Dine tall</h2>
        <p className="mt-1 text-sm text-stone-600">
          Fyll inn egenkapital, gjeld og brutto lønn. Kalkulatoren bruker de to
          vanligste tommelfingerreglene banken legger til grunn.
        </p>

        <div className="mt-6 space-y-5">
          <CalculatorField
            label="Egenkapital"
            hint="Penger du kan bruke som egenkapital ved kjøp."
          >
            <FormattedNumberInput
              value={equity}
              onChange={setEquity}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Eksisterende gjeld"
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
            hint="Samlet brutto lønn i husstanden."
          >
            <FormattedNumberInput
              value={grossAnnualIncome}
              onChange={setGrossAnnualIncome}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField label="Type bolig">
            <select
              value={isPrimaryHome ? "primary" : "secondary"}
              onChange={(event) =>
                setIsPrimaryHome(event.target.value === "primary")
              }
              className={calculatorInputClassName}
            >
              <option value="primary">Egen bolig (minst 10 % egenkapital)</option>
              <option value="secondary">
                Sekundærbolig (minst 15 % egenkapital)
              </option>
            </select>
          </CalculatorField>
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
              <p className="text-sm font-medium text-stone-700">Ditt anslag</p>
              <dl className="mt-4 space-y-4">
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
              </dl>
              <p className="mt-4 border-t border-orange-200 pt-4 text-sm text-stone-700">
                Begrenses av{" "}
                <span className="font-medium text-stone-900">
                  {formatLaneKapasitetLimit(result.limitingFactor)}
                </span>
                .
              </p>
            </div>

            <div className={calculatorPanelClassName}>
              <h2 className="text-sm font-semibold text-stone-900">
                Tommelfingerreglene
              </h2>
              <dl className="mt-3 space-y-2">
                <RuleRow
                  label={`Egenkapital: × ${purchaseMultiplierLabel} → kjøpesum`}
                  value={formatCurrency(result.maxPurchaseFromEquity)}
                  active={result.limitingFactor === "egenkapital"}
                />
                <RuleRow
                  label={`Inntekt: lønn × ${INCOME_DEBT_MULTIPLIER} − gjeld → lån`}
                  value={formatCurrency(result.maxLoanFromIncome)}
                  active={result.limitingFactor === "inntekt"}
                />
                <RuleRow
                  label="Inntekt + egenkapital → kjøpesum"
                  value={formatCurrency(result.maxPurchaseFromIncome)}
                  active={result.limitingFactor === "inntekt"}
                />
              </dl>
              <p className="mt-4 text-sm text-stone-600">
                Banken tar det laveste av reglene. Egen bolig regnes med minst{" "}
                {Math.round(result.equityRequirementPercent * 100)} % egenkapital.
              </p>
            </div>

            <p className="text-sm text-stone-600">
              Annen gjeld reduserer lånerommet gjennom femgangersregelen, ikke
              egenkapitalgrensen.{" "}
              <Link
                href="/guider/laneramme-for-boligkjop"
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                Les mer
              </Link>
            </p>
          </>
        ) : (
          <div className={`${calculatorPanelClassName} text-sm text-stone-600`}>
            Fyll inn gyldige verdier for å se hvor mye du kan låne.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Veiledende beregning. Banken vurderer også betjeningsevne, rentestress
          og individuelle unntak.
        </p>
      </section>
    </div>
  );
}
