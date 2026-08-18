"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/calculators/loan";
import {
  calculateFeriepenger,
  estimateBaseFromMonthlySalary,
  FERIEPENGE_RATES,
  WORKING_DAYS_PER_MONTH,
  type FerieWeeks,
} from "@/lib/calculators/feriepenger";
import { formatIntegerInput } from "@/lib/format/number";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";
import { InfoTip } from "@/components/verktoy/eie-leie/InfoTip";

type InputMode = "base" | "monthly";

const workingDaysPerMonthLabel = WORKING_DAYS_PER_MONTH.toLocaleString("nb-NO", {
  maximumFractionDigits: 2,
});

function ResultRow({
  label,
  value,
  hint,
  negative = false,
}: {
  label: React.ReactNode;
  value: string;
  hint?: string;
  negative?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-sm text-stone-600">
        {label}
        {hint ? (
          <span className="mt-0.5 block text-xs font-normal text-stone-500">
            {hint}
          </span>
        ) : null}
      </dt>
      <dd className="text-right font-semibold text-stone-900">
        {negative ? `−${value}` : value}
      </dd>
    </div>
  );
}

export function FeriepengeKalkulator() {
  const [inputMode, setInputMode] = useState<InputMode>("base");
  const [base, setBase] = useState(formatIntegerInput(500_000));
  const [monthly, setMonthly] = useState(formatIntegerInput(42_000));
  const [weeks, setWeeks] = useState<FerieWeeks>(5);
  const [over60, setOver60] = useState(false);

  const result = useMemo(() => {
    const resolvedBase =
      inputMode === "base"
        ? parseIntegerInput(base)
        : estimateBaseFromMonthlySalary(parseIntegerInput(monthly));

    if (!Number.isFinite(resolvedBase) || resolvedBase < 0) return null;

    return calculateFeriepenger({
      base: resolvedBase,
      weeks,
      over60,
    });
  }, [inputMode, base, monthly, weeks, over60]);

  const weeks4Rate = over60 ? FERIEPENGE_RATES.weeks4Over60 : FERIEPENGE_RATES.weeks4;
  const weeks5Rate = over60 ? FERIEPENGE_RATES.weeks5Over60 : FERIEPENGE_RATES.weeks5;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-xl border border-stone-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-stone-900">
          Feriepengegrunnlag
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Bruk tallene fra fjorårets lønnsslipp eller sammenstilling. Vet du ikke
          grunnlaget, kan du estimere fra månedslønn. Månedslønnen i juni er den
          samme som du oppgir her, eller grunnlag delt på 12.
        </p>

        <div
          className="mt-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Inndatamodus"
        >
          {(
            [
              { id: "base" as const, label: "Grunnlag" },
              { id: "monthly" as const, label: "Månedslønn" },
            ] as const
          ).map((item) => {
            const active = inputMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setInputMode(item.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-5">
          {inputMode === "base" ? (
            <CalculatorField
              label={
                <span className="inline-flex items-center">
                  Feriepengegrunnlag
                  <InfoTip
                    text="Arbeidsvederlag i opptjeningsåret. Står på lønnsslippen eller den årlige sammenstillingen. Månedslønn i juni anslås som grunnlag delt på 12."
                    label="Mer om feriepengegrunnlag"
                  />
                </span>
              }
              hint="Står på lønnsslippen / årlig sammenstilling"
            >
              <FormattedNumberInput
                value={base}
                onChange={setBase}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          ) : (
            <CalculatorField
              label={
                <span className="inline-flex items-center">
                  Månedslønn (brutto)
                  <InfoTip
                    text="Brukes både til å anslå feriepengegrunnlag (× 12) og som ordinær juni-lønn i utbetalingsoppsettet. Bonus og andre tillegg i fjor kan mangle."
                    label="Mer om månedslønn"
                  />
                </span>
              }
              hint="Estimat: månedslønn × 12. Bonus og andre tillegg kan mangle."
            >
              <FormattedNumberInput
                value={monthly}
                onChange={setMonthly}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          )}

          <div>
            <p className="inline-flex items-center text-sm font-medium text-stone-900">
              Ferielengde
              <InfoTip
                text="Ferieloven gir 4 uker + 1 dag (21 virkedager i 5-dagersuke). Mange har 5 uker (25 virkedager) i avtale. Alle feriedagene trekkes i juni i denne beregningen."
                label="Mer om ferielengde"
              />
            </p>
            <p className="mt-0.5 text-xs text-stone-500">
              De fleste med tariffavtale har 5 uker
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setWeeks(4)}
                className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  weeks === 4
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                4 uker + 1 dag
                <span className="mt-0.5 block text-xs font-normal opacity-80">
                  {weeks4Rate.toLocaleString("nb-NO", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  %
                </span>
              </button>
              <button
                type="button"
                onClick={() => setWeeks(5)}
                className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  weeks === 5
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                5 uker
                <span className="mt-0.5 block text-xs font-normal opacity-80">
                  {weeks5Rate.toLocaleString("nb-NO", {
                    maximumFractionDigits: 1,
                  })}{" "}
                  %
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-3">
            <input
              id="ferie-over-60"
              type="checkbox"
              checked={over60}
              onChange={(e) => setOver60(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
            />
            <div>
              <span className="inline-flex items-center text-sm font-medium text-stone-900">
                <label htmlFor="ferie-over-60" className="cursor-pointer">
                  Fyller 60 år i ferieåret
                </label>
                <InfoTip
                  text="Fra året du fyller 60 har du krav på én ekstra ferieuke (5 virkedager). Satsen øker med 2,3 prosentpoeng, og trekket i juni øker tilsvarende."
                  label="Mer om ekstra ferieuke fra 60 år"
                />
              </span>
              <p className="mt-0.5 text-xs text-stone-500">
                Gir ekstra ferieuke: satsen blir 12,5 % eller 14,3 %, og trekket
                øker med 5 virkedager
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {result ? (
          <>
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
              <h2 className="inline-flex items-center text-lg font-semibold text-stone-900">
                Anslått utbetaling i juni
                <InfoTip
                  text={`Brutto, før skatt. Formel: feriepenger + månedslønn − trekk. Trekk = månedslønn × ${result.holidayDays} / ${workingDaysPerMonthLabel}. Forutsetter at alle feriedagene trekkes i juni.`}
                  label="Mer om anslått utbetaling i juni"
                />
              </h2>
              <p className="mt-1 text-xs text-stone-600">Brutto, før skatt</p>
              <p className="mt-3 text-3xl font-bold text-stone-900">
                {formatCurrency(result.juneGrossPayout)}
              </p>
              <p className="mt-2 text-sm text-stone-700">
                Feriepenger: {formatCurrency(result.feriepenger)} (
                {result.ratePercent.toLocaleString("nb-NO", {
                  maximumFractionDigits: 1,
                })}{" "}
                % av {formatCurrency(result.base)})
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-stone-900">
                Slik er juni satt opp
              </h2>
              <p className="mt-1 text-xs text-stone-500">
                Alle {result.holidayDays} virkedager trekkes i juni (5-dagersuke,{" "}
                {workingDaysPerMonthLabel} dager per måned)
              </p>
              <dl className="mt-5 space-y-4">
                <ResultRow
                  label={
                    <span className="inline-flex items-center">
                      Månedslønn
                      <InfoTip
                        text={
                          inputMode === "monthly"
                            ? "Den brutto månedslønnen du oppga, som arbeidsgiver ellers ville utbetalt i juni."
                            : "Anslått som feriepengegrunnlag delt på 12. Bruk fanen Månedslønn hvis du vil styre juni-lønnen direkte."
                        }
                        label="Mer om månedslønn i oppsettet"
                      />
                    </span>
                  }
                  value={formatCurrency(result.monthlySalary)}
                  hint={
                    inputMode === "base" ? "Grunnlag / 12" : undefined
                  }
                />
                <ResultRow
                  label={
                    <span className="inline-flex items-center">
                      Feriepenger
                      <InfoTip
                        text="Opptjent i fjor, utbetalt i år. Erstatter lønn i ferien, og kommer ikke i tillegg til full juni-lønn."
                        label="Mer om feriepenger i oppsettet"
                      />
                    </span>
                  }
                  value={formatCurrency(result.feriepenger)}
                />
                <ResultRow
                  label={
                    <span className="inline-flex items-center">
                      Trekk {result.baseHolidayDays} feriedager
                      <InfoTip
                        text={`Lønn for feriefraværet. ${result.baseHolidayDays} virkedager × månedslønn / ${workingDaysPerMonthLabel}. ${
                          result.weeks === 5
                            ? "Fem uker etter avtale."
                            : "4 uker + 1 dag etter ferieloven."
                        }`}
                        label="Mer om trekk for feriedager"
                      />
                    </span>
                  }
                  value={formatCurrency(result.baseHolidayDeduction)}
                  negative
                  hint={`månedslønn × ${result.baseHolidayDays} / ${workingDaysPerMonthLabel}`}
                />
                {result.over60 ? (
                  <ResultRow
                    label={
                      <span className="inline-flex items-center">
                        Trekk ekstra uke (60+)
                        <InfoTip
                          text={`Fra 60 år: 5 virkedager ekstra. Trekket er månedslønn × 5 / ${workingDaysPerMonthLabel}. Satsen på feriepengene er samtidig hevet med 2,3 prosentpoeng.`}
                          label="Mer om trekk for ekstra ferieuke fra 60 år"
                        />
                      </span>
                    }
                    value={formatCurrency(result.extraWeekDeduction)}
                    negative
                    hint={`månedslønn × 5 / ${workingDaysPerMonthLabel}`}
                  />
                ) : null}
                <div className="flex items-baseline justify-between gap-4 border-t border-stone-200 pt-4">
                  <dt className="text-sm font-medium text-stone-700">
                    Anslått utbetaling i juni
                  </dt>
                  <dd className="text-lg font-semibold text-stone-900">
                    {formatCurrency(result.juneGrossPayout)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-600 shadow-sm">
              <p>
                Juni-utbetalingen er ikke feriepenger oppå en vanlig
                månedslønn. Feriepengene erstatter lønn mens du har ferie.
                Arbeidsgiver utbetaler feriepengene og trekker samtidig lønn for
                feriedagene, ofte alle på én gang i juni.
              </p>
              <p className="mt-3">
                Med {result.holidayDays} virkedager ferie og{" "}
                {workingDaysPerMonthLabel} virkedager i en gjennomsnittsmåned
                blir trekket {result.holidayDays}/{workingDaysPerMonthLabel} av
                månedslønnen
                {result.holidayDeduction > result.monthlySalary
                  ? " — altså mer enn én månedslønn, fordi fem uker er lengre enn juni"
                  : ""}
                . Formelen: feriepenger + månedslønn − trekk.
              </p>
              <p className="mt-3">
                Når feriepengene utbetales året etter opptjeningen, trekkes
                normalt ikke skatt der og da. Skatten er fordelt på resten av
                årets lønn via skattekortet. Feriepenger er likevel skattepliktig
                inntekt. Tallet over er derfor brutto, ikke det du får inn på
                konto etter skatt.
              </p>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600 shadow-sm">
            Fyll inn gyldige verdier for å se resultatet.
          </div>
        )}

        <p className="text-xs leading-relaxed text-stone-500">
          Veiledende beregning etter vanlige satser i ferieloven / tariff, og
          Skatteetatens modell for trekk i 5-dagersuke (260 virkedager i året).
          Noen trekkes etter 22 eller 26 dager i måneden i stedet. Sjekk alltid
          lønnsslippen og arbeidsavtalen din. Kilder: Arbeidstilsynet,
          Skatteetaten og Altinn.
        </p>
      </section>
    </div>
  );
}
