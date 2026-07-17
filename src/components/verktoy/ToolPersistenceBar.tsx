"use client";

import { useState } from "react";
import type { ToolPersistenceSource } from "@/lib/verktoy-persistence";

interface ToolPersistenceBarProps {
  source: ToolPersistenceSource;
  onCopyShareLink: () => Promise<boolean>;
  onClearSaved: () => void;
  onExportPdf?: () => void;
  exportDisabled?: boolean;
}

export function ToolPersistenceBar({
  source,
  onCopyShareLink,
  onClearSaved,
  onExportPdf,
  exportDisabled = false,
}: ToolPersistenceBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await onCopyShareLink();
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <p className="text-sm text-stone-600">
        {source === "url"
          ? "Tallene er lastet fra en delt lenke. Endringer lagres lokalt i nettleseren."
          : source === "local"
            ? "Tallene dine er lagret lokalt i nettleseren."
            : "Tallene lagres lokalt i nettleseren mens du jobber."}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
        >
          {copied ? "Lenke kopiert" : "Kopier delbar lenke"}
        </button>
        {onExportPdf && (
          <button
            type="button"
            onClick={onExportPdf}
            disabled={exportDisabled}
            className="rounded-lg bg-stone-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Last ned PDF
          </button>
        )}
        <button
          type="button"
          onClick={onClearSaved}
          className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-800"
        >
          Nullstill
        </button>
      </div>
    </div>
  );
}
