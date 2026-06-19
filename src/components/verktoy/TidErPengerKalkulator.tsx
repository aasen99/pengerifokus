"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateTidErPenger,
  grossToNetMonthly,
  minutesOfLifeForPurchase,
} from "@/lib/calculators/tid-er-penger";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

type IncomeMode = "net" | "gross";

function formatHourly(amount: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  const hours = Math.floor(minutes / 60);
  const rest = Math.round(minutes % 60);
  return rest > 0 ? `${hours} t ${rest} min` : `${hours} t`;
}

export function TidErPengerKalkulator() {
  const [incomeMode, setIncomeMode] = useState<IncomeMode>("net");
  const [monthlyNet, setMonthlyNet] = useState(formatIntegerInput(38_000));
  const [monthlyGross, setMonthlyGross] = useState(formatIntegerInput(52_000));
  const [taxPercent, setTaxPercent] = useState("27");
  const [monthlyWorkCosts, setMonthlyWorkCosts] = useState(
    formatIntegerInput(2_500),
  );
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState("37,5");
  const [commuteMinutesPerDay, setCommuteMinutesPerDay] = useState("60");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [weeksPerYear, setWeeksPerYear] = useState("47");
  const [examplePurchase, setExamplePurchase] = useState(formatIntegerInput(500));

  const result = useMemo(() => {
    const parsedTax = Number(taxPercent.replace(",", "."));
    const parsedWorkHours = Number(workHoursPerWeek.replace(",", "."));
    const parsedCommute = Number(commuteMinutesPerDay.replace(",", "."));
    const parsedWorkDays = Number(workDaysPerWeek.replace(",", "."));
    const parsedWeeks = Number(weeksPerYear.replace(",", "."));

    const net =
      incomeMode === "net"
        ? parseIntegerInput(monthlyNet)
        : grossToNetMonthly(
            parseIntegerInput(monthlyGross),
            parsedTax,
          );

    const costs = parseIntegerInput(monthlyWorkCosts) || 0;

    if (
      !Number.isFinite(net) ||
      !Number.isFinite(parsedWorkHours) ||
      !Number.isFinite(parsedCommute) ||
      !Number.isFinite(parsedWorkDays) ||
      !Number.isFinite(parsedWeeks) ||
      net <= 0 ||
      parsedWorkHours <= 0 ||
      parsedCommute < 0 ||
      parsedWorkDays <= 0 ||
      parsedWeeks <= 0 ||
      costs < 0
    ) {
      return null;
    }

    return calculateTidErPenger({
      monthlyNet: net,
      monthlyWorkCosts: costs,
      workHoursPerWeek: parsedWorkHours,
      commuteMinutesPerDay: parsedCommute,
      workDaysPerWeek: parsedWorkDays,
      weeksPerYear: parsedWeeks,
    });
  }, [
    incomeMode,
    monthlyNet,
    monthlyGross,
    taxPercent,
    monthlyWorkCosts,
    workHoursPerWeek,
    commuteMinutesPerDay,
    workDaysPerWeek,
    weeksPerYear,
  ]);

  const purchaseMinutes = useMemo(() => {
    if (!result) return null;
    const amount = parseIntegerInput(examplePurchase);
    if (!Number.isFinite(amount) || amount <= 0) return null;
    return minutesOfLifeForPurchase(amount, result.realHourly);
  }, [result, examplePurchase]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Din situasjon</h2>
        <p className="mt-1 text-sm text-stone-600">
          Regn med det du faktisk sitter igjen med, og tiden jobben tar utover
          arbeidstiden.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <p className="text-sm font-medium text-stone-900">Inntekt</p>
            <div
              className="mt-2 flex rounded-lg border border-stone-200 bg-stone-50 p-0.5"
              role="group"
              aria-label="Inntektsgrunnlag"
            >
              <button
                type="button"
                onClick={() => setIncomeMode("net")}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  incomeMode === "net"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Netto
              </button>
              <button
                type="button"
                onClick={() => setIncomeMode("gross")}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  incomeMode === "gross"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Brutto + skatt
              </button>
            </div>
          </div>

          {incomeMode === "net" ? (
            <CalculatorField
              label="Netto lønn per måned"
              hint="Det som kommer på konto etter skatt"
            >
              <FormattedNumberInput
                value={monthlyNet}
                onChange={setMonthlyNet}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          ) : (
            <>
              <CalculatorField label="Brutto lønn per måned">
                <FormattedNumberInput
                  value={monthlyGross}
                  onChange={setMonthlyGross}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              <CalculatorField
                label="Skatt og avgifter"
                hint="Grovt estimat i prosent av brutto"
              >
                <input
                  type="text"
                  inputMode="decimal"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(e.target.value.replace(".", ","))}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </>
          )}

          <CalculatorField
            label="Jobbutgifter per måned"
            hint="Pendling, parkering, lunsj, klær, det jobben koster deg"
          >
            <FormattedNumberInput
              value={monthlyWorkCosts}
              onChange={setMonthlyWorkCosts}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Arbeidstimer per uke"
            hint="Faktisk jobbtid, f.eks. 37,5"
          >
            <input
              type="text"
              inputMode="decimal"
              value={workHoursPerWeek}
              onChange={(e) =>
                setWorkHoursPerWeek(e.target.value.replace(".", ","))
              }
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField
            label="Reisetid per dag"
            hint="Tur/retur jobb i minutter"
          >
            <input
              type="text"
              inputMode="decimal"
              value={commuteMinutesPerDay}
              onChange={(e) =>
                setCommuteMinutesPerDay(e.target.value.replace(".", ","))
              }
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <div className="grid gap-5 sm:grid-cols-2">
            <CalculatorField label="Arbeidsdager per uke">
              <input
                type="text"
                inputMode="decimal"
                value={workDaysPerWeek}
                onChange={(e) =>
                  setWorkDaysPerWeek(e.target.value.replace(".", ","))
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Arbeidsuker per år"
              hint="Typisk 47 med ferie"
            >
              <input
                type="text"
                inputMode="decimal"
                value={weeksPerYear}
                onChange={(e) =>
                  setWeeksPerYear(e.target.value.replace(".", ","))
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">
                Din reelle timelønn
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                Etter jobbutgifter og med reisetid inkludert.
              </p>

              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">
                    «Enkel» timelønn (kun jobbtid)
                  </dt>
                  <dd className="font-semibold text-stone-900">
                    {formatHourly(result.nominalHourly)} / t
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-stone-100 pt-4">
                  <dt className="text-sm font-medium text-stone-900">
                    Reell timelønn
                  </dt>
                  <dd className="text-2xl font-bold text-stone-900">
                    {formatHourly(result.realHourly)} / t
                  </dd>
                </div>
                {result.hourlyDifference > 0 && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-stone-600">Forskjell</dt>
                    <dd className="font-semibold text-orange-700">
                      −{formatHourly(result.hourlyDifference)} / t
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <h2 className="text-lg font-semibold text-stone-900">
                Hva tiden din betyr
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">
                    Timer jobb + pendling per år
                  </dt>
                  <dd className="font-semibold text-stone-900">
                    {Math.round(result.totalHoursPerYear)} t
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Derav reisetid</dt>
                  <dd className="font-semibold text-stone-900">
                    {Math.round(result.commuteHoursPerYear)} t (
                    {Math.round(result.commuteShareOfTime)} %)
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">
                    Netto igjen etter jobbutgifter
                  </dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.adjustedAnnualNet)} / år
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">
                Hva koster et kjøp i tid?
              </h2>
              <CalculatorField label="Eksempelkjøp" hint="F.eks. takeaway eller nytt utstyr">
                <FormattedNumberInput
                  value={examplePurchase}
                  onChange={setExamplePurchase}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
              {purchaseMinutes !== null && (
                <p className="mt-4 text-sm text-stone-700">
                  <span className="font-semibold text-stone-900">
                    {formatCurrency(parseIntegerInput(examplePurchase))}
                  </span>{" "}
                  tilsvarer ca.{" "}
                  <span className="font-semibold text-orange-700">
                    {formatMinutes(purchaseMinutes)}
                  </span>{" "}
                  av livet ditt på jobb (inkl. pendling).
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
            Fyll inn gyldige verdier for å se resultatet.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Beregningen er veiledende. Skatt estimert grovt ved brutto, bruk netto
          lønn for mest nøyaktig resultat. Jobbutgifter og reisetid varierer
          mye fra person til person.
        </p>
      </section>
    </div>
  );
}
