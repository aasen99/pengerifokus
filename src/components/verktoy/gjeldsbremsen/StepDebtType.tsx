"use client";

import { DEBT_TYPE_OPTIONS } from "@/data/gjeldsbremsen";
import type { DebtType } from "@/types/gjeldsbremsen";
import { WizardActions } from "@/components/verktoy/gjeldsbremsen/GjeldsbremsenFields";

interface StepDebtTypeProps {
  value: DebtType | "";
  onChange: (value: DebtType) => void;
  onNext: () => void;
}

export function StepDebtType({ value, onChange, onNext }: StepDebtTypeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-stone-900">Velg gjeldstype</h2>
        <p className="mt-1 text-sm text-stone-600">
          Velg den kreditten du vil bremse først. Valget endrer bare
          ordlyden i feltene, ikke regnestykket.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {DEBT_TYPE_OPTIONS.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`rounded-xl border px-4 py-4 text-left transition-colors ${
                selected
                  ? "border-orange-400 bg-orange-50 ring-2 ring-orange-200"
                  : "border-stone-200 bg-white hover:border-orange-300 hover:bg-stone-50"
              }`}
            >
              <span className="block text-sm font-semibold text-stone-900">
                {option.label}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-stone-500">
                {option.hint}
              </span>
            </button>
          );
        })}
      </div>

      <WizardActions onNext={onNext} nextDisabled={!value} />
    </div>
  );
}
