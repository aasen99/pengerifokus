import type { Metadata } from "next";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { omPage } from "@/data/om";
import { renderTextWithLinks } from "@/lib/rich-text";
import { createPageMetadata } from "@/lib/seo";
import { getAboutPageJsonLd, getBreadcrumbJsonLd } from "@/lib/structured-data";

const path = "/om";

export const metadata: Metadata = createPageMetadata({
  title: omPage.seoTitle,
  description: omPage.seoDescription,
  path,
  keywords: [
    "om Penger i Fokus",
    "hvem står bak",
    "privatøkonomi Norge",
    "gratis økonomikalkulator",
    "Benjamin Penger i Fokus",
  ],
  openGraphType: "article",
  publishedTime: "2026-08-19",
  modifiedTime: omPage.lastModifiedIso,
});

export default function OmPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Start", path: "/" },
          { name: omPage.title, path },
        ])}
      />
      <JsonLd
        data={getAboutPageJsonLd({
          name: omPage.title,
          description: omPage.seoDescription,
          path,
        })}
      />

      <article>
        <header className="border-b border-stone-200 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            {omPage.title}
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">
            {omPage.intro}
          </p>
        </header>

        <div className="mt-8 space-y-8">
          {omPage.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-stone-900">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-3 leading-relaxed text-stone-600"
                >
                  {renderTextWithLinks(paragraph)}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>

      <HubCrossLinks
        links={[
          { href: "/verktoy", label: "Verktøy" },
          { href: "/guider", label: "Guider" },
          { href: "/fordeler", label: "Fordelsprogrammer" },
          { href: "/ordbok", label: "Ordbok" },
        ]}
      />
    </div>
  );
}
