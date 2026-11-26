import type { TilbudProgramOffer } from "@/lib/tilbud";
import { applicableRates, calculateShoppingBonus, CHANNEL_NAMES, formatBonusRange, shoppingRateLabel, type BonusSettings } from "@/lib/netthandel";
import { formatTilbudDate } from "@/lib/tilbud-ui";

export function ShoppingOffer({ offer, settings, now, best }: { offer: TilbudProgramOffer; settings: BonusSettings; now: string; best: boolean }) {
  const d = offer.shopping!;
  const value = calculateShoppingBonus(d, settings, now);
  const rates = applicableRates(d, settings, now);
  const campaign = rates.some(r => r.kind === "campaign");
  const stale = d.checkedAt && Date.parse(now) - Date.parse(d.checkedAt) > 14 * 86400000;
  const status = d.verification === "app-required" ? "Sats må sjekkes i appen" : d.verification === "not-listed" ? "Ikke funnet i nyeste katalog" : "Trenger ny kontroll";
  return <div className="rounded-lg border border-stone-200 px-3 py-2.5 text-sm">
    <div className="flex flex-wrap items-baseline justify-between gap-1">
      <a href={offer.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-700 hover:underline">{CHANNEL_NAMES[d.channel]}</a>
      {best && <span className="rounded bg-green-50 px-2 py-0.5 text-sm font-medium text-green-800">Høyest av kontrollerte</span>}
    </div>
    <p className="mt-1 font-medium text-stone-900">{d.verification === "verified" && rates.length ? <>{campaign ? "Kampanje: " : "Publisert sats: "}{offer.offerLabel}</> : d.verification === "verified" && !d.rates.length ? offer.offerLabel : status}</p>
    {stale && <p className="mt-1 text-amber-800">Satsen trenger ny kontroll. Den inngår ikke i beregningen.</p>}
    {value && <p className="mt-1 text-stone-700">Beregnet verdi <strong>{formatBonusRange(value.minPct, value.maxPct, "%")}</strong><span className="block text-stone-600">{formatBonusRange(value.min, value.max, "kr")} ved ditt kjøp på {settings.amount.toLocaleString("nb-NO")} kr, {settings.customer === "new" ? "ny" : "eksisterende"} kunde</span></p>}
    {d.verification === "verified" && d.rates.length > 0 && !rates.length && <p className="mt-1 text-amber-800">Ingen gjeldende sats for valgt kundetype. Kampanjen kan være utløpt. Sjekk ny sats hos programmet.</p>}
    {d.checkedAt && <p className="mt-1 text-sm text-stone-500">{d.verification === "verified" ? "Sats kontrollert" : "Kilde gjennomgått"} {formatTilbudDate(d.checkedAt)}</p>}
    <details className="mt-2">
      <summary className="cursor-pointer text-stone-600 hover:text-stone-900">Satser, grunnlag og vilkår</summary>
      <div className="mt-2 space-y-2 leading-relaxed text-stone-600">
        {d.rates.map((r, i) => <p key={i}>{r.label}: {shoppingRateLabel(r, d.channel)}. {r.kind === "campaign" ? "Kampanje." : r.kind === "ordinary" ? "Ordinær sats." : "Publisert sats; ordinær sats/kampanje er ikke særskilt oppgitt."} {r.regularValue !== undefined && <>Tidligere vist: {r.regularValue.toLocaleString("nb-NO")} %. </>}{r.endsAt && <>Utløper {new Intl.DateTimeFormat("nb-NO", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Oslo" }).format(new Date(r.endsAt.length === 10 ? `${r.endsAt}T23:59:59+01:00` : r.endsAt))} (Oslo).</>}</p>)}
        <p>{d.basisNote ?? (d.basis === "ex-vat" ? "Bonus beregnes uten mva, frakt og gebyrer." : d.basis === "incl-vat" ? "Bonusgrunnlag inkluderer mva." : "Mva-grunnlag er uavklart. Verdiintervallet viser grunnlag med og uten mva. Frakt er trukket fra; øvrige unntak må sjekkes.")}</p>
        <p>{offer.terms}</p>
        {offer.warning && <p className="text-amber-900">{offer.warning}</p>}
        {d.previousLabel && d.verification !== "verified" && <p>Tidligere registrert, ikke bekreftet nå: {d.previousLabel}. Inngår ikke i beregningen.</p>}
        {d.sourceKind === "discovery" && <p>Butikken er et kartleggingsfunn. Aktiv deltakelse og sats må bekreftes hos programmet.{d.discoveryUrl && <> <a className="underline" href={d.discoveryUrl} target="_blank" rel="noopener noreferrer">Kartleggingskilde</a>.</>}</p>}
        {d.verification !== "verified" && <p>Kontroll forsøkt {formatTilbudDate(d.attemptedAt)}.</p>}
      </div>
    </details>
  </div>;
}
