import Link from "next/link";
import {
  BUILD_TYPE_LABELS,
  FORMUESBYGGERE_TITLE,
  INDUSTRY_LABELS,
  REGION_LABELS,
} from "@/data/formuesbyggere-labels";
import type { Formuesbygger } from "@/types/formuesbygger";
import type { FormuesbyggerArticle } from "@/types/formuesbygger";
import { Tag } from "@/components/ui/Tag";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { QuoteDisplay } from "@/components/sitater/QuoteDisplay";
import { WealthEstimateCard } from "@/components/formuesbyggere/WealthEstimateCard";
import { FormuesbyggerLifecycle } from "@/components/formuesbyggere/FormuesbyggerLifecycle";
import { getProfileQuotes } from "@/lib/sitater";

interface FormuesbyggerProfileProps {
  profile: Formuesbygger;
  article: FormuesbyggerArticle;
}

export function FormuesbyggerProfile({
  profile,
  article,
}: FormuesbyggerProfileProps) {
  const quotes = getProfileQuotes(article.quotes);

  return (
    <article>
      <Link
        href="/formuesbyggere"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til {FORMUESBYGGERE_TITLE.toLowerCase()}
      </Link>

      <header className="mt-3 border-b border-stone-200 pb-6">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <Tag variant="accent">{REGION_LABELS[profile.region]}</Tag>
          <Tag>{INDUSTRY_LABELS[profile.industry]}</Tag>
          <Tag variant="muted">{BUILD_TYPE_LABELS[profile.buildType]}</Tag>
        </div>
        <p className="text-sm font-medium text-orange-700">{article.seoAngle}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {profile.name}
        </h1>
        <FormuesbyggerLifecycle profile={profile} className="mt-2" />
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">
          {article.intro}
        </p>
        <p className="mt-2 text-sm text-stone-500">
          {article.readTimeMinutes} min lesetid
        </p>
      </header>

      <WealthEstimateCard profile={profile} />

      <div className="mt-8 space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-stone-900">
              {section.heading}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
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
                    className="flex gap-3 leading-relaxed text-stone-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.tip && (
              <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-stone-700">
                <span className="font-semibold text-orange-800">Å huske: </span>
                {section.tip}
              </div>
            )}
          </section>
        ))}
      </div>

      {quotes && quotes.length > 0 && (
        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-lg font-semibold text-stone-900">
              Sitater og mottoer
            </h2>
            <Link
              href="/ordbok/sitater"
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Alle sitater →
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {quotes.map((quote) => (
              <QuoteDisplay key={quote.text} quote={quote} compact />
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
        <h2 className="text-sm font-semibold text-stone-900">Hva kan vi lære?</h2>
        <ul className="mt-3 space-y-2">
          {article.lessons.map((lesson) => (
            <li
              key={lesson}
              className="flex gap-3 text-sm leading-relaxed text-stone-700"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
              <span>{lesson}</span>
            </li>
          ))}
        </ul>
      </section>

      {article.relatedLinks && article.relatedLinks.length > 0 && (
        <RelatedLinks links={article.relatedLinks} />
      )}
    </article>
  );
}
