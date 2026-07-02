import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FordelArticle } from "@/components/fordeler/FordelArticle";
import { FordelDetail } from "@/components/fordeler/FordelDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { FORDELSPROGRAMMER_TITLE } from "@/data/content-labels";
import { getFordelArticle } from "@/data/fordel-articles";
import { getFordelBySlug, getFordeler, getTilbudByFordel } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { getArticleJsonLd, getBreadcrumbJsonLd } from "@/lib/structured-data";

interface FordelPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getFordeler().map((fordel) => ({ slug: fordel.slug }));
}

export async function generateMetadata({
  params,
}: FordelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const fordel = getFordelBySlug(slug);

  if (!fordel) return {};

  const article = getFordelArticle(slug);

  return createPageMetadata({
    title: article?.seoTitle ?? fordel.name,
    description: article?.seoDescription ?? fordel.description,
    path: `/fordeler/${slug}`,
    keywords: article?.seoKeywords ?? [
      fordel.name,
      fordel.type,
      "fordelsprogram",
      "bonusprogram",
    ],
    openGraphType: article ? "article" : "website",
    publishedTime: fordel.createdAt,
    modifiedTime: fordel.updatedAt,
  });
}

export default async function FordelPage({ params }: FordelPageProps) {
  const { slug } = await params;
  const fordel = getFordelBySlug(slug);

  if (!fordel) notFound();

  const article = getFordelArticle(slug);
  const tilbud = getTilbudByFordel(fordel.slug);
  const path = `/fordeler/${fordel.slug}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: FORDELSPROGRAMMER_TITLE, path: "/fordeler" },
          { name: article?.title ?? fordel.name, path },
        ])}
      />
      {article && (
        <JsonLd
          data={getArticleJsonLd({
            title: article.seoTitle,
            description: article.seoDescription,
            path,
            datePublished: fordel.createdAt,
            dateModified: fordel.updatedAt,
          })}
        />
      )}
      {article ? (
        <FordelArticle fordel={fordel} article={article} tilbud={tilbud} />
      ) : (
        <FordelDetail fordel={fordel} tilbud={tilbud} />
      )}
    </div>
  );
}
