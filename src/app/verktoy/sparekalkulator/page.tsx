import type { Metadata } from "next";
import Link from "next/link";
import { Sparekalkulator } from "@/components/verktoy/Sparekalkulator";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sparekalkulator",
  description:
    "Gratis sparekalkulator. Se hvor mye sparingen din vokser og sammenlign effekten av ekstra månedlig sparing over tid.",
  path: "/verktoy/sparekalkulator",
  keywords: ["sparekalkulator", "sparing", "avkastning", "rentes rente", "fond sparing"],
});

export default function SparekalkulatorPage() {
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
          Sparekalkulator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Sammenlign vanlig sparing med å legge til litt ekstra hver måned,
          for eksempel 200 kr, og se forskjellen over tid.
        </p>
      </header>

      <Sparekalkulator />
    </div>
  );
}
