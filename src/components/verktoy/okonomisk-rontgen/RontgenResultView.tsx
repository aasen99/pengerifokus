"use client";

import Link from "next/link";
import { useState } from "react";
import { RONTGEN_COPY_SITE_NAME, RONTGEN_DISCLAIMER } from "@/data/okonomisk-rontgen";
import { formatRontgenCopyText } from "@/lib/okonomisk-rontgen";
import type { RontgenResult } from "@/types/okonomisk-rontgen";
import { CategoryBars } from "@/components/verktoy/okonomisk-rontgen/CategoryBars";
import { ScoreRing } from "@/components/verktoy/okonomisk-rontgen/ScoreRing";

interface RontgenResultViewProps {
  result: RontgenResult;
  onRestart: () => void;
}

export function RontgenResultView({ result, onRestart }: RontgenResultViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatRontgenCopyText(result.totalScore, RONTGEN_COPY_SITE_NAME);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-stone-500">
          Din økonomiske score
        </p>
        <div className="mt-4">
          <ScoreRing score={result.totalScore} maxScore={result.maxScore} />
        </div>
        <p className="mt-2 text-center text-sm text-stone-600">
          {result.totalScore} av {result.maxScore}
        </p>

        <h2 className="mt-8 text-center text-2xl font-bold text-stone-900">
          {result.band.title}
        </h2>
        <p className="mt-3 text-center text-sm leading-relaxed text-stone-600 sm:text-base">
          {result.band.text}
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold text-stone-900">Delresultater</h3>
        <div className="mt-5">
          <CategoryBars categories={result.categories} />
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-lg font-semibold text-stone-900">
          Dette bør du prioritere nå
        </h3>
        <div className="mt-5 space-y-4">
          {result.recommendations.map((recommendation) => (
            <article
              key={recommendation.category}
              className="rounded-xl border border-orange-100 bg-orange-50/60 p-5"
            >
              <p className="text-sm font-semibold text-orange-900">
                {recommendation.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                {recommendation.text}
              </p>
              {recommendation.links.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {recommendation.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex rounded-lg border border-orange-200 bg-white px-3 py-1.5 text-xs font-semibold text-orange-800 transition-colors hover:border-orange-300 hover:bg-orange-50"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl bg-stone-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-900"
        >
          Ta testen på nytt
        </button>
        <Link
          href="/verktoy"
          className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-orange-300 hover:text-orange-700"
        >
          Se flere verktøy
        </Link>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-orange-300 hover:text-orange-700"
        >
          {copied ? "Kopiert!" : "Kopier resultat"}
        </button>
      </div>

      <p className="text-xs leading-relaxed text-stone-500">{RONTGEN_DISCLAIMER}</p>
    </div>
  );
}
