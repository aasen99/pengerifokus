"use client";

import Link from "next/link";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { GuideArticleCta } from "@/types/guide-article";

interface GuideCalculatorCtaProps {
  cta: GuideArticleCta;
}

export function GuideCalculatorCta({ cta }: GuideCalculatorCtaProps) {
  return (
    <aside className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-5 sm:px-5">
      <h2 className="text-base font-semibold text-stone-900">{cta.heading}</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-700">
        {cta.description}
      </p>
      <Link
        href={cta.href}
        onClick={() => {
          if (cta.analyticsEvent) {
            trackAnalyticsEvent(cta.analyticsEvent);
          }
        }}
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:w-auto"
      >
        {cta.buttonText}
      </Link>
    </aside>
  );
}
