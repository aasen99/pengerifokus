"use client";

import { WIZARD_STEPS } from "@/data/gjeldsbremsen";

interface GjeldsbremsenStepNavProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  maxReachableStep: number;
}

export function GjeldsbremsenStepNav({
  currentStep,
  onStepChange,
  maxReachableStep,
}: GjeldsbremsenStepNavProps) {
  return (
    <nav aria-label="Steg i Gjeldsbremsen" className="mb-6">
      <ol className="grid grid-cols-5 gap-1 sm:gap-2">
        {WIZARD_STEPS.map((wizardStep, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isDone = stepNumber < currentStep;
          const isReachable = stepNumber <= maxReachableStep;

          return (
            <li key={wizardStep.id}>
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && onStepChange(stepNumber)}
                className={`w-full rounded-xl border px-1.5 py-2 text-center transition-colors sm:px-3 sm:py-3 sm:text-left ${
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
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : isDone
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {isDone ? "✓" : stepNumber}
                </span>
                <span className="mt-1 hidden text-xs font-semibold text-stone-900 sm:block">
                  {wizardStep.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-sm text-stone-600 sm:hidden">
        Steg {currentStep} av {WIZARD_STEPS.length}:{" "}
        {WIZARD_STEPS[currentStep - 1]?.title}
      </p>
    </nav>
  );
}
