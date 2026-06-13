import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContentCard } from "@/components/ui/ContentCard";
import { getGuides } from "@/lib/content";
import { hasGuideArticle } from "@/data/guide-articles";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Guider",
  description:
    "Praktiske økonomiguider for sparing, investering, gjeld og hverdagsøkonomi. Steg-for-steg hjelp uten bankjargong.",
  path: "/guider",
  keywords: ["økonomiguider", "sparing guide", "fond", "bufferkonto", "gjeld"],
});

export default function GuiderPage() {
  const guides = getGuides();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Guider"
        description="Praktiske veiledninger som hjelper deg å ta bedre valg med pengene dine – fra bufferkonto til fond og gjeld."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => {
          const hasArticle = hasGuideArticle(guide.slug);
          return (
            <ContentCard
              key={guide.id}
              title={guide.title}
              description={guide.description}
              meta={guide.category}
              tags={guide.tags}
              actionLabel={hasArticle ? "Les mer" : "Kommer snart"}
              disabled={!hasArticle}
              href={hasArticle ? `/guider/${guide.slug}` : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
