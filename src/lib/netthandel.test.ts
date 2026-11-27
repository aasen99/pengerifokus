import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateShoppingBonus, DEFAULT_BONUS_SETTINGS as defaults, rateIsCurrent } from "./netthandel";
import { normalizePartnerKey, groupTilbudByPartner, sortGruppertTilbud, filterShoppingGroups } from "./tilbud";
import { buildTilbudHref } from "./tilbud-ui";
import { filterGruppertTilbudByQuery } from "./tilbud-search";
import { tilbud } from "../data/tilbud";
import baseline from "../../docs/netthandel/research/baseline.json";
import type { ShoppingDetails } from "../types/content";
const now = "2026-11-26T13:00:00Z";
const base: ShoppingDetails = { channel: "sas-online", verification: "verified", checkedAt: "2026-11-26", attemptedAt: "2026-11-26", sourceKind: "official", basis: "ex-vat", rates: [{ label: "Alt", value: 100, unit: "points-per-100", kind: "listed" }] };

describe("bonus comparison", () => {
  it("applies individual point value, VAT and shipping to the actual purchase", () => {
    const value = calculateShoppingBonus(base, { ...defaults, euroOre: 15, amount: 1100, shipping: 100 }, now)!;
    assert.equal(value.min, 120); // 1000 / 1.25 * 100 points/100 NOK * .15 NOK
    assert.equal(value.max, 120);
    assert.equal(calculateShoppingBonus(base, { ...defaults, euroOre: 15, vat: 0 }, now)!.minPct, 15);
    const spenn = calculateShoppingBonus({ ...base, channel: "spenn", basis: "incl-vat" }, { ...defaults, spennOre: 7, euroOre: 20 }, now)!;
    assert.ok(Math.abs(spenn.minPct - 7) < 1e-10);
  });
  it("offers all three Trumf uses at official exchange rates", () => {
    const trumf: ShoppingDetails = { ...base, channel: "trumf-netthandel", basis: "incl-vat", rates: [{ label: "Alle", value: 10, unit: "percent", kind: "listed" }] };
    assert.equal(calculateShoppingBonus(trumf, defaults, now)!.minPct, 10);
    assert.equal(calculateShoppingBonus(trumf, { ...defaults, trumf: "once", euroOre: 15 }, now)!.minPct, 15);
    assert.equal(calculateShoppingBonus(trumf, { ...defaults, trumf: "auto", euroOre: 10 }, now)!.minPct, 13.5);
  });
  it("excludes unknown, expired, fixed and stale rates without assigning zero", () => {
    assert.equal(calculateShoppingBonus({ ...base, verification: "needs-review" }, defaults, now), null);
    assert.equal(calculateShoppingBonus({ ...base, checkedAt: "2026-11-01" }, defaults, now), null);
    assert.equal(calculateShoppingBonus({ ...base, rates: [{ ...base.rates[0], unit: "fixed-points" }] }, defaults, now), null);
    assert.equal(calculateShoppingBonus({ ...base, rates: [{ ...base.rates[0], kind: "campaign", endsAt: "2026-11-26T12:59:59Z" }] }, defaults, now), null);
    assert.equal(rateIsCurrent({ ...base.rates[0], endsAt: "2026-11-26T13:00:01Z" }, now), true);
    assert.equal(calculateShoppingBonus(base, { ...defaults, amount: 0 }, now), null);
  });
  it("shows an interval for unknown VAT basis and respects customer tiers", () => {
    const d: ShoppingDetails = { ...base, channel: "klarna", basis: "unknown", rates: [{ label: "Ny", value: 6, unit: "percent", kind: "listed", audience: "new" }, { label: "Eksisterende", value: 2, unit: "percent", kind: "listed", audience: "existing" }] };
    assert.deepEqual(calculateShoppingBonus(d, defaults, now), { min: 16, max: 20, minPct: 1.6, maxPct: 2 });
    assert.equal(calculateShoppingBonus(d, { ...defaults, customer: "new" }, now)!.maxPct, 6);
  });
});

