import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FordelDetail } from "@/components/fordeler/FordelDetail";
import { getFordelBySlug, getFordeler, getTilbudByFordel } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

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

  return createPageMetadata({
    title: fordel.name,
    description: fordel.description,
    path: `/fordeler/${slug}`,
    keywords: [fordel.name, fordel.type, "fordelsprogram", "bonusprogram"],
  });
}

export default async function FordelPage({ params }: FordelPageProps) {
  const { slug } = await params;
  const fordel = getFordelBySlug(slug);

  if (!fordel) notFound();

  const tilbud = getTilbudByFordel(fordel.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <FordelDetail fordel={fordel} tilbud={tilbud} />
    </div>
  );
}
