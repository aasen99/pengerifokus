import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { Regel72Kalkulator } from "@/components/verktoy/Regel72Kalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Hvor lang tid tar det å doble pengene dine? Gratis kalkulator med regel 72: enkel tomelfingerregel for rentes rente.";

export const metadata: Metadata = createPageMetadata({
  title: "Regel 72-kalkulator: Når dobles pengene?",
  description: toolDescription,
  path: "/verktoy/regel-72",
  keywords: ["regel 72", "rentes rente", "doble pengene", "avkastning", "sparing"],
});

export default function Regel72Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Regel 72-kalkulator"
        description={toolDescription}
        path="/verktoy/regel-72"
      />
      <ToolPageHeader
        title="Regel 72-kalkulator: Når dobles pengene?"
        description="Del 72 på avkastningen i prosent. Da får du grovt antall år det tar å doble pengene dine."
      />

      <Regel72Kalkulator />

      <p className="mt-8 text-sm text-stone-600">
        Regeln er en grov tilnærming til{" "}
        <Link
          href="/ordbok/rentes-rente"
          className="font-medium text-orange-600 hover:text-orange-700"
        >
          rentes rente
        </Link>
        , ikke en garanti for avkastning.
      </p>

      <ToolRelatedGuides
        guides={[
          { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
          { label: "Rentes rente i ordboken", href: "/ordbok/rentes-rente" },
          { label: "Emne: sparing og investering", href: "/emner/sparing-og-investering" },
        ]}
      />
    </div>
  );
}
