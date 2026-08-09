import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Dopengekalkulator"
        description={toolDescription}
        path="/verktoy/dopenge-kalkulator"
      />
      <ToolPageHeader
        title="Dopengekalkulator"
        description="Hva får du egentlig betalt for å sitte på do på jobben? Fyll inn lønn og en ærlig do-estimat, så ser du dopenge per dag, måned og år."
      />

      <DopengeKalkulator />
    </div>
  );
}
