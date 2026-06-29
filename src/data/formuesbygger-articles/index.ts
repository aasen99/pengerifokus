import type { FormuesbyggerArticle } from "@/types/formuesbygger";
import { internasjonaleFormuesbyggerArtikler } from "./internasjonale";
import { norskeFormuesbyggerArtikler } from "./norske";
import { norskeProfilerBatch2 } from "./norske-profiler-batch2";

const allArticles: Record<string, FormuesbyggerArticle> = {
  ...norskeFormuesbyggerArtikler,
  ...norskeProfilerBatch2,
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