describe("catalogue preservation and normalization", () => {
  it("preserves every previous ID and slug and has no duplicate IDs/slugs/channels", () => {
    const byId = new Map(tilbud.map(t => [t.id, t]));
    for (const previous of baseline) assert.equal(byId.get(previous.id)?.slug, previous.slug, previous.id);
    assert.equal(byId.size, tilbud.length);
    assert.equal(new Set(tilbud.map(t => t.slug)).size, tilbud.length);
    const shop = tilbud.filter(t => t.shopping);
    const keys = shop.map(t => `${t.shopping!.channel}:${normalizePartnerKey(t.partner)}`);
    assert.equal(new Set(keys).size, keys.length);
  });
  it("contains all 272 Trumf and 106 Klarna public shops with primary sources", () => {
    for (const [channel, count] of [["klarna", 106], ["trumf-netthandel", 272]] as const) {
      const rows = tilbud.filter(t => t.shopping?.channel === channel && t.shopping.verification === "verified");
      assert.equal(rows.length, count);
      assert.ok(rows.every(t => t.sourceUrl?.startsWith("https://") && t.shopping?.checkedAt === "2026-11-26" && t.shopping.rates.length > 0));
    }
  });
  it("groups spelling variants without merging earning channels", () => {
    for (const [a,b] of [["ginatricot.com","Gina Tricot"],["Db Journey","Db"],["Scandic Hotels","scandic"],["Sky Showtime","SkyShowtime"],["inkClub","InkClub"],["FEVER LABS INC.","Fever"]]) assert.equal(normalizePartnerKey(a),normalizePartnerKey(b));
    const groups = groupTilbudByPartner(tilbud);
    for (const name of ["Adidas","inkClub","Zalando"]) assert.equal(groups.filter(g => g.key === normalizePartnerKey(name)).length, 1);
    const lensway = groups.find(g => g.key === "lensway")!;
    assert.ok(lensway.offers.some(o => o.shopping?.channel === "spenn-direct"));
    assert.ok(lensway.offers.some(o => o.shopping?.channel === "trumf-netthandel"));
  });
  it("never ranks unverified rates or treats the Shop example as universal", () => {
    const shop = tilbud.find(t => t.id === "tilbud-eurobonus-shop")!;
    assert.equal(shop.shopping?.channel, "eurobonus-shop");
    assert.deepEqual(shop.shopping?.rates, []);
    const groups = groupTilbudByPartner(tilbud.filter(t => t.shopping));
    const sorted = sortGruppertTilbud(groups,"rate-desc",defaults,now);
    assert.ok(sorted[0].offers.some(o => o.shopping && calculateShoppingBonus(o.shopping,defaults,now)));
    assert.ok(tilbud.filter(t => t.shopping?.sourceKind === "discovery").every(t => t.shopping?.rates.length === 0));
  });
  it("combines online, multiple-program and verification filters with search", () => {
    const groups = groupTilbudByPartner(tilbud);
    const scoped = filterShoppingGroups(groups,{online:true,multiple:true,verified:true},defaults,now);
    assert.ok(scoped.length > 0);
    assert.ok(scoped.every(g => new Set(g.offers.map(o=>o.fordelSlug)).size >= 2 && g.offers.every(o=>o.shopping?.verification === "verified")));
    const adidas = filterGruppertTilbudByQuery(filterShoppingGroups(groups,{online:true,multiple:true,verified:false},defaults,now),"ADIDAS");
    assert.equal(adidas.length,1);
    assert.ok(adidas[0].offers.some(o=>o.shopping?.channel === "klarna"));
    assert.ok(adidas[0].offers.some(o=>o.shopping?.channel === "sas-online"));
    const fixed = filterShoppingGroups(groups,{online:true,multiple:false,verified:true},defaults,now).find(g=>g.key === "disney");
    assert.ok(fixed?.offers.some(o=>o.shopping?.rates.some(r=>r.unit === "fixed-kr")));
  });
  it("preserves point values, purchase settings and filters in shareable URLs", () => {
    const url = buildTilbudHref({q:"inkclub",netthandel:true,flere:true,eb:15,spenn:8,trumf:"auto",belop:1500,frakt:50,mva:15,kunde:"new",side:2});
    const params = new URL(url,"https://www.pengerifokus.no").searchParams;
    for (const [k,v] of Object.entries({q:"inkclub",netthandel:"1",flere:"1",eb:"15",spenn:"8",trumf:"auto",belop:"1500",frakt:"50",mva:"15",kunde:"new",side:"2"})) assert.equal(params.get(k),v);
  });
});

describe("SOBBL membership agreements", () => {
  const entries = tilbud.filter(t => t.fordelSlug === "sobbl");
  it("keeps store-only, online and unresolved benefits distinct", () => {
    assert.equal(entries.length, 31);
    assert.equal(entries.find(t => t.partner === "Lyreco")?.shopping, undefined);
    const online = entries.find(t => t.partner === "Interflora")!.shopping!;
    assert.equal(calculateShoppingBonus(online, defaults, "2026-11-27")?.maxPct, 5);
    const norli = entries.find(t => t.partner === "Norli")!;
    assert.equal(norli.offerLabel, "Sats uavklart");
    assert.equal(calculateShoppingBonus(norli.shopping!, defaults, "2026-11-27"), null);
    const sportmann = entries.find(t => t.partner === "Sportmann")!;
    assert.equal(sportmann.expiresAt, "2026-11-30");
    assert.equal(calculateShoppingBonus(sportmann.shopping!, defaults, "2026-12-01"), null);
  });
});
