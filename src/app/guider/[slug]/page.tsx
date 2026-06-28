import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guider/GuideArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGuideArticle, getGuideArticleSlugs } from "@/data/guide-articles";
import { getGuideBySlug } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { getArticleJsonLd, getBreadcrumbJsonLd } from "@/lib/structured-data";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getGuideArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const article = getGuideArticle(slug);

  if (!guide || !article) return {};

  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guider/${slug}`,
    keywords: guide.tags,
    openGraphType: "article",
    publishedTime: guide.createdAt,
    modifiedTime: guide.updatedAt,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const article = getGuideArticle(slug);

  if (!guide || !article) notFound();

  const path = `/guider/${slug}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Guider", path: "/guider" },
          { name: guide.title, path },
        ])}
      />
      <JsonLd
        data={getArticleJsonLd({
          title: guide.title,
          description: guide.description,
          path,
          datePublished: guide.createdAt,
          dateModified: guide.updatedAt,
        })}
      />
      <GuideArticle guide={guide} article={article} />
    </div>
  );
}
