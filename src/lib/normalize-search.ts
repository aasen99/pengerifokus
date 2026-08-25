/** Normaliserer søketekst for treff uten hensyn til aksenter */
export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a");
}

function splitSearchWords(text: string): string[] {
  return text.split(/[^a-z0-9]+/).filter(Boolean);
}

/**
 * Treff som helt ord eller ordprefiks – ikke midt i ord
 * (f.eks. «sko» skal ikke matche «betalingskort»).
 */
export function searchTokenMatchesText(token: string, searchable: string): boolean {
  if (!token) return true;

  const words = splitSearchWords(searchable);
  return words.some((word) => word === token || word.startsWith(token));
}

/** Alle søkeord må treffe i normalisert tekst. */
export function matchesSearchTokens(text: string, query: string): boolean {
  const searchable = normalizeSearchText(text);
  const tokens = normalizeSearchText(query).split(/\s+/).filter(Boolean);

  return tokens.every((token) => searchTokenMatchesText(token, searchable));
}
