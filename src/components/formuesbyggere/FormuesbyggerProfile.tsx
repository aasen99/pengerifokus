import Link from "next/link";
import {
  BUILD_TYPE_LABELS,
  FORMUESBYGGERE_TITLE,
  INDUSTRY_LABELS,
  REGION_LABELS,
} from "@/data/formuesbyggere-labels";
import { WEALTH_SOURCE_LABELS } from "@/data/formuesbygger-articles/helpers";
import {
  groupSourcesByTier,
  SOURCE_TIER_DESCRIPTIONS,
  SOURCE_TIER_DISPLAY_ORDER,
  SOURCE_TIER_LABELS,
} from "@/data/formuesbygger-articles/source-tiers";
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

function formatVerifiedDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function FormuesbyggerProfile({
  profile,
  article,
}: FormuesbyggerProfileProps) {
  const quotes = getProfileQuotes(article.quotes);
  const sourcesByTier = groupSourcesByTier(article.sources);

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
        <p className="mt-2 text-sm text-stone-500">
          {article.readTimeMinutes} min lesetid
        </p>
      </header>

      <WealthEstimateCard profile={profile} />

      <div className="mt-8 space-y-8">
        <section className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-semibold text-stone-900">Kort svar</h2>
          <p className="mt-3 leading-relaxed text-stone-700">
            {article.shortAnswer}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900">Tidslinje</h2>
          <ol className="mt-4 space-y-4">
            {article.timeline.map((event) => (
              <li key={`${event.date}-${event.title}`} className="flex gap-4">
                <time
                  dateTime={event.date}
                  className="w-20 shrink-0 text-sm font-semibold tabular-nums text-orange-700 sm:w-24"
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
                  {source.description}
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
              {article.ownershipVsControl}
            </p>
          </section>
        )}

        <section className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-4 sm:px-5">
          <h2 className="text-lg font-semibold text-stone-900">
            Det avgjørende grepet
          </h2>
          <p className="mt-3 leading-relaxed text-stone-700">
            {article.decisiveMove}
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
                  {pair.reality}
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
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </section>
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

      <section className="mt-10 border-t border-stone-200 pt-6">
        <h2 className="text-lg font-semibold text-stone-900">
          Kilder og sist kontrollert
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          Sist kontrollert {formatVerifiedDate(article.lastVerified)}
        </p>
        <p className="mt-2 text-sm text-stone-500">
          Vi prioriterer årsrapporter, SEC og Brønnøysund, deretter
          børsmeldinger, før Kapital og andre medier. Wikipedia og formueblogger
          brukes kun internt for å finne spor.
        </p>
        <div className="mt-4 space-y-5">
          {SOURCE_TIER_DISPLAY_ORDER.map((tier) => {
            const tierSources = sourcesByTier[tier];
            if (!tierSources?.length) return null;

            return (
              <div key={tier}>
                <h3 className="text-sm font-semibold text-stone-800">
                  {SOURCE_TIER_LABELS[tier]}
                </h3>
                <p className="text-xs text-stone-500">
                  {SOURCE_TIER_DESCRIPTIONS[tier]}
                </p>
                <ul className="mt-2 space-y-2">
                  {tierSources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-orange-600 hover:text-orange-700"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {article.relatedLinks && article.relatedLinks.length > 0 && (
        <RelatedLinks links={article.relatedLinks} />
      )}
    </article>
  );
}
