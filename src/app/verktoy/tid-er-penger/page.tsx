import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/verktoy/ToolPageHeader";
import { TidErPengerKalkulator } from "@/components/verktoy/TidErPengerKalkulator";
import { ToolRelatedGuides } from "@/components/verktoy/ToolRelatedGuides";
import { ToolPageSeo } from "@/components/seo/ToolPageSeo";
import { createPageMetadata } from "@/lib/seo";

const toolDescription =
  "Regn ut hva du faktisk tjener per time, med reisetid, jobbutgifter og skatt. Se forskjellen mellom lønn på papiret og reell timelønn.";

export const metadata: Metadata = createPageMetadata({
  title: "Tid er penger-kalkulator",
  description: toolDescription,
  path: "/verktoy/tid-er-penger",
  keywords: [
    "tid er penger",
    "timelønn",
    "reell lønn",
    "pendling",
    "lønnskalkulator",
  ],
});

export default function TidErPengerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ToolPageSeo
        name="Tid er penger-kalkulator"
        description={toolDescription}
        path="/verktoy/tid-er-penger"
      />
      <ToolPageHeader
        title="Tid er penger-kalkulator"
        description="Lønn delt på arbeidstid høres bra ut, men hva tjener du egentlig per time når du regner med pendling og det jobben koster deg?"
      />

      <TidErPengerKalkulator />

      <ToolRelatedGuides
        guides={[
          { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
        ]}
      />
    </div>
  );
}
