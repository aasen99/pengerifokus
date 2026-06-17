"use client";

import type { LoanScheduleEntry } from "@/types/lanets-reelle-verdi";
import { formatCurrency } from "@/lib/calculators/loan";

interface BalanceComparisonChartProps {
  standardSchedule: LoanScheduleEntry[];
  growthSchedule: LoanScheduleEntry[];
}

function sampleYearlyBalances(schedule: LoanScheduleEntry[]): Array<{
  year: number;
  balance: number;
}> {
  if (schedule.length === 0) return [];

  const maxYear = Math.ceil(schedule.at(-1)!.month / 12);
  const points: Array<{ year: number; balance: number }> = [{ year: 0, balance: schedule[0]!.balance + schedule[0]!.principalPayment }];

  for (let year = 1; year <= maxYear; year += 1) {
    const month = year * 12;
    const entry =
      schedule.find((item) => item.month === month) ?? schedule.at(-1);
    if (entry) {
      points.push({ year, balance: entry.balance });
    }
  }

  return points;
}

export function BalanceComparisonChart({
  standardSchedule,
  growthSchedule,
}: BalanceComparisonChartProps) {
  const standardPoints = sampleYearlyBalances(standardSchedule);
  const growthPoints = sampleYearlyBalances(growthSchedule);

  if (standardPoints.length === 0) return null;

  const width = 640;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 70 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxYear = Math.max(
    standardPoints.at(-1)?.year ?? 0,
    growthPoints.at(-1)?.year ?? 0,
  );
  const values = [
    ...standardPoints.map((p) => p.balance),
    ...growthPoints.map((p) => p.balance),
  ];
  const maxValue = Math.max(...values, 1);

  const xForYear = (year: number) =>
    padding.left + (year / Math.max(maxYear, 1)) * chartWidth;

  const yForValue = (value: number) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  const toPath = (points: Array<{ year: number; balance: number }>) =>
    points
      .map(
        (point, index) =>
          `${index === 0 ? "M" : "L"} ${xForYear(point.year)} ${yForValue(point.balance)}`,
      )
      .join(" ");

  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks + 1 }, (_, index) =>
    (maxValue * index) / yTicks,
  );

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[320px]"
        role="img"
        aria-label="Graf som sammenligner restgjeld med og uten økt innbetaling"
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
          d={toPath(standardPoints)}
          fill="none"
          stroke="#a8a29e"
          strokeWidth={2}
          strokeDasharray="6 4"
        />
        <path
          d={toPath(growthPoints)}
          fill="none"
          stroke="#ea580c"
          strokeWidth={2.5}
        />

        {[0, Math.floor(maxYear / 2), maxYear].map((year) => (
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
          <span className="h-0.5 w-6 border-t-2 border-dashed border-stone-400" />
          Ordinær nedbetaling
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-0.5 w-6 bg-orange-600" />
          Økt innbetaling med lønnsvekst
        </span>
      </div>
    </div>
  );
}
