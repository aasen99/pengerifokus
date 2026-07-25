import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import { getVerktoy } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import type { Verktoy } from "@/types/content";

const pageDescription =
  "Gratis kalkulatorer for personlig økonomi: prosent, sparing, rente, bolig, feriepenger, BSU, bonuspoeng og mer. Uten regneark.";

export const metadata: Metadata = createPageMetadata({
  title: "Verktøy",
  description: pageDescription,
  path: "/verktoy",
  keywords: [
    "økonomiverktøy",
    "kalkulator",
    "prosentkalkulator",
    "sparekalkulator",
    "rentekalkulator",
    "feriepengekalkulator",
  ],
});

const categoryOrder = [
  "Sparing",
  "Gjeld",
  "Bolig",
  "Budsjett",
  "Lønn",
  "Økonomi",
  "Fordeler",
];

function groupByCategory(tools: Verktoy[]): { category: string; tools: Verktoy[] }[] {
  const groups = new Map<string, Verktoy[]>();

  for (const tool of tools) {
    const list = groups.get(tool.category) ?? [];
    list.push(tool);
    groups.set(tool.category, list);
  }

  const ordered = categoryOrder
    .filter((category) => groups.has(category))
    .map((category) => ({
      category,
      tools: groups.get(category)!,
    }));

  for (const [category, categoryTools] of groups) {
    if (!categoryOrder.includes(category)) {
      ordered.push({ category, tools: categoryTools });
    }
  }

  return ordered;
}

/**
 * CMS/ADMIN: Verktøy kan kobles til faktiske kalkulator-komponenter.
 * status: 'coming-soon' vises som badge; 'published' gir aktiv lenke til /verktoy/[slug].
 */
export default function VerktoyPage() {
  const tools = getVerktoy();
  const grouped = groupByCategory(tools);
  const published = tools.filter((tool) => tool.status === "published");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <HubPageSeo
        name="Verktøy"
        description={pageDescription}
        path="/verktoy"
        items={published.map((tool) => ({
          name: tool.name,
          path: `/verktoy/${tool.slug}`,
          description: tool.description,
        }))}
      />

      <PageHeader
        title="Verktøy"
        description="Kalkulatorer og verktøy som hjelper deg å regne, planlegge og sammenligne, uten regneark."
      />

      <div className="space-y-12">
        {grouped.map(({ category, tools: categoryTools }) => (
          <section key={category}>
            <h2 className="text-lg font-semibold text-stone-900">{category}</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryTools.map((tool) => {
                const isComingSoon = tool.status === "coming-soon";
                return (
                  <ContentCard
                    key={tool.id}
                    title={tool.name}
                    description={tool.description}
                    badge={isComingSoon ? "Kommer snart" : undefined}
                    actionLabel={isComingSoon ? "Kommer snart" : "Åpne verktøy"}
                    disabled={isComingSoon}
                    href={isComingSoon ? undefined : `/verktoy/${tool.slug}`}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <HubCrossLinks
        links={[
          { href: "/guider", label: "Guider" },
          { href: "/guider/prosentregning", label: "Prosentregning" },
          { href: "/ordbok", label: "Ordbok" },
        ]}
      />
    </div>
  );
}
