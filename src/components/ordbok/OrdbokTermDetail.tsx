import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
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

      <header className="mt-6">
        <div className="flex flex-wrap gap-2">
          <Tag>{entry.category}</Tag>
          {entry.tags?.map((tag) => (
            <Tag key={tag} variant="muted">
              {tag}
            </Tag>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {entry.term}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-600">
          {entry.definition}
        </p>
      </header>

      {related.length > 0 && (
        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Flere begreper i {entry.category}
          </h2>
          <ul className="mt-4 space-y-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/ordbok/${item.slug}`}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  {item.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-8 text-sm text-stone-500">
        Vil du søke i hele ordboken?{" "}
        <Link href="/ordbok" className="font-medium text-orange-600 hover:text-orange-700">
          Se alle begreper
        </Link>
      </p>
    </article>
  );
}
