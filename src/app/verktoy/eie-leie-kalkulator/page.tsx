import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <ToolPageSeo
        name="Eie vs. leie-kalkulator"
        description={toolDescription}
        path="/verktoy/eie-leie-kalkulator"
      />
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Lønner det seg å eie eller leie bolig?
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-stone-600">
          Sammenlign nettoformue ved å kjøpe bolig mot å leie. Kalkulatoren
          investerer månedlig differanse begge veier, slik at sammenligningen
          holder kontantstrømmen lik.
        </p>
      </header>

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
