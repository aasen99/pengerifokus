import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { getKombinasjoner } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kombinasjoner",
  description:
    "Anbefalte økonomiske oppsett som kombinerer kort, fordeler og sparing for maksimal effekt i hverdagen og på reise.",
  path: "/kombinasjoner",
  keywords: ["økonomioppsett", "bonus kombinasjon", "sparing strategi", "reise bonus"],
});

/**
 * CMS/ADMIN: Kombinasjoner er kjernefunksjonen – admin kan opprette anbefalte oppsett
 * med koblede guider, fordeler og verktøy. featured-flagg styrer fremheving på forsiden.
 */
export default function KombinasjonerPage() {
  const kombinasjoner = getKombinasjoner();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Kombinasjoner"
        description="Mange økonomiske fordeler blir best når de settes sammen. Her finner du anbefalte oppsett for ulike situasjoner."
      />

      <div className="space-y-6">
        {kombinasjoner.map((komb) => (
          <article
            key={komb.id}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-semibold text-stone-900">
              {komb.title}
            </h2>
            <p className="mt-3 max-w-3xl text-stone-600">{komb.description}</p>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Inngår i oppsettet
              </p>
              <div className="flex flex-wrap gap-2">
                {komb.items.map((item) => (
                  <Tag key={item} variant="accent">
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
