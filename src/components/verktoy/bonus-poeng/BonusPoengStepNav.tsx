"use client";

import {
  BONUS_WIZARD_STEPS,
  type BonusWizardStepId,
} from "@/data/bonus-poeng";

interface BonusPoengStepNavProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  maxReachableStep: number;
}

export function BonusPoengStepNav({
  currentStep,
  onStepChange,
  maxReachableStep,
}: BonusPoengStepNavProps) {
  return (
    <nav aria-label="Kalkulatorsteg" className="mb-8">
      <ol className="grid gap-3 sm:grid-cols-3">
        {BONUS_WIZARD_STEPS.map((wizardStep, index) => {
          const isActive = currentStep === index;
          const isDone = index < currentStep;
          const isReachable = index <= maxReachableStep;

          return (
            <li key={wizardStep.id}>
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && onStepChange(index)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                  isActive
                    ? "border-orange-300 bg-orange-50 shadow-sm"
                    : isDone
                      ? "border-stone-200 bg-white hover:border-orange-200"
                      : isReachable
                        ? "border-stone-200 bg-white hover:border-stone-300"
                        : "border-stone-100 bg-stone-50 opacity-60"
                }`}
              >
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : isDone
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {isDone ? "✓" : index + 1}
                </span>
                <p className="mt-3 text-sm font-semibold text-stone-900">
                  {wizardStep.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-500">
                  {wizardStep.description}
                </p>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function getStepId(index: number): BonusWizardStepId {
  return BONUS_WIZARD_STEPS[index]?.id ?? "earn";
}
