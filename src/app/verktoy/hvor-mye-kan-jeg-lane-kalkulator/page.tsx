import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { LaneKapasitetKalkulator } from "@/components/verktoy/LaneKapasitetKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Regn ut maks boliglån og kjøpesum ut fra inntekt, gjeld og egenkapital.";

export const metadata: Metadata = createPageMetadata({
  title: "Hvor mye kan jeg låne-kalkulator",
  description: toolDescription,
  path: "/verktoy/hvor-mye-kan-jeg-lane-kalkulator",
  keywords: [
    "hvor mye kan jeg låne",
    "lånekapasitet",
    "boliglån kalkulator",
    "egenkapital",
    "gjeldsgrad",
    "5 ganger inntekt",
    "belåningsgrad",
  ],
});

export default function HvorMyeKanJegLaneKalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Hvor mye kan jeg låne-kalkulator"
        description={toolDescription}
        path="/verktoy/hvor-mye-kan-jeg-lane-kalkulator"
      />
      <ToolPageHeader
        title="Hvor mye kan jeg låne-kalkulator"
        description="Et enkelt anslag på maks boliglån og kjøpesum, basert på egenkapital, gjeld og lønn."
      />

      <LaneKapasitetKalkulator />

      <ToolRelatedGuides
        guides={[
          {
            label: "Låneramme før boligkjøp",
            href: "/guider/laneramme-for-boligkjop",
          },
          { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
          { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
          { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
          { label: "Gjeldsgrad i ordboken", href: "/ordbok/gjeldsgrad" },
        ]}
      />
    </div>
  );
}
