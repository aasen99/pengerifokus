import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import { getGuides } from "@/lib/content";
import { hasGuideArticle } from "@/data/guide-articles";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "Praktiske økonomiguider for sparing, investering, gjeld, bolig og hverdagsøkonomi. Steg-for-steg hjelp uten bankjargong.";

export const metadata: Metadata = createPageMetadata({
  title: "Guider",
  description: pageDescription,
  path: "/guider",
  keywords: [
    "økonomiguider",
    "sparing guide",
    "fond",
    "bufferkonto",
    "gjeld",
    "prosentregning",
  ],
});

export default function GuiderPage() {
  const guides = getGuides();
  const listed = guides.filter((guide) => hasGuideArticle(guide.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <HubPageSeo
        name="Guider"
        description={pageDescription}
        path="/guider"
        items={listed.map((guide) => ({
          name: guide.title,
          path: `/guider/${guide.slug}`,
          description: guide.description,
        }))}
      />

      <PageHeader
        title="Guider"
        description="Praktiske veiledninger som hjelper deg å ta bedre valg med pengene dine, fra bufferkonto til fond, gjeld og prosentregning."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => {
          const hasArticle = hasGuideArticle(guide.slug);
          return (
            <ContentCard
              key={guide.id}
              title={guide.title}
              description={guide.description}
              meta={guide.category}
              tags={guide.tags}
              contentType="Guide"
              year={guide.updatedAt}
              actionLabel={hasArticle ? "Les guiden" : "Kommer snart"}
              disabled={!hasArticle}
              href={hasArticle ? `/guider/${guide.slug}` : undefined}
            />
          );
        })}
      </div>

      <HubCrossLinks
        links={[
          { href: "/emner/bolig", label: "Emne: bolig" },
          { href: "/emner/gjeld", label: "Emne: gjeld" },
          { href: "/emner/sparing-og-investering", label: "Emne: sparing og investering" },
          { href: "/verktoy", label: "Kalkulatorer og verktøy" },
          { href: "/ordbok", label: "Økonomiordbok" },
        ]}
      />
    </div>
  );
}
