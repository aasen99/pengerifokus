import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SitatList } from "@/components/sitater/SitatList";
import { getAllSitater } from "@/lib/sitater";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sitater",
  description:
    "Sitater om penger, investering og formue fra formuesbyggerne – med kilde og lenke til profilen.",
  path: "/ordbok/sitater",
  keywords: [
    "økonomisitater",
    "investeringssitater",
    "formuessitater",
    "visdom om penger",
  ],
});

export default function SitaterPage() {
  const entries = getAllSitater();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Sitater"
        description="Visdom og sitater fra formuesbyggerne vi skriver om. Hvert sitat har kilde – engelske sitater vises på originalspråk med norsk oversettelse."
      />

      <p className="mb-8 text-sm text-stone-600">
        Del av{" "}
        <Link href="/ordbok" className="font-medium text-orange-600 hover:text-orange-700">
          ordboken
        </Link>
        . Kun sitater med dokumentert kilde vises her.
      </p>

      <SitatList entries={entries} />
    </div>
  );
}
