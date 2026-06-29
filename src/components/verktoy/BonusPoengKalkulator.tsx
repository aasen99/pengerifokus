"use client";

import { useMemo, useState } from "react";
import {
  BONUS_SCENARIO_PRESETS,
  BONUS_TOOLTIPS,
  BONUS_WIZARD_STEPS,
  DEFAULT_BONUS_VALUES,
  type BonusPresetValues,
} from "@/data/bonus-poeng";
import { DecimalNumberInput } from "@/components/ui/DecimalNumberInput";
import {
  FormattedNumberInput,
  parseIntegerInput,
} from "@/components/ui/FormattedNumberInput";
import {
  BonusPoengConcepts,
  BonusPoengResultCards,
  REDEMPTION_TYPE_LABELS,
} from "@/components/verktoy/bonus-poeng/BonusPoengResultCards";
import { BonusPoengStepNav } from "@/components/verktoy/bonus-poeng/BonusPoengStepNav";
import { CollapsibleSection } from "@/components/verktoy/bonus-poeng/CollapsibleSection";
import { InfoTip } from "@/components/verktoy/eie-leie/InfoTip";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";
import { calculateBonusPoints, formatPointValue } from "@/lib/calculators/bonus-poeng";
import { formatIntegerInput } from "@/lib/format/number";
import type { RedemptionType } from "@/types/bonus-poeng";

function toFormString(value: number): string {
  return formatIntegerInput(value);
}

function createInitialForm(): BonusPresetValues {
  return { ...DEFAULT_BONUS_VALUES };
}

