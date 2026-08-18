"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { OrdbokEntry } from "@/types/content";
import { Tag } from "@/components/ui/Tag";
import { filterOrdbok, getOrdbokCategories } from "@/lib/ordbok";
import { calculatorInputClassName } from "@/components/verktoy/calculator-ui";

interface OrdbokListProps {
  entries: OrdbokEntry[];
  initialQuery?: string;
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

export function OrdbokList({ entries, initialQuery = "" }: OrdbokListProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => getOrdbokCategories(entries), [entries]);

  const visibleIds = useMemo(
    () => new Set(filterOrdbok(entries, query, category).map((entry) => entry.id)),
    [entries, query, category],
  );

  const visibleCount = visibleIds.size;
  const hasFilters = query.trim().length > 0 || category !== null;

  return (
    <div className="space-y-5">
      <form
        action="/ordbok"
        method="get"
        className="rounded-xl border border-stone-200 bg-white p-3.5"
        onSubmit={(event) => event.preventDefault()}
      >
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
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk begrep, forklaring eller emne…"
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

        <div className="mt-3 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-2.5 py-1 text-sm font-medium transition-colors ${
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
              className={`rounded-full px-2.5 py-1 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-orange-600 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </form>

      <p className="text-sm text-stone-600">
        {visibleCount} {visibleCount === 1 ? "begrep" : "begreper"}
        {hasFilters ? " funnet" : " i ordboken"}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => {
          const visible = visibleIds.has(entry.id);

          return (
            <Link
              key={entry.id}
              href={`/ordbok/${entry.slug}`}
              hidden={!visible}
              className={`group rounded-xl border border-stone-200 bg-white p-3.5 transition-colors hover:border-orange-300 ${
                visible ? "" : "hidden"
              }`}
            >
              <Tag>{entry.category}</Tag>
              <h2 className="mt-2 text-base font-semibold text-stone-900 group-hover:text-orange-700">
                {entry.term}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm leading-snug text-stone-600">
                {entry.definition}
              </p>
            </Link>
          );
        })}
      </div>

      {visibleCount === 0 && (
        <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center">
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
