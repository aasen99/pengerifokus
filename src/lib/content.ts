/**
 * Innholdstilgangslag for Penger i Fokus.
 *
 * CMS/ADMIN: Denne filen er det naturlige koblingspunktet for database/API.
 * Bytt ut statiske imports med async fetch mot CMS når admin er på plass.
 * Eksempel: export async function getGuides() { return db.guide.findMany({ where: { status: 'published' } }) }
 */

import { guider } from "@/data/guider";
import { fordeler } from "@/data/fordeler";
import { verktoy } from "@/data/verktoy";
import { ordbok } from "@/data/ordbok";
import { tilbud } from "@/data/tilbud";
import type {
  Guide,
  Fordel,
  Verktoy,
  OrdbokEntry,
  Tilbud,
  PublishStatus,
} from "@/types/content";

function isPublished<T extends { status: PublishStatus }>(item: T): boolean {
  return item.status === "published";
}

/** CMS: Admin ser alle, besøkende ser kun published */
export function getGuides(): Guide[] {
  return guider.filter(isPublished);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getGuides().find((g) => g.slug === slug);
}

export function getFeaturedGuides(): Guide[] {
  return getGuides().filter((g) => g.featured);
}

export function getFordeler(): Fordel[] {
  return fordeler.filter(isPublished);
}

export function getFordelBySlug(slug: string): Fordel | undefined {
  return getFordeler().find((fordel) => fordel.slug === slug);
}

export function getVerktoy(): Verktoy[] {
  return verktoy;
}

export function getOrdbok(): OrdbokEntry[] {
  return ordbok.filter(isPublished);
}

export function getTilbud(): Tilbud[] {
  return tilbud.filter(isPublished);
}

export function getTilbudByFordel(fordelSlug: string): Tilbud[] {
  return getTilbud().filter((t) => t.fordelSlug === fordelSlug);
}
