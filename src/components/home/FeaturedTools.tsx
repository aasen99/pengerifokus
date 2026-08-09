import Link from "next/link";
import { getFeaturedVerktoy } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";

export function FeaturedTools() {
  const tools = getFeaturedVerktoy().slice(0, 2);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-xl font-bold text-stone-900">Populære verktøy</h2>
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
  );
}
