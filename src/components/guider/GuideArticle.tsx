import type { ReactNode } from "react";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { GuideCalculatorCta } from "@/components/guider/GuideCalculatorCta";
import type { Guide } from "@/types/content";
import type { GuideArticleContent } from "@/types/guide-article";

interface GuideArticleProps {
  guide: Guide;
  article: GuideArticleContent;
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderTextWithLinks(text: string) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const label = match[1];
    const href = match[2];
    const external = href.startsWith("http");

    parts.push(
      external ? (
        <a
          key={`link-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          {label}
        </a>
      ) : (
        <Link
          key={`link-${key++}`}
          href={href}
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          {label}
        </Link>
      ),
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function GuideTable({
  table,
}: {
  table: NonNullable<GuideArticleContent["sections"][number]["table"]>;
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 bg-white">
      {table.caption && (
        <p className="border-b border-stone-200 px-4 py-3 text-sm font-medium text-stone-900">
          {table.caption}
        </p>
      )}
      <table className="w-full min-w-[20rem] text-left text-sm">
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label} className="border-b border-stone-100 last:border-0">
              <th
                scope="row"
                className="px-4 py-2.5 font-normal text-stone-600"
              >
                {row.label}
              </th>
              <td className="px-4 py-2.5 text-right font-medium tabular-nums text-stone-900">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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
          {guide.updatedAt && (
            <>
              {" "}
              · Sist oppdatert{" "}
              <time dateTime={guide.updatedAt}>
                {new Date(guide.updatedAt).toLocaleDateString("nb-NO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </>
          )}
        </p>
      </header>

      {article.shortAnswer && (
        <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm leading-relaxed text-stone-700">
          <p>
            <strong className="text-stone-900">Kort svar: </strong>
            {renderTextWithLinks(article.shortAnswer)}
          </p>
        </div>
      )}

      {article.topCta && (
        <div className="mt-6">
          <GuideCalculatorCta cta={article.topCta} />
        </div>
      )}

      <div className="mt-8 space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-stone-900">
              {section.heading}
            </h2>
            {section.subheading && (
              <h3 className="mt-4 text-base font-semibold text-stone-900">
                {section.subheading}
              </h3>
            )}
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
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
            {section.table && <GuideTable table={section.table} />}
            {section.factBox && (
              <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
                <ul className="space-y-2 text-sm leading-relaxed text-stone-700">
                  {section.factBox.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-400" />
                      <span>{renderTextWithLinks(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {section.tip && (
              <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-stone-700">
                <span className="font-semibold text-orange-800">Tips: </span>
                {renderTextWithLinks(section.tip)}
              </div>
            )}
            {section.subsections?.map((subsection) => (
              <div key={subsection.subheading} className="mt-4">
                <h3 className="text-base font-semibold text-stone-900">
                  {subsection.subheading}
                </h3>
                {subsection.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-3 leading-relaxed text-stone-600"
                  >
                    {renderTextWithLinks(paragraph)}
                  </p>
                ))}
                {subsection.bullets && (
                  <ul className="mt-4 space-y-2">
                    {subsection.bullets.map((item) => (
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
              </div>
            ))}
            {section.cta && (
              <div className="mt-4">
                <GuideCalculatorCta cta={section.cta} />
              </div>
            )}
          </section>
        ))}
      </div>

      {article.conclusion && (
        <p className="mt-8 leading-relaxed text-stone-600">
          {renderTextWithLinks(article.conclusion)}
        </p>
      )}

      {article.bottomCta && (
        <div className="mt-6">
          <GuideCalculatorCta cta={article.bottomCta} />
        </div>
      )}

      {article.faq && article.faq.length > 0 && (
        <section id="vanlige-sporsmal" className="mt-10">
          <h2 className="text-lg font-semibold text-stone-900">
            Vanlige spørsmål
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

      {article.sources && article.sources.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-stone-900">Kilder</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {article.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-orange-600 hover:text-orange-700"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

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
