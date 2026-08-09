import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { EieLeieKalkulator } from "@/components/verktoy/eie-leie/EieLeieKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Sammenlign nettoformue ved å kjøpe bolig mot å leie, med månedlig investering av differansen begge veier.";

export const metadata: Metadata = createPageMetadata({
  title: "Eie vs. leie-kalkulator",
  description: toolDescription,
  path: "/verktoy/eie-leie-kalkulator",
  keywords: [
    "eie eller leie",
    "eie vs leie",
    "boligkalkulator",
    "kjøpe eller leie bolig",
    "nettoformue",
    "boliglån",
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
        title="Lønner det seg å eie eller leie bolig?"
        description="Sammenlign nettoformue ved å kjøpe bolig mot å leie. Kalkulatoren investerer månedlig differanse begge veier, slik at sammenligningen holder kontantstrømmen lik."
      />

      <EieLeieKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
          { label: "Nettoformue i ordboken", href: "/ordbok/nettoformue" },
        ]}
      />
    </div>
  );
}
