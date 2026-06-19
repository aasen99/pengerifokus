import type { Metadata } from "next";
import Link from "next/link";
import { OkonomiskRontgen } from "@/components/verktoy/okonomisk-rontgen/OkonomiskRontgen";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Økonomisk røntgen",
  description:
    "Ta en rask økonomisjekk med 10 spørsmål. Få score fra 0 til 100, delresultater og tre konkrete prioriteringer, uten innlogging.",
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
      </header>

      <OkonomiskRontgen />
    </div>
  );
}
