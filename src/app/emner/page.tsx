import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import { getEmner } from "@/data/emner";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "Temaside for bolig, gjeld, sparing, bonus og budsjett. Guider, kalkulatorer, ordbok og formuesbyggere samlet etter emne.";

export const metadata: Metadata = createPageMetadata({
  title: "Emner innen personlig økonomi",
  description: pageDescription,
  path: "/emner",
  keywords: ["emner", "bolig", "gjeld", "sparing", "bonus", "budsjett"],
});

export default function EmnerIndexPage() {
  const hubs = getEmner();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <HubPageSeo
        name="Emner"
        description={pageDescription}
        path="/emner"
        items={hubs.map((emne) => ({
          name: emne.title,
          path: `/emner/${emne.slug}`,
          description: emne.description,
        }))}
      />

      <PageHeader
        title="Emner"
        description="Fem innganger til det samme stoffet: bolig, gjeld, sparing og investering, bonus og fordeler, og budsjett. Hver side peker til de beste guidene, verktøyene og ordbokbegrepene for temaet."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((emne) => (
          <ContentCard
            key={emne.slug}
            title={emne.title}
            description={emne.description}
            href={`/emner/${emne.slug}`}
            actionLabel={`Utforsk ${emne.title.toLowerCase()}`}
          />
        ))}
      </div>

      <HubCrossLinks
        links={[
          { href: "/guider", label: "Alle guider" },
          { href: "/verktoy", label: "Alle verktøy" },
          { href: "/ordbok", label: "Ordbok" },
        ]}
      />
    </div>
  );
}
