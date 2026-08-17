import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { SifoKalkulator } from "@/components/verktoy/SifoKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis SIFO-kalkulator: se referansebudsjett for forbruksutgifter 2026 etter husholdningssammensetning, sammenlign to scenarioer eller egne tall.";

export const metadata: Metadata = createPageMetadata({
  title: "SIFO-kalkulator",
  description: toolDescription,
  path: "/verktoy/sifo-kalkulator",
  keywords: [
    "sifo kalkulator",
    "referansebudsjett",
    "sifo referansebudsjett 2026",
    "sammenligne husholdninger",
    "forbruksutgifter",
    "levekostnader",
    "budsjett",
  ],
});

export default function SifoKalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="SIFO-kalkulator"
        description={toolDescription}
        path="/verktoy/sifo-kalkulator"
      />
      <ToolPageHeader
        title="SIFO-kalkulator"
        description="Finn referansebeløp for mat, klær, transport og andre forbruksutgifter basert på SIFOs referansebudsjett 2026. Sammenlign én husholdning, to scenarioer eller egne tall."
      />

      <SifoKalkulator />

      <ToolRelatedGuides
        guides={[
          {
            label: "SIFO referansebudsjett 2026",
            href: "/guider/sifo-budsjett",
          },
          {
            label: "Sammenlign to husholdninger",
            href: "/guider/sifo-sammenligne-husholdninger",
          },
          {
            label: "Kutt faste kostnader",
            href: "/guider/kutt-faste-kostnader",
          },
          {
            label: "Luksusfellen-tavle",
            href: "/verktoy/luksusfelle-tavle",
          },
        ]}
      />
    </div>
  );
}
