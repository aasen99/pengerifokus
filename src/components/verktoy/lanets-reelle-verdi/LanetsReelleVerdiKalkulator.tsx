"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_INFLATION_INPUTS,
  DEFAULT_SALARY_GROWTH_INPUTS,
  LRV_DISCLAIMER,
  LRV_GRAPH_NOTE,
  LRV_INTRO,
  LRV_NOMINAL_NOTE,
  LRV_TOOLTIPS,
  SALARY_GROWTH_SHARE_OPTIONS,
} from "@/data/lanets-reelle-verdi";
import { DecimalNumberInput } from "@/components/ui/DecimalNumberInput";
import { IntegerNumberInput } from "@/components/ui/IntegerNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateInflationLoanResult,
  compareLoanStrategies,
  formatLrvCopyText,
  formatMonths,
  formatPercentage,
} from "@/lib/calculators/lanets-reelle-verdi";
import type { InflationLoanInputs, SalaryGrowthLoanInputs } from "@/types/lanets-reelle-verdi";
import { InfoTip } from "@/components/verktoy/eie-leie/InfoTip";
import { BalanceComparisonChart } from "@/components/verktoy/lanets-reelle-verdi/BalanceComparisonChart";
import { RealValueChart } from "@/components/verktoy/lanets-reelle-verdi/RealValueChart";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function sanitizeInflationInput(
  input: InflationLoanInputs,
): InflationLoanInputs {
  return {
    ...input,
    currentDebt: clamp(input.currentDebt || 0, 1_000, 100_000_000),
    years: clamp(Math.round(input.years || 1), 1, 40),
    inflationRate: clamp(input.inflationRate ?? 0, 0, 15),
    nominalInterestRate: clamp(input.nominalInterestRate ?? 0, 0, 25),
  };
}

function sanitizeSalaryInput(
  input: SalaryGrowthLoanInputs,
): SalaryGrowthLoanInputs {
  return {
    ...input,
    repaymentYears: clamp(Math.round(input.repaymentYears || 1), 1, 40),
    salaryGrowthRate: clamp(input.salaryGrowthRate ?? 0, 0, 15),
  };
}

function decimalField(
  label: React.ReactNode,
  value: number,
  onChange: (value: number) => void,
  hint?: string,
  min?: number,
  max?: number,
) {
  return (
    <CalculatorField label={label} hint={hint}>
      <DecimalNumberInput
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={calculatorInputClassName}
      />
    </CalculatorField>
  );
}

