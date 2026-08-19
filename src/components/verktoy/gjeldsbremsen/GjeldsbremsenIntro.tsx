"use client";

interface GjeldsbremsenIntroProps {
  onStart: () => void;
}

export function GjeldsbremsenIntro({ onStart }: GjeldsbremsenIntroProps) {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-stone-200 bg-white p-4 sm:p-8">
      <h2 className="text-xl font-semibold leading-snug text-stone-900 sm:text-2xl">
        Betaler du gjelden, men må bruke kreditt igjen?
      </h2>
      <p className="mt-3 text-base leading-relaxed text-stone-700">
        Gjeldsbremsen viser hvor mye gjelden faktisk faller, hva som skaper det
        neste underskuddet og hva som må til for å bryte lånespiralen.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 w-full rounded-xl bg-orange-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 sm:w-auto"
      >
        Lag min bremseplan
      </button>
      <p className="mt-6 text-sm text-stone-500">
        Ingen innlogging. Opplysningene lagres bare lokalt i nettleseren din.
      </p>
    </div>
  );
}
