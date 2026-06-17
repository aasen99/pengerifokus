"use client";

import { useState } from "react";

interface InfoTipProps {
  text: string;
}

export function InfoTip({ text }: InfoTipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label="Mer informasjon"
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-stone-300 text-xs font-semibold text-stone-500 transition-colors hover:border-orange-300 hover:text-orange-600"
      >
        ?
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs leading-relaxed text-stone-600 shadow-lg"
        >
          {text}
        </span>
      )}
    </span>
  );
}
