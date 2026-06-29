import Link from "next/link";
import { getFeaturedVerktoy } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";

export function FeaturedTools() {
  const tools = getFeaturedVerktoy();

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Populære verktøy</h2>
          <p className="mt-2 max-w-2xl text-stone-600">
            Kalkulatorer og tester som hjelper deg å ta konkrete valg, fra bolig
            og gjeld til bonuspoeng og økonomisk helse.
          </p>
        </div>
        <Link
          href="/verktoy"
          className="text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          Se alle verktøy →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/verktoy/${tool.slug}`}
            className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
          >
            <Tag variant="accent">{tool.category}</Tag>
            <h3 className="mt-3 text-lg font-semibold text-stone-900 group-hover:text-orange-700">
              {tool.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {tool.description}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-orange-600 group-hover:text-orange-700">
              Åpne verktøy →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
