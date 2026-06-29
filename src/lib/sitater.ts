import { formuesbyggere } from "@/data/formuesbyggere";
import { formuesbyggerQuotes } from "@/data/formuesbygger-articles/quotes";
import type { FormuesbyggerQuote } from "@/types/formuesbygger";

export interface SitatEntry {
  id: string;
  quote: FormuesbyggerQuote;
  profileSlug: string;
  profileName: string;
}

export function isSourcedQuote(quote: FormuesbyggerQuote): boolean {
  return Boolean(quote.sourceUrl?.trim() && quote.sourceLabel?.trim());
}

export function getSourcedQuotes(
  quotes?: FormuesbyggerQuote[],
): FormuesbyggerQuote[] | undefined {
  if (!quotes?.length) return undefined;
  const valid = quotes.filter(isSourcedQuote);
  return valid.length > 0 ? valid : undefined;
}

export function getFormuesbyggerQuotesForSlug(
  slug: string,
): FormuesbyggerQuote[] | undefined {
  return getSourcedQuotes(formuesbyggerQuotes[slug]);
}

export function getAllSitater(): SitatEntry[] {
  const nameBySlug = Object.fromEntries(
    formuesbyggere.map((profile) => [profile.slug, profile.name]),
  );

  const entries: SitatEntry[] = [];

  for (const [slug, quotes] of Object.entries(formuesbyggerQuotes)) {
    const profileName = nameBySlug[slug];
    if (!profileName) continue;

    const sourced = getSourcedQuotes(quotes) ?? [];
    for (const quote of sourced) {
      entries.push({
        id: `${slug}-${quote.text.slice(0, 48)}`,
        quote,
        profileSlug: slug,
        profileName,
      });
    }
  }

  return entries.sort((a, b) =>
    a.profileName.localeCompare(b.profileName, "nb"),
  );
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
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}
