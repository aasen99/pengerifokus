import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { OrdbokTermDetail } from "@/components/ordbok/OrdbokTermDetail";
import { getOrdbok, getOrdbokBySlug } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import {
  getBreadcrumbJsonLd,
  getDefinedTermJsonLd,
} from "@/lib/structured-data";

interface OrdbokTermPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getOrdbok().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: OrdbokTermPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getOrdbokBySlug(slug);

  if (!entry) return {};

  return createPageMetadata({
    title: entry.term,
    description: `${entry.term}: ${entry.definition}`,
    path: `/ordbok/${slug}`,
    keywords: [entry.term, entry.category, ...(entry.tags ?? [])],
  });
}

export default async function OrdbokTermPage({ params }: OrdbokTermPageProps) {
  const { slug } = await params;
  const entry = getOrdbokBySlug(slug);

  if (!entry) notFound();

  const related = getOrdbok()
    .filter((item) => item.category === entry.category && item.slug !== entry.slug)
    .slice(0, 5);

  const path = `/ordbok/${entry.slug}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Ordbok", path: "/ordbok" },
          { name: entry.term, path },
        ])}
      />
      <JsonLd
        data={getDefinedTermJsonLd({
          term: entry.term,
          definition: entry.definition,
          path,
        })}
      />
      <OrdbokTermDetail entry={entry} related={related} />
    </div>
  );
}
