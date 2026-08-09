import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { Sparekalkulator } from "@/components/verktoy/Sparekalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis sparekalkulator. Se hvor mye sparingen din vokser og sammenlign effekten av ekstra månedlig sparing over tid.";

export const metadata: Metadata = createPageMetadata({
  title: "Sparekalkulator",
  description: toolDescription,
  path: "/verktoy/sparekalkulator",
  keywords: ["sparekalkulator", "sparing", "avkastning", "rentes rente", "fond sparing"],
});

export default function SparekalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Sparekalkulator"
        description={toolDescription}
        path="/verktoy/sparekalkulator"
      />
      <ToolPageHeader
        title="Sparekalkulator"
        description="Sammenlign vanlig sparing med å legge til litt ekstra hver måned, for eksempel 200 kr, og se forskjellen over tid."
      />

      <Sparekalkulator />

      <p className="mt-10 text-sm text-stone-600">
        Vil du spare til et mål, for eksempel 1 million? Prøv{" "}
        <Link
          href="/verktoy/millionkalkulator"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          millionkalkulatoren
        </Link>
        .
      </p>

      <ToolRelatedGuides
        guides={[
          { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
          { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
        ]}
      />
    </div>
  );
}
