import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tag } from "@/components/ui/Tag";
import { getOrdbok } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ordbok",
  description:
    "Enkel økonomiordbok med forklaringer på begreper som effektiv rente, ASK, inflasjon og mer.",
};

/**
 * CMS/ADMIN: Ordbokbegreper administreres via getOrdbok().
 * Senere: søk, filtrering på kategori, og /ordbok/[slug] for enkeltbegreper.
 */
export default function OrdbokPage() {
  const entries = getOrdbok();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Ordbok"
        description="Forklaringer på økonomiske begreper – kort, tydelig og uten unødvendig jargong."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-2">
              <Tag>{entry.category}</Tag>
            </div>
            <h2 className="text-lg font-semibold text-stone-900">
              {entry.term}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {entry.definition}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
