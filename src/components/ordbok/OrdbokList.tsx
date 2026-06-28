"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { OrdbokEntry } from "@/types/content";
import { Tag } from "@/components/ui/Tag";
import {
  filterOrdbok,
  getOrdbokCategories,
  sortOrdbokEntries,
} from "@/lib/ordbok";
import { calculatorInputClassName } from "@/components/verktoy/calculator-ui";

interface OrdbokListProps {
  entries: OrdbokEntry[];
}

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5 text-stone-400"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}

export function OrdbokList({ entries }: OrdbokListProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => getOrdbokCategories(entries), [entries]);

  const filtered = useMemo(
    () => sortOrdbokEntries(filterOrdbok(entries, query, category)),
    [entries, query, category],
  );

  const hasFilters = query.trim().length > 0 || category !== null;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
        <label htmlFor="ordbok-search" className="sr-only">
          Søk i ordboken
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <SearchIcon />
          </div>
          <input
            id="ordbok-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk etter begrep, forklaring eller emne..."
            className={`${calculatorInputClassName} pl-10 pr-10`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-3 text-sm font-medium text-stone-500 hover:text-stone-800"
              aria-label="Tøm søk"
            >
              ✕
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              category === null
                ? "bg-stone-800 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Alle
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat === category ? null : cat)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-orange-600 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-stone-600">
        {filtered.length} {filtered.length === 1 ? "begrep" : "begreper"}
        {hasFilters ? " funnet" : " i ordboken"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((entry) => (
            <Link
              key={entry.id}
              href={`/ordbok/${entry.slug}`}
              className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-2 flex flex-wrap gap-2">
                <Tag>{entry.category}</Tag>
                {entry.tags?.slice(0, 2).map((tag) => (
                  <Tag key={tag} variant="muted">
                    {tag}
                  </Tag>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-stone-900 group-hover:text-orange-700">
                {entry.term}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {entry.definition}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-orange-600 group-hover:text-orange-700">
                Les mer →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center">
          <p className="font-medium text-stone-900">Ingen treff</p>
          <p className="mt-2 text-sm text-stone-600">
            Prøv et annet søkeord, eller fjern kategorifilteret.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory(null);
              }}
              className="mt-4 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Nullstill søk
            </button>
          )}
        </div>
      )}
    </div>
  );
}
