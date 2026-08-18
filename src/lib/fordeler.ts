import { fordeler } from "@/data/fordeler";
import type { Fordel, PublishStatus } from "@/types/content";

function isPublished<T extends { status: PublishStatus }>(item: T): boolean {
  return item.status === "published";
}

export function getFordeler(): Fordel[] {
  return fordeler.filter(isPublished);
}

export function getFordelBySlug(slug: string): Fordel | undefined {
  return getFordeler().find((fordel) => fordel.slug === slug);
}

export function getFordelName(slug: string): string {
  return getFordeler().find((f) => f.slug === slug)?.name ?? slug;
}
