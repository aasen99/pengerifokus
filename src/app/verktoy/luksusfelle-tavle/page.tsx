import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { LuksusfelleTavle } from "@/components/verktoy/LuksusfelleTavle";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Lag din egen pengetavle. Se inntekt, faste og variable utgifter, gjeld og sparing på ett sted. Inspirert av Luksusfellen.";

export const metadata: Metadata = createPageMetadata({
  title: "Luksusfellen-tavle",
  description: toolDescription,
  path: "/verktoy/luksusfelle-tavle",
  keywords: [
    "luksusfellen tavle",
    "pengetavle",
    "budsjett",
    "personlig økonomi",
    "faste utgifter",
  ],
});

export default function LuksusfelleTavlePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Luksusfellen-tavle"
        description={toolDescription}
        path="/verktoy/luksusfelle-tavle"
      />
      <ToolPageHeader
        title="Luksusfellen-tavle"
        description="Fyll inn tallene dine og få oversikt, akkurat som på pengetavlen i Luksusfellen, men digitalt og klart på minutter."
      />

      <LuksusfelleTavle />

      <ToolRelatedGuides
        guides={[
          { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
          { label: "Faste kostnader i ordboken", href: "/ordbok/fast-kostnad" },
        ]}
      />
    </div>
  );
}
