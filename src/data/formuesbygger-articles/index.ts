import type { FormuesbyggerArticle } from "@/types/formuesbygger";
import { internasjonaleFormuesbyggerArtikler } from "./internasjonale";
import { norskeFormuesbyggerArtikler } from "./norske";
import { norskeProfilerBatch2 } from "./norske-profiler-batch2";
import { norskeProfilerBatch3 } from "./norske-profiler-batch3";
import { norskeProfilerBatch4 } from "./norske-profiler-batch4";

const allArticles: Record<string, FormuesbyggerArticle> = {
  ...norskeFormuesbyggerArtikler,
  ...norskeProfilerBatch2,
  ...norskeProfilerBatch3,
  ...norskeProfilerBatch4,
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
