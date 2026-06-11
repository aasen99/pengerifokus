import Link from "next/link";
import { getFeaturedKombinasjoner } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";

export function KombinasjonerPreview() {
  const featured = getFeaturedKombinasjoner().slice(0, 2);

  return (
    <section className="rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Kombinasjoner</h2>
          <p className="mt-2 max-w-xl text-stone-600">
            Mange økonomiske fordeler blir best når de settes sammen. Vi viser
            deg hvordan produkter, kort og programmer kan forsterke hverandre.
          </p>
        </div>
        <Link
          href="/kombinasjoner"
          className="shrink-0 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          Se alle kombinasjoner →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {featured.map((komb) => (
          <article
            key={komb.id}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-stone-900">
              {komb.title}
            </h3>
            <p className="mt-2 text-sm text-stone-600">{komb.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {komb.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
