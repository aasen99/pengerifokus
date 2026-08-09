"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Tilbud } from "@/types/content";
import type { Fordel } from "@/types/content";
import { Tag } from "@/components/ui/Tag";
import { TilbudDisclaimer } from "@/components/tilbud/TilbudDisclaimer";
import {
  filterTilbud,
  getFordelName,
  getTilbudSourceLinkLabel,
  groupTilbudByPartner,
  isTilbudOptInProgram,
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
  const [includeStudent, setIncludeStudent] = useState(false);
  const [sort, setSort] = useState<TilbudSortOption>("rate-desc");

  const updateUrl = useCallback(
    (next: {
      program?: string | null;
      kategori?: string | null;
      student?: boolean | null;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (next.program !== undefined) {
        if (next.program) params.set("program", next.program);
        else params.delete("program");
      }

      if (next.kategori !== undefined) {
        if (next.kategori) params.set("kategori", next.kategori);
        else params.delete("kategori");
      }

      if (next.student !== undefined) {
        if (next.student) params.set("student", "1");
        else params.delete("student");
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const program = searchParams.get("program");
    const kategori = searchParams.get("kategori");
    const studentParam = searchParams.get("student");

    // Støtt gammel lenke ?program=student → ?student=1
    if (program === "student") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("program");
      params.set("student", "1");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      return;
    }

    setFordelSlug(program);
    setCategoryGroup(kategori);
    setIncludeStudent(studentParam === "1" || studentParam === "true");
  }, [searchParams, pathname, router]);

  const fordelerMedTilbud = fordeler.filter(
    (f) =>
      !isTilbudOptInProgram(f.slug) &&
      tilbud.some((t) => t.fordelSlug === f.slug),
  );

  const visibleForCategoryFilter = useMemo(
    () => filterTilbud(tilbud, query, fordelSlug, null, includeStudent),
    [tilbud, query, fordelSlug, includeStudent],
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
    () =>
      filterTilbud(tilbud, query, fordelSlug, categoryGroup, includeStudent),
    [tilbud, query, fordelSlug, categoryGroup, includeStudent],
  );

  const grouped = useMemo(
    () => sortGruppertTilbud(groupTilbudByPartner(filtered), sort),
    [filtered, sort],
  );

  const hasFilters =
    query.trim().length > 0 ||
    fordelSlug !== null ||
    categoryGroup !== null ||
    includeStudent;

  const showTrumfNetthandelNote = fordelSlug === "trumf";
  const showEurobonusShoppingNote = fordelSlug === "eurobonus";

  const setProgramFilter = (slug: string | null) => {
    if (slug && isTilbudOptInProgram(slug)) {
      setStudentFilter(true);
      return;
    }
    const next = slug === fordelSlug ? null : slug;
    setFordelSlug(next);
    updateUrl({ program: next });
  };

  const setCategoryFilter = (group: string | null) => {
    setCategoryGroup(group);
    updateUrl({ kategori: group });
  };

  const setStudentFilter = (checked: boolean) => {
    setIncludeStudent(checked);
    updateUrl({ student: checked });
  };

  const resetFilters = () => {
    setQuery("");
    setFordelSlug(null);
    setCategoryGroup(null);
    setIncludeStudent(false);
    updateUrl({ program: null, kategori: null, student: false });
  };

  return (
    <div className="space-y-5">
      <TilbudDisclaimer
        variant="banner"
        showTrumfNetthandelNote={showTrumfNetthandelNote}
        showEurobonusShoppingNote={showEurobonusShoppingNote}
      />

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

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <div>
            <label htmlFor="tilbud-program" className="sr-only">
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
          </div>

          <div>
            <label htmlFor="tilbud-category" className="sr-only">
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

          <label
            htmlFor="tilbud-student"
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 transition-colors hover:border-stone-300 has-[:checked]:border-orange-300 has-[:checked]:bg-orange-50"
          >
            <input
              id="tilbud-student"
              type="checkbox"
              checked={includeStudent}
              onChange={(e) => setStudentFilter(e.target.checked)}
              className="h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
            />
            Student
          </label>
        </div>

        {hasFilters && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              Nullstill filter
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-600">
          {grouped.length} {grouped.length === 1 ? "partner" : "partnere"}
          {grouped.length < filtered.length && (
            <span className="text-stone-500">
              {" "}
              ({filtered.length} tilbud)
            </span>
          )}
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="tilbud-sort" className="sr-only">
            Sorter etter
          </label>
          <select
            id="tilbud-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as TilbudSortOption)}
            className={`${calculatorInputClassName} w-auto min-w-[10rem] py-1.5 pr-8 text-sm`}
            aria-label="Sorter etter"
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
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map((group) => {
            const uniqueTerms = [
              ...new Set(
                group.offers
                  .map((offer) => offer.terms?.trim())
                  .filter((terms): terms is string => Boolean(terms)),
              ),
            ];
            const sourceLinks = [
              ...new Map(
                group.offers
                  .filter((offer) => offer.sourceUrl)
                  .map((offer) => [
                    `${offer.fordelSlug}|${offer.sourceUrl}`,
                    offer,
                  ]),
              ).values(),
            ];
            const warnings = group.offers.filter((offer) => offer.warning);

            return (
              <article
                key={group.key}
                className="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-3.5 transition-colors hover:border-orange-300"
              >
                <h2 className="text-base font-semibold text-stone-900">
                  {group.partner}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {group.offers.map((offer) => (
                    <button
                      key={offer.tilbudId}
                      type="button"
                      onClick={() => setProgramFilter(offer.fordelSlug)}
                      className="text-left"
                    >
                      <Tag
                        variant={
                          fordelSlug === offer.fordelSlug ||
                          (includeStudent &&
                            isTilbudOptInProgram(offer.fordelSlug))
                            ? "accent"
                            : "default"
                        }
                      >
                        {getFordelName(offer.fordelSlug)} · {offer.offerLabel}
                      </Tag>
                    </button>
                  ))}
                </div>

                {!categoryGroup && group.categories.length > 0 && (
                  <p className="mt-1.5 text-xs text-stone-500">
                    {group.categories.join(" · ")}
                  </p>
                )}

                {warnings.map((offer) => (
                  <p
                    key={`${offer.tilbudId}-warning`}
                    className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs leading-snug text-amber-900"
                  >
                    {offer.warning}
                  </p>
                ))}

                {(sourceLinks.length > 0 || uniqueTerms.length > 0) && (
                  <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-stone-100 pt-2.5 mt-3">
                    {sourceLinks.map((offer) => (
                      <a
                        key={`${offer.tilbudId}-source`}
                        href={offer.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-orange-600 hover:text-orange-700"
                      >
                        {getTilbudSourceLinkLabel(
                          offer.fordelSlug,
                          offer.sourceUrl,
                        )}
                      </a>
                    ))}
                    {uniqueTerms.length > 0 && (
                      <details className="group/terms">
                        <summary className="cursor-pointer list-none text-xs font-medium text-stone-500 hover:text-stone-700 [&::-webkit-details-marker]:hidden">
                          Vilkår
                          <span
                            className="ml-1 inline-block transition-transform group-open/terms:rotate-180"
                            aria-hidden="true"
                          >
                            ▾
                          </span>
                        </summary>
                        <div className="mt-1.5 space-y-2 text-xs leading-relaxed text-stone-500">
                          {uniqueTerms.map((terms) => (
                            <p key={terms}>{terms}</p>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center">
          <p className="font-medium text-stone-900">Ingen tilbud funnet</p>
          <p className="mt-1 text-sm text-stone-600">
            Prøv et annet søkeord eller fjern filteret.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Nullstill filter
            </button>
          )}
        </div>
      )}

      <TilbudDisclaimer />
    </div>
  );
}
