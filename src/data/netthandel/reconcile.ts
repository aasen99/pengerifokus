import type { Tilbud, ShoppingDetails } from "@/types/content";
import catalogue from "./catalogue.json";
import { amexMerchants } from "../amex-brukersteder";
import { normalizePartnerKey } from "@/lib/partner-key";

interface CatalogueRow {
  partner: string; program: string; category: string; sourceUrl: string; offerLabel: string;
  terms: string; shopping: ShoppingDetails;
}
export const shoppingCatalogue = catalogue as CatalogueRow[];
const checkedAt = "2026-11-26";
function legacyChannel(entry: Tilbud): ShoppingDetails["channel"] | undefined {
  if (entry.id === "tilbud-eurobonus-shop") return "eurobonus-shop";
  if (entry.id.startsWith("tilbud-eurobonus-os-")) return "sas-online";
  if (entry.fordelSlug === "klarna") return "klarna";
  if (entry.fordelSlug === "spenn" && entry.id !== "tilbud-spenn-uno-x-drivstoff") return "spenn";
  if (entry.fordelSlug === "trumf" && /trumf\s*netthandel/i.test(`${entry.terms} ${entry.description} ${entry.sourceUrl}`)) return "trumf-netthandel";
}
function amexFor(partner: string): ShoppingDetails["amex"] {
  const merchant = amexMerchants.find(m => normalizePartnerKey(m.name) === normalizePartnerKey(partner));
  const online = merchant?.channels.find(c => c.type === "online");
  if (!online || !merchant) return undefined;
  return { status: online.status, note: online.note, sources: merchant.sources.filter(s => !s.channels || s.channels.includes("online")).map(s => ({ label: s.label, url: s.url, checkedOn: s.checkedOn })) };
}

/** Preserve IDs, slugs and unrelated benefits; retire numeric claims rather than erase history. */
export function reconcileNetthandel(entries: Tilbud[]): Tilbud[] {
  const lookup = new Map(shoppingCatalogue.map(r => [`${r.shopping.channel}:${normalizePartnerKey(r.partner)}`, r]));
  const used = new Set<string>();
  const result = entries.map(entry => {
    const channel = legacyChannel(entry);
    if (!channel) return entry;
    const previousLabel = entry.warning?.match(/Tidligere oppgitt: (.+?)\. Sjekk gjeldende opptjening/)?.[1] ?? entry.offerLabel;
    const key = `${channel}:${normalizePartnerKey(entry.partner)}`;
    const row = lookup.get(key);
    if (row) {
      used.add(key);
      return { ...entry, offerLabel: row.offerLabel, description: `Bonus hos ${entry.partner}. Se gjeldende opptjening, kontrollstatus og vilkår.`,
        category: row.category === "Netthandel" ? entry.category : row.category,
        sourceUrl: row.sourceUrl, terms: row.terms, warning: undefined, updatedAt: checkedAt,
        shopping: { ...row.shopping, previousLabel, amex: amexFor(entry.partner) } };
    }
    const missing = channel === "klarna" || channel === "trumf-netthandel";
    return { ...entry, offerLabel: missing ? "Ikke funnet i nyeste katalog" : "Sats ikke bekreftet",
      description: `Tidligere registrert hos ${entry.partner}. Aktiv deltakelse og sats må kontrolleres.`, warning: undefined,
      shopping: { channel, verification: missing ? "not-listed" : channel === "spenn" ? "app-required" : "needs-review",
        attemptedAt: checkedAt, sourceKind: "official", rates: [], basis: "unknown", previousLabel, amex: amexFor(entry.partner) } as ShoppingDetails };
  });
  for (const [key, row] of lookup) {
    if (used.has(key)) continue;
    const id = `nett-${row.shopping.channel}-${normalizePartnerKey(row.partner)}`;
    result.push({ id: `tilbud-${id}`, slug: id, status: "published", title: row.partner, partner: row.partner,
      fordelSlug: row.program, category: row.category, offerLabel: row.offerLabel,
      description: `Bonus hos ${row.partner}. Se kontrollstatus og vilkår.`, terms: row.terms, sourceUrl: row.sourceUrl,
      createdAt: checkedAt, updatedAt: checkedAt, shopping: { ...row.shopping, amex: amexFor(row.partner) } });
  }
  return result;
}
