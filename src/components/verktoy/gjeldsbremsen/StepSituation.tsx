"use client";

import type { ReactNode } from "react";
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

function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold text-stone-900">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
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
          Vi regner slik: konto + inntekter før forfall − andre utgifter − det
          du skal betale. Gjeldsbetalingen har eget felt og skal ikke ligge i
          utgiftene.
        </p>
      </div>

      <FieldGroup title="Penger du har og får inn">
        <MoneyField
          label="På konto nå"
          hint="Det du kan bruke i dag, uten å trekke mer på kreditt."
          value={form.cashOnHand}
          onChange={(value) => onChange("cashOnHand", value)}
        />
        <MoneyField
          label="Inntekter som kommer før forfall"
          hint="Lønn og andre beløp du vet kommer inn før betalingsfristen. Usikre beløp hører ikke hjemme her."
          value={form.incomeBeforeDue}
          onChange={(value) => onChange("incomeBeforeDue", value)}
        />
      </FieldGroup>

      <FieldGroup title="Andre utgifter, utenom gjelden">
        <MoneyField
          label="Utgifter frem til forfall"
          hint="Husleie, mat, strøm og andre regninger. Ta ikke med selve gjeldsbetalingen. Den fyller du inn under."
          value={form.expensesBeforeDue}
          onChange={(value) => onChange("expensesBeforeDue", value)}
        />
      </FieldGroup>

      <FieldGroup title="Gjelden">
        <MoneyField
          label={copy.amountDue}
          hint={copy.amountDueHint}
          value={form.amountDue}
          onChange={(value) => onChange("amountDue", value)}
        />
        <DateField
          label="Forfallsdato"
          hint="Når beløpet over må være betalt."
          value={form.dueDate}
          onChange={(value) => onChange("dueDate", value)}
        />
        <MoneyField
          label={copy.principal}
          hint={copy.principalHint}
          value={form.currentPrincipal}
          onChange={(value) => onChange("currentPrincipal", value)}
        />
        <MoneyField
          label="Renter og gebyrer denne gangen"
          hint="Bare det som kommer i tillegg. Ligger rentene allerede i beløpet du skal betale, la feltet stå på 0."
          value={form.expectedFees}
          onChange={(value) => onChange("expectedFees", value)}
        />
      </FieldGroup>

      <FieldGroup title="Neste inntekt etterpå">
        <DateField
          label="Når kommer neste sikre inntekt"
          hint="Brukes til tidslinjen i bremseplanen. Kommer inntekten før forfall, før beløpet inn i inntektsfeltet over."
          value={form.nextIncomeDate}
          onChange={(value) => onChange("nextIncomeDate", value)}
        />
      </FieldGroup>

      <div
        className={
          gap < 0 ? calculatorPanelClassName : calculatorMutedPanelClassName
        }
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Klarer du betalingen uten ny kreditt?
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
