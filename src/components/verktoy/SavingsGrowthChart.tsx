"use client";

import type { SavingsYearSnapshot } from "@/lib/calculators/savings";
import { formatCurrency } from "@/lib/calculators/loan";

interface SavingsGrowthChartProps {
  standard: SavingsYearSnapshot[];
  withExtra: SavingsYearSnapshot[] | null;
  years: number;
}

export function SavingsGrowthChart({
  standard,
  withExtra,
  years,
}: SavingsGrowthChartProps) {
  if (standard.length === 0) return null;

  const width = 640;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 70 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = [
    ...standard.map((s) => s.balance),
    ...(withExtra?.map((s) => s.balance) ?? []),
  ];
  const minValue = Math.min(...values, 0);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  const xForYear = (year: number) =>
    padding.left + (year / Math.max(years, 1)) * chartWidth;

  const yForValue = (value: number) =>
    padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

  const toPath = (snapshots: SavingsYearSnapshot[]) =>
    snapshots
      .map(
        (snapshot, index) =>
          `${index === 0 ? "M" : "L"} ${xForYear(snapshot.year)} ${yForValue(snapshot.balance)}`,
      )
      .join(" ");

  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks + 1 }, (_, index) =>
    minValue + (range * index) / yTicks,
  );

  const xLabelCount = Math.min(years, 8);
  const xLabels = Array.from({ length: xLabelCount + 1 }, (_, index) =>
    Math.round((years * index) / xLabelCount),
  );

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[320px]"
        role="img"
        aria-label="Graf som viser sparingens vekst over tid"
      >
        {tickValues.map((value) => {
          const y = yForValue(value);
          return (
            <g key={value}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="#e7e5e4"
                strokeWidth={1}
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-stone-500 text-[10px]"
              >
                {formatCurrency(value)}
              </text>
            </g>
          );
        })}

        <path
          d={toPath(standard)}
          fill="none"
          stroke="#57534e"
          strokeWidth={2.5}
        />

        {withExtra && (
          <path
            d={toPath(withExtra)}
            fill="none"
            stroke="#ea580c"
            strokeWidth={2.5}
          />
        )}

        {xLabels.map((year) => (
          <text
            key={year}
            x={xForYear(year)}
            y={height - 12}
            textAnchor="middle"
            className="fill-stone-500 text-[10px]"
          >
            {year} år
          </text>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-600">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-6 bg-stone-600" />
          Vanlig sparing
        </span>
        {withExtra && (
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 bg-orange-600" />
            Med ekstra
          </span>
        )}
      </div>
    </div>
  );
}
