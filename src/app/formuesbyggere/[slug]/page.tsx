import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FormuesbyggerProfile } from "@/components/formuesbyggere/FormuesbyggerProfile";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  FORMUESBYGGERE_TITLE,
} from "@/data/formuesbyggere-labels";
import {
  getFormuesbyggerArticle,
  getFormuesbyggerSlugs,
} from "@/data/formuesbygger-articles";
import { getFormuesbyggerBySlug } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import { getArticleJsonLd, getBreadcrumbJsonLd } from "@/lib/structured-data";

interface FormuesbyggerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getFormuesbyggerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FormuesbyggerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getFormuesbyggerBySlug(slug);
  const article = getFormuesbyggerArticle(slug);

  if (!profile || !article) return {};

  return createPageMetadata({
    title: article.seoAngle,
    description: `${article.intro} ${profile.wealthContext}`,
    path: `/formuesbyggere/${slug}`,
    keywords: [
      profile.name,
      "hvordan ble rik",
      "formue",
      "eierskap",
      profile.industry,
    ],
    openGraphType: "article",
    publishedTime: profile.createdAt,
    modifiedTime: profile.updatedAt,
  });
}

export default async function FormuesbyggerPage({
  params,
}: FormuesbyggerPageProps) {
  const { slug } = await params;
  const profile = getFormuesbyggerBySlug(slug);
  const article = getFormuesbyggerArticle(slug);

  if (!profile || !article) notFound();

  const path = `/formuesbyggere/${slug}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: FORMUESBYGGERE_TITLE, path: "/formuesbyggere" },
          { name: profile.name, path },
        ])}
      />
      <JsonLd
        data={getArticleJsonLd({
          title: article.seoAngle,
          description: article.intro,
          path,
          datePublished: profile.createdAt,
          dateModified: profile.updatedAt,
        })}
      />
      <FormuesbyggerProfile profile={profile} article={article} />
    </div>
  );
}