export function LanetsReelleVerdiKalkulator() {
  const [inflationInput, setInflationInput] =
    useState<InflationLoanInputs>(DEFAULT_INFLATION_INPUTS);
  const [salaryInput, setSalaryInput] = useState<SalaryGrowthLoanInputs>(
    DEFAULT_SALARY_GROWTH_INPUTS,
  );
  const [salaryEnabled, setSalaryEnabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const inflationResult = useMemo(
    () => calculateInflationLoanResult(sanitizeInflationInput(inflationInput)),
    [inflationInput],
  );

  const salaryComparison = useMemo(() => {
    if (!salaryEnabled) return null;

    const sanitizedInflation = sanitizeInflationInput(inflationInput);
    const sanitizedSalary = sanitizeSalaryInput(salaryInput);

    return compareLoanStrategies({
      ...sanitizedSalary,
      currentDebt: sanitizedInflation.currentDebt,
      nominalInterestRate: sanitizedInflation.nominalInterestRate,
    });
  }, [salaryEnabled, salaryInput, inflationInput]);

  const updateInflation = (patch: Partial<InflationLoanInputs>) => {
    setInflationInput((current) => ({ ...current, ...patch }));
  };

  const updateSalary = (patch: Partial<SalaryGrowthLoanInputs>) => {
    setSalaryInput((current) => ({ ...current, ...patch }));
  };

  const handleReset = () => {
    setInflationInput(DEFAULT_INFLATION_INPUTS);
    setSalaryInput(DEFAULT_SALARY_GROWTH_INPUTS);
    setSalaryEnabled(false);
    setCopied(false);
  };

  const handleCopy = async () => {
    const text = formatLrvCopyText(
      inflationResult,
      inflationInput,
      salaryComparison,
      salaryEnabled,
      salaryInput.salaryGrowthRate,
      salaryInput.salaryGrowthShare,
    );

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const annualIncreasePercent =
    salaryInput.salaryGrowthRate * (salaryInput.salaryGrowthShare / 100);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-stone-200 bg-orange-50/50 p-5 text-sm leading-relaxed text-stone-700">
        <p>{LRV_INTRO}</p>
        <p className="mt-3 text-stone-600">{LRV_NOMINAL_NOTE}</p>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-stone-900">
          Hovedkalkulator
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <CalculatorField
            label="Dagens restgjeld"
            hint="Minimum 1 000 kr"
          >
            <IntegerNumberInput
              value={inflationInput.currentDebt}
              onChange={(value) => updateInflation({ currentDebt: value })}
              min={1_000}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          {decimalField(
            <>
              Forventet årlig inflasjon
              <InfoTip text={LRV_TOOLTIPS.realValue} />
            </>,
            inflationInput.inflationRate,
            (value) => updateInflation({ inflationRate: value }),
            "0–15 %",
            0,
            15,
          )}

          {decimalField(
            <>
              Nominell lånerente
              <InfoTip text={LRV_TOOLTIPS.realInterest} />
            </>,
            inflationInput.nominalInterestRate,
            (value) => updateInflation({ nominalInterestRate: value }),
            "0–25 %",
            0,
            25,
          )}
        </div>

        <CalculatorField
          label="Antall år fremover"
          hint="1–40 år"
        >
          <input
            type="range"
            min={1}
            max={40}
            value={inflationInput.years}
            onChange={(event) =>
              updateInflation({ years: Number(event.target.value) })
            }
            className="w-full accent-orange-600"
          />
          <p className="mt-2 text-2xl font-bold text-stone-900">
            {inflationInput.years} år
          </p>
        </CalculatorField>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-orange-50/60 p-6 shadow-sm sm:p-8">
        <p className="text-sm font-medium uppercase tracking-wider text-orange-800">
          Hovedresultat
        </p>
        <h2 className="mt-3 text-xl font-bold leading-snug text-stone-900 sm:text-2xl">
          {formatCurrency(inflationInput.currentDebt)} om {inflationInput.years}{" "}
          år tilsvarer omtrent{" "}
          {formatCurrency(inflationResult.realDebtValue)} i dagens pengeverdi.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">
          Ved {formatPercentage(inflationInput.inflationRate)} % årlig inflasjon er
          lånets reelle verdi redusert med omtrent{" "}
          {formatCurrency(inflationResult.reductionInRealValue)}, tilsvarende{" "}
          {formatPercentage(inflationResult.reductionPercent)} %.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Nominell gjeld",
              value: formatCurrency(inflationInput.currentDebt),
            },
            {
              label: "Verdi i dagens kroner",
              value: formatCurrency(inflationResult.realDebtValue),
            },
            {
              label: "Reduksjon i realverdi",
              value: formatCurrency(inflationResult.reductionInRealValue),
            },
            {
              label: "Beregnet realrente",
              value: `${formatPercentage(inflationResult.realInterestRate)} %`,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-orange-100 bg-white px-4 py-3"
            >
              <p className="text-xs text-stone-500">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-stone-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold text-stone-900">
          Utvikling år for år
        </h3>
        <div className="mt-5">
          <RealValueChart yearlyValues={inflationResult.yearlyValues} />
        </div>
        <p className="mt-4 text-xs text-stone-500">{LRV_GRAPH_NOTE}</p>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold text-stone-900">
          Hvorfor kan lånet føles lettere over tid?
        </h3>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-stone-600">
          <p>
            Ved et annuitetslån består terminbeløpet normalt av stadig mindre
            renter og stadig mer avdrag. Samtidig vil inflasjon og nominell
            lønnsvekst ofte gjøre at terminbeløpet utgjør en mindre andel av
            inntekten din over tid.
          </p>
          <p>
            Du betaler fortsatt lånet med faktiske kroner, men fremtidige kroner
            har normalt lavere kjøpekraft enn dagens kroner. Derfor kan den
            reelle belastningen av et langsiktig lån falle over tid.
          </p>
          <p>
            Denne effekten kan virke parallelt med at du betaler ned
            hovedstolen og boligen eventuelt stiger i verdi. Lønnsvekst,
            boligprisvekst og fremtidige renter er likevel ikke garantert.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={salaryEnabled}
            onChange={(event) => setSalaryEnabled(event.target.checked)}
            className="mt-1 rounded border-stone-300 text-orange-600"
          />
          <span>
            <span className="block text-base font-semibold text-stone-900">
              Se effekten av å øke innbetalingene med lønnsveksten
            </span>
            <span className="mt-1 block text-sm text-stone-600">
              Vil du bruke lønnsveksten til å bli raskere gjeldfri? Øker du
              innbetalingen når lønnen stiger, kan du betale mer uten at lånet
              nødvendigvis tar en større andel av inntekten.
            </span>
          </span>
        </label>

        {salaryEnabled && (
          <div className="mt-6 space-y-5 border-t border-stone-100 pt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <CalculatorField
                label="Gjenstående nedbetalingstid"
                hint="1–40 år – brukes til ordinært terminbeløp"
              >
                <IntegerNumberInput
                  value={salaryInput.repaymentYears}
                  onChange={(value) => updateSalary({ repaymentYears: value })}
                  min={1}
                  max={40}
                  className={calculatorInputClassName}
                />
              </CalculatorField>

              {decimalField(
                <>
                  Forventet årlig lønnsvekst
                  <InfoTip text={LRV_TOOLTIPS.salaryGrowth} />
                </>,
                salaryInput.salaryGrowthRate,
                (value) => updateSalary({ salaryGrowthRate: value }),
                "0–15 % – brukes ikke som inflasjon",
                0,
                15,
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-stone-900">
                <span className="inline-flex items-center">
                  Hvor mye av lønnsveksten skal brukes på lånet?
                  <InfoTip text={LRV_TOOLTIPS.salaryShare} />
                </span>
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Velger du 100 %, økes låneinnbetalingen med samme prosent som
                den oppgitte lønnsveksten. Velger du 50 %, økes innbetalingen
                med halvparten av lønnsveksten.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SALARY_GROWTH_SHARE_OPTIONS.map((share) => (
                  <button
                    key={share}
                    type="button"
                    onClick={() => updateSalary({ salaryGrowthShare: share })}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      salaryInput.salaryGrowthShare === share
                        ? "bg-orange-100 text-orange-800"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {share} %
                  </button>
                ))}
              </div>
            </div>

            {salaryComparison && (
              <>
                <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-5">
                  <h3 className="text-lg font-semibold text-stone-900">
                    La lønnsveksten betale ned lånet raskere
                  </h3>
                  {salaryComparison.monthsSaved > 0 ? (
                    <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">
                      Dersom du øker innbetalingen med{" "}
                      {formatPercentage(annualIncreasePercent)} % hvert år, kan
                      lånet bli nedbetalt omtrent{" "}
                      {formatMonths(salaryComparison.monthsSaved)} tidligere.
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-stone-700">
                      Med valgt lønnsvekst og andel endres ikke
                      nedbetalingstiden i dette scenarioet.
                    </p>
                  )}

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        label: "Ordinær nedbetalingstid",
                        value: formatMonths(salaryComparison.standard.months),
                      },
                      {
                        label: "Ny beregnet nedbetalingstid",
                        value: formatMonths(
                          salaryComparison.withSalaryGrowth.months,
                        ),
                      },
                      {
                        label: "Tid spart",
                        value: formatMonths(salaryComparison.monthsSaved),
                      },
                      {
                        label: "Renter spart",
                        value: formatCurrency(salaryComparison.interestSaved),
                      },
                      {
                        label: "Ordinære samlede rentekostnader",
                        value: formatCurrency(
                          salaryComparison.standard.totalInterest,
                        ),
                      },
                      {
                        label: "Nye samlede rentekostnader",
                        value: formatCurrency(
                          salaryComparison.withSalaryGrowth.totalInterest,
                        ),
                      },
                      {
                        label: "Opprinnelig månedlig betaling",
                        value: formatCurrency(salaryComparison.monthlyPayment),
                      },
                      {
                        label: "Månedlig betaling etter 5 år",
                        value:
                          salaryComparison.paymentAfter5Years !== null
                            ? formatCurrency(salaryComparison.paymentAfter5Years)
                            : "Lånet er nedbetalt",
                      },
                      {
                        label: "Månedlig betaling etter 10 år",
                        value:
                          salaryComparison.paymentAfter10Years !== null
                            ? formatCurrency(
                                salaryComparison.paymentAfter10Years,
                              )
                            : "Lånet er nedbetalt",
                      },
                      {
                        label: "Samlet ekstra innbetalt beløp",
                        value: formatCurrency(
                          salaryComparison.withSalaryGrowth.extraPaid,
                        ),
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg border border-stone-100 bg-white px-4 py-3"
                      >
                        <p className="text-xs text-stone-500">{item.label}</p>
                        <p className="mt-1 text-sm font-semibold text-stone-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-stone-900">
                    Sammenligning av restgjeld
                  </h3>
                  <div className="mt-5">
                    <BalanceComparisonChart
                      standardSchedule={salaryComparison.standard.schedule}
                      growthSchedule={salaryComparison.withSalaryGrowth.schedule}
                    />
                  </div>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-stone-600">
                  <p>
                    Når lønnen øker, kan du velge å øke låneinnbetalingen
                    tilsvarende. Dersom innbetalingen og lønnen øker med samme
                    prosent, vil lånet i utgangspunktet ta omtrent samme andel
                    av lønnen som tidligere.
                  </p>
                  <p>
                    Forskjellen er at en større del av fremtidig inntekt brukes
                    til å redusere hovedstolen. Det kutter både nedbetalingstiden
                    og rentene du betaler gjennom lånets levetid.
                  </p>
                  <p className="text-xs text-stone-500">
                    Kalkulatoren forutsetter stabil rente og jevn årlig
                    lønnsvekst. Faktisk lønnsutvikling og rente kan avvike.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
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
          onClick={handleReset}
          className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-50"
        >
          Nullstill kalkulator
        </button>
      </div>

      <p className="text-xs leading-relaxed text-stone-500">{LRV_DISCLAIMER}</p>
    </div>
  );
}
