import type { Metadata } from "next";
import Link from "next/link";
import { ProsentKalkulator } from "@/components/verktoy/ProsentKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis prosentkalkulator uten reklame. Regn ut prosentandel, prosentendring, økning og nedgang, for rabatt, lønn, pris og mer.";

export const metadata: Metadata = createPageMetadata({
  title: "Prosentkalkulator",
  description: toolDescription,
  path: "/verktoy/prosentkalkulator",
  keywords: [
    "prosentkalkulator",
    "prosentregning",
    "prosentøkning",
    "prosentnedgang",
    "prosentendring",
  ],
});

export default function ProsentkalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Prosentkalkulator"
        description={toolDescription}
        path="/verktoy/prosentkalkulator"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Prosentkalkulator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Regn ut prosent raskt og uten reklame. Andel, endring, økning og
          nedgang, med formelen rett under svaret.
        </p>
      </header>

      <ProsentKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Inflasjon og gjeld", href: "/guider/inflasjon-og-gjeld" },
          { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
        ]}
      />
    </div>
  );
}
