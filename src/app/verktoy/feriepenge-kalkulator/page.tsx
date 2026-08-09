import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { FeriepengeKalkulator } from "@/components/verktoy/FeriepengeKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis feriepengekalkulator: regn ut feriepenger med 10,2 %, 12 %, 12,5 % eller 14,3 % ut fra feriepengegrunnlag eller månedslønn.";

export const metadata: Metadata = createPageMetadata({
  title: "Feriepengekalkulator",
  description: toolDescription,
  path: "/verktoy/feriepenge-kalkulator",
  keywords: [
    "feriepengekalkulator",
    "feriepenger",
    "feriepengegrunnlag",
    "10,2 prosent",
    "12 prosent feriepenger",
  ],
});

export default function FeriepengeKalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Feriepengekalkulator"
        description={toolDescription}
        path="/verktoy/feriepenge-kalkulator"
      />
      <ToolPageHeader
        title="Feriepengekalkulator"
        description="Se hvor mye du får i feriepenger ut fra fjorårets grunnlag, ferielengde og om du fyller 60 år i ferieåret."
      />

      <FeriepengeKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Tid er penger-kalkulator", href: "/verktoy/tid-er-penger" },
          { label: "Prosentkalkulator", href: "/verktoy/prosentkalkulator" },
        ]}
      />
    </div>
  );
}
