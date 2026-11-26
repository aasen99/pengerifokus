import { normalizeSearchText } from "./normalize-search";

const aliases: Record<string, string> = {
  scandichotels: "scandic", radissonhotels: "radisson", legoshop: "lego",
  kjellogcompany: "kjellcompany", kjellandcompany: "kjellcompany",
  polarnopyret: "polarnopyret", ginatricotcom: "ginatricot",
  thebodyshop: "bodyshop", nortonbysymantec: "norton",
  dbjourney: "db", feverlabsinc: "fever",
  empshop: "emp", tripcom: "trip",
};

/** Only explicit aliases merge brands. Separate stores and earning channels survive. */
export function normalizePartnerKey(partner: string): string {
  const key = normalizeSearchText(partner).replace(/\.(com|no|se|dk)$/i, "").replace(/[^a-z0-9]/g, "");
  return aliases[key] ?? key;
}
