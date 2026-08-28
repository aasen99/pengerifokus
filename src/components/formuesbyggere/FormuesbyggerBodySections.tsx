import type { ReactNode } from "react";
import type {
  FormuesbyggerBodySection,
  FormuesbyggerTable,
} from "@/types/formuesbygger";

interface FormuesbyggerBodySectionsProps {
  sections: FormuesbyggerBodySection[];
  withTerms: (text: string) => ReactNode;
}

function ArticleTable({ table }: { table: FormuesbyggerTable }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 bg-white">
      {table.caption && (
        <p className="border-b border-stone-200 px-4 py-3 text-sm font-medium text-stone-900">
          {table.caption}
        </p>
      )}
      <table className="w-full min-w-[20rem] text-left text-sm">
        {table.headers && table.headers.length > 0 && (
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              {table.headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-2.5 font-semibold text-stone-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {table.rows.map((row) => (
            <tr
              key={row.join("|")}
              className="border-b border-stone-100 last:border-0"
            >
              {row.map((cell, index) => {
                const Cell = index === 0 ? "th" : "td";
                return (
                  <Cell
                    key={`${cell}-${index}`}
                    {...(index === 0 ? { scope: "row" } : {})}
                    className={
                      index === 0
                        ? "px-4 py-2.5 font-normal text-stone-600"
                        : "px-4 py-2.5 font-medium tabular-nums text-stone-900"
                    }
                  >
                    {cell}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FormuesbyggerBodySections({
  sections,
  withTerms,
}: FormuesbyggerBodySectionsProps) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-lg font-semibold text-stone-900">
            {section.heading}
          </h2>
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph.slice(0, 80)}
              className="mt-3 leading-relaxed text-stone-600"
            >
              {withTerms(paragraph)}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-4 space-y-2">
              {section.bullets.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 leading-relaxed text-stone-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>{withTerms(item)}</span>
                </li>
              ))}
            </ul>
          )}
          {section.table && <ArticleTable table={section.table} />}
          {section.table?.footnote && (
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              {withTerms(section.table.footnote)}
            </p>
          )}
          {section.callout && (
            <aside className="mt-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
              {section.callout.title && (
                <p className="text-sm font-semibold text-stone-900">
                  {section.callout.title}
                </p>
              )}
              <p
                className={`text-sm leading-relaxed text-stone-700 ${
                  section.callout.title ? "mt-1" : ""
                }`}
              >
                {withTerms(section.callout.text)}
              </p>
            </aside>
          )}
          {section.cards && section.cards.length > 0 && (
            <div
              className={`mt-4 grid gap-3 ${
                section.cards.length >= 3 ? "lg:grid-cols-3" : "sm:grid-cols-2"
              }`}
            >
              {section.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-4"
                >
                  <h3 className="font-semibold text-stone-900">{card.title}</h3>
                  {card.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 80)}
                      className="mt-2 text-sm leading-relaxed text-stone-600"
                    >
                      {withTerms(paragraph)}
                    </p>
                  ))}
                  {card.bullets && card.bullets.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {card.bullets.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-relaxed text-stone-600"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                          <span>{withTerms(item)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  );
}
