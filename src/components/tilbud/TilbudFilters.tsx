"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { calculatorInputClassName } from "@/components/verktoy/calculator-ui";
import {
  TILBUD_SORT_OPTIONS,
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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    const nextQuery = String(data.get("q") ?? "").trim();
    const nextProgram = String(data.get("program") ?? "");
    const nextCategory = String(data.get("kategori") ?? "");
    const nextStudent = data.get("student") === "1";
    const nextSort = String(data.get("sortering") ?? "");

    if (nextQuery) params.set("q", nextQuery);
    if (nextProgram) params.set("program", nextProgram);
    if (nextCategory) params.set("kategori", nextCategory);
    if (nextStudent) params.set("student", "1");
    if (nextSort && nextSort !== "rate-desc") params.set("sortering", nextSort);

    const qs = params.toString();
    router.push(qs ? `/tilbud?${qs}` : "/tilbud");
  };

  const hasFilters = Boolean(query || program || category || includeStudent);

  return (
    <form onSubmit={submit} className="space-y-5" action="/tilbud" method="get">
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
            defaultValue={query}
            placeholder="Søk partner, kategori eller medlemskap…"
            className={`${calculatorInputClassName} pl-10`}
          />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <div>
            <label htmlFor="tilbud-program" className="sr-only">
              Fordelsprogram
            </label>
            <select
              id="tilbud-program"
              name="program"
              defaultValue={program ?? ""}
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
              defaultValue={category ?? ""}
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
              defaultChecked={includeStudent}
              className="h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
            />
            Student
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            Vis tilbud
          </button>
          {hasFilters && (
            <a
              href="/tilbud"
              className="text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              Nullstill filter
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-600">
          {partnerCount} {partnerCount === 1 ? "partner" : "partnere"}
          {partnerCount < offerCount && (
            <span className="text-stone-500"> ({offerCount} tilbud)</span>
          )}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="tilbud-sort" className="sr-only">
            Sorter etter
          </label>
          <select
            id="tilbud-sort"
            name="sortering"
            defaultValue={sort}
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
    </form>
  );
}
