import type { FormuesbyggerArticle } from "@/types/formuesbygger";
import { internasjonaleFormuesbyggerArtikler } from "./internasjonale";
import { norskeFormuesbyggerArtikler } from "./norske";
import { norskeProfilerBatch2 } from "./norske-profiler-batch2";
import { norskeProfilerBatch3 } from "./norske-profiler-batch3";
import { norskeProfilerBatch4 } from "./norske-profiler-batch4";
import { norskeProfilerPakke1 } from "./norske-profiler-pakke-1";

const allArticles: Record<string, FormuesbyggerArticle> = {
  ...norskeFormuesbyggerArtikler,
  ...norskeProfilerBatch2,
  ...norskeProfilerBatch3,
  ...norskeProfilerBatch4,
  ...internasjonaleFormuesbyggerArtikler,
  ...norskeProfilerPakke1,
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
