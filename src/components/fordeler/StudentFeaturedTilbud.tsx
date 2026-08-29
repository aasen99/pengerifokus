import Link from "next/link";
import type { Tilbud } from "@/types/content";
import { getTilbudSourceLinkLabel } from "@/lib/tilbud-ui";

function firstTermLine(terms?: string): string {
  if (!terms) return "";
  const sentence = terms.split(/(?<=[.!])\s+/)[0]?.trim();
  return sentence ?? terms;
}

export function StudentFeaturedTilbud({ tilbud }: { tilbud: Tilbud[] }) {
  if (tilbud.length === 0) return null;

  return (
    <section className="mt-8" aria-labelledby="populaere-studentrabatter">
      <h2
        id="populaere-studentrabatter"
        className="text-lg font-semibold text-stone-900"
      >
        Populære studentrabatter nå
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {tilbud.map((entry) => (
          <li
            key={entry.id}
            className="rounded-xl border border-stone-200 bg-white p-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-stone-900">{entry.partner}</h3>
              <span className="text-sm font-medium text-orange-700">
                {entry.offerLabel}
              </span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-wide text-stone-500">
              {entry.category}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {firstTermLine(entry.terms)}
            </p>
            {entry.sourceUrl ? (
              <a
                href={entry.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                {getTilbudSourceLinkLabel(entry.fordelSlug, entry.sourceUrl)}
              </a>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-5">
        <Link
          href="/tilbud?program=student"
          className="inline-flex items-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
        >
          Se alle studenttilbud
        </Link>
      </p>
    </section>
  );
}
