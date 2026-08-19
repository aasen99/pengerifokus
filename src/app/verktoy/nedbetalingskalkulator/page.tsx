import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { Nedbetalingskalkulator } from "@/components/verktoy/Nedbetalingskalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Gratis nedbetalingskalkulator: angi totalt månedsbudsjett for lån, sammenlign lavine og snøball, og se tid og renter spart.";

export const metadata: Metadata = createPageMetadata({
  title: "Nedbetalingskalkulator",
  description: toolDescription,
  path: "/verktoy/nedbetalingskalkulator",
  keywords: [
    "nedbetalingskalkulator",
    "snøballmetoden",
    "lavinemetoden",
    "betal ned gjeld",
    "flere lån",
    "kredittkort",
  ],
});

export default function NedbetalingskalkulatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Nedbetalingskalkulator"
        description={toolDescription}
        path="/verktoy/nedbetalingskalkulator"
      />
      <ToolPageHeader
        title="Nedbetalingskalkulator"
        description="Har du flere lån? Angi hvor mye du totalt kan bruke på lån hver måned, sammenlign lavine og snøball, og se hva du sparer i renter og tid."
      />

      <Nedbetalingskalkulator />

      <section className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
        <p className="font-medium text-stone-900">Ett enkelt lån?</p>
        <p className="mt-1">
          For boliglån og{" "}
          <Link
            href="/ordbok/annuitetslan"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            annuitetslån
          </Link>{" "}
          med terminbeløp og engangsinnbetaling, bruk{" "}
          <Link
            href="/verktoy/rentekalkulator"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            rentekalkulatoren
          </Link>
          . Dyr{" "}
          <Link
            href="/ordbok/forbruksgjeld"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            forbruksgjeld
          </Link>{" "}
          bør vanligvis ned først.
        </p>
      </section>

      <ToolRelatedGuides
        guides={[
          { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
          { label: "Gjeldsbremsen", href: "/verktoy/gjeldsbremsen" },
          { label: "Lavinemetode (ordbok)", href: "/ordbok/lavinemetode" },
          { label: "Snøballmetode (ordbok)", href: "/ordbok/snoballmetode" },
          { label: "Rentekalkulator (ett lån)", href: "/verktoy/rentekalkulator" },
          { label: "Lånets reelle verdi", href: "/verktoy/lanets-reelle-verdi" },
          { label: "Emne: gjeld", href: "/emner/gjeld" },
        ]}
      />
    </div>
  );
}
