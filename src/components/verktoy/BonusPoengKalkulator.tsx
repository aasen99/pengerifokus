"use client";

import { useMemo, useState } from "react";
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
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";
import { calculateBonusPoints } from "@/lib/calculators/bonus-poeng";
import { formatIntegerInput } from "@/lib/format/number";
import type { RedemptionType } from "@/types/bonus-poeng";

export function BonusPoengKalkulator() {
  const [pointsEarned, setPointsEarned] = useState(formatIntegerInput(10000));
  const [campaignBonusPoints, setCampaignBonusPoints] = useState(
    formatIntegerInput(0),
  );
  const [periodMonths, setPeriodMonths] = useState(formatIntegerInput(12));
  const [monthlyCardCost, setMonthlyCardCost] = useState(formatIntegerInput(0));
  const [annualFeeMonthly, setAnnualFeeMonthly] = useState(
    formatIntegerInput(0),
  );
  const [paymentFeePercent, setPaymentFeePercent] = useState(2.5);
  const [feeBearingAmount, setFeeBearingAmount] = useState(
    formatIntegerInput(0),
  );
  const [fixedTransactionFees, setFixedTransactionFees] = useState(
    formatIntegerInput(0),
  );
  const [opportunityCostCashback, setOpportunityCostCashback] = useState(
    formatIntegerInput(0),
  );
  const [otherCosts, setOtherCosts] = useState(formatIntegerInput(0));
  const [cardBenefits, setCardBenefits] = useState(formatIntegerInput(0));
  const [redemptionType, setRedemptionType] = useState<RedemptionType>("hotell");
  const [cashPrice, setCashPrice] = useState(formatIntegerInput(1200));
  const [pointsRequired, setPointsRequired] = useState(formatIntegerInput(18000));
  const [redemptionFees, setRedemptionFees] = useState(formatIntegerInput(0));
  const [cashCoPay, setCashCoPay] = useState(formatIntegerInput(0));
  const [targetValuePerPoint, setTargetValuePerPoint] = useState(0.1);

  const result = useMemo(() => {
    const earningInput = {
      pointsEarned: parseIntegerInput(pointsEarned) || 0,
      campaignBonusPoints: parseIntegerInput(campaignBonusPoints) || 0,
      periodMonths: parseIntegerInput(periodMonths) || 0,
      monthlyCardCost: parseIntegerInput(monthlyCardCost) || 0,
      annualFeeMonthly: parseIntegerInput(annualFeeMonthly) || 0,
      paymentFeePercent: paymentFeePercent,
      feeBearingAmount: parseIntegerInput(feeBearingAmount) || 0,
      fixedTransactionFees: parseIntegerInput(fixedTransactionFees) || 0,
      opportunityCostCashback: parseIntegerInput(opportunityCostCashback) || 0,
      otherCosts: parseIntegerInput(otherCosts) || 0,
      cardBenefits: parseIntegerInput(cardBenefits) || 0,
    };

    const parsedPointsRequired = parseIntegerInput(pointsRequired) || 0;
    const parsedCashPrice = parseIntegerInput(cashPrice) || 0;

    const redemptionInput =
      parsedPointsRequired > 0 && parsedCashPrice >= 0
        ? {
            redemptionType,
            cashPrice: parsedCashPrice,
            pointsRequired: parsedPointsRequired,
            redemptionFees: parseIntegerInput(redemptionFees) || 0,
            cashCoPay: parseIntegerInput(cashCoPay) || 0,
            targetValuePerPoint,
          }
        : null;

    return calculateBonusPoints(earningInput, redemptionInput);
  }, [
    pointsEarned,
    campaignBonusPoints,
    periodMonths,
    monthlyCardCost,
    annualFeeMonthly,
    paymentFeePercent,
    feeBearingAmount,
    fixedTransactionFees,
    opportunityCostCashback,
    otherCosts,
    cardBenefits,
    redemptionType,
    cashPrice,
    pointsRequired,
    redemptionFees,
    cashCoPay,
    targetValuePerPoint,
  ]);

  return (
    <div className="space-y-8">
      {result && <BonusPoengResultCards result={result} />}

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Del 1: Kostnad for å tjene poeng
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Regn ut hva poengene faktisk har kostet, inkludert gebyrer og
            alternativkostnad.
          </p>

          <div className="mt-6 space-y-5">
            <CalculatorField
              label="Antall bonuspoeng tjent"
              hint="Poeng fra vanlig opptjening, uten kampanjebonus"
            >
              <FormattedNumberInput
                value={pointsEarned}
                onChange={setPointsEarned}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Kampanjebonuspoeng"
              hint="Ekstra poeng som ikke øker kostnaden"
            >
              <FormattedNumberInput
                value={campaignBonusPoints}
                onChange={setCampaignBonusPoints}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Antall måneder"
              hint="Perioden de månedlige kostnadene gjelder for"
            >
              <FormattedNumberInput
                value={periodMonths}
                onChange={setPeriodMonths}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Månedlig kortkostnad"
              hint="Faste månedlige kostnader knyttet til kortet"
            >
              <FormattedNumberInput
                value={monthlyCardCost}
                onChange={setMonthlyCardCost}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Årsavgift som månedskostnad"
              hint="Årsavgift delt på 12, eller annen fast månedlig kortavgift"
            >
              <FormattedNumberInput
                value={annualFeeMonthly}
                onChange={setAnnualFeeMonthly}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Betalingsgebyr"
              hint="Prosentgebyr ved gebyrbelagt betaling"
            >
              <DecimalNumberInput
                value={paymentFeePercent}
                onChange={setPaymentFeePercent}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Beløp via gebyrbelagt betaling"
              hint="Hvor mye du betalte gjennom tjenesten som tar gebyr"
            >
              <FormattedNumberInput
                value={feeBearingAmount}
                onChange={setFeeBearingAmount}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Faste transaksjonsgebyrer">
              <FormattedNumberInput
                value={fixedTransactionFees}
                onChange={setFixedTransactionFees}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Cashback / Trumf du gir opp"
              hint="Kontantverdi du kunne fått i stedet for poeng"
            >
              <FormattedNumberInput
                value={opportunityCostCashback}
                onChange={setOpportunityCostCashback}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Andre kostnader">
              <FormattedNumberInput
                value={otherCosts}
                onChange={setOtherCosts}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Inkluderte kortfordeler"
              hint="Reiseforsikring, lounge eller annet i kroner som trekkes fra"
            >
              <FormattedNumberInput
                value={cardBenefits}
                onChange={setCardBenefits}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Del 2: Verdi ved å bruke poeng
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Sammenlign innløsningen med kostprisen og målverdien din.
          </p>

          <div className="mt-6 space-y-5">
            <CalculatorField label="Type innløsning">
              <select
                value={redemptionType}
                onChange={(e) =>
                  setRedemptionType(e.target.value as RedemptionType)
                }
                className={calculatorInputClassName}
              >
                {(Object.keys(REDEMPTION_TYPE_LABELS) as RedemptionType[]).map(
                  (key) => (
                    <option key={key} value={key}>
                      {REDEMPTION_TYPE_LABELS[key]}
                    </option>
                  ),
                )}
              </select>
            </CalculatorField>

            <CalculatorField
              label="Kontantpris"
              hint="Prisen du faktisk ville betalt kontant, ikke listepris du uansett ikke ville brukt"
            >
              <FormattedNumberInput
                value={cashPrice}
                onChange={setCashPrice}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField label="Antall poeng som kreves">
              <FormattedNumberInput
                value={pointsRequired}
                onChange={setPointsRequired}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Avgifter ved poengbruk"
              hint="Skatter, resort fees, bookinggebyr og lignende"
            >
              <FormattedNumberInput
                value={redemptionFees}
                onChange={setRedemptionFees}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Kontant egenandel"
              hint="Beløp du må betale i tillegg til poeng"
            >
              <FormattedNumberInput
                value={cashCoPay}
                onChange={setCashCoPay}
                className={calculatorInputClassName}
              />
            </CalculatorField>

            <CalculatorField
              label="Din målverdi per poeng"
              hint="I kroner, f.eks. 0,10 for 10 øre per poeng"
            >
              <DecimalNumberInput
                value={targetValuePerPoint}
                onChange={setTargetValuePerPoint}
                min={0}
                className={calculatorInputClassName}
              />
            </CalculatorField>
          </div>
        </section>
      </div>

      {!result && (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-8 text-center text-sm text-stone-600">
          Fyll inn minst ett opptjent poeng for å se resultat.
        </div>
      )}

      <BonusPoengConcepts />
    </div>
  );
}
