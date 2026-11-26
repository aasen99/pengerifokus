import { writeFileSync } from "node:fs";
import { tilbud } from "../../src/data/tilbud";
import baseline from "../../docs/netthandel/research/baseline.json";
import { groupTilbudByPartner, normalizePartnerKey, parseOfferRate } from "../../src/lib/tilbud";
const now = "2026-11-26";
const shops = tilbud.filter(t => t.shopping);
const groups = groupTilbudByPartner(shops);
const original = new Map(baseline.map(t => [t.id,t]));
const four = new Set(["eurobonus","trumf","klarna","spenn"]);
const portals = shops.filter(t => !t.shopping!.channel.startsWith("eurobonus-shop"));
const counts = (rows: typeof shops) => new Set(rows.map(t => normalizePartnerKey(t.partner))).size;
const overlap = (verifiedOnly: boolean) => {
 const map = new Map<string,Set<string>>();
 for (const t of portals.filter(t => !verifiedOnly || t.shopping!.verification === "verified")) {
  if (!four.has(t.fordelSlug)) continue;
  const k = normalizePartnerKey(t.partner); const s = map.get(k) ?? new Set<string>(); s.add(t.fordelSlug);map.set(k,s);
 }
 return Object.fromEntries([2,3,4].map(n=>[n,[...map.values()].filter(s=>s.size===n).length]));
};
const programs = Object.fromEntries([...four].map(p => [p, {
 registered: counts(portals.filter(t=>t.fordelSlug===p)),
 currentRateVerified: counts(portals.filter(t=>t.fordelSlug===p && t.shopping!.verification==="verified")),
 missingFromCurrentCatalogue: portals.filter(t=>t.fordelSlug===p && t.shopping!.verification==="not-listed").length,
}]));
const added = shops.filter(t=>!original.has(t.id));
const changed = shops.filter(t=> {
 const b = original.get(t.id); if (!b || t.shopping!.verification!=="verified")return false;
 const before = parseOfferRate(b.offerLabel,b.fordelSlug);const after = parseOfferRate(t.offerLabel,t.fordelSlug);
 return before !== null && after !== null && Math.abs(before-after)>.00001;
});
const result = { checkedAt:now, originalOffers:baseline.length, totalOffers:tilbud.length, originalIdsAndSlugsPreserved:baseline.every(b=>tilbud.some(t=>t.id===b.id && t.slug===b.slug)),
 programs, uniqueRegisteredOnlineMerchants:counts(portals), uniqueWithVerifiedCurrentRates:counts(portals.filter(t=>t.shopping!.verification==="verified")),
 allShoppingGroupsIncludingShopAndGiftcards:groups.length, overlapRegistered:overlap(false), overlapVerified:overlap(true),
 addedOffers:added.length, addedVerifiedOffers:added.filter(t=>t.shopping!.verification==="verified").length,
 updatedHeadlineRates:changed.length, confirmedRemovedOffers:0, flaggedMissing:shops.filter(t=>t.shopping!.verification==="not-listed").length,
 campaigns:shops.filter(t=>t.shopping!.rates.some(r=>r.kind==="campaign")).length,
 newOffers:added.map(t=>({id:t.id,partner:t.partner,channel:t.shopping!.channel,verification:t.shopping!.verification})),
 rateChanges:changed.map(t=>({partner:t.partner,program:t.fordelSlug,before:original.get(t.id)!.offerLabel,after:t.offerLabel})),
 missing:shops.filter(t=>t.shopping!.verification==="not-listed").map(t=>({partner:t.partner,program:t.fordelSlug})),
};
writeFileSync("docs/netthandel/status.json",JSON.stringify(result,null,2)+"\n");
console.log(JSON.stringify({...result,newOffers:undefined,rateChanges:undefined,missing:undefined},null,2));
