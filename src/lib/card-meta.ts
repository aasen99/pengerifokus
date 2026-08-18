export interface CardMetaOptions {
  /** Innholdstype, f.eks. Guide, Kalkulator, Fordel */
  type?: string;
  /** Årstall eller ISO-dato (updatedAt), f.eks. 2026 eller 2026-07-02 */
  year?: string | number;
}

export interface CardMeta {
  category?: string;
  secondary?: string;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function yearFromUpdatedAt(
  value: string | number | undefined,
): string | undefined {
  if (value == null || value === "") return undefined;
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(Math.trunc(value)) : undefined;
  }
  const match = value.trim().match(/^(\d{4})/);
  return match?.[1];
}

/**
 * Oversiktskort: én kategori + ett tilleggsmerke som ikke gjentar kategorien.
 * Andre merke: neste distinkte tag, ellers innholdstype, ellers år.
 */
export function getCardMeta(
  category: string | undefined,
  tags: string[] | undefined,
  options: CardMetaOptions = {},
): CardMeta {
  const trimmedCategory = category?.trim() ?? "";
  const categoryNorm = trimmedCategory ? normalize(trimmedCategory) : "";

  const distinctTag = tags?.find((tag) => {
    const trimmed = tag.trim();
    if (!trimmed) return false;
    return !categoryNorm || normalize(trimmed) !== categoryNorm;
  });

  const year = yearFromUpdatedAt(options.year);
  const type = options.type?.trim() || undefined;

  const candidates = [distinctTag?.trim(), type, year];
  const secondary = candidates.find((value) => {
    if (!value) return false;
    return !categoryNorm || normalize(value) !== categoryNorm;
  });

  return {
    category: trimmedCategory || undefined,
    secondary,
  };
}
