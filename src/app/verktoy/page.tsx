import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import { getVerktoy } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Verktøy",
  description:
    "Gratis kalkulatorer og verktøy for personlig økonomi – rentekalkulator, sparekalkulator, budsjett og mer.",
  path: "/verktoy",
  keywords: ["økonomiverktøy", "kalkulator", "rente", "sparing", "budsjett"],
});

/**
 * CMS/ADMIN: Verktøy kan kobles til faktiske kalkulator-komponenter.
 * status: 'coming-soon' vises som badge; 'published' gir aktiv lenke til /verktoy/[slug].
 */
export default function VerktoyPage() {
  const tools = getVerktoy();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Verktøy"
        description="Kalkulatorer og verktøy som hjelper deg å regne, planlegge og sammenligne – uten regneark."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const isComingSoon = tool.status === "coming-soon";
          return (
            <ContentCard
              key={tool.id}
              title={tool.name}
              description={tool.description}
              meta={tool.category}
              badge={isComingSoon ? "Kommer snart" : undefined}
              actionLabel={isComingSoon ? "Kommer snart" : "Åpne verktøy"}
              disabled={isComingSoon}
              href={isComingSoon ? undefined : `/verktoy/${tool.slug}`}
            />
          );
        })}
      </div>
    </div>
  );
}
