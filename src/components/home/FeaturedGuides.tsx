import Link from "next/link";
import { hasGuideArticle } from "@/data/guide-articles";
import { getFeaturedGuides } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";

export function FeaturedGuides() {
  const guides = getFeaturedGuides().filter((guide) =>
    hasGuideArticle(guide.slug),
  );

  if (guides.length === 0) return null;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Populære guider</h2>
          <p className="mt-2 max-w-2xl text-stone-600">
            Steg-for-steg hjelp til sparing, gjeld, bolig og hverdagsøkonomi – uten
            bankjargong.
          </p>
        </div>
        <Link
          href="/guider"
          className="text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          Se alle guider →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guider/${guide.slug}`}
            className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
          >
            <Tag variant="accent">{guide.category}</Tag>
            <h3 className="mt-3 text-lg font-semibold text-stone-900 group-hover:text-orange-700">
              {guide.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {guide.description}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-orange-600 group-hover:text-orange-700">
              Les guiden →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
