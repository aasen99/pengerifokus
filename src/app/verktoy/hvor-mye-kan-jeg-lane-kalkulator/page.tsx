import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { LaneKapasitetKalkulator } from "@/components/verktoy/LaneKapasitetKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis kalkulator: regn ut hvor mye du kan låne til bolig med EK − GJELD, 5× inntektsregelen og egenkapitalkrav.";

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
    "EK minus gjeld",
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
        description="Se netto posisjonen din (EK − GJELD) og et anslag på maks boliglån ut fra inntekt og egenkapitalkrav."
      />

      <LaneKapasitetKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
          { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
          { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
          { label: "Gjeldsgrad i ordboken", href: "/ordbok/gjeldsgrad" },
        ]}
      />
    </div>
  );
}
