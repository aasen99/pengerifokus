import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { Rentekalkulator } from "@/components/verktoy/Rentekalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis rentekalkulator for ett lån: beregn månedlig terminbeløp, total rentekostnad, og se hva du sparer med ekstra eller engangsinnbetaling.";

export const metadata: Metadata = createPageMetadata({
  title: "Rentekalkulator",
  description: toolDescription,
  path: "/verktoy/rentekalkulator",
  keywords: ["rentekalkulator", "lånekalkulator", "annuitetslån", "ekstra innbetaling", "boliglån"],
});

export default function RentekalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Rentekalkulator"
        description={toolDescription}
        path="/verktoy/rentekalkulator"
      />
      <ToolPageHeader
        title="Rentekalkulator"
        description="For ett annuitetslån: se hva lånet koster over tid, og hvor mye du sparer med ekstra innbetaling per måned eller engangsinnbetaling."
      />

      <Rentekalkulator />

      <section className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
        <p className="font-medium text-stone-900">Flere lån samtidig?</p>
        <p className="mt-1">
          For kredittkort, forbrukslån og studielån i én plan, bruk{" "}
          <Link
            href="/verktoy/nedbetalingskalkulator"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            nedbetalingskalkulatoren
          </Link>{" "}
          (lavine vs. snøball).
        </p>
      </section>

      <ToolRelatedGuides
        guides={[
          { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
          { label: "Nedbetalingskalkulator (flere lån)", href: "/verktoy/nedbetalingskalkulator" },
          { label: "Effektiv rente i ordboken", href: "/ordbok/effektiv-rente" },
        ]}
      />
    </div>
  );
}
