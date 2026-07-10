import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
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

      <header className="mt-4 border-b border-stone-200 pb-8">
        <div className="mb-3 flex flex-wrap gap-2">
          <Tag>{fordel.type}</Tag>
          <Tag variant="muted">{fordel.useCase}</Tag>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
          {article.intro}
        </p>
        <p className="mt-3 text-sm text-stone-500">
          {article.readTimeMinutes} min lesetid · Sist kontrollert{" "}
          <time dateTime={article.lastModifiedIso}>{article.lastVerified}</time>
        </p>
      </header>

      {showTableOfContents && (
        <nav
          aria-label="Innhold på siden"
          className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-5"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            Innhold
          </h2>
          <ol className="mt-3 space-y-2 text-sm">
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

      <div className="mt-10 space-y-10">
        {article.sections.map((section) => {
          const id = sectionAnchorId(section.heading);

          return (
            <section key={id} id={id}>
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
                  <span className="font-semibold text-orange-800">Tips: </span>
                  {section.tip}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {article.faq && article.faq.length > 0 && (
        <section id="ofte-stilte-sporsmal" className="mt-10">
          <h2 className="text-xl font-semibold text-stone-900">
            Ofte stilte spørsmål
          </h2>
          <dl className="mt-4 space-y-5">
            {article.faq.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-stone-200 bg-white px-5 py-4"
              >
                <dt className="font-medium text-stone-900">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-stone-600">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {tilbud.length > 0 && (
        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Tilbud vi har samlet
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Vi har {tilbud.length}{" "}
            {tilbud.length === 1 ? "tilbud" : "tilbud"} knyttet til{" "}
            {fordel.name}. På tilbudssiden finner du partner, rabatt og vilkår
            du kan bruke i praksis.
          </p>
          <Link
            href={`/tilbud?program=${fordel.slug}`}
            className="mt-5 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
          >
            Se tilbud for {fordel.name} →
          </Link>
        </section>
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
        <aside className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-6">
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

      <p className="mt-10 text-xs leading-relaxed text-stone-500">
        Innholdet er veiledende og erstatter ikke individuell økonomisk rådgivning.
        Leter du etter rabatter du kan bruke nå?{" "}
        <Link href="/tilbud" className="font-medium text-orange-600 hover:text-orange-700">
          Gå til {TILBUD_TITLE.toLowerCase()}
        </Link>
        .
      </p>
    </article>
  );
}
