"use client";

import type { RontgenQuestion } from "@/types/okonomisk-rontgen";

interface RontgenQuestionViewProps {
  question: RontgenQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedPoints?: number;
  onSelect: (points: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function RontgenQuestionView({
  question,
  questionIndex,
  totalQuestions,
  selectedPoints,
  onSelect,
  onBack,
  canGoBack,
}: RontgenQuestionViewProps) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm text-stone-600">
          <span>
            Spørsmål {questionIndex + 1} av {totalQuestions}
          </span>
          <span>{Math.round(progress)} %</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-stone-800 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold leading-snug text-stone-900 sm:text-2xl">
          {question.text}
        </h2>
        {question.helpText && (
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {question.helpText}
          </p>
        )}

        <div className="mt-6 space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedPoints === option.points;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.points)}
                className={`w-full rounded-xl border px-4 py-4 text-left text-sm font-medium transition-colors sm:text-base ${
                  isSelected
                    ? "border-orange-400 bg-orange-50 text-stone-900 ring-2 ring-orange-200"
                    : "border-stone-200 bg-white text-stone-800 hover:border-orange-300 hover:bg-stone-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {canGoBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-6 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
          >
            ← Forrige spørsmål
          </button>
        )}
      </div>
    </div>
  );
}
