"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";
import {
  KAFFE_SLOSE,
  kronerPerSecond,
  spentSoFar,
  type SloseScenario,
} from "@/lib/slose-teller";

function formatKr(value: number): string {
  return new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

export function SloseTeller({
  scenario = KAFFE_SLOSE,
}: {
  scenario?: SloseScenario;
}) {
  const [value, setValue] = useState<number | null>(null);
  const rate = kronerPerSecond(scenario);

  const onTick = useEffectEvent(() => {
    setValue(spentSoFar(scenario, new Date()));
  });

  useEffect(() => {
    onTick();
    let frame = 0;
    const loop = () => {
      onTick();
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, [scenario]);

  return (
    <section
      aria-label={scenario.headline}
      className="relative overflow-hidden rounded-xl bg-stone-900 px-5 py-7 text-white sm:px-7 sm:py-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.2),transparent_55%)]" />

      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300/90">
          {scenario.eyebrow}
        </p>
        <h2 className="mt-2 max-w-2xl text-lg font-semibold text-stone-100 sm:text-xl">
          {scenario.headline}
        </h2>

        <p
          className="mt-4 font-semibold tabular-nums tracking-tight text-white"
          style={{ fontSize: "clamp(1.75rem, 6vw, 3.25rem)", lineHeight: 1.1 }}
          aria-live="polite"
        >
          {value === null ? "—" : formatKr(value)}
          <span className="ml-2 text-[0.45em] font-medium text-stone-400">
            kr
          </span>
        </p>

        <p className="mt-4 text-sm text-stone-300">
          Ca.{" "}
          <span className="font-semibold text-white">{formatKr(rate)} kr</span>{" "}
          i sekundet
        </p>

        <p className="mt-5 max-w-xl text-xs leading-relaxed text-stone-400">
          {scenario.footnote}{" "}
          <Link
            href="/verktoy/sparekalkulator"
            className="underline decoration-stone-600 underline-offset-2 hover:text-stone-200"
          >
            Hva hvis du sparer den ene koppen?
          </Link>
        </p>
      </div>
    </section>
  );
}
