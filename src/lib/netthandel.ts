import type { ShoppingDetails, ShoppingRate } from "@/types/content";

export interface BonusSettings {
  euroOre: number;
  spennOre: number;
  trumf: "cash" | "once" | "auto";
  amount: number;
  shipping: number;
  vat: number;
  customer: "new" | "existing";
}
export const DEFAULT_BONUS_SETTINGS: BonusSettings = {
  euroOre: 10, spennOre: 10, trumf: "cash", amount: 1000, shipping: 0, vat: 25, customer: "existing",
};
export const TRUMF_EB = { once: 10, auto: 13.5 } as const;
export const CHANNEL_NAMES: Record<ShoppingDetails["channel"], string> = {
  "sas-online": "SAS Online Shopping", "trumf-netthandel": "Trumf Netthandel",
  klarna: "Klarna Cashback", spenn: "Spenn Netthandel", "eurobonus-shop": "SAS EuroBonus Shop (egen butikk)",
  "spenn-direct": "Spenn hos partner (kontokobling)",
  "eurobonus-shop-giftcard": "Zupergift via SAS EuroBonus Shop",
};
export function rateIsCurrent(rate: ShoppingRate, today: string): boolean {
  return !rate.endsAt || (rate.endsAt.length > 10 ? Date.parse(rate.endsAt) > Date.parse(today) : rate.endsAt >= today.slice(0, 10));
}
export function applicableRates(details: ShoppingDetails, settings: BonusSettings, today: string): ShoppingRate[] {
  return details.rates.filter(r => rateIsCurrent(r, today) && (!r.audience || r.audience === "all" || r.audience === settings.customer));
}
export function hasCurrentVerifiedRate(details: ShoppingDetails, settings: BonusSettings, today: string): boolean {
  return details.verification === "verified" && Boolean(details.checkedAt) &&
    Date.parse(today) - Date.parse(details.checkedAt!) <= 14 * 86400000 &&
    applicableRates(details, settings, today).length > 0;
}
/** Unknown/old data never become a zero or a sortable numeric claim. */
export function calculateShoppingBonus(details: ShoppingDetails, settings: BonusSettings, today: string): { min: number; max: number; minPct: number; maxPct: number } | null {
  if (!hasCurrentVerifiedRate(details, settings, today)) return null;
  if (![settings.amount, settings.shipping, settings.vat, settings.euroOre, settings.spennOre].every(Number.isFinite) ||
      settings.amount <= 0 || settings.shipping < 0 || settings.shipping > settings.amount || settings.vat < 0 || settings.euroOre < 0 || settings.spennOre < 0) return null;
  const rates = applicableRates(details, settings, today).filter(r => r.unit === "percent" || r.unit === "points-per-100");
  if (!rates.length) return null;
  const values = rates.map(r => {
    if (r.unit === "points-per-100") return r.value * (details.channel.startsWith("spenn") ? settings.spennOre : settings.euroOre) / 100;
    if (details.channel === "trumf-netthandel" && settings.trumf !== "cash") return r.value * TRUMF_EB[settings.trumf] * settings.euroOre / 100;
    return r.value;
  });
  const goods = settings.amount - settings.shipping;
  const net = goods / (1 + settings.vat / 100);
  const minBase = details.basis === "incl-vat" ? goods : net;
  const maxBase = details.basis === "ex-vat" ? net : goods;
  const min = Math.min(...values) * minBase / 100;
  const max = Math.max(...values) * maxBase / 100;
  return { min, max, minPct: min / settings.amount * 100, maxPct: max / settings.amount * 100 };
}
export function shoppingRateLabel(rate: ShoppingRate, channel: ShoppingDetails["channel"]): string {
  const value = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 2 }).format(rate.value);
  return rate.unit === "percent" ? `${value} %` : rate.unit === "points-per-100" ? `${value} ${channel.startsWith("spenn") ? "Spenn" : "poeng"} / 100 kr` : `${value} ${rate.unit === "fixed-points" ? "poeng" : "kr"} per kjøp`;
}
export function formatBonusRange(min: number, max: number, suffix: string): string {
  const f = (n: number) => new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 2 }).format(n);
  return Math.abs(min - max) < .005 ? `${f(min)} ${suffix}` : `${f(min)}–${f(max)} ${suffix}`;
}
