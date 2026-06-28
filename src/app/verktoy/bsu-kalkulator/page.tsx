import type { Metadata } from "next";
import Link from "next/link";
import { BsuKalkulator } from "@/components/verktoy/BsuKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis BSU-kalkulator: regn ut skattefordelen og se hvor mye du sparer med boligsparing for ungdom.";

export const metadata: Metadata = createPageMetadata({
  title: "BSU-kalkulator",
  description: toolDescription,
  path: "/verktoy/bsu-kalkulator",
  keywords: ["BSU", "boligsparing", "skattefradrag", "BSU kalkulator", "ungdom bolig"],
});

export default function BsuKalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="BSU-kalkulator"
        description={toolDescription}
        path="/verktoy/bsu-kalkulator"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          BSU-kalkulator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Se hvor mye du kan spare med BSU, inkludert skattefradraget på 10 % av
          årlige innskudd.
        </p>
      </header>

      <BsuKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
          { label: "BSU i ordboken", href: "/ordbok/bsu" },
        ]}
      />
    </div>
  );
}
