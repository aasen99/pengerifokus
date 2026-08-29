import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { renderTextWithLinks } from "@/lib/rich-text";
import {
  FORDELSPROGRAMMER_TITLE,
  TILBUD_TITLE,
} from "@/data/content-labels";
import type { Fordel } from "@/types/content";
import type { Tilbud } from "@/types/content";
import type { FordelArticleContent } from "@/types/fordel-article";

interface FordelArticleProps {
  fordel: Fordel;
  article: FordelArticleContent;
  tilbud: Tilbud[];
}

function sectionAnchorId(heading: string): string {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function FordelArticle({ fordel, article, tilbud }: FordelArticleProps) {
  const showTableOfContents = article.sections.length >= 5;

  return (
    <article>
      <Link
        href="/fordeler"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til {FORDELSPROGRAMMER_TITLE.toLowerCase()}
      </Link>

      <header className="mt-3 border-b border-stone-200 pb-6">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <Tag>{fordel.type}</Tag>
          <Tag variant="muted">{fordel.useCase}</Tag>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {article.title}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">
          {renderTextWithLinks(article.intro)}
        </p>
        <p className="mt-2 text-sm text-stone-500">
          {article.readTimeMinutes} min lesetid · Sist kontrollert{" "}
          <time dateTime={article.lastModifiedIso}>{article.lastVerified}</time>
        </p>
      </header>

      {article.shortAnswer && (
        <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm leading-relaxed text-stone-700">
          <p>
            <strong className="text-stone-900">Kort svar: </strong>
            {renderTextWithLinks(article.shortAnswer)}
          </p>
          {article.introCta && (
            <p className="mt-3">
              <Link
                href={article.introCta.href}
                className="inline-flex items-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
              >
                {article.introCta.label}
              </Link>
            </p>
          )}
        </div>
      )}

      {showTableOfContents && (
        <nav aria-label="Innhold på siden" className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            Innhold
          </h2>
          <ol className="mt-2 space-y-1.5 text-sm">
            {article.sections.map((section) => {
              const id = sectionAnchorId(section.heading);
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="font-medium text-orange-600 hover:text-orange-700"
                  >
                    {section.heading}
                  </a>
                </li>
              );
            })}
            {article.faq && article.faq.length > 0 && (
              <li>
                <a
                  href="#ofte-stilte-sporsmal"
                  className="font-medium text-orange-600 hover:text-orange-700"
                >
                  Ofte stilte spørsmål
                </a>
              </li>
            )}
          </ol>
        </nav>
      )}

      <div className="mt-8 space-y-8">
        {article.sections.map((section) => {
          const id = sectionAnchorId(section.heading);

          return (
            <section key={id} id={id}>
              <h2 className="text-lg font-semibold text-stone-900">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-3 leading-relaxed text-stone-600"
                >
                  {renderTextWithLinks(paragraph)}
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
                      <span>{renderTextWithLinks(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 bg-white">
                  <table className="w-full min-w-[28rem] text-left text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 bg-stone-50">
                        {section.table.headers.map((header) => (
                          <th
                            key={header}
                            scope="col"
                            className="px-3 py-2.5 font-medium text-stone-900 first:text-left last:text-right [&:not(:first-child):not(:last-child)]:text-center"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr
                          key={row[0]}
                          className="border-b border-stone-100 last:border-0"
                        >
                          {row.map((cell, index) => (
                            <td
                              key={`${row[0]}-${index}`}
                              className={`px-3 py-2.5 text-stone-600 ${
                                index === 0
                                  ? "font-normal text-stone-700"
                                  : "text-right tabular-nums"
                              }`}
                            >
                              {renderTextWithLinks(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.tip && (
                <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-stone-700">
                  <span className="font-semibold text-orange-800">Tips: </span>
                  {renderTextWithLinks(section.tip)}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {article.faq && article.faq.length > 0 && (
        <section id="ofte-stilte-sporsmal" className="mt-10">
          <h2 className="text-lg font-semibold text-stone-900">
            Ofte stilte spørsmål
          </h2>
          <dl className="mt-4 space-y-4">
            {article.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-medium text-stone-900">{item.question}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-stone-600">
                  {renderTextWithLinks(item.answer)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {tilbud.length > 0 && (
        <p className="mt-10 text-sm text-stone-600">
          {tilbud.length}{" "}
          {tilbud.length === 1 ? "tilbud" : "tilbud"} samlet for {fordel.name}.{" "}
          <Link
            href={`/tilbud?program=${fordel.slug}`}
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Se tilbud →
          </Link>
        </p>
      )}

      <details className="group mt-10 rounded-xl border border-stone-200 bg-stone-50">
        <summary className="cursor-pointer list-none px-4 py-2.5 [&::-webkit-details-marker]:hidden">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-stone-700">
              <span className="font-semibold text-stone-900">Kilder</span>
              <span className="text-stone-500">
                {" "}
                · sist kontrollert{" "}
                <time dateTime={article.lastModifiedIso}>
                  {article.lastVerified}
                </time>
              </span>
            </span>
            <span
              className="shrink-0 text-sm text-stone-400 transition-transform group-open:rotate-180"
              aria-hidden="true"
            >
              ▾
            </span>
          </div>
        </summary>

        <div className="border-t border-stone-200 px-4 py-3">
          <p className="text-xs leading-relaxed text-stone-600">
            Satser og vilkår kan endres. Sjekk alltid hos utsteder før du legger
            til grunn for beslutninger.
          </p>
          <ul className="mt-3 space-y-1.5">
            {article.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-orange-600 hover:text-orange-700 sm:text-sm"
                >
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </details>

      {article.relatedLinks && article.relatedLinks.length > 0 && (
        <RelatedLinks links={article.relatedLinks} className="mt-8" />
      )}

      <p className="mt-10 text-xs leading-relaxed text-stone-500">
        Innholdet er veiledende og erstatter ikke individuell økonomisk
        rådgivning.
        {tilbud.length === 0 && (
          <>
            {" "}
            <Link
              href="/tilbud"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              Se {TILBUD_TITLE.toLowerCase()}
            </Link>
            .
          </>
        )}
      </p>
    </article>
  );
}
