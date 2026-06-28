import type { FormuesbyggerArticle } from "@/types/formuesbygger";
import { internasjonaleFormuesbyggerArtikler } from "./internasjonale";
import { norskeFormuesbyggerArtikler } from "./norske";

const allArticles: Record<string, FormuesbyggerArticle> = {
  ...norskeFormuesbyggerArtikler,
  ...internasjonaleFormuesbyggerArtikler,
};

export function getFormuesbyggerArticle(
  slug: string,
): FormuesbyggerArticle | undefined {
  return allArticles[slug];
}

export function getFormuesbyggerSlugs(): string[] {
  return Object.keys(allArticles);
}

export function hasFormuesbyggerArticle(slug: string): boolean {
  return slug in allArticles;
}
