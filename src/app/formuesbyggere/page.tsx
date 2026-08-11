import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormuesbyggerList } from "@/components/formuesbyggere/FormuesbyggerList";
import { HubCrossLinks } from "@/components/seo/HubCrossLinks";
import { HubPageSeo } from "@/components/seo/HubPageSeo";
import {
  FORMUESBYGGERE_INTRO,
  FORMUESBYGGERE_TITLE,
} from "@/data/formuesbyggere-labels";
import { getFormuesbyggere } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

const pageDescription =
  "Slik ble de rike: formuesbyggere i Norge og internasjonalt. Formueanslag, tidslinje, eierskap versus kontroll, og konkrete lærdommer, med kildehierarki.";

export const metadata: Metadata = createPageMetadata({
  title: FORMUESBYGGERE_TITLE,
  description: pageDescription,
  path: "/formuesbyggere",
  keywords: [
    "formuesbyggere",
    "hvordan ble de rike",
    "milliardærer",
    "formue",
    "eierskap",
    "gründer",
    "investor",
    "norske milliardærer",
    "Kapital 400",
    "Forbes",
  ],
});

export default function FormuesbyggerePage() {
  const entries = getFormuesbyggere();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <HubPageSeo
        name={FORMUESBYGGERE_TITLE}
        description={pageDescription}
        path="/formuesbyggere"
        items={entries.map((entry) => ({
          name: entry.name,
          path: `/formuesbyggere/${entry.slug}`,
          description: entry.tagline,
        }))}
      />

      <PageHeader title={FORMUESBYGGERE_TITLE} description={FORMUESBYGGERE_INTRO} />
      <FormuesbyggerList entries={entries} />

      <HubCrossLinks
        links={[
          { href: "/ordbok/sitater", label: "Sitater" },
          { href: "/guider", label: "Guider" },
          { href: "/verktoy", label: "Verktøy" },
        ]}
      />
    </div>
  );
}
