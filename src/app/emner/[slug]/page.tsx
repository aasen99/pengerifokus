import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmneHubPage } from "@/components/emner/EmneHubPage";
import { getEmneBySlug, getEmneSlugs } from "@/data/emner";
import { createPageMetadata } from "@/lib/seo";

interface EmnePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getEmneSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EmnePageProps): Promise<Metadata> {
  const { slug } = await params;
  const emne = getEmneBySlug(slug);

  if (!emne) return {};

  return createPageMetadata({
    title: emne.seoTitle ?? emne.title,
    description: emne.description,
    path: `/emner/${slug}`,
    keywords: emne.keywords,
  });
}

export default async function EmnePage({ params }: EmnePageProps) {
  const { slug } = await params;
  const emne = getEmneBySlug(slug);

  if (!emne) notFound();

  return <EmneHubPage emne={emne} />;
}
