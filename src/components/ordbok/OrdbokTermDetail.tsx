import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import type { OrdbokArticle, OrdbokEntry } from "@/types/content";

interface OrdbokTermDetailProps {
  entry: OrdbokEntry;
  related: OrdbokEntry[];
  article?: OrdbokArticle;
}

export function OrdbokTermDetail({
  entry,
  related,
  article,
}: OrdbokTermDetailProps) {
  return (
    <article>
      <Link
        href="/ordbok"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til ordboken
      </Link>

      <header className="mt-3 mb-6 border-b border-stone-200 pb-6">
        <div className="flex flex-wrap gap-1.5">
          <Tag>{entry.category}</Tag>
          {entry.tags?.slice(0, 2).map((tag) => (
            <Tag key={tag} variant="muted">
              {tag}
            </Tag>
          ))}
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {entry.term}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">
          {entry.definition}
        </p>
        {article && (
          <p className="mt-2 text-sm text-stone-500">
            Sist kontrollert{" "}
            <time dateTime={article.lastModifiedIso}>{article.lastVerified}</time>
          </p>
        )}
      </header>

      {article && (
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-stone-900">
              Hvorfor dette betyr noe for deg
            </h2>
            <p className="mt-3 leading-relaxed text-stone-600">{article.whyItMatters}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-900">Eksempel</h2>
            <p className="mt-3 leading-relaxed text-stone-600">{article.example}</p>
          </section>
          {article.formula && (
            <section>
              <h2 className="text-lg font-semibold text-stone-900">
                Formel eller beregning
              </h2>
              <p className="mt-3 leading-relaxed text-stone-600">{article.formula}</p>
            </section>
          )}
          <section>
            <h2 className="text-lg font-semibold text-stone-900">
              Vanlig misforståelse
            </h2>
            <p className="mt-3 leading-relaxed text-stone-600">
              {article.misconception}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-900">
              Forskjellen mot {article.versus.term.toLowerCase()}
            </h2>
            <p className="mt-3 leading-relaxed text-stone-600">
              {article.versus.difference}{" "}
              <Link
                href={`/ordbok/${article.versus.slug}`}
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                Les om {article.versus.term}
              </Link>
              .
            </p>
          </section>
          {(article.relatedTool || article.relatedGuide) && (
            <p className="text-sm text-stone-600">
              {article.relatedTool && (
                <>
                  <Link
                    href={article.relatedTool.href}
                    className="font-semibold text-orange-600 hover:text-orange-700"
                  >
                    {article.relatedTool.label}
                  </Link>
                  {article.relatedGuide ? " · " : null}
                </>
              )}
              {article.relatedGuide && (
                <Link
                  href={article.relatedGuide.href}
                  className="font-semibold text-orange-600 hover:text-orange-700"
                >
                  {article.relatedGuide.label}
                </Link>
              )}
            </p>
          )}
          <p className="text-xs text-stone-500">
            Kilde:{" "}
            <a
              href={article.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              {article.source.label}
            </a>
          </p>
        </div>
      )}

      {related.length > 0 && (
        <RelatedLinks
          title={`Flere i ${entry.category}`}
          links={related.map((item) => ({
            label: item.term,
            href: `/ordbok/${item.slug}`,
          }))}
          className="mt-8"
        />
      )}

      {entry.tags?.includes("prosentkalkulator") && (
        <p className="mt-8 text-sm text-stone-600">
          Vil du regne det ut?{" "}
          <Link
            href="/verktoy/prosentkalkulator"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Åpne prosentkalkulator →
          </Link>
        </p>
      )}
    </article>
  );
}
