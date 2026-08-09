import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { BonusPoengKalkulator } from "@/components/verktoy/BonusPoengKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis bonuskalkulator. Regn ut kostnad per bonuspoeng, innløsningsverdi for hotell og fly, og om det lønner seg å bruke poeng eller betale kontant.";

export const metadata: Metadata = createPageMetadata({
  title: "Bonuskalkulator",
  description: toolDescription,
  path: "/verktoy/bonuskalkulator",
  keywords: [
    "bonuskalkulator",
    "bonuspoeng",
    "trumf",
    "cashback",
    "hotellpoeng",
    "flypoeng",
    "innløsning poeng",
    "kost per poeng",
  ],
});

export default function BonuskalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Bonuskalkulator"
        description={toolDescription}
        path="/verktoy/bonuskalkulator"
      />
      <ToolPageHeader
        title="Bonuskalkulator"
        description="Gå gjennom tre enkle steg: hva poengene kostet å tjene, hva innløsningen er verdt, og om du bør bruke poeng eller betale kontant. Start gjerne med et eksempel under."
      />

      <BonusPoengKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Velg riktig kredittkort", href: "/guider/velg-riktig-kredittkort" },
          { label: "Bonuspoeng (ordbok)", href: "/ordbok/bonuspoeng" },
          { label: "Trumf", href: "/fordeler/trumf" },
          { label: "Spenn", href: "/fordeler/spenn" },
          { label: "Kredittkortfordeler", href: "/fordeler/kredittkortfordeler" },
          { label: "Se tilbud", href: "/tilbud" },
        ]}
      />
    </div>
  );
}
