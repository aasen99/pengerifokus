"use client";

import { formatCurrency } from "@/lib/calculators/loan";
import { financingGapMessage } from "@/lib/calculators/gjeldsbremsen";
import type { DebtTypeCopy } from "@/data/gjeldsbremsen";
import {
  DateField,
  MoneyField,
  WizardActions,
} from "@/components/verktoy/gjeldsbremsen/GjeldsbremsenFields";
import {
  calculatorMutedPanelClassName,
  calculatorPanelClassName,
} from "@/components/verktoy/calculator-ui";

export interface SituationForm {
  cashOnHand: string;
  amountDue: string;
  dueDate: string;
  incomeBeforeDue: string;
  expensesBeforeDue: string;
  currentPrincipal: string;
  expectedFees: string;
  nextIncomeDate: string;
  nextIncomeAmount: string;
}

interface StepSituationProps {
  copy: DebtTypeCopy;
  form: SituationForm;
  onChange: (key: keyof SituationForm, value: string) => void;
  gap: number;
  onBack: () => void;
  onNext: () => void;
}

export function StepSituation({
  copy,
  form,
  onChange,
  gap,
  onBack,
  onNext,
}: StepSituationProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Nåsituasjonen</h2>
        <p className="mt-1 text-sm text-stone-600">
          Finansieringsgapet oppdateres mens du fyller ut. Ingen felt sendes
          videre fra nettleseren.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <MoneyField
          label="Penger tilgjengelig på konto nå"
          value={form.cashOnHand}
          onChange={(value) => onChange("cashOnHand", value)}
        />
        <MoneyField
          label={copy.amountDue}
          value={form.amountDue}
          onChange={(value) => onChange("amountDue", value)}
        />
        <DateField
          label="Forfallsdato"
          value={form.dueDate}
          onChange={(value) => onChange("dueDate", value)}
        />
        <MoneyField
          label="Sikre inntekter før forfall"
          value={form.incomeBeforeDue}
          onChange={(value) => onChange("incomeBeforeDue", value)}
        />
        <MoneyField
          label="Nødvendige utgifter før forfall"
          value={form.expensesBeforeDue}
          onChange={(value) => onChange("expensesBeforeDue", value)}
        />
        <MoneyField
          label={copy.principal}
          hint={copy.principalHint}
          value={form.currentPrincipal}
          onChange={(value) => onChange("currentPrincipal", value)}
        />
        <MoneyField
          label="Forventede renter og gebyrer"
          value={form.expectedFees}
          onChange={(value) => onChange("expectedFees", value)}
        />
        <DateField
          label="Neste sikre inntektsdato"
          value={form.nextIncomeDate}
          onChange={(value) => onChange("nextIncomeDate", value)}
        />
        <MoneyField
          label="Neste sikre inntektsbeløp"
          value={form.nextIncomeAmount}
          onChange={(value) => onChange("nextIncomeAmount", value)}
        />
      </div>

      <div
        className={
          gap < 0 ? calculatorPanelClassName : calculatorMutedPanelClassName
        }
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Finansieringsgap
        </p>
        <p className="mt-1 text-2xl font-semibold tabular-nums text-stone-900">
          {gap < 0
            ? `Mangler ${formatCurrency(Math.abs(gap))}`
            : gap > 0
              ? `Overskudd ${formatCurrency(gap)}`
              : formatCurrency(0)}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          {financingGapMessage(gap)}
        </p>
      </div>

      <WizardActions onBack={onBack} onNext={onNext} />
    </div>
  );
}
