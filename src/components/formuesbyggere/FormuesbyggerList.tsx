"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  BUILD_TYPE_LABELS,
  FORMUE_DISCLAIMER,
  INDUSTRY_LABELS,
  REGION_LABELS,
} from "@/data/formuesbyggere-labels";
import { hasFormuesbyggerArticle } from "@/data/formuesbygger-articles";
import { filterFormuesbyggere, sortFormuesbyggere } from "@/lib/formuesbyggere";
import type {
  Formuesbygger,
  FormuesbyggerBuildType,
  FormuesbyggerIndustry,
  FormuesbyggerRegion,
} from "@/types/formuesbygger";
import { Tag } from "@/components/ui/Tag";
import { calculatorInputClassName } from "@/components/verktoy/calculator-ui";

interface FormuesbyggerListProps {
  entries: Formuesbygger[];
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-orange-600 text-white"
          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
      }`}
    >
      {children}
    </button>
  );
}

export function FormuesbyggerList({ entries }: FormuesbyggerListProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<FormuesbyggerRegion | null>(null);
  const [industry, setIndustry] = useState<FormuesbyggerIndustry | null>(null);
  const [buildType, setBuildType] = useState<FormuesbyggerBuildType | null>(
    null,
  );

  const filtered = useMemo(
    () =>
      sortFormuesbyggere(
        filterFormuesbyggere(entries, query, region, industry, buildType),
      ),
    [entries, query, region, industry, buildType],
  );

  const hasFilters =
    query.trim().length > 0 ||
    region !== null ||
    industry !== null ||
    buildType !== null;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm leading-relaxed text-stone-600">
        {FORMUE_DISCLAIMER}
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
        <label htmlFor="formuesbygger-search" className="sr-only">
          Søk i formuesbyggere
        </label>
        <input
          id="formuesbygger-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søk etter navn, bransje eller type..."
          className={calculatorInputClassName}
        />

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            Region
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={region === null} onClick={() => setRegion(null)}>
              Alle
            </FilterChip>
            {(Object.keys(REGION_LABELS) as FormuesbyggerRegion[]).map((key) => (
              <FilterChip
                key={key}
                active={region === key}
                onClick={() => setRegion(region === key ? null : key)}
              >
                {REGION_LABELS[key]}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            Bransje
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={industry === null}
              onClick={() => setIndustry(null)}
            >
              Alle
            </FilterChip>
            {(Object.keys(INDUSTRY_LABELS) as FormuesbyggerIndustry[]).map(
              (key) => (
                <FilterChip
                  key={key}
                  active={industry === key}
                  onClick={() => setIndustry(industry === key ? null : key)}
                >
                  {INDUSTRY_LABELS[key]}
                </FilterChip>
              ),
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            Byggetype
          </p>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={buildType === null}
              onClick={() => setBuildType(null)}
            >
              Alle
            </FilterChip>
            {(Object.keys(BUILD_TYPE_LABELS) as FormuesbyggerBuildType[]).map(
              (key) => (
                <FilterChip
                  key={key}
                  active={buildType === key}
                  onClick={() => setBuildType(buildType === key ? null : key)}
                >
                  {BUILD_TYPE_LABELS[key]}
                </FilterChip>
              ),
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-stone-600">
        {filtered.length}{" "}
        {filtered.length === 1 ? "profil" : "profiler"}
        {hasFilters ? " funnet" : " i oversikten"}
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => {
            const hasArticle = hasFormuesbyggerArticle(entry.slug);
            const card = (
              <>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Tag variant="accent">{REGION_LABELS[entry.region]}</Tag>
                  <Tag>{INDUSTRY_LABELS[entry.industry]}</Tag>
                  <Tag variant="muted">
                    {BUILD_TYPE_LABELS[entry.buildType]}
                  </Tag>
                </div>
                <h2 className="text-lg font-semibold text-stone-900 group-hover:text-orange-700">
                  {entry.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  {entry.tagline}
                </p>
                <p className="mt-3 text-xs text-stone-500">{entry.wealthContext}</p>
                {hasArticle && (
                  <span className="mt-4 inline-block text-sm font-semibold text-orange-600 group-hover:text-orange-700">
                    Les profil →
                  </span>
                )}
              </>
            );

            if (!hasArticle) {
              return (
                <article
                  key={entry.id}
                  className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                >
                  {card}
                </article>
              );
            }

            return (
              <Link
                key={entry.id}
                href={`/formuesbyggere/${entry.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {card}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center">
          <p className="font-medium text-stone-900">Ingen profiler funnet</p>
          <p className="mt-2 text-sm text-stone-600">
            Prøv et annet søkeord eller fjern filter.
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setRegion(null);
                setIndustry(null);
                setBuildType(null);
              }}
              className="mt-4 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Nullstill filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
