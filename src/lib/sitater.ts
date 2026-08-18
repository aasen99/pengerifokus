import { formuesbyggere } from "@/data/formuesbyggere";
import { formuesbyggerQuotes } from "@/data/formuesbygger-articles/quotes";
import {
  getPublishableQuotes,
  type SitatEntry,
} from "@/lib/sitater-filter";

export {
  filterSitater,
  getProfileQuotes,
  getPublishableQuotes,
  getQuoteCategoryLabel,
  getSourcedQuotes,
  isPublishableQuote,
  isSourcedQuote,
  type SitatEntry,
} from "@/lib/sitater-filter";

export function getFormuesbyggerQuotesForSlug(
  slug: string,
): ReturnType<typeof getPublishableQuotes> {
  return getPublishableQuotes(formuesbyggerQuotes[slug]);
}

export function getAllSitater(): SitatEntry[] {
  const nameBySlug = Object.fromEntries(
    formuesbyggere.map((profile) => [profile.slug, profile.name]),
  );

  const entries: SitatEntry[] = [];

  for (const [slug, quotes] of Object.entries(formuesbyggerQuotes)) {
    const profileName = nameBySlug[slug];
    if (!profileName) continue;

    const publishable = getPublishableQuotes(quotes) ?? [];
    for (const quote of publishable) {
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
