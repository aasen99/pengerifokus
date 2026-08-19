"use client";

import { formatCurrency } from "@/lib/calculators/loan";
import type { BrakeScheduleRow, LoanRound } from "@/types/gjeldsbremsen";

interface ChartPoint {
  label: string;
  debtBefore: number;
  paid: number;
  newCredit: number;
  debtAfter: number;
}

interface DebtCycleChartProps {
  rounds: LoanRound[];
  schedule?: BrakeScheduleRow[];
}

function pointsFromRounds(rounds: LoanRound[]): ChartPoint[] {
  return rounds
    .filter((round) => round.principal > 0 || round.repaid > 0 || round.newCredit > 0)
    .map((round, index) => ({
      label: `Runde ${index + 1}`,
      debtBefore: round.principal,
      paid: round.repaid,
      newCredit: round.newCredit,
      debtAfter: round.newCredit,
    }));
}

function pointsFromSchedule(schedule: BrakeScheduleRow[]): ChartPoint[] {
  return schedule.map((row) => ({
    label: row.label,
    debtBefore: row.debtBefore,
    paid: row.debtBefore + row.costs,
    newCredit: row.newCredit,
    debtAfter: row.newCredit,
  }));
}

export function DebtCycleChart({ rounds, schedule }: DebtCycleChartProps) {
  const points = schedule
    ? pointsFromSchedule(schedule)
    : pointsFromRounds(rounds);

  if (points.length === 0) return null;

  const width = 640;
  const height = 280;
  const padding = { top: 20, right: 16, bottom: 48, left: 72 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(
    1,
    ...points.flatMap((point) => [point.debtBefore, point.paid, point.newCredit]),
  );
  const groupWidth = chartWidth / points.length;
  const barWidth = Math.min(18, groupWidth / 5);
  const series = [
    { key: "debtBefore" as const, color: "#a8a29e", label: "Gjeld før betaling" },
    { key: "paid" as const, color: "#44403c", label: "Betalt beløp" },
    { key: "newCredit" as const, color: "#ea580c", label: "Ny kredittbruk" },
    { key: "debtAfter" as const, color: "#1c1917", label: "Gjeld etter ny kredittbruk" },
  ];

  const yForValue = (value: number) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  const last = points.at(-1)!;
  const first = points[0]!;
  const trend =
    last.debtAfter > first.debtBefore + 0.5
      ? "øker"
      : last.debtAfter < first.debtBefore - 0.5
        ? "reduseres"
        : "står stille";

  return (
    <div>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[320px]"
          role="img"
          aria-label={`Graf over gjeldsutvikling. Gjelden ${trend}.`}
        >
          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
            const value = maxValue * fraction;
            const y = yForValue(value);
            return (
              <g key={fraction}>
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

          {points.map((point, groupIndex) => {
            const groupX = padding.left + groupIndex * groupWidth + groupWidth / 2;
            return (
              <g key={point.label}>
                {series.map((item, barIndex) => {
                  const x =
                    groupX -
                    (series.length * barWidth + (series.length - 1) * 4) / 2 +
                    barIndex * (barWidth + 4);
                  const value = point[item.key];
                  const y = yForValue(value);
                  const barHeight = Math.max(0, yForValue(0) - y);
                  return (
                    <rect
                      key={item.key}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={item.color}
                      rx={2}
                    />
                  );
                })}
                <text
                  x={groupX}
                  y={height - 16}
                  textAnchor="middle"
                  className="fill-stone-600 text-[11px]"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-2 text-sm text-stone-600">
        Grafen viser at gjelden <span className="font-medium text-stone-900">{trend}</span>.
      </p>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-600">
        {series.map((item) => (
          <span key={item.key} className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
