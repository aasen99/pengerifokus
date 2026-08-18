import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { EieLeieKalkulator } from "@/components/verktoy/eie-leie/EieLeieKalkulator";
import { EieLeieKalkulatorSeoContent } from "@/components/verktoy/eie-leie/EieLeieKalkulatorSeoContent";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis eie vs. leie-kalkulator: regn ut og sammenlign nettoformue ved boligkjøp mot leie. Finn break-even med boliglån, egenkapital og husleie.";

export const metadata: Metadata = createPageMetadata({
  title: "Eie vs. leie-kalkulator",
  description: toolDescription,
  path: "/verktoy/eie-leie-kalkulator",
  keywords: [
    "eie vs leie kalkulator",
    "eie eller leie",
    "eie bolig",
    "leie bolig",
    "kjøpe eller leie bolig",
    "boligkjøp",
    "boliglån",
    "egenkapital",
    "nettoformue",
    "break-even",
    "husleie",
    "terminbeløp",
    "boligkalkulator",
    "sammenligne eie og leie",
  ],
});

export default function EieLeieKalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Eie vs. leie-kalkulator"
        description={toolDescription}
        path="/verktoy/eie-leie-kalkulator"
      />
      <ToolPageHeader
        title="Eie vs. leie-kalkulator"
        description="Regn ut og sammenlign nettoformue ved boligkjøp mot leie. Finn break-even, med boliglån, egenkapital, husleie og alternativ avkastning."
      />

      <EieLeieKalkulator />

      <EieLeieKalkulatorSeoContent />

      <ToolRelatedGuides
        guides={[
          { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
          { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
          { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
          { label: "Nettoformue i ordboken", href: "/ordbok/nettoformue" },
          { label: "Emne: bolig", href: "/emner/bolig" },
        ]}
      />
    </div>
  );
}
