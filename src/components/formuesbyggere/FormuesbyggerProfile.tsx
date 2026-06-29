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
import { WealthEstimateCard } from "@/components/formuesbyggere/WealthEstimateCard";

interface FormuesbyggerProfileProps {
  profile: Formuesbygger;
  article: FormuesbyggerArticle;
}

export function FormuesbyggerProfile({
  profile,
  article,
}: FormuesbyggerProfileProps) {
  return (
    <article>
      <Link
        href="/formuesbyggere"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til {FORMUESBYGGERE_TITLE.toLowerCase()}
      </Link>

      <header className="mt-6 border-b border-stone-200 pb-8">
        <div className="mb-3 flex flex-wrap gap-2">
          <Tag variant="accent">{REGION_LABELS[profile.region]}</Tag>
          <Tag>{INDUSTRY_LABELS[profile.industry]}</Tag>
          <Tag variant="muted">{BUILD_TYPE_LABELS[profile.buildType]}</Tag>
        </div>
        <p className="text-sm font-medium text-orange-700">{article.seoAngle}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
          {article.intro}
        </p>
        <p className="mt-3 text-sm text-stone-500">
          {article.readTimeMinutes} min lesetid
        </p>
      </header>

      <WealthEstimateCard profile={profile} />

      <div className="mt-10 space-y-10">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-stone-900">
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

      {article.quotes && article.quotes.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-stone-900">
            Kjente sitater
          </h2>
          <div className="mt-5 space-y-5">
            {article.quotes.map((quote) => (
              <blockquote
                key={quote.text}
                className="rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm"
              >
                <p className="text-base leading-relaxed text-stone-700">
                  «{quote.text}»
                </p>
                {quote.note && (
                  <footer className="mt-2 text-sm text-stone-500">
                    {quote.note}
                  </footer>
                )}
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-lg font-semibold text-stone-900">
          Hva kan vi lære?
        </h2>
        <ul className="mt-4 space-y-3">
          {article.lessons.map((lesson) => (
            <li
              key={lesson}
              className="flex gap-3 text-sm leading-relaxed text-stone-700"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
              <span>{lesson}</span>
            </li>
          ))}
        </ul>
      </section>

      {article.relatedLinks && article.relatedLinks.length > 0 && (
        <aside className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="font-semibold text-stone-900">Les også</h2>
          <ul className="mt-3 space-y-2">
            {article.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  {link.label} →
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
