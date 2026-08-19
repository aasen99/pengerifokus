"use client";

import { FormattedNumberInput } from "@/components/ui/FormattedNumberInput";
import {
  CalculatorField,
  calculatorInputClassName,
} from "@/components/verktoy/calculator-ui";

export function MoneyField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <CalculatorField label={label} hint={hint}>
      <FormattedNumberInput
        value={value}
        onChange={onChange}
        className={calculatorInputClassName}
        placeholder="0"
        aria-label={label}
      />
    </CalculatorField>
  );
}

export function DateField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <CalculatorField label={label} hint={hint}>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={calculatorInputClassName}
        aria-label={label}
      />
    </CalculatorField>
  );
}

export function WizardActions({
  onBack,
  onNext,
  nextLabel = "Neste",
  nextDisabled = false,
  secondaryLabel,
  onSecondary,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  secondaryLabel?: string;
  onSecondary?: () => void;
}) {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
        >
          ← Forrige
        </button>
      ) : (
        <span />
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        {secondaryLabel && onSecondary && (
          <button
            type="button"
            onClick={onSecondary}
            className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-orange-300"
          >
            {secondaryLabel}
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
