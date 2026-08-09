import Link from "next/link";
import { hasGuideArticle } from "@/data/guide-articles";
import { getFeaturedGuides } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";

export function FeaturedGuides() {
  const guides = getFeaturedGuides()
    .filter((guide) => hasGuideArticle(guide.slug))
    .slice(0, 2);

  if (guides.length === 0) return null;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-xl font-bold text-stone-900">Populære guider</h2>
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
  );
}
