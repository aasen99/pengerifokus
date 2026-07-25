import type { Metadata } from "next";
import Link from "next/link";
import { MillionKalkulator } from "@/components/verktoy/MillionKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis millionkalkulator: se hvor lang tid det tar å spare til 1 million (eller et annet mål), hvor mye du må sette av per måned, eller hvilken avkastning som trengs.";

export const metadata: Metadata = createPageMetadata({
  title: "Millionkalkulator",
  description: toolDescription,
  path: "/verktoy/millionkalkulator",
  keywords: [
    "millionkalkulator",
    "spare til 1 million",
    "månedlig sparing",
    "avkastning",
    "rentes rente",
  ],
});

export default function MillionkalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Millionkalkulator"
        description={toolDescription}
        path="/verktoy/millionkalkulator"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Millionkalkulator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Finn tid, månedlig beløp eller nødvendig avkastning for å nå 1 million,
          eller et annet sparemål.
        </p>
      </header>

      <MillionKalkulator />

      <p className="mt-10 text-sm text-stone-600">
        Vil du se hvor mye sparingen vokser over tid? Prøv{" "}
        <Link
          href="/verktoy/sparekalkulator"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          sparekalkulatoren
        </Link>{" "}
        eller{" "}
        <Link
          href="/verktoy/regel-72"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          Regel 72
        </Link>
        .
      </p>

      <ToolRelatedGuides
        guides={[
          { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
          { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
        ]}
      />
    </div>
  );
}
