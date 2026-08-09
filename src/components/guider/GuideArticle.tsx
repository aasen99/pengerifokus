import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import type { Guide } from "@/types/content";
import type { GuideArticleContent } from "@/types/guide-article";

interface GuideArticleProps {
  guide: Guide;
  article: GuideArticleContent;
}

export function GuideArticle({ guide, article }: GuideArticleProps) {
  return (
    <article>
      <Link
        href="/guider"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til guider
      </Link>

      <header className="mt-3 border-b border-stone-200 pb-6">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <Tag>{guide.category}</Tag>
          {guide.tags.slice(0, 2).map((tag) => (
            <Tag key={tag} variant="muted">
              {tag}
            </Tag>
          ))}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {guide.title}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">
          {article.intro}
        </p>
        <p className="mt-2 text-sm text-stone-500">
          {article.readTimeMinutes} min lesetid
        </p>
      </header>

      <div className="mt-8 space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-stone-900">
              {section.heading}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-3 leading-relaxed text-stone-600"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-stone-600 leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.tip && (
              <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-stone-700">
                <span className="font-semibold text-orange-800">Tips: </span>
                {section.tip}
              </div>
            )}
          </section>
        ))}
      </div>

      {article.relatedLinks && article.relatedLinks.length > 0 && (
        <RelatedLinks links={article.relatedLinks} />
      )}

      <p className="mt-10 text-xs leading-relaxed text-stone-500">
        Innholdet er veiledende og erstatter ikke individuell økonomisk
        rådgivning. Regler og produkter kan endres: sjekk alltid med bank eller
        Skatteetaten for oppdatert informasjon.
      </p>
    </article>
  );
}
