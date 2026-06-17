"use client";

import { useMemo, useState } from "react";
import {
  createDefaultEieLeieInput,
  EIE_LEIE_INTRO_NOTE,
  EIE_LEIE_TOOLTIPS,
  GROWTH_PRESETS,
  INVESTMENT_PRESETS,
  SCENARIO_PRESETS,
  WIZARD_STEPS,
} from "@/data/eie-leie";
import { decimalsRoughlyEqual } from "@/lib/format/decimal";
import { DecimalNumberInput } from "@/components/ui/DecimalNumberInput";
import { IntegerNumberInput } from "@/components/ui/IntegerNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";
import {
  calculateDocumentFee,
  calculateEieLeie,
  calculateLoanAmount,
  calculateStartInvestment,
  calculateTotalFinancedAmount,
  calculateTotalPurchaseCosts,
} from "@/lib/calculators/eie-leie";
import { formatCurrency } from "@/lib/calculators/loan";
import type { EieLeieInput, EieLeieMode, ScenarioPreset } from "@/types/eie-leie";
import { EieLeieResultView } from "@/components/verktoy/eie-leie/EieLeieResultView";
import { InfoTip } from "@/components/verktoy/eie-leie/InfoTip";

function integerField(
  label: string,
  value: number,
  onChange: (value: number) => void,
  hint?: string,
  tooltip?: string,
) {
  return (
    <CalculatorField
      label={
        tooltip ? (
          <span className="inline-flex items-center">
            {label}
            <InfoTip text={tooltip} />
          </span>
        ) : (
          label
        )
      }
      hint={hint}
    >
      <IntegerNumberInput
        value={value}
        onChange={onChange}
        className={calculatorInputClassName}
      />
    </CalculatorField>
  );
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

function PresetButtons({
  presets,
  current,
  onSelect,
  suffix = "%",
}: {
  presets: ReadonlyArray<{ label: string; value: number }>;
  current: number;
  onSelect: (value: number) => void;
  suffix?: string;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {presets.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => onSelect(preset.value)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            decimalsRoughlyEqual(current, preset.value)
              ? "bg-orange-100 text-orange-800"
              : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          {preset.label} ({preset.value}
          {suffix})
        </button>
      ))}
    </div>
  );
}

