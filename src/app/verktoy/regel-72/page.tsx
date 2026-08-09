import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { Regel72Kalkulator } from "@/components/verktoy/Regel72Kalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Hvor lang tid tar det å doble pengene dine? Gratis kalkulator med regel 72: enkel tomelfingerregel for rentes rente.";

export const metadata: Metadata = createPageMetadata({
  title: "Regel 72",
  description: toolDescription,
  path: "/verktoy/regel-72",
  keywords: ["regel 72", "rentes rente", "doble pengene", "avkastning", "sparing"],
});

export default function Regel72Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Regel 72"
        description={toolDescription}
        path="/verktoy/regel-72"
      />
      <ToolPageHeader
        title="Regel 72"
        description="Del 72 på avkastningen i prosent. Da får du grovt antall år det tar å doble pengene dine."
      />

      <Regel72Kalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
          { label: "Rentes rente i ordboken", href: "/ordbok/rentes-rente" },
        ]}
      />
    </div>
  );
}
