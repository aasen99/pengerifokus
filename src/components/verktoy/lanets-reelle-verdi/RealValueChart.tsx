"use client";

import type { YearlyRealValue } from "@/types/lanets-reelle-verdi";
import { formatCurrency } from "@/lib/calculators/loan";

interface RealValueChartProps {
  yearlyValues: YearlyRealValue[];
}

export function RealValueChart({ yearlyValues }: RealValueChartProps) {
  if (yearlyValues.length === 0) return null;

  const width = 640;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 70 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = yearlyValues.flatMap((item) => [item.nominalDebt, item.realValue]);
  const minValue = 0;
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;
  const maxYear = yearlyValues.at(-1)?.year ?? 1;

  const xForYear = (year: number) =>
    padding.left + (year / Math.max(maxYear, 1)) * chartWidth;

  const yForValue = (value: number) =>
    padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

  const toPath = (key: "nominalDebt" | "realValue") =>
    yearlyValues
      .map(
        (item, index) =>
          `${index === 0 ? "M" : "L"} ${xForYear(item.year)} ${yForValue(item[key])}`,
      )
      .join(" ");

  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks + 1 }, (_, index) =>
    minValue + (range * index) / yTicks,
  );

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[320px]"
        role="img"
        aria-label="Graf som viser nominell gjeld og verdi i dagens kroner"
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
          d={toPath("nominalDebt")}
          fill="none"
          stroke="#a8a29e"
          strokeWidth={2}
          strokeDasharray="6 4"
        />
        <path
          d={toPath("realValue")}
          fill="none"
          stroke="#ea580c"
          strokeWidth={2.5}
        />

        {yearlyValues
          .filter((item) => item.year % Math.max(1, Math.floor(maxYear / 5)) === 0)
          .map((item) => (
            <text
              key={item.year}
              x={xForYear(item.year)}
              y={height - 12}
              textAnchor="middle"
              className="fill-stone-500 text-[10px]"
            >
              {item.year} år
            </text>
          ))}
      </svg>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-600">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-6 border-t-2 border-dashed border-stone-400" />
          Nominell gjeld
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-6 bg-orange-600" />
          Verdi i dagens kroner
        </span>
      </div>
    </div>
  );
}
