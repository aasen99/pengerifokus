import type { Metadata } from "next";
import Link from "next/link";
import { DopengeKalkulator } from "@/components/verktoy/DopengeKalkulator";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Hvor mye tjener du på å sitte på do på jobben? Regn ut dopenge per dag, måned og år, basert på nettolønn og arbeidstid.";

export const metadata: Metadata = createPageMetadata({
  title: "Dopengekalkulator",
  description: toolDescription,
  path: "/verktoy/dopenge-kalkulator",
  keywords: [
    "dopenge",
    "dopenger",
    "timelønn",
    "jobb",
    "humor",
    "lønn",
  ],
});

export default function DopengeKalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Dopengekalkulator"
        description={toolDescription}
        path="/verktoy/dopenge-kalkulator"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Dopengekalkulator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Hva får du egentlig betalt for å sitte på do på jobben? Fyll inn lønn
          og en ærlig do-estimat, så ser du dopenge per dag, måned og år.
        </p>
      </header>

      <DopengeKalkulator />
    </div>
  );
}
