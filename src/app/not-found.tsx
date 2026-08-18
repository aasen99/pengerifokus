import type { Metadata } from "next";
import Link from "next/link";
import { hasGuideArticle } from "@/data/guide-articles";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { calculatorInputClassName } from "@/components/verktoy/calculator-ui";
import {
  getFeaturedGuides,
  getFeaturedVerktoy,
  getGuides,
  getPublishedVerktoy,
} from "@/lib/content";
import type { Guide, Verktoy } from "@/types/content";

export const metadata: Metadata = {
  title: "Siden finnes ikke",
  description:
    "Vi fant ikke siden du leter etter. Søk i ordboken, eller gå videre til en kalkulator, guide eller forsiden.",
  robots: { index: false, follow: true },
};

function pickPopular<T extends { id: string }>(
  featured: T[],
  fallback: T[],
  limit: number,
): T[] {
  if (featured.length >= 4) return featured.slice(0, limit);

  const seen = new Set(featured.map((item) => item.id));
  const extra = fallback.filter((item) => !seen.has(item.id));
  return [...featured, ...extra].slice(0, limit);
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

export default function NotFound() {
  const tools = pickPopular<Verktoy>(
    getFeaturedVerktoy(),
    getPublishedVerktoy(),
    8,
  );
  const guides = pickPopular<Guide>(
    getFeaturedGuides().filter((guide) => hasGuideArticle(guide.slug)),
    getGuides().filter((guide) => hasGuideArticle(guide.slug)),
    6,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
          404
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Siden finnes ikke
        </h1>
        <p className="mt-2 max-w-2xl text-base text-stone-600">
          Vi fant ikke siden du leter etter. Søk i ordboken, eller velg en
          populær kalkulator eller guide under.
        </p>
      </header>

      <form
        action="/ordbok"
        method="get"
        className="max-w-xl rounded-xl border border-stone-200 bg-white p-3.5"
      >
        <label htmlFor="not-found-search" className="sr-only">
          Søk i ordboken
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <SearchIcon />
            </div>
            <input
              id="not-found-search"
              type="search"
              name="q"
              placeholder="Søk begrep, forklaring eller emne…"
              className={`${calculatorInputClassName} pl-10`}
            />
          </div>
          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-stone-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-900"
          >
            Søk i ordboken
          </button>
        </div>
      </form>

      <div className="mt-12 space-y-12">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-bold text-stone-900">
              Populære verktøy
            </h2>
            <Link
              href="/verktoy"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Alle verktøy →
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/verktoy/${tool.slug}`}
                className="group rounded-xl border border-stone-200 bg-white px-5 py-4 transition-colors hover:border-orange-300"
              >
                <Tag variant="accent">{tool.category}</Tag>
                <h3 className="mt-2 text-base font-semibold text-stone-900 group-hover:text-orange-700">
                  {tool.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-stone-600">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-bold text-stone-900">
              Populære guider
            </h2>
            <Link
              href="/guider"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Alle guider →
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guider/${guide.slug}`}
                className="group rounded-xl border border-stone-200 bg-white px-5 py-4 transition-colors hover:border-orange-300"
              >
                <Tag variant="accent">{guide.category}</Tag>
                <h3 className="mt-2 text-base font-semibold text-stone-900 group-hover:text-orange-700">
                  {guide.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-stone-600">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-10">
        <Button href="/" variant="primary">
          Tilbake til forsiden
        </Button>
      </div>
    </div>
  );
}
