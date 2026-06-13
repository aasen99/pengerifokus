import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { TilbudList } from "@/components/tilbud/TilbudList";
import { getFordeler, getTilbud } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tilbud",
  description:
    "Medlemsrabatter og Trumf-bonus samlet – OBOS-partnere og Trumf netthandel.",
  path: "/tilbud",
  keywords: [
    "OBOS rabatt",
    "Trumf netthandel",
    "Trumf-bonus",
    "medlemstilbud",
  ],
});

/**
 * CMS/ADMIN: Tilbud administreres via getTilbud() og kobles til fordeler med fordelSlug.
 */
export default function TilbudPage() {
  const tilbud = getTilbud();
  const fordeler = getFordeler();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        title="Tilbud"
        description="Medlemsrabatter og Trumf-bonus – konkrete tilbud koblet til fordelsprogrammene dine."
      />

      <p className="-mt-6 mb-8 text-sm text-stone-600">
        Lurer du på hvilke programmer som finnes?{" "}
        <Link
          href="/fordeler"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          Se oversikt over fordeler →
        </Link>
      </p>

      <Suspense
        fallback={
          <div className="rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-600">
            Laster tilbud...
          </div>
        }
      >
        <TilbudList tilbud={tilbud} fordeler={fordeler} />
      </Suspense>
    </div>
  );
}
