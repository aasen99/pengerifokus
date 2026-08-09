"use client";

import { useMemo, useState } from "react";
import { QuoteDisplay } from "@/components/sitater/QuoteDisplay";
import { filterSitater, type SitatEntry } from "@/lib/sitater";
import { calculatorInputClassName } from "@/components/verktoy/calculator-ui";

interface SitatListProps {
  entries: SitatEntry[];
}

export function SitatList({ entries }: SitatListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => filterSitater(entries, query),
    [entries, query],
  );

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-stone-200 bg-white p-3.5">
        <label htmlFor="sitater-search" className="sr-only">
          Søk i sitater
        </label>
        <input
          id="sitater-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søk etter person, sitat eller kilde..."
          className={calculatorInputClassName}
        />
      </div>

      <p className="text-sm text-stone-600">
        {filtered.length} {filtered.length === 1 ? "sitat" : "sitater"}
        {query.trim() ? " funnet" : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-3 lg:grid-cols-2">
          {filtered.map((entry) => (
            <QuoteDisplay
              key={entry.id}
              quote={entry.quote}
              attribution={entry.profileName}
              profileHref={`/formuesbyggere/${entry.profileSlug}`}
              compact
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center">
          <p className="font-medium text-stone-900">Ingen sitater funnet</p>
          <p className="mt-2 text-sm text-stone-600">
            Prøv et annet søkeord.
          </p>
        </div>
      )}
    </div>
  );
}
