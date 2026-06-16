import type { Metadata } from "next";
import Link from "next/link";
import { Regel72Kalkulator } from "@/components/verktoy/Regel72Kalkulator";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Regel 72",
  description:
    "Hvor lang tid tar det å doble pengene dine? Gratis kalkulator med regel 72 – enkel tomelfingerregel for rentes rente.",
  path: "/verktoy/regel-72",
  keywords: ["regel 72", "rentes rente", "doble pengene", "avkastning", "sparing"],
});

export default function Regel72Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Regel 72
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Del 72 på avkastningen i prosent – da får du grovt antall år det tar
          å doble pengene dine.
        </p>
      </header>

      <Regel72Kalkulator />
    </div>
  );
}
