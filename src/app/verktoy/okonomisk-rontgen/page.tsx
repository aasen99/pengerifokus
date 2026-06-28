import type { Metadata } from "next";
import Link from "next/link";
import { OkonomiskRontgen } from "@/components/verktoy/okonomisk-rontgen/OkonomiskRontgen";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Ta en rask økonomisjekk med 10 spørsmål. Få score fra 0 til 100, delresultater og tre konkrete prioriteringer, uten innlogging.";

export const metadata: Metadata = createPageMetadata({
  title: "Økonomisk røntgen",
  description: toolDescription,
  path: "/verktoy/okonomisk-rontgen",
  keywords: [
    "økonomisk røntgen",
    "økonomisjekk",
    "privatøkonomi",
    "økonomisk helse",
    "buffer",
    "gjeld",
  ],
});

export default function OkonomiskRontgenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Økonomisk røntgen"
        description={toolDescription}
        path="/verktoy/okonomisk-rontgen"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Økonomisk røntgen
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-stone-600">
          Ti korte spørsmål om buffer, gjeld, faste kostnader, sparing og
          økonomisk trygghet. Du får en samlet score og forslag til hva du kan
          prioritere videre.
        </p>
      </header>

      <OkonomiskRontgen />

      <ToolRelatedGuides
        guides={[
          {
            label: "Forstå økonomisk helse",
            href: "/guider/forstaa-okonomisk-helse",
          },
          { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
        ]}
      />
    </div>
  );
}
