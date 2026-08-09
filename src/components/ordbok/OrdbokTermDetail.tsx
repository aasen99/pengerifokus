import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import type { OrdbokEntry } from "@/types/content";

interface OrdbokTermDetailProps {
  entry: OrdbokEntry;
  related: OrdbokEntry[];
}

export function OrdbokTermDetail({ entry, related }: OrdbokTermDetailProps) {
  return (
    <article>
      <Link
        href="/ordbok"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til ordboken
      </Link>

      <header className="mt-3 mb-6 border-b border-stone-200 pb-6">
        <div className="flex flex-wrap gap-1.5">
          <Tag>{entry.category}</Tag>
          {entry.tags?.slice(0, 2).map((tag) => (
            <Tag key={tag} variant="muted">
              {tag}
            </Tag>
          ))}
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {entry.term}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">
          {entry.definition}
        </p>
      </header>

      {related.length > 0 && (
        <RelatedLinks
          title={`Flere i ${entry.category}`}
          links={related.map((item) => ({
            label: item.term,
            href: `/ordbok/${item.slug}`,
          }))}
          className="mt-8"
        />
      )}

      {entry.tags?.includes("prosentkalkulator") && (
        <p className="mt-8 text-sm text-stone-600">
          Vil du regne det ut?{" "}
          <Link
            href="/verktoy/prosentkalkulator"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Åpne prosentkalkulator →
          </Link>
        </p>
      )}
    </article>
  );
}