export function BonusPoengKalkulator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BonusPresetValues>(createInitialForm);

  const updateForm = <K extends keyof BonusPresetValues>(
    key: K,
    value: BonusPresetValues[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const applyPreset = (presetIndex: number) => {
    const preset = BONUS_SCENARIO_PRESETS[presetIndex];
    setForm((current) => ({ ...current, ...preset.values }));
    const stepIndex = BONUS_WIZARD_STEPS.findIndex(
      (wizardStep) => wizardStep.id === preset.step,
    );
    if (stepIndex >= 0) setStep(stepIndex);
  };

  const result = useMemo(() => {
    const earningInput = {
      pointsEarned: form.pointsEarned,
      campaignBonusPoints: form.campaignBonusPoints,
      periodMonths: form.periodMonths,
      monthlyCardCost: form.monthlyCardCost,
      annualFeeMonthly: form.annualFeeYearly / 12,
      paymentFeePercent: form.paymentFeePercent,
      feeBearingAmount: form.feeBearingAmount,
      fixedTransactionFees: form.fixedTransactionFees,
      opportunityCostCashback: form.opportunityCostCashback,
      otherCosts: form.otherCosts,
      cardBenefits: form.cardBenefits,
    };

    const redemptionInput =
      form.pointsRequired > 0 && form.cashPrice >= 0
        ? {
            redemptionType: form.redemptionType,
            cashPrice: form.cashPrice,
            pointsRequired: form.pointsRequired,
            redemptionFees: form.redemptionFees,
            cashCoPay: form.cashCoPay,
            targetValuePerPoint: form.targetValuePerPoint,
          }
        : null;

    return calculateBonusPoints(earningInput, redemptionInput);
  }, [form]);

  const canProceedFromEarn = form.pointsEarned + form.campaignBonusPoints > 0;
  const canProceedFromRedeem =
    form.pointsRequired > 0 && form.cashPrice >= 0 && canProceedFromEarn;
  const maxReachableStep = !canProceedFromEarn ? 0 : canProceedFromRedeem ? 2 : 1;

  const liveCostHint =
    result?.earning.costPerPoint !== undefined
      ? formatPointValue(result.earning.costPerPoint)
      : null;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
        <p className="text-sm font-medium text-stone-900">Hurtigstart med eksempel</p>
        <p className="mt-1 text-xs text-stone-500">
          Fyll inn typiske tall, deretter juster etter din egen situasjon.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {BONUS_SCENARIO_PRESETS.map((preset, index) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPreset(index)}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-left transition-colors hover:border-orange-300 hover:bg-orange-50"
            >
              <span className="block text-sm font-semibold text-stone-900">
                {preset.label}
              </span>
              <span className="mt-0.5 block text-xs text-stone-500">
                {preset.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <BonusPoengStepNav
        currentStep={step}
        onStepChange={setStep}
        maxReachableStep={maxReachableStep}
      />

      {step === 0 && (
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Steg 1: Hva har poengene kostet?
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Start med poeng og alternativkostnad. Resten kan du legge til om du
            vil være mer presis.
          </p>

          <div className="mt-6 space-y-5">
            <CalculatorField
              label={
                <span className="inline-flex items-center">
                  Antall bonuspoeng tjent
                  <InfoTip text={BONUS_TOOLTIPS.pointsEarned} />
                </span>
              }
            >
              <FormattedNumberInput
                value={toFormString(form.pointsEarned)}
                onChange={(value) =>
                  updateForm("pointsEarned", parseIntegerInput(value) || 0)
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label={
                <span className="inline-flex items-center">
                  Cashback / Trumf du gir opp
                  <InfoTip text={BONUS_TOOLTIPS.opportunityCostCashback} />
                </span>
              }
              hint="Kontantverdi du kunne fått i stedet for poeng"
            >
              <FormattedNumberInput
                value={toFormString(form.opportunityCostCashback)}
                onChange={(value) =>
                  updateForm(
                    "opportunityCostCashback",
                    parseIntegerInput(value) || 0,
                  )
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            {liveCostHint && (
              <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-stone-700">
                Foreløpig kostpris:{" "}
                <strong className="text-orange-800">{liveCostHint}</strong> per
                poeng
              </div>
            )}

            <CollapsibleSection
              title="Kortkostnader og gebyrer"
              description="Årsavgift, betalingsgebyr og faste kostnader"
            >
              <CalculatorField
                label="Antall måneder"
                hint="Perioden de månedlige kostnadene gjelder for"
              >
                <FormattedNumberInput
                  value={toFormString(form.periodMonths)}
                  onChange={(value) =>
                    updateForm("periodMonths", parseIntegerInput(value) || 0)
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>

              <CalculatorField label="Månedlig kortkostnad">
                <FormattedNumberInput
                  value={toFormString(form.monthlyCardCost)}
                  onChange={(value) =>
                    updateForm("monthlyCardCost", parseIntegerInput(value) || 0)
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>

              <CalculatorField
                label="Årsavgift på kortet"
                hint="Vi deler automatisk på 12 måneder"
              >
                <FormattedNumberInput
                  value={toFormString(form.annualFeeYearly)}
                  onChange={(value) =>
                    updateForm("annualFeeYearly", parseIntegerInput(value) || 0)
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>

              <CalculatorField
                label="Betalingsgebyr (%)"
                hint="Prosent ved gebyrbelagt betaling"
              >
                <DecimalNumberInput
                  value={form.paymentFeePercent}
                  onChange={(value) => updateForm("paymentFeePercent", value)}
                  min={0}
                  className={calculatorInputClassName}
                />
              </CalculatorField>

              <CalculatorField label="Beløp via gebyrbelagt betaling">
                <FormattedNumberInput
                  value={toFormString(form.feeBearingAmount)}
                  onChange={(value) =>
                    updateForm("feeBearingAmount", parseIntegerInput(value) || 0)
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>

              <CalculatorField label="Faste transaksjonsgebyrer">
                <FormattedNumberInput
                  value={toFormString(form.fixedTransactionFees)}
                  onChange={(value) =>
                    updateForm(
                      "fixedTransactionFees",
                      parseIntegerInput(value) || 0,
                    )
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </CollapsibleSection>

            <CollapsibleSection
              title="Ekstra justeringer"
              description="Kampanje, fordeler og andre kostnader"
            >
              <CalculatorField
                label="Kampanjebonuspoeng"
                hint="Ekstra poeng som ikke øker kostnaden"
              >
                <FormattedNumberInput
                  value={toFormString(form.campaignBonusPoints)}
                  onChange={(value) =>
                    updateForm(
                      "campaignBonusPoints",
                      parseIntegerInput(value) || 0,
                    )
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>

              <CalculatorField label="Andre kostnader">
                <FormattedNumberInput
                  value={toFormString(form.otherCosts)}
                  onChange={(value) =>
                    updateForm("otherCosts", parseIntegerInput(value) || 0)
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>

              <CalculatorField
                label="Inkluderte kortfordeler"
                hint="Reiseforsikring, lounge m.m. i kroner som trekkes fra"
              >
                <FormattedNumberInput
                  value={toFormString(form.cardBenefits)}
                  onChange={(value) =>
                    updateForm("cardBenefits", parseIntegerInput(value) || 0)
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </CollapsibleSection>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={!canProceedFromEarn}
              onClick={() => setStep(1)}
              className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              Neste: Innløsning →
            </button>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Steg 2: Hva er dealen verdt?
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Legg inn prisen du faktisk ville betalt kontant, og hva innløsningen
            koster i poeng og avgifter.
          </p>

          <div className="mt-6 space-y-5">
            <CalculatorField label="Type innløsning">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(REDEMPTION_TYPE_LABELS) as RedemptionType[]).map(
                  (key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateForm("redemptionType", key)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        form.redemptionType === key
                          ? "bg-orange-600 text-white"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {REDEMPTION_TYPE_LABELS[key]}
                    </button>
                  ),
                )}
              </div>
            </CalculatorField>

            <CalculatorField
              label={
                <span className="inline-flex items-center">
                  Kontantpris
                  <InfoTip text={BONUS_TOOLTIPS.cashPrice} />
                </span>
              }
              hint="Det du faktisk ville betalt, ikke listepris"
            >
              <FormattedNumberInput
                value={toFormString(form.cashPrice)}
                onChange={(value) =>
                  updateForm("cashPrice", parseIntegerInput(value) || 0)
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Antall poeng som kreves">
              <FormattedNumberInput
                value={toFormString(form.pointsRequired)}
                onChange={(value) =>
                  updateForm("pointsRequired", parseIntegerInput(value) || 0)
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Avgifter ved poengbruk"
              hint="Skatter, resort fees, bookinggebyr"
            >
              <FormattedNumberInput
                value={toFormString(form.redemptionFees)}
                onChange={(value) =>
                  updateForm("redemptionFees", parseIntegerInput(value) || 0)
                }
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CollapsibleSection
              title="Avanserte innstillinger"
              description="Egenandel og målverdi per poeng"
            >
              <CalculatorField
                label="Kontant egenandel"
                hint="Beløp du må betale i tillegg til poeng"
              >
                <FormattedNumberInput
                  value={toFormString(form.cashCoPay)}
                  onChange={(value) =>
                    updateForm("cashCoPay", parseIntegerInput(value) || 0)
                  }
                  className={calculatorInputClassName}
                />
              </CalculatorField>

              <CalculatorField
                label={
                  <span className="inline-flex items-center">
                    Din målverdi per poeng
                    <InfoTip text={BONUS_TOOLTIPS.targetValuePerPoint} />
                  </span>
                }
                hint="F.eks. 0,10 for 10 øre"
              >
                <DecimalNumberInput
                  value={form.targetValuePerPoint}
                  onChange={(value) => updateForm("targetValuePerPoint", value)}
                  min={0}
                  className={calculatorInputClassName}
                />
              </CalculatorField>
            </CollapsibleSection>
          </div>

          <div className="mt-8 flex flex-wrap justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
            >
              ← Tilbake
            </button>
            <button
              type="button"
              disabled={!canProceedFromRedeem}
              onClick={() => setStep(2)}
              className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              Se resultat →
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-6">
          {result ? (
            <BonusPoengResultCards
              result={result}
              targetValuePerPoint={form.targetValuePerPoint}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-8 text-center text-sm text-stone-600">
              Fyll inn opptjening og innløsning for å se resultat.
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
            >
              ← Endre innløsning
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(createInitialForm());
                setStep(0);
              }}
              className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
            >
              Start på nytt
            </button>
          </div>
        </section>
      )}

      <BonusPoengConcepts defaultOpen={false} />
    </div>
  );
}
