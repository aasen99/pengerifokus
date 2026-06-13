import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guider/GuideArticle";
import { getGuideArticle, getGuideArticleSlugs } from "@/data/guide-articles";
import { getGuideBySlug } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

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
    description: article.intro,
    path: `/guider/${slug}`,
    keywords: guide.tags,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const article = getGuideArticle(slug);

  if (!guide || !article) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <GuideArticle guide={guide} article={article} />
    </div>
  );
}
