"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import { calculateDopenge } from "@/lib/calculators/dopenge";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

function formatHourly(amount: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function DopengeKalkulator() {
  const [monthlyNet, setMonthlyNet] = useState(formatIntegerInput(38_000));
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState("37,5");
  const [toiletMinutesPerDay, setToiletMinutesPerDay] = useState("15");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [weeksPerYear, setWeeksPerYear] = useState("47");

  const result = useMemo(() => {
    const parsed = {
      monthlyNet: parseIntegerInput(monthlyNet),
      workHoursPerWeek: Number(workHoursPerWeek.replace(",", ".")),
      toiletMinutesPerDay: Number(toiletMinutesPerDay.replace(",", ".")),
      workDaysPerWeek: Number(workDaysPerWeek.replace(",", ".")),
      weeksPerYear: Number(weeksPerYear.replace(",", ".")),
    };

    return calculateDopenge(parsed);
  }, [monthlyNet, workHoursPerWeek, toiletMinutesPerDay, workDaysPerWeek, weeksPerYear]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Jobben din</h2>
        <p className="mt-1 text-sm text-stone-600">
          Vi regner timelønn ut fra det du faktisk får utbetalt, og hvor lang tid
          du tilbringer på do i arbeidstiden.
        </p>

        <div className="mt-6 space-y-5">
          <CalculatorField
            label="Netto lønn per måned"
            hint="Det arbeidsgiveren (indirekte) betaler deg for do-pausen med"
          >
            <FormattedNumberInput
              value={monthlyNet}
              onChange={setMonthlyNet}
              className={calculatorInputClassName}
            />
          </CalculatorField>

          <CalculatorField label="Arbeidstimer per uke" hint="F.eks. 37,5">
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
            label="Minutter på do per arbeidsdag"
            hint="Vær ærlig, ingen dømmer"
          >
            <input
              type="text"
              inputMode="decimal"
              value={toiletMinutesPerDay}
              onChange={(e) =>
                setToiletMinutesPerDay(e.target.value.replace(".", ","))
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

            <CalculatorField label="Arbeidsuker per år" hint="Typisk 47">
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
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <h2 className="text-lg font-semibold text-stone-900">
                Din dopenge
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                Betalt tid på do, per år.
              </p>
              <p className="mt-4 text-4xl font-bold text-stone-900">
                {formatCurrency(result.perYear)}
              </p>
              <p className="mt-2 text-sm text-stone-600">
                ca. {formatCurrency(result.perMonth)} per måned
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">
                Oppdeling
              </h2>
              <dl className="mt-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Per arbeidsdag</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.perWorkday)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">
                    Per do-runde (ca. 5 min)
                  </dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.perVisit)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Per minutt på do</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatCurrency(result.perMinute)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Timelønn (jobb)</dt>
                  <dd className="font-semibold text-stone-900">
                    {formatHourly(result.hourlyRate)} / t
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-stone-100 pt-4">
                  <dt className="text-sm text-stone-600">Andel av årslønn</dt>
                  <dd className="font-semibold text-orange-700">
                    {result.shareOfAnnualIncome < 0.1
                      ? "< 0,1"
                      : result.shareOfAnnualIncome.toLocaleString("nb-NO", {
                          maximumFractionDigits: 1,
                        })}{" "}
                    %
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-stone-600">Do-tid per år</dt>
                  <dd className="font-semibold text-stone-900">
                    {Math.round(result.toiletHoursPerYear)} timer
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-stone-700">
              <span className="font-semibold text-orange-800">Tips: </span>
              Inkluderer du pendling i timelønnen blir do-pausen mindre
              lønnsom, sjekk{" "}
              <Link
                href="/verktoy/tid-er-penger"
                className="font-medium text-orange-700 hover:text-orange-800"
              >
                Tid er penger-kalkulatoren
              </Link>
              .
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
            Fyll inn gyldige tall for å se dopenge.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Dopenger er selvfølgelig en humoristisk måte å se på timelønn på.
          du får betalt for arbeidstid uansett. Beregningen er veiledende og
          forutsetter at do-besøk skjer i betalt arbeidstid.
        </p>
      </section>
    </div>
  );
}
