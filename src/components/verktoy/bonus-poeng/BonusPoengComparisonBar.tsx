"use client";

import { formatPointValue } from "@/lib/calculators/bonus-poeng";

function Marker({
  label,
  value,
  textClass,
  barClass,
  maxValue,
}: {
  label: string;
  value: number;
  textClass: string;
  barClass: string;
  maxValue: number;
}) {
  const width = maxValue > 0 ? Math.min(100, (value / maxValue) * 100) : 0;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
        <span className="text-stone-600">{label}</span>
        <span className={`font-semibold ${textClass}`}>
          {formatPointValue(value)}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-stone-200">
        <div
          className={`h-full rounded-full transition-all ${barClass}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

interface BonusPoengComparisonBarProps {
  costPerPoint: number;
  redemptionValuePerPoint: number;
  targetValuePerPoint: number;
}

export function BonusPoengComparisonBar({
  costPerPoint,
  redemptionValuePerPoint,
  targetValuePerPoint,
}: BonusPoengComparisonBarProps) {
  const maxValue = Math.max(
    costPerPoint,
    redemptionValuePerPoint,
    targetValuePerPoint,
    0.001,
  );

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-stone-900">Sammenligning per poeng</h3>
      <p className="mt-1 text-sm text-stone-600">
        Jo høyere innløsningsverdi er over kostpris og målverdi, jo bedre deal.
      </p>
      <div className="mt-5 space-y-4">
        <Marker
          label="Kostpris"
          value={costPerPoint}
          textClass="text-stone-700"
          barClass="bg-stone-600"
          maxValue={maxValue}
        />
        <Marker
          label="Innløsningsverdi"
          value={redemptionValuePerPoint}
          textClass="text-orange-600"
          barClass="bg-orange-500"
          maxValue={maxValue}
        />
        <Marker
          label="Din målverdi"
          value={targetValuePerPoint}
          textClass="text-emerald-700"
          barClass="bg-emerald-500"
          maxValue={maxValue}
        />
      </div>
    </div>
  );
}