export function EieLeieKalkulator() {
  const [mode, setMode] = useState<EieLeieMode>("simple");
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<EieLeieInput>(createDefaultEieLeieInput);
  const [showResult, setShowResult] = useState(false);
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioPreset | null>("normal");

  const update = (patch: Partial<EieLeieInput>) => {
    setInput((current) => {
      const next = { ...current, ...patch };
      if (
        patch.isBorettslag !== undefined ||
        patch.autoDocumentFee !== undefined ||
        patch.purchasePrice !== undefined
      ) {
        next.documentFee = calculateDocumentFee(next);
      }
      return next;
    });
  };

  const applyScenario = (preset: ScenarioPreset) => {
    const values = SCENARIO_PRESETS[preset];
    setSelectedScenario(preset);
    update({
      propertyGrowthPercent: values.propertyGrowthPercent,
      nominalRatePercent: values.nominalRatePercent,
      investmentReturnPercent: values.investmentReturnPercent,
    });
  };

  const result = useMemo(() => {
    if (!showResult) return null;
    return calculateEieLeie(input);
  }, [showResult, input]);

  const loanAmount = calculateLoanAmount(input);
  const totalFinanced = calculateTotalFinancedAmount(input);
  const totalPurchaseCosts = calculateTotalPurchaseCosts(input);
  const startInvestment = calculateStartInvestment(input);
  const currentStep = WIZARD_STEPS[step];

  const goNext = () => {
    if (step < WIZARD_STEPS.length - 2) {
      setStep((value) => value + 1);
      return;
    }
    setShowResult(true);
  };

  const goBack = () => {
    if (showResult) {
      setShowResult(false);
      setStep(WIZARD_STEPS.length - 2);
      return;
    }
    setStep((value) => Math.max(0, value - 1));
  };

  const restart = () => {
    setInput(createDefaultEieLeieInput());
    setMode("simple");
    setStep(0);
    setShowResult(false);
    setSelectedScenario("normal");
  };

  if (showResult && result) {
    return (
      <EieLeieResultView
        input={input}
        result={result}
        onRestart={restart}
        onEdit={() => setShowResult(false)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-stone-200 bg-orange-50/50 p-5 text-sm leading-relaxed text-stone-700">
        {EIE_LEIE_INTRO_NOTE}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(["simple", "advanced"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === value
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {value === "simple" ? "Enkel" : "Avansert"}
            </button>
          ))}
        </div>
        <p className="text-sm font-medium text-stone-600">
          Steg {step + 1} av {WIZARD_STEPS.length - 1}: {currentStep?.title}
        </p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full bg-orange-500 transition-all"
          style={{
            width: `${((step + 1) / (WIZARD_STEPS.length - 1)) * 100}%`,
          }}
        />
      </div>

      <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-stone-900">Tidshorisont</h2>
            <CalculatorField
              label="Antall år du planlegger å bo der"
              hint="1–30 år. Kjøp og salg har store engangskostnader."
            >
              <input
                type="range"
                min={1}
                max={30}
                value={input.horizonYears}
                onChange={(event) =>
                  update({ horizonYears: Number(event.target.value) })
                }
                className="w-full accent-orange-600"
              />
              <p className="mt-2 text-2xl font-bold text-stone-900">
                {input.horizonYears} år
              </p>
            </CalculatorField>

            <div>
              <p className="text-sm font-medium text-stone-900">Scenario</p>
              <p className="mt-1 text-xs text-stone-500">
                Hurtigvalg for boligprisvekst, rente og investeringsavkastning.
                Alle verdier kan endres i senere steg.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(SCENARIO_PRESETS) as ScenarioPreset[]).map(
                  (preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => applyScenario(preset)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        selectedScenario === preset
                          ? "border-orange-300 bg-orange-100 text-orange-900"
                          : "border-stone-200 bg-stone-50 text-stone-800 hover:border-orange-200 hover:bg-orange-50"
                      }`}
                    >
                      {SCENARIO_PRESETS[preset].label}
                    </button>
                  ),
                )}
              </div>
              {selectedScenario && (
                <div className="mt-4 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                  <p className="font-medium text-stone-900">
                    Valgt scenario: {SCENARIO_PRESETS[selectedScenario].label}
                  </p>
                  <p className="mt-1">
                    Boligprisvekst {input.propertyGrowthPercent} % · Rente{" "}
                    {input.nominalRatePercent} % · Investeringsavkastning{" "}
                    {input.investmentReturnPercent} %
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-stone-900">
              Boligen du vurderer å kjøpe
            </h2>
            {integerField("Kjøpesum", input.purchasePrice, (value) =>
              update({ purchasePrice: value }),
            )}
            {integerField("Egenkapital", input.equity, (value) =>
              update({ equity: value }),
            )}
            <div className="rounded-xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
              <p>
                Lånebeløp:{" "}
                <strong className="text-stone-900">
                  {formatCurrency(loanAmount)}
                </strong>
              </p>
              <p className="mt-1">
                Totalt finansiert boligbeløp:{" "}
                <strong className="text-stone-900">
                  {formatCurrency(totalFinanced)}
                </strong>
              </p>
            </div>

            {mode === "advanced" && (
              <>
                {integerField(
                  "Fellesgjeld",
                  input.sharedDebt,
                  (value) => update({ sharedDebt: value }),
                  "Gjeld i borettslag eller sameie",
                  EIE_LEIE_TOOLTIPS.sharedDebt,
                )}
                <label className="flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    checked={input.isBorettslag}
                    onChange={(event) =>
                      update({
                        isBorettslag: event.target.checked,
                        autoDocumentFee: !event.target.checked,
                      })
                    }
                    className="rounded border-stone-300 text-orange-600"
                  />
                  Borettslag (ingen dokumentavgift)
                </label>
                {integerField(
                  "Dokumentavgift",
                  calculateDocumentFee(input),
                  (value) =>
                    update({ documentFee: value, autoDocumentFee: false }),
                  input.autoDocumentFee
                    ? "Beregnes automatisk (2,5 % av kjøpesum)"
                    : "Manuelt beløp",
                  EIE_LEIE_TOOLTIPS.documentFee,
                )}
                {integerField(
                  "Tinglysing og gebyrer",
                  input.registrationAndFees,
                  (value) => update({ registrationAndFees: value }),
                )}
                {integerField(
                  "Etableringskostnader på lån",
                  input.loanEstablishmentCost,
                  (value) => update({ loanEstablishmentCost: value }),
                )}
                {integerField(
                  "Andre kjøpskostnader",
                  input.otherPurchaseCosts,
                  (value) => update({ otherPurchaseCosts: value }),
                )}
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-stone-900">Boliglån</h2>
            {decimalField(
              "Nominell rente",
              input.nominalRatePercent,
              (value) => update({ nominalRatePercent: value }),
              "Årlig rente i prosent",
              0,
              25,
            )}
            <CalculatorField label="Nedbetalingstid" hint="Antall år">
              <IntegerNumberInput
                value={input.loanTermYears}
                onChange={(value) => update({ loanTermYears: value })}
                min={1}
                max={40}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            {mode === "advanced" && (
              <>
                <CalculatorField label="Lånetype">
                  <select
                    value={input.loanType}
                    onChange={(event) =>
                      update({
                        loanType: event.target.value as EieLeieInput["loanType"],
                      })
                    }
                    className={calculatorInputClassName}
                  >
                    <option value="annuitet">Annuitetslån</option>
                    <option value="serie">Serielån</option>
                  </select>
                </CalculatorField>
                <CalculatorField
                  label="Rentefri eller avdragsfri periode"
                  hint="Antall måneder i starten"
                >
                  <IntegerNumberInput
                    value={input.interestOnlyMonths}
                    onChange={(value) => update({ interestOnlyMonths: value })}
                    min={0}
                    className={calculatorInputClassName}
                  />
                </CalculatorField>
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-stone-900">
              Månedlige eierkostnader
            </h2>
            {integerField(
              "Felleskostnader",
              input.commonFees,
              (value) => update({ commonFees: value }),
            )}

            {mode === "advanced" && (
              <>
                {integerField(
                  "Kommunale avgifter",
                  input.municipalFees,
                  (value) => update({ municipalFees: value }),
                )}
                {integerField(
                  "Eiendomsskatt",
                  input.propertyTax,
                  (value) => update({ propertyTax: value }),
                )}
                {integerField(
                  "Forsikring",
                  input.insurance,
                  (value) => update({ insurance: value }),
                )}
                <label className="flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    checked={input.includeUtilities}
                    onChange={(event) =>
                      update({ includeUtilities: event.target.checked })
                    }
                    className="rounded border-stone-300 text-orange-600"
                  />
                  Inkluder strøm og oppvarming i sammenligningen
                </label>
                {input.includeUtilities &&
                  integerField(
                    "Strøm og oppvarming",
                    input.utilities,
                    (value) => update({ utilities: value }),
                  )}
                <label className="flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    checked={input.includeInternet}
                    onChange={(event) =>
                      update({ includeInternet: event.target.checked })
                    }
                    className="rounded border-stone-300 text-orange-600"
                  />
                  Inkluder internett i sammenligningen
                </label>
                {input.includeInternet &&
                  integerField(
                    "Internett",
                    input.internet,
                    (value) => update({ internet: value }),
                  )}
              </>
            )}

            {mode === "advanced" ? (
              <>
                <CalculatorField label="Vedlikehold">
                  <select
                    value={input.maintenanceMode}
                    onChange={(event) =>
                      update({
                        maintenanceMode: event.target
                          .value as EieLeieInput["maintenanceMode"],
                      })
                    }
                    className={calculatorInputClassName}
                  >
                    <option value="percent">Prosent av boligverdien per år</option>
                    <option value="fixed">Fast beløp per måned</option>
                  </select>
                </CalculatorField>
                {input.maintenanceMode === "percent" ? (
                  decimalField(
                    <span className="inline-flex items-center">
                      Vedlikehold per år
                      <InfoTip text={EIE_LEIE_TOOLTIPS.maintenance} />
                    </span>,
                    input.maintenancePercentAnnual,
                    (value) => update({ maintenancePercentAnnual: value }),
                    "Standard 1 % av boligverdien",
                  )
                ) : (
                  integerField(
                    "Vedlikehold per måned",
                    input.maintenanceMonthly,
                    (value) => update({ maintenanceMonthly: value }),
                    undefined,
                    EIE_LEIE_TOOLTIPS.maintenance,
                  )
                )}
              </>
            ) : null}

            <CalculatorField
              label={
                <span className="inline-flex items-center">
                  Forventet boligprisvekst
                  <InfoTip text={EIE_LEIE_TOOLTIPS.propertyGrowth} />
                </span>
              }
              hint="Årlig vekst i prosent"
            >
              <DecimalNumberInput
                value={input.propertyGrowthPercent}
                onChange={(value) => update({ propertyGrowthPercent: value })}
                className={calculatorInputClassName}
              />
              <PresetButtons
                presets={GROWTH_PRESETS}
                current={input.propertyGrowthPercent}
                onSelect={(value) => update({ propertyGrowthPercent: value })}
              />
            </CalculatorField>

            {mode === "advanced" &&
              decimalField(
                <span className="inline-flex items-center">
                  Salgskostnader
                  <InfoTip text={EIE_LEIE_TOOLTIPS.saleCosts} />
                </span>,
                input.saleCostPercent,
                (value) =>
                  update({ saleCostPercent: value, saleCostMode: "percent" }),
                "Prosent av salgsprisen ved slutten av perioden",
              )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-stone-900">Leiealternativet</h2>
            {integerField(
              "Husleie per måned",
              input.monthlyRent,
              (value) => update({ monthlyRent: value }),
            )}

            {mode === "advanced" && (
              <>
                {decimalField(
                  "Årlig husleieøkning",
                  input.annualRentIncreasePercent,
                  (value) => update({ annualRentIncreasePercent: value }),
                  "Forventet økning i prosent per år",
                )}
                {integerField(
                  "Depositum",
                  input.depositAmount,
                  (value) => update({ depositAmount: value }),
                  "Pengene er bundet, men ikke en ren kostnad",
                )}
                {decimalField(
                  "Avkastning på depositum",
                  input.depositReturnPercent,
                  (value) => update({ depositReturnPercent: value }),
                  "Årlig rente i prosent",
                )}
              </>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-stone-900">Investering</h2>
            <div className="rounded-xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
              <p>
                Tilgjengelig startbeløp for investering ved leie:{" "}
                <strong className="text-stone-900">
                  {formatCurrency(startInvestment)}
                </strong>
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Egenkapital + kjøpskostnader − depositum. Månedlig forskjell
                investeres når leie er billigere enn eie.
              </p>
            </div>

            <CalculatorField
              label={
                <span className="inline-flex items-center">
                  Forventet årlig avkastning
                  <InfoTip text={EIE_LEIE_TOOLTIPS.alternativeReturn} />
                </span>
              }
              hint="Ikke garantert – brukes for sammenligning"
            >
              <DecimalNumberInput
                value={input.investmentReturnPercent}
                onChange={(value) => update({ investmentReturnPercent: value })}
                className={calculatorInputClassName}
              />
              <PresetButtons
                presets={INVESTMENT_PRESETS}
                current={input.investmentReturnPercent}
                onSelect={(value) => update({ investmentReturnPercent: value })}
              />
            </CalculatorField>

            {mode === "advanced" &&
              decimalField(
                "Årlig kostnad på investering",
                input.investmentCostPercent,
                (value) => update({ investmentCostPercent: value }),
                "F.eks. fondskostnad i prosent",
              )}

            <div className="rounded-xl border border-stone-100 bg-stone-50 px-4 py-3 text-xs text-stone-600">
              <p className="font-medium text-stone-800">Forutsetninger i enkel modus</p>
              <ul className="mt-2 space-y-1">
                <li>Dokumentavgift: {formatCurrency(calculateDocumentFee(input))}</li>
                <li>Kjøpskostnader totalt: {formatCurrency(totalPurchaseCosts)}</li>
                <li>Vedlikehold: {input.maintenancePercentAnnual} % per år</li>
                <li>Salgskostnader: {input.saleCostPercent} % av salgspris</li>
                <li>Husleieøkning: {input.annualRentIncreasePercent} % per år</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Tilbake
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
          >
            {step === WIZARD_STEPS.length - 2 ? "Se resultat" : "Neste"}
          </button>
        </div>
      </section>
    </div>
  );
}
