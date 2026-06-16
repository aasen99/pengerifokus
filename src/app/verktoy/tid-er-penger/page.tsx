import type { Metadata } from "next";
import Link from "next/link";
import { TidErPengerKalkulator } from "@/components/verktoy/TidErPengerKalkulator";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tid er penger-kalkulator",
  description:
    "Regn ut hva du faktisk tjener per time – med reisetid, jobbutgifter og skatt. Se forskjellen mellom lønn på papiret og reell timelønn.",
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/verktoy"
        className="text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        ← Tilbake til verktøy
      </Link>

      <header className="mt-4 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Tid er penger-kalkulator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Lønn delt på arbeidstid høres bra ut – men hva tjener du egentlig per
          time når du regner med pendling og det jobben koster deg?
        </p>
      </header>

      <TidErPengerKalkulator />
    </div>
  );
}
