import { Tag } from "@/components/ui/Tag";
import type { TilbudProgramOffer } from "@/lib/tilbud";
import { applicableRates, calculateShoppingBonus, CHANNEL_NAMES, formatBonusRange, hasCurrentVerifiedRate, rateIsCurrent, shoppingRateLabel, type BonusSettings } from "@/lib/netthandel";
import { formatTilbudDate } from "@/lib/tilbud-ui";
import type { ShoppingDetails } from "@/types/content";

const names: Record<ShoppingDetails["channel"], string> = {
  "sas-online": "EuroBonus", "trumf-netthandel": "Trumf", klarna: "Klarna",
  spenn: "Spenn", "spenn-direct": "Spenn", "eurobonus-shop": "EuroBonus Shop",
  "eurobonus-shop-giftcard": "EuroBonus gavekort",
};

interface Props {
  offer: TilbudProgramOffer;
  settings: BonusSettings;
  now: string;
}

function rateSummary({ offer, settings, now }: Props): string {
  const d = offer.shopping!;
  if (d.verification === "ended") return "Utgått";
  if (d.verification !== "verified") {
    return d.previousLabel && /\d/.test(d.previousLabel)
      ? `Tidligere ${d.previousLabel} · partner uavklart`
      : "Sats uavklart · ubekreftet partner";
  }
  if (!d.rates.length) return offer.offerLabel;
  const rates = applicableRates(d, settings, now);
  if (!rates.length) return d.rates.every(r => !rateIsCurrent(r, now)) ? "Kampanje utløpt" : "Ingen sats for valgt kunde";
  const labels = [...new Set(rates.map(r => r.unit))].map(unit => {
    const tier = rates.filter(r => r.unit === unit);
    const low = Math.min(...tier.map(r => r.value));
    const high = Math.max(...tier.map(r => r.value));
    const suffix = shoppingRateLabel({ ...tier[0], value: 0 }, d.channel).slice(2);
    return formatBonusRange(low, high, suffix);
  });
  const label = labels.join(" / ");
  if (!hasCurrentVerifiedRate(d, settings, now)) return `Tidligere ${label} · ikke nylig kontrollert`;
  return rates.some(r => r.kind === "campaign") ? `${label} · kampanje` : label;
}

export function ShoppingTag(props: Props & { best: boolean }) {
  const d = props.offer.shopping!;
  return <a href={props.offer.sourceUrl} target="_blank" rel="noopener noreferrer" className="rounded-full hover:underline">
    <Tag variant={props.best ? "accent" : d.verification === "verified" ? "default" : "muted"}>
      {names[d.channel]} · {rateSummary(props)}
    </Tag>
  </a>;
}

export function ShoppingOffer({ offer, settings, now, best }: Props & { best: boolean }) {
  const d = offer.shopping!;
  const value = calculateShoppingBonus(d, settings, now);
  return <section className="space-y-1">
    <a href={offer.sourceUrl} className="font-semibold text-orange-800 underline" target="_blank" rel="noopener noreferrer">{CHANNEL_NAMES[d.channel]}</a>
    {value && <p>{best && <strong>Høyest av kontrollerte. </strong>}Beregnet verdi {formatBonusRange(value.minPct, value.maxPct, "%")} ({formatBonusRange(value.min, value.max, "kr")} ved kjøp på {settings.amount.toLocaleString("nb-NO")} kr).</p>}
    {d.rates.map((r, i) => <p key={i}>{r.label} · {shoppingRateLabel(r, d.channel)}
      {r.kind === "campaign" && " · kampanje"}{r.kind === "ordinary" && " · ordinær sats"}
      {r.endsAt && <> · {rateIsCurrent(r, now) ? "utløper" : "utløpt"} {r.endsAt.length === 10 ? formatTilbudDate(r.endsAt) : new Intl.DateTimeFormat("nb-NO", {dateStyle:"medium", timeStyle:"short", timeZone:"Europe/Oslo"}).format(new Date(r.endsAt))}</>}
      {r.regularValue !== undefined && <> · tidligere {shoppingRateLabel({...r, value:r.regularValue}, d.channel)}</>}
    </p>)}
    {d.verification !== "verified" && <p>{d.verification === "ended" ? "Tilbudet er bekreftet utgått." : d.verification === "not-listed" ? "Mangler i siste katalog. Aktivt partnerskap er uavklart." : "Aktivt partnerskap og sats er ubekreftet."} {d.previousLabel && /\d/.test(d.previousLabel) && <>Tidligere registrert sats var {d.previousLabel}. </>}Kontroll forsøkt {formatTilbudDate(d.attemptedAt)}.</p>}
    {d.checkedAt && <p>Sist kontrollert {formatTilbudDate(d.checkedAt)}.</p>}
    {d.rates.length > 0 && <p>{d.basisNote ?? (d.basis === "ex-vat" ? "Grunnlaget er uten mva og frakt." : d.basis === "incl-vat" ? "Grunnlaget inkluderer mva." : "Mva-grunnlaget er uavklart. Intervallet viser beregning med og uten mva.")}</p>}
    <p>{offer.terms}</p>
    {offer.warning && <p>{offer.warning}</p>}
    {d.discoveryUrl && <a href={d.discoveryUrl} target="_blank" rel="noopener noreferrer" className="underline">Kartleggingskilde</a>}
  </section>;
}
