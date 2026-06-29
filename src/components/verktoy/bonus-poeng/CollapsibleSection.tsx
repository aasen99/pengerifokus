"use client";

import { useState, type ReactNode } from "react";

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  title,
  description,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span>
          <span className="block text-sm font-semibold text-stone-900">
            {title}
          </span>
          {description && (
            <span className="mt-0.5 block text-xs text-stone-500">
              {description}
            </span>
          )}
        </span>
        <span className="text-lg text-stone-400">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="space-y-5 border-t border-stone-200 px-4 py-4">{children}</div>}
    </div>
  );
}
