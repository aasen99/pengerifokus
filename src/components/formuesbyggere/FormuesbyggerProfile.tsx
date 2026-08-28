import Link from "next/link";
import {
  BUILD_TYPE_LABELS,
  FORMUESBYGGERE_TITLE,
  INDUSTRY_LABELS,
  REGION_LABELS,
} from "@/data/formuesbyggere-labels";
import { WEALTH_SOURCE_LABELS } from "@/data/formuesbygger-articles/helpers";
import type { Formuesbygger } from "@/types/formuesbygger";
import type { FormuesbyggerArticle } from "@/types/formuesbygger";
import { Tag } from "@/components/ui/Tag";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { QuoteDisplay } from "@/components/sitater/QuoteDisplay";
import { WealthEstimateCard } from "@/components/formuesbyggere/WealthEstimateCard";
import { FormuesbyggerFactCards } from "@/components/formuesbyggere/FormuesbyggerFactCards";
import { FormuesbyggerBodySections } from "@/components/formuesbyggere/FormuesbyggerBodySections";
import { FormuesbyggerLifecycle } from "@/components/formuesbyggere/FormuesbyggerLifecycle";
import { RelatedFormuesbyggere } from "@/components/formuesbyggere/RelatedFormuesbyggere";
import { ArticleSources } from "@/components/formuesbyggere/ArticleSources";
import { getProfileQuotes } from "@/lib/sitater-filter";
import { createOrdbokLinker } from "@/lib/ordbok-inline";
import { renderTextWithLinks } from "@/lib/rich-text";

interface FormuesbyggerProfileProps {
  profile: Formuesbygger;
  article: FormuesbyggerArticle;
  related: Formuesbygger[];
}

function TimelineSection({
  article,
}: {
  article: FormuesbyggerArticle;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-stone-900">Tidslinje</h2>
      <ol className="mt-4 space-y-4">
        {article.timeline.map((event) => (
          <li key={`${event.date}-${event.title}`} className="flex gap-4">
            <time
              dateTime={event.date}
              className="w-24 shrink-0 text-sm font-semibold tabular-nums text-orange-700 sm:w-28"
            >
              {event.date}
            </time>
            <div>
              <p className="font-medium text-stone-900">{event.title}</p>
              {event.description && (
                <p className="mt-1 leading-relaxed text-stone-600">
                  {event.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FormuesbyggerProfile({
  profile,
  article,
  related,
}: FormuesbyggerProfileProps) {
  const quotes = getProfileQuotes(article.quotes);
  const linkOrdbok = createOrdbokLinker(3);
  const withTerms = (text: string) => renderTextWithLinks(linkOrdbok(text));
  const shortAnswerParagraphs = article.shortAnswer
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const showFactCards = Boolean(article.factCards?.length);
  const lateTimeline = article.timelinePlacement === "late";

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
        {!article.pageTitle && (
          <p className="text-sm font-medium text-orange-700">{article.seoAngle}</p>
        )}
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {article.pageTitle ?? profile.name}
        </h1>
        <FormuesbyggerLifecycle profile={profile} className="mt-2" />
        <p className="mt-2 text-sm text-stone-500">
          {article.readTimeMinutes} min lesetid
        </p>
      </header>

      {showFactCards ? (
        <FormuesbyggerFactCards
          cards={article.factCards!}
          note={article.factCardsNote}
        />
      ) : (
        <WealthEstimateCard profile={profile} />
      )}

      <div className="mt-8 space-y-8">
        <section className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-semibold text-stone-900">Kort svar</h2>
          {shortAnswerParagraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 80)}
              className="mt-3 leading-relaxed text-stone-700"
            >
              {withTerms(paragraph)}
            </p>
          ))}
        </section>

        {article.bodySections && article.bodySections.length > 0 && (
          <FormuesbyggerBodySections
            sections={article.bodySections}
            withTerms={withTerms}
          />
        )}

        {!lateTimeline && <TimelineSection article={article} />}

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Hvor kom formuen fra?
          </h2>
          <dl className="mt-4 space-y-4">
            {article.wealthSources.map((source) => (
              <div key={source.category}>
                <dt className="text-sm font-semibold text-stone-900">
                  {WEALTH_SOURCE_LABELS[source.category]}
                </dt>
                <dd className="mt-1 leading-relaxed text-stone-600">
                  {withTerms(source.description)}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {article.ownershipVsControl && (
          <section>
            <h2 className="text-lg font-semibold text-stone-900">
              Eierskap versus kontroll
            </h2>
            <p className="mt-3 leading-relaxed text-stone-600">
              {withTerms(article.ownershipVsControl)}
            </p>
          </section>
        )}

        <section className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-semibold text-stone-900">
            Det avgjørende grepet
          </h2>
          <p className="mt-3 leading-relaxed text-stone-700">
            {withTerms(article.decisiveMove)}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Hva kunne gått galt?
          </h2>
          <ul className="mt-4 space-y-2">
            {article.whatCouldGoWrong.map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-stone-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">
            Myte mot virkelighet
          </h2>
          <div className="mt-4 space-y-4">
            {article.mythVsReality.map((pair) => (
              <div
                key={pair.myth}
                className="rounded-xl border border-stone-200 px-4 py-3"
              >
                <p className="text-sm font-medium text-stone-500">Myte</p>
                <p className="mt-1 text-stone-700">{pair.myth}</p>
                <p className="mt-3 text-sm font-medium text-stone-500">
                  Virkelighet
                </p>
                <p className="mt-1 leading-relaxed text-stone-700">
                  {withTerms(pair.reality)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-4">
          <h2 className="text-lg font-semibold text-stone-900">
            Hva kan en vanlig person faktisk lære?
          </h2>
          <ul className="mt-4 space-y-2">
            {article.personalLessons.map((lesson) => (
              <li
                key={lesson}
                className="flex gap-3 leading-relaxed text-stone-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span>{withTerms(lesson)}</span>
              </li>
            ))}
          </ul>
        </section>

        {article.faq && article.faq.length > 0 && (
          <section id="vanlige-sporsmal">
            <h2 className="text-lg font-semibold text-stone-900">
              Vanlige spørsmål
            </h2>
            <dl className="mt-4 space-y-4">
              {article.faq.map((item) => (
                <div key={item.question}>
                  <dt className="font-medium text-stone-900">{item.question}</dt>
                  <dd className="mt-1.5 leading-relaxed text-stone-600">
                    {withTerms(item.answer)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {lateTimeline && <TimelineSection article={article} />}
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

      <ArticleSources
        sources={article.sources}
        lastVerified={article.lastVerified}
      />

      {article.relatedLinks && article.relatedLinks.length > 0 && (
        <RelatedLinks links={article.relatedLinks} />
      )}

      <RelatedFormuesbyggere current={profile} related={related} />
    </article>
  );
}
