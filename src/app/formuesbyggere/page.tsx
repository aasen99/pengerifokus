import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormuesbyggerList } from "@/components/formuesbyggere/FormuesbyggerList";
import {
  FORMUESBYGGERE_INTRO,
  FORMUESBYGGERE_TITLE,
} from "@/data/formuesbyggere-labels";
import { getFormuesbyggere } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: FORMUESBYGGERE_TITLE,
  description:
    "Korte profiler av kjente formuesbyggere i Norge og internasjonalt. Hvordan de startet, hva de eier, og hva vi kan lære av reisen deres.",
  path: "/formuesbyggere",
  keywords: [
    "formuesbyggere",
    "hvordan ble de rike",
    "milliardærer",
    "eierskap",
    "gründer",
    "investor",
    "norske milliardærer",
  ],
});

export default function FormuesbyggerePage() {
  const entries = getFormuesbyggere();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader title={FORMUESBYGGERE_TITLE} description={FORMUESBYGGERE_INTRO} />
      <FormuesbyggerList entries={entries} />
    </div>
  );
}
