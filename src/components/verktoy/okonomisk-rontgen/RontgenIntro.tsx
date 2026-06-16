"use client";

import { RONTGEN_DISCLAIMER } from "@/data/okonomisk-rontgen";

interface RontgenIntroProps {
  onStart: () => void;
}

export function RontgenIntro({ onStart }: RontgenIntroProps) {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-lg leading-relaxed text-stone-700">
        Hvor robust er privatøkonomien din? Svar på 10 enkle spørsmål og få en
        rask temperaturmåling av buffer, gjeld, sparing og økonomisk trygghet.
      </p>
      <p className="mt-4 text-sm text-stone-600">
        Testen tar omtrent 2 minutter og krever ingen innlogging.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 w-full rounded-xl bg-orange-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 sm:w-auto"
      >
        Start økonomisjekken
      </button>
      <p className="mt-6 text-xs leading-relaxed text-stone-500">
        {RONTGEN_DISCLAIMER}
      </p>
    </div>
  );
}
