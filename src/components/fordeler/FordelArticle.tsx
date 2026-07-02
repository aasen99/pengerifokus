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

export function FordelArticle({ fordel, article, tilbud }: FordelArticleProps) {
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
          {article.lastVerified}
        </p>
      </header>

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
                <span className="font-semibold text-orange-800">Tips: </span>
                {section.tip}
              </div>
            )}
          </section>
        ))}
      </div>

      {tilbud.length > 0 && (
        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Tilbud vi har samlet
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Vi har {tilbud.length}{" "}
            {tilbud.length === 1 ? "tilbud" : "tilbud"} knyttet til Trumf
            Netthandel og andre partnere. På tilbudssiden finner du partner,
            rabatt og vilkår du kan bruke i praksis.
          </p>
          <Link
            href={`/tilbud?program=${fordel.slug}`}
            className="mt-5 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
          >
            Se tilbud for {fordel.name} →
          </Link>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <h2 className="text-lg font-semibold text-stone-900">
          Kilder og sist oppdatert
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Informasjonen er hentet fra offentlige kilder hos Trumf, dagligvarekjeder
          og partnere. Satser og vilkår kan endres: sjekk alltid hos utsteder før
          du legger til grunn for beslutninger.
        </p>
        <ul className="mt-4 space-y-2">
          {article.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                {source.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-stone-500">
          Sist kontrollert: {article.lastVerified}
        </p>
      </section>

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
