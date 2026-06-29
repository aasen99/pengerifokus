import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Bonuskalkulator"
        description={toolDescription}
        path="/verktoy/bonuskalkulator"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Bonuskalkulator
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-stone-600">
          Gå gjennom tre enkle steg: hva poengene kostet å tjene, hva innløsningen
          er verdt, og om du bør bruke poeng eller betale kontant. Start gjerne med
          et eksempel under.
        </p>
      </header>

      <BonusPoengKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Trumf fordelsprogram", href: "/fordeler/trumf" },
          { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
          { label: "Fordelsprogrammer", href: "/fordeler" },
        ]}
      />
    </div>
  );
}
