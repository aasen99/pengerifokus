export type TrippelTrumfStatus = "completed" | "expected" | "none";

export interface TrippelTrumfDate {
  /** ISO-dato YYYY-MM-DD, eller null når måneden ikke har Trippel-Trumf */
  date: string | null;
  /** Visningslabel, f.eks. «15. januar 2026» */
  label: string;
  status: TrippelTrumfStatus;
  note?: string;
}

/**
 * Trippel-Trumf-datoer 2026.
 * Bekreftede datoer er kontrollert mot Trumf og flere uavhengige oversikter.
 * Forventede datoer følger historisk ukemønster og er ikke offisielle.
 * Oppdater når Trumf bekrefter neste dato på https://www.trumf.no/trippel-trumf
 */
export const TRIPPEL_TRUMF_CHECKED_AT = "2026-09-07";

export const trippelTrumfDates2026: TrippelTrumfDate[] = [
  { date: "2026-01-15", label: "15. januar 2026", status: "completed" },
  { date: "2026-02-12", label: "12. februar 2026", status: "completed" },
  { date: "2026-03-12", label: "12. mars 2026", status: "completed" },
  {
    date: "2026-03-26",
    label: "26. mars 2026",
    status: "completed",
    note: "Ekstra dag",
  },
  { date: "2026-04-16", label: "16. april 2026", status: "completed" },
  { date: "2026-05-07", label: "7. mai 2026", status: "completed" },
  {
    date: "2026-05-21",
    label: "21. mai 2026",
    status: "completed",
    note: "Ekstra dag",
  },
  { date: "2026-06-18", label: "18. juni 2026", status: "completed" },
  {
    date: null,
    label: "Juli 2026",
    status: "none",
    note: "Normalt ingen Trippel-Trumf i juli",
  },
  { date: "2026-08-20", label: "20. august 2026", status: "completed" },
  {
    date: "2026-09-17",
    label: "17. september 2026",
    status: "expected",
    note: "Uke 38 · historisk mønster",
  },
  {
    date: "2026-10-15",
    label: "15. oktober 2026",
    status: "expected",
    note: "Uke 42 · historisk mønster",
  },
  {
    date: "2026-11-12",
    label: "12. november 2026",
    status: "expected",
    note: "Uke 46 · historisk mønster",
  },
  {
    date: "2026-12-03",
    label: "3. desember 2026",
    status: "expected",
    note: "Uke 49 · mulig ekstra dag senere i desember",
  },
];

const STATUS_LABEL: Record<TrippelTrumfStatus, string> = {
  completed: "Gjennomført",
  expected: "Forventet",
  none: "Ingen",
};

export function formatTrippelTrumfStatus(status: TrippelTrumfStatus): string {
  return STATUS_LABEL[status];
}

/** Kommende datoer: forventede, eller bekreftede som ikke er passert ennå. */
export function getUpcomingTrippelTrumfDates(
  todayIso = new Date().toISOString().slice(0, 10),
): TrippelTrumfDate[] {
  return trippelTrumfDates2026.filter((entry) => {
    if (!entry.date) return false;
    if (entry.status === "expected") return entry.date >= todayIso;
    if (entry.status === "completed") return entry.date >= todayIso;
    return false;
  });
}

export function getNextTrippelTrumfDate(
  todayIso = new Date().toISOString().slice(0, 10),
): TrippelTrumfDate | undefined {
  return getUpcomingTrippelTrumfDates(todayIso)[0];
}

export function buildTrippelTrumfTableRows(
  entries: TrippelTrumfDate[] = trippelTrumfDates2026,
): { label: string; value: string }[] {
  return entries.map((entry) => {
    const status = formatTrippelTrumfStatus(entry.status);
    const value = entry.note ? `${status} · ${entry.note}` : status;
    return { label: entry.label, value };
  });
}
