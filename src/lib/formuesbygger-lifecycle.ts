import type { Formuesbygger } from "@/types/formuesbygger";

type LifecycleProfile = Pick<Formuesbygger, "birthDate" | "deathDate">;

function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatNorwegianDate(iso: string): string {
  return parseIsoDate(iso).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function calculateAge(
  birthDate: string,
  referenceDate?: string,
): number {
  const end = referenceDate ? parseIsoDate(referenceDate) : new Date();
  const birth = parseIsoDate(birthDate);
  let age = end.getFullYear() - birth.getFullYear();
  const monthDiff = end.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function isDeceased(
  profile: LifecycleProfile,
): profile is LifecycleProfile & { deathDate: string } {
  return Boolean(profile.deathDate);
}

export function formatLifecycleCompact(profile: LifecycleProfile): string | null {
  if (!profile.birthDate) return null;

  if (profile.deathDate) {
    const birthYear = parseIsoDate(profile.birthDate).getFullYear();
    const deathYear = parseIsoDate(profile.deathDate).getFullYear();
    const age = calculateAge(profile.birthDate, profile.deathDate);
    return `${birthYear}–${deathYear} (${age} år)`;
  }

  return `${calculateAge(profile.birthDate)} år`;
}

export function formatLifecycleFull(profile: LifecycleProfile): string | null {
  if (!profile.birthDate) return null;

  const born = formatNorwegianDate(profile.birthDate);

  if (profile.deathDate) {
    const age = calculateAge(profile.birthDate, profile.deathDate);
    return `Født ${born} · Død ${formatNorwegianDate(profile.deathDate)} (${age} år)`;
  }

  const age = calculateAge(profile.birthDate);
  return `Født ${born} (${age} år)`;
}
