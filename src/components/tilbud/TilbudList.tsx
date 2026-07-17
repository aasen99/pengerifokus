"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FORDELSPROGRAMMER_TITLE,
  TILBUD_TITLE,
} from "@/data/content-labels";
import type { Tilbud } from "@/types/content";
import type { Fordel } from "@/types/content";
import { Tag } from "@/components/ui/Tag";
import { TilbudDisclaimer } from "@/components/tilbud/TilbudDisclaimer";
import {
  filterTilbud,
  getFordelName,
  groupTilbudByPartner,
  sortGruppertTilbud,
  TILBUD_SORT_OPTIONS,
  type TilbudSortOption,
} from "@/lib/tilbud";
import { getTilbudCategoryGroupOptions } from "@/lib/tilbud-categories";
import { calculatorInputClassName } from "@/components/verktoy/calculator-ui";

interface TilbudListProps {
  tilbud: Tilbud[];
  fordeler: Fordel[];
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

export function TilbudList({ tilbud, fordeler }: TilbudListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [fordelSlug, setFordelSlug] = useState<string | null>(null);
  const [categoryGroup, setCategoryGroup] = useState<string | null>(null);
  const [sort, setSort] = useState<TilbudSortOption>("rate-desc");

  const updateUrl = useCallback(
    (next: { program?: string | null; kategori?: string | null }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (next.program !== undefined) {
        if (next.program) params.set("program", next.program);
        else params.delete("program");
      }

      if (next.kategori !== undefined) {
        if (next.kategori) params.set("kategori", next.kategori);
        else params.delete("kategori");
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const program = searchParams.get("program");
    const kategori = searchParams.get("kategori");
    setFordelSlug(program);
    setCategoryGroup(kategori);
  }, [searchParams]);

  const fordelerMedTilbud = fordeler.filter((f) =>
    tilbud.some((t) => t.fordelSlug === f.slug),
  );

  const visibleForCategoryFilter = useMemo(
    () => filterTilbud(tilbud, query, fordelSlug, null),
    [tilbud, query, fordelSlug],
  );

  const categoryOptions = useMemo(
    () => getTilbudCategoryGroupOptions(visibleForCategoryFilter),
    [visibleForCategoryFilter],
  );

  useEffect(() => {
    if (
      categoryGroup &&
      !categoryOptions.some((option) => option.group === categoryGroup)
    ) {
      setCategoryGroup(null);
      updateUrl({ kategori: null });
    }
  }, [categoryGroup, categoryOptions, updateUrl]);

  const filtered = useMemo(
    () => filterTilbud(tilbud, query, fordelSlug, categoryGroup),
    [tilbud, query, fordelSlug, categoryGroup],
  );

  const grouped = useMemo(
    () => sortGruppertTilbud(groupTilbudByPartner(filtered), sort),
    [filtered, sort],
  );

  const hasFilters =
    query.trim().length > 0 || fordelSlug !== null || categoryGroup !== null;

  const showTrumfNetthandelNote =
    fordelSlug === "trumf" || fordelSlug === null;

  const setProgramFilter = (slug: string | null) => {
    const next = slug === fordelSlug ? null : slug;
    setFordelSlug(next);
    updateUrl({ program: next });
  };

  const setCategoryFilter = (group: string | null) => {
    setCategoryGroup(group);
    updateUrl({ kategori: group });
  };

  const resetFilters = () => {
    setQuery("");
    setFordelSlug(null);
    setCategoryGroup(null);
    updateUrl({ program: null, kategori: null });
  };

  return (
    <div className="space-y-6">
      <TilbudDisclaimer
        variant="banner"
        showTrumfNetthandelNote={showTrumfNetthandelNote}
      />

      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Søk partner, kategori eller medlemskap…"
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
        <p className="mt-2 text-xs text-stone-500">
          Tips: du kan søke på flere ord, f.eks. «trumf hotell» eller «obos reise».
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="tilbud-program"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500"
            >
              Fordelsprogram
            </label>
            <select
              id="tilbud-program"
              value={fordelSlug ?? ""}
              onChange={(e) => setProgramFilter(e.target.value || null)}
              className={`${calculatorInputClassName} w-full py-2 pr-8`}
            >
              <option value="">Alle programmer</option>
              {fordelerMedTilbud.map((fordel) => {
                const count = tilbud.filter(
                  (entry) => entry.fordelSlug === fordel.slug,
                ).length;
                return (
                  <option key={fordel.slug} value={fordel.slug}>
                    {fordel.name} ({count})
                  </option>
                );
              })}
            </select>
            <p className="mt-1.5 text-xs text-stone-500">
              Studentrabatter vises bare når du velger Student.
            </p>
          </div>

          <div>
            <label
              htmlFor="tilbud-category"
              className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500"
            >
              Kategori
            </label>
            <select
              id="tilbud-category"
              value={categoryGroup ?? ""}
              onChange={(e) => setCategoryFilter(e.target.value || null)}
              className={`${calculatorInputClassName} w-full py-2 pr-8`}
              disabled={categoryOptions.length === 0}
            >
              <option value="">Alle kategorier</option>
              {categoryOptions.map((option) => (
                <option key={option.group} value={option.group}>
                  {option.group} ({option.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Aktive filter
            </span>
            {query.trim() && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 hover:bg-stone-200"
              >
                Søk: {query.trim()} ✕
              </button>
            )}
            {fordelSlug && (
              <button
                type="button"
                onClick={() => setProgramFilter(fordelSlug)}
                className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 hover:bg-orange-200"
              >
                {getFordelName(fordelSlug)} ✕
              </button>
            )}
            {categoryGroup && (
              <button
                type="button"
                onClick={() => setCategoryFilter(categoryGroup)}
                className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 hover:bg-orange-200"
              >
                {categoryGroup} ✕
              </button>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              Nullstill alt
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-600">
          {grouped.length} {grouped.length === 1 ? "partner" : "partnere"}
          {hasFilters ? " funnet" : ""}
          {grouped.length < filtered.length && (
            <span className="text-stone-500">
              {" "}
              ({filtered.length} tilbud totalt)
            </span>
          )}
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="tilbud-sort" className="text-sm text-stone-600">
            Sorter etter
          </label>
          <select
            id="tilbud-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as TilbudSortOption)}
            className={`${calculatorInputClassName} w-auto min-w-[11rem] py-2 pr-8`}
          >
            {TILBUD_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {grouped.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {grouped.map((group) => (
            <article
              key={group.key}
              className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {group.offers.map((offer) => (
                  <button
                    key={offer.tilbudId}
                    type="button"
                    onClick={() => setProgramFilter(offer.fordelSlug)}
                    className="text-left"
                  >
                    <Tag
                      variant={
                        fordelSlug === offer.fordelSlug ? "accent" : "default"
                      }
                    >
                      {getFordelName(offer.fordelSlug)} · {offer.offerLabel}
                    </Tag>
                  </button>
                ))}
                {group.categories.map((cat) => (
                  <Tag key={cat} variant="muted">
                    {cat}
                  </Tag>
                ))}
              </div>

              <h2 className="text-lg font-semibold text-stone-900">
                {group.partner}
              </h2>

              {group.offers.length === 1 ? (
                <>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                    {group.offers[0].description}
                  </p>
                  {group.offers[0].warning && (
                    <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
                      {group.offers[0].warning}
                    </p>
                  )}
                  {group.offers[0].terms && (
                    <p className="mt-3 text-xs leading-relaxed text-stone-500">
                      {group.offers[0].terms}
                    </p>
                  )}
                  {group.offers[0].sourceUrl && (
                    <a
                      href={group.offers[0].sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs font-medium text-orange-600 hover:text-orange-700"
                    >
                      Kilde hos Trumf Netthandel ↗
                    </a>
                  )}
                </>
              ) : (
                <ul className="mt-2 flex-1 space-y-4">
                  {group.offers.map((offer) => (
                    <li
                      key={offer.tilbudId}
                      className="border-t border-stone-100 pt-4 first:border-t-0 first:pt-0"
                    >
                      <p className="text-sm font-medium text-stone-900">
                        {getFordelName(offer.fordelSlug)} · {offer.offerLabel}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">
                        {offer.description}
                      </p>
                      {offer.warning && (
                        <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
                          {offer.warning}
                        </p>
                      )}
                      {offer.terms && (
                        <p className="mt-2 text-xs leading-relaxed text-stone-500">
                          {offer.terms}
                        </p>
                      )}
                      {offer.sourceUrl && (
                        <a
                          href={offer.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-xs font-medium text-orange-600 hover:text-orange-700"
                        >
                          Kilde hos Trumf Netthandel ↗
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center">
          <p className="font-medium text-stone-900">Ingen tilbud funnet</p>
          <p className="mt-2 text-sm text-stone-600">
            Prøv et annet søkeord eller fjern filteret.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Nullstill filter
            </button>
          )}
        </div>
      )}

      <TilbudDisclaimer />

      <p className="text-sm text-stone-500">
        Vil du lese mer om fordelsprogrammene bak tilbudene?{" "}
        <Link href="/fordeler" className="font-medium text-orange-600 hover:text-orange-700">
          Se {FORDELSPROGRAMMER_TITLE.toLowerCase()}
        </Link>
        .
      </p>
    </div>
  );
}
