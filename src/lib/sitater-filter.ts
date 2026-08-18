import type {
  FormuesbyggerQuote,
  FormuesbyggerQuotePublishRecommendation,
} from "@/types/formuesbygger";

export interface SitatEntry {
  id: string;
  quote: FormuesbyggerQuote;
  profileSlug: string;
  profileName: string;
}

const PROFILE_QUOTE_LIMIT = 3;

const PUBLISHABLE_RECOMMENDATIONS = new Set<
  FormuesbyggerQuotePublishRecommendation | undefined
>(["publiser", "publiser-som-motto", undefined]);

export function isSourcedQuote(quote: FormuesbyggerQuote): boolean {
  return Boolean(quote.sourceUrl?.trim() && quote.sourceLabel?.trim());
}

export function isPublishableQuote(quote: FormuesbyggerQuote): boolean {
  if (!isSourcedQuote(quote)) return false;
  return PUBLISHABLE_RECOMMENDATIONS.has(quote.publishRecommendation);
}

export function getPublishableQuotes(
  quotes?: FormuesbyggerQuote[],
  max?: number,
): FormuesbyggerQuote[] | undefined {
  if (!quotes?.length) return undefined;
  const valid = quotes.filter(isPublishableQuote);
  const limited = max ? valid.slice(0, max) : valid;
  return limited.length > 0 ? limited : undefined;
}

/** @deprecated Bruk getPublishableQuotes */
export function getSourcedQuotes(
  quotes?: FormuesbyggerQuote[],
): FormuesbyggerQuote[] | undefined {
  return getPublishableQuotes(quotes);
}

export function getProfileQuotes(
  quotes?: FormuesbyggerQuote[],
): FormuesbyggerQuote[] | undefined {
  return getPublishableQuotes(quotes, PROFILE_QUOTE_LIMIT);
}

export function getQuoteCategoryLabel(
  quote: FormuesbyggerQuote,
): "Sitat" | "Motto/prinsipp" {
  return quote.category === "motto" ? "Motto/prinsipp" : "Sitat";
}

export function filterSitater(
  entries: SitatEntry[],
  query: string,
): SitatEntry[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return entries;

  return entries.filter((entry) => {
    const haystack = [
      entry.profileName,
      entry.quote.text,
      entry.quote.translation ?? "",
      entry.quote.sourceLabel,
      entry.quote.note ?? "",
      getQuoteCategoryLabel(entry.quote),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}
