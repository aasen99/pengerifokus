"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { calculatorInputClassName } from "@/components/verktoy/calculator-ui";
import {
  TILBUD_SORT_OPTIONS,
  buildTilbudHref,
  type TilbudFilterParams,
  type TilbudSortOption,
} from "@/lib/tilbud-ui";

interface ProgramOption {
  slug: string;
  name: string;
  count: number;
}

interface CategoryOption {
  group: string;
  count: number;
}

interface TilbudFiltersProps {
  query: string;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  program: string | null;
  category: string | null;
  includeStudent: boolean;
  sort: TilbudSortOption;
  programs: ProgramOption[];
  categories: CategoryOption[];
  partnerCount: number;
  offerCount: number;
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

export function TilbudFilters({
  query,
  searchInput,
  onSearchInputChange,
  program,
  category,
  includeStudent,
  sort,
  programs,
  categories,
  partnerCount,
  offerCount,
}: TilbudFiltersProps) {
  const router = useRouter();

  const navigate = useCallback(
    (overrides: Partial<TilbudFilterParams> = {}) => {
      const nextQ =
        overrides.q !== undefined
          ? overrides.q || undefined
          : searchInput.trim() || undefined;

      router.replace(
        buildTilbudHref({
          q: nextQ,
          program: overrides.program !== undefined ? overrides.program : program,
          kategori:
            overrides.kategori !== undefined ? overrides.kategori : category,
          student:
            overrides.student !== undefined ? overrides.student : includeStudent,
          sortering:
            overrides.sortering !== undefined ? overrides.sortering : sort,
        }),
        { scroll: false },
      );
    },
    [router, searchInput, program, category, includeStudent, sort],
  );

  const clearSearch = () => {
    onSearchInputChange("");
  };

  const hasFilters = Boolean(
    searchInput.trim() || query || program || category || includeStudent,
  );
  const activeQuery = searchInput.trim();

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4">
        <label htmlFor="tilbud-search" className="sr-only">
          Søk i tilbud
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <SearchIcon />
          </div>
          <input
            id="tilbud-search"
            type="search"
            name="q"
            value={searchInput}
            onChange={(event) => onSearchInputChange(event.target.value)}
            placeholder="Søk partner, kategori eller medlemskap…"
            className={`${calculatorInputClassName} pl-10 pr-10`}
            autoComplete="off"
          />
          {searchInput && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-3 text-sm font-medium text-stone-500 hover:text-stone-800"
              aria-label="Tøm søk"
            >
              ✕
            </button>
          )}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <div>
            <label htmlFor="tilbud-program" className="sr-only">
              Fordelsprogram
            </label>
            <select
              id="tilbud-program"
              name="program"
              value={program ?? ""}
              onChange={(event) =>
                navigate({
                  q: searchInput.trim() || undefined,
                  program: event.target.value || null,
                })
              }
              className={`${calculatorInputClassName} w-full py-2 pr-8`}
            >
              <option value="">Alle programmer</option>
              {programs.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name} ({item.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tilbud-category" className="sr-only">
              Kategori
            </label>
            <select
              id="tilbud-category"
              name="kategori"
              value={category ?? ""}
              onChange={(event) =>
                navigate({
                  q: searchInput.trim() || undefined,
                  kategori: event.target.value || null,
                })
              }
              className={`${calculatorInputClassName} w-full py-2 pr-8`}
              disabled={categories.length === 0}
            >
              <option value="">Alle kategorier</option>
              {categories.map((option) => (
                <option key={option.group} value={option.group}>
                  {option.group} ({option.count})
                </option>
              ))}
            </select>
          </div>

          <label
            htmlFor="tilbud-student"
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 transition-colors hover:border-stone-300 has-[:checked]:border-orange-300 has-[:checked]:bg-orange-50"
          >
            <input
              id="tilbud-student"
              type="checkbox"
              name="student"
              value="1"
              checked={includeStudent}
              onChange={(event) =>
                navigate({
                  q: searchInput.trim() || undefined,
                  student: event.target.checked,
                })
              }
              className="h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
            />
            Student
          </label>
        </div>

        {hasFilters && (
          <div className="mt-3 flex justify-end">
            <a
              href="/tilbud"
              className="text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              Nullstill filter
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-600" aria-live="polite" aria-atomic="true">
          {activeQuery ? (
            <>
              {partnerCount} {partnerCount === 1 ? "treff" : "treff"} for «
              {activeQuery}»
              {partnerCount < offerCount && (
                <span className="text-stone-500"> ({offerCount} tilbud)</span>
              )}
            </>
          ) : (
            <>
              {partnerCount} {partnerCount === 1 ? "partner" : "partnere"}
              {partnerCount < offerCount && (
                <span className="text-stone-500"> ({offerCount} tilbud)</span>
              )}
            </>
          )}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="tilbud-sort" className="sr-only">
            Sorter etter
          </label>
          <select
            id="tilbud-sort"
            name="sortering"
            value={sort}
            onChange={(event) =>
              navigate({
                q: searchInput.trim() || undefined,
                sortering: event.target.value as TilbudSortOption,
              })
            }
            className={`${calculatorInputClassName} w-auto min-w-[10rem] py-1.5 pr-8 text-sm`}
          >
            {TILBUD_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
