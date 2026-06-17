"use client";

import type { MonthlySnapshot } from "@/types/eie-leie";
import { formatCurrency } from "@/lib/calculators/loan";

interface NettoformueChartProps {
  snapshots: MonthlySnapshot[];
  horizonYears: number;
}

export function NettoformueChart({
  snapshots,
  horizonYears,
}: NettoformueChartProps) {
  if (snapshots.length === 0) return null;

  const width = 640;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 70 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = snapshots.flatMap((snapshot) => [
    snapshot.ownerNetWorth,
    snapshot.renterNetWorth,
  ]);
  const minValue = Math.min(...values, 0);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  const xForMonth = (month: number) =>
    padding.left + ((month - 1) / Math.max(snapshots.length - 1, 1)) * chartWidth;

  const yForValue = (value: number) =>
    padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

  const toPath = (key: "ownerNetWorth" | "renterNetWorth") =>
    snapshots
      .map(
        (snapshot, index) =>
          `${index === 0 ? "M" : "L"} ${xForMonth(snapshot.month)} ${yForValue(snapshot[key])}`,
      )
      .join(" ");

  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks + 1 }, (_, index) =>
    minValue + (range * index) / yTicks,
  );

  const xLabels = Array.from({ length: horizonYears + 1 }, (_, year) => year);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[320px]"
        role="img"
        aria-label="Graf som viser nettoformue over tid for eie og leie"
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
          d={toPath("ownerNetWorth")}
          fill="none"
          stroke="#ea580c"
          strokeWidth={2.5}
        />
        <path
          d={toPath("renterNetWorth")}
          fill="none"
          stroke="#57534e"
          strokeWidth={2.5}
          strokeDasharray="6 4"
        />

        {xLabels.map((year) => {
          const month = year === 0 ? 1 : Math.min(year * 12, snapshots.length);
          const x = xForMonth(month);
          return (
            <text
              key={year}
              x={x}
              y={height - 12}
              textAnchor="middle"
              className="fill-stone-500 text-[10px]"
            >
              {year} år
            </text>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-600">
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-6 bg-orange-600" />
          Eie
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-6 border-t-2 border-dashed border-stone-600" />
          Leie og investering
        </span>
      </div>
    </div>
  );
}
