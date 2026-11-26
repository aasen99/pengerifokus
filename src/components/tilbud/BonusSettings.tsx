"use client";

import type { BonusSettings as Settings } from "@/lib/netthandel";
import { calculatorInputClassName } from "@/components/verktoy/calculator-ui";

export function BonusSettings({ value, onChange, online, multiple, verified, onFilter }: {
  value: Settings; onChange: (value: Settings) => void;
  online: boolean; multiple: boolean; verified: boolean;
  onFilter: (key: "online" | "multiple" | "verified", value: boolean) => void;
}) {
  return <section className="rounded-xl border border-orange-200 bg-orange-50/50 p-4" aria-label="Sammenlign netthandel">
    <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-stone-800">
      {([{ key: "online", label: "Kun netthandel", checked: online }, { key: "multiple", label: "Flere bonusprogrammer", checked: multiple }, { key: "verified", label: "Kun kontrollerte satser", checked: verified }] as const).map(f =>
        <label key={f.key} className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={f.checked} onChange={e => onFilter(f.key, e.target.checked)} className="h-4 w-4 accent-orange-600" />{f.label}</label>)}
    </div>
    <details className="mt-3 group">
      <summary className="cursor-pointer text-sm font-semibold text-orange-800">Tilpass poengverdi og kjøp</summary>
      <p className="mt-2 text-sm text-stone-600">EuroBonus {value.euroOre} øre · Spenn {value.spennOre} øre · Trumf {value.trumf === "cash" ? "i kroner" : value.trumf === "auto" ? "automatisk til EuroBonus" : "engang til EuroBonus"}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {([{ key: "euroOre", label: "EuroBonus, øre per poeng", max: 100 }, { key: "spennOre", label: "Spenn, øre per poeng", max: 100 }, { key: "amount", label: "Totalpris inkl. mva og frakt (kr)", max: 1000000 }, { key: "shipping", label: "Frakt inkludert i totalpris (kr)", max: value.amount }] as const).map(f =>
          <label className="text-sm text-stone-700" key={f.key}>{f.label}<input type="number" min={f.key === "amount" ? 1 : 0} max={f.max} step={f.key === "amount" || f.key === "shipping" ? 1 : .5} value={value[f.key]} onChange={e => { const n = e.target.valueAsNumber; if (Number.isFinite(n)) onChange({ ...value, [f.key]: Math.min(f.max, Math.max(f.key === "amount" ? 1 : 0, n)) }); }} className={`${calculatorInputClassName} mt-1 w-full`} /></label>)}
        <label className="text-sm text-stone-700">Bruk Trumf som<select value={value.trumf} onChange={e => onChange({ ...value, trumf: e.target.value as Settings["trumf"] })} className={`${calculatorInputClassName} mt-1 w-full`}><option value="cash">Kroner til bankkonto</option><option value="once">EuroBonus, engang (10 poeng/kr)</option><option value="auto">EuroBonus, automatisk (13,5 poeng/kr)</option></select></label>
        <label className="text-sm text-stone-700">Kunde hos butikken<select value={value.customer} onChange={e => onChange({ ...value, customer: e.target.value as Settings["customer"] })} className={`${calculatorInputClassName} mt-1 w-full`}><option value="existing">Eksisterende kunde</option><option value="new">Ny kunde</option></select></label>
        <label className="text-sm text-stone-700">Mva på kjøpet<select value={value.vat} onChange={e => onChange({ ...value, vat: Number(e.target.value) })} className={`${calculatorInputClassName} mt-1 w-full`}><option value="25">25 %</option><option value="15">15 %</option><option value="12">12 %</option><option value="0">0 %</option></select></label>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-stone-600">Verdien av poeng er din antakelse, ingen garantert kontantrabatt. Beregningen trekker fra frakt og, der vilkårene krever det, mva. Ukjent grunnlag vises som et intervall. Produktunntak kan gi lavere eller ingen bonus. Satser eldre enn 14 dager og utløpte kampanjer inngår ikke i rangeringen.</p>
      <p className="mt-2 text-sm text-stone-600">«Høyest av kontrollerte» vises når ett alternativ har høyere verdi enn hele intervallet for de andre kontrollerte alternativene. Uavklarte tilbud kan ikke rangeres. Bonus fra konkurrerende portaler legges aldri sammen.</p>
      <p className="mt-2 text-sm text-stone-600">Sammenlign produktets totalpris først. Bruk bonus på planlagte kjøp og betal kredittkortregningen fullt ved forfall. <a className="underline" href="https://www.trumf.no/fordeler/sas-eurobonus" target="_blank" rel="noopener noreferrer">Offisielle Trumf-kurser</a>.</p>
    </details>
  </section>;
}
