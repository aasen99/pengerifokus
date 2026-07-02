import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Nedbetalingskalkulator"
        description={toolDescription}
        path="/verktoy/nedbetalingskalkulator"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Nedbetalingskalkulator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Har du flere lån? Angi hvor mye du totalt kan bruke på lån hver måned,
          sammenlign lavine og snøball, og se hva du sparer i renter og tid.
        </p>
      </header>

      <Nedbetalingskalkulator />

      <section className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-700">
        <p className="font-medium text-stone-900">Ett enkelt lån?</p>
        <p className="mt-1">
          For boliglån og annuitetslån med terminbeløp og engangsinnbetaling,
          bruk{" "}
          <Link
            href="/verktoy/rentekalkulator"
            className="font-medium text-orange-600 hover:text-orange-700"
          >
            rentekalkulatoren
          </Link>
          .
        </p>
      </section>

      <ToolRelatedGuides
        guides={[
          { label: "Betal ned dyr gjeld", href: "/guider/betal-ned-dyr-gjeld" },
          { label: "Lavinemetode (ordbok)", href: "/ordbok/lavinemetode" },
          { label: "Snøballmetode (ordbok)", href: "/ordbok/snoballmetode" },
          { label: "Rentekalkulator (ett lån)", href: "/verktoy/rentekalkulator" },
          { label: "Lånets reelle verdi", href: "/verktoy/lanets-reelle-verdi" },
        ]}
      />
    </div>
  );
}
