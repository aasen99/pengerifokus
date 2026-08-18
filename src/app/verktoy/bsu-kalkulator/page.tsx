import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { BsuKalkulator } from "@/components/verktoy/BsuKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis BSU-kalkulator: regn ut skattefordelen og se hvor mye du sparer med boligsparing for ungdom.";

export const metadata: Metadata = createPageMetadata({
  title: "BSU-kalkulator",
  description: toolDescription,
  path: "/verktoy/bsu-kalkulator",
  keywords: ["BSU", "boligsparing", "skattefradrag", "BSU kalkulator", "ungdom bolig"],
});

export default function BsuKalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="BSU-kalkulator"
        description={toolDescription}
        path="/verktoy/bsu-kalkulator"
      />
      <ToolPageHeader
        title="BSU-kalkulator"
        description="Se hvor mye du kan spare med BSU innenfor innskuddsgrensen, og når skattefradraget faktisk gjelder."
      />

      <BsuKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
          { label: "BSU i ordboken", href: "/ordbok/bsu" },
        ]}
      />
    </div>
  );
}
