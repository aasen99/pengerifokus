"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
  getTilbudCategories,
  groupTilbudByPartner,
  sortGruppertTilbud,
  TILBUD_SORT_OPTIONS,
  type TilbudSortOption,
} from "@/lib/tilbud";
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
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [fordelSlug, setFordelSlug] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<TilbudSortOption>("name-asc");

  useEffect(() => {
    const program = searchParams.get("program");
    if (program) setFordelSlug(program);
  }, [searchParams]);

  const categories = useMemo(() => getTilbudCategories(tilbud), [tilbud]);

  const filtered = useMemo(
    () => filterTilbud(tilbud, query, fordelSlug, category),
    [tilbud, query, fordelSlug, category],
  );

  const grouped = useMemo(
    () => sortGruppertTilbud(groupTilbudByPartner(filtered), sort),
    [filtered, sort],
  );

  const hasFilters =
    query.trim().length > 0 || fordelSlug !== null || category !== null;

  const fordelerMedTilbud = fordeler.filter((f) =>
    tilbud.some((t) => t.fordelSlug === f.slug),
  );

  return (
    <div className="space-y-6">
      <TilbudDisclaimer variant="banner" />

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
            placeholder="Søk etter tilbud, partner eller medlemskap..."
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

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            Fordelsprogram
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFordelSlug(null)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                fordelSlug === null
                  ? "bg-stone-800 text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              Alle
            </button>
            {fordelerMedTilbud.map((fordel) => (
              <button
                key={fordel.slug}
                type="button"
                onClick={() =>
                  setFordelSlug(fordel.slug === fordelSlug ? null : fordel.slug)
                }
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  fordelSlug === fordel.slug
                    ? "bg-orange-600 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {fordel.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            Kategori
          </p>
          <div className="flex flex-wrap gap-2">
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
                    onClick={() =>
                      setFordelSlug(
                        offer.fordelSlug === fordelSlug ? null : offer.fordelSlug,
                      )
                    }
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
                  <Tag key={cat}>{cat}</Tag>
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
                  {group.offers[0].terms && (
                    <p className="mt-3 text-xs text-stone-500">
                      {group.offers[0].terms}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  Tilgjengelig via {group.offers.length} medlemskap. Sammenlign
                  rabatt og vilkår hos partner.
                </p>
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
              onClick={() => {
                setQuery("");
                setFordelSlug(null);
                setCategory(null);
              }}
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
