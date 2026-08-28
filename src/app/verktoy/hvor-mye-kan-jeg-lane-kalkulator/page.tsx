import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { LaneKapasitetKalkulator } from "@/components/verktoy/LaneKapasitetKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis kalkulator: regn ut maks boliglån med EK × 10 − gjeld og lønn × 5 − gjeld.";

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
    "EK ganger 10",
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
        description="Se maks boliglån og kjøpesum ut fra EK × 10 − gjeld og lønn × 5 − gjeld."
      />

      <LaneKapasitetKalkulator />

      <ToolRelatedGuides
        guides={[
          {
            label: "EK × 10 og lønn × 5: låneramme før boligkjøp",
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
