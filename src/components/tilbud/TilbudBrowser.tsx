"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { TilbudFilters } from "@/components/tilbud/TilbudFilters";
import { TilbudGrid } from "@/components/tilbud/TilbudGrid";
import {
  TILBUD_PAGE_SIZE,
  paginateGruppertTilbud,
  type GruppertTilbud,
} from "@/lib/tilbud";
import { filterGruppertTilbudByQuery } from "@/lib/tilbud-search";
import {
  buildTilbudHref,
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

interface TilbudBrowserProps {
  groups: GruppertTilbud[];
  query: string;
  program: string | null;
  category: string | null;
  includeStudent: boolean;
  sort: TilbudSortOption;
  page: number;
  programs: ProgramOption[];
  categories: CategoryOption[];
}

const URL_SYNC_MS = 400;

export function TilbudBrowser({
  groups,
  query,
  program,
  category,
  includeStudent,
  sort,
  page: initialPage,
  programs,
  categories,
}: TilbudBrowserProps) {
  const [searchInput, setSearchInput] = useState(query);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setSearchInput(query);
    setPage(initialPage);
  }, [query, program, category, includeStudent, sort, initialPage]);

  const filteredGroups = useMemo(
    () => filterGruppertTilbudByQuery(groups, searchInput),
    [groups, searchInput],
  );
  const offerCount = useMemo(
    () => filteredGroups.reduce((sum, group) => sum + group.offers.length, 0),
    [filteredGroups],
  );
  const pagination = paginateGruppertTilbud(
    filteredGroups,
    page,
    TILBUD_PAGE_SIZE,
  );

  useEffect(() => {
    if (page !== pagination.page) setPage(pagination.page);
  }, [page, pagination.page]);

  useEffect(() => {
    const trimmed = searchInput.trim();
    const timer = window.setTimeout(() => {
      const href = buildTilbudHref({
        q: trimmed || undefined,
        program,
        kategori: category,
        student: includeStudent,
        sortering: sort,
      });
      if (`${window.location.pathname}${window.location.search}` === href) {
        return;
      }
      window.history.replaceState(window.history.state, "", href);
    }, URL_SYNC_MS);

    return () => window.clearTimeout(timer);
  }, [searchInput, program, category, includeStudent, sort]);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const filterState = {
    q: searchInput.trim() || undefined,
    program,
    kategori: category,
    student: includeStudent,
    sortering: sort,
  };

  return (
    <>
      <TilbudFilters
        query={query}
        searchInput={searchInput}
        onSearchInputChange={handleSearchInputChange}
        program={program}
        category={category}
        includeStudent={includeStudent}
        sort={sort}
        programs={programs}
        categories={categories}
        partnerCount={filteredGroups.length}
        offerCount={offerCount}
      />

      <TilbudGrid
        groups={pagination.items}
        activeProgram={program}
        includeStudent={includeStudent}
        categoryGroup={category}
      />

      {pagination.pageCount > 1 && (
        <nav
          aria-label="Sidene i tilbudsoversikten"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {Array.from({ length: pagination.pageCount }, (_, index) => {
            const pageNumber = index + 1;
            const current = pageNumber === pagination.page;
            return (
              <Link
                key={pageNumber}
                href={buildTilbudHref({ ...filterState, side: pageNumber })}
                aria-current={current ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setPage(pageNumber);
                  window.history.replaceState(
                    window.history.state,
                    "",
                    buildTilbudHref({ ...filterState, side: pageNumber }),
                  );
                }}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  current
                    ? "bg-orange-600 text-white"
                    : "border border-stone-200 bg-white text-stone-700 hover:border-orange-300"
                }`}
              >
                {pageNumber}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
