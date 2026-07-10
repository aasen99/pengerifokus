import { tilbudListMeta } from "@/data/tilbud";
import { formatTilbudDate } from "@/lib/tilbud";

interface TilbudDisclaimerProps {
  variant?: "banner" | "footer";
  showTrumfNetthandelNote?: boolean;
}

function formatSources(sources: readonly string[]): string {
  if (sources.length === 1) return sources[0];
  if (sources.length === 2) return `${sources[0]} og ${sources[1]}`;
  return `${sources.slice(0, -1).join(", ")} og ${sources[sources.length - 1]}`;
}

export function TilbudDisclaimer({
  variant = "footer",
  showTrumfNetthandelNote = false,
}: TilbudDisclaimerProps) {
  const lastUpdated = formatTilbudDate(tilbudListMeta.lastUpdated);
  const sources = formatSources(tilbudListMeta.sources);

  if (variant === "banner") {
    return (
      <details className="group rounded-xl border border-stone-200 bg-stone-50 text-stone-600">
        <summary className="cursor-pointer list-none px-4 py-2.5 [&::-webkit-details-marker]:hidden">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs leading-snug sm:text-sm">
              <span className="font-semibold text-stone-800">Viktig: </span>
              Tilbud kan endres av partner uten varsel. Oppdatert {lastUpdated}.
            </p>
            <span
              className="shrink-0 text-sm text-stone-400 transition-transform group-open:rotate-180"
              aria-hidden="true"
            >
              ▾
            </span>
          </div>
        </summary>

        <div className="space-y-2 border-t border-stone-200 px-4 py-3 text-xs leading-relaxed sm:text-sm">
          <p>
            Tilbudene er hentet fra {sources} og kan endres av partner uten
            varsel. Vi oppdaterer listen fortløpende, men garanterer ikke at
            alle rabatter er gjeldende akkurat nå.
          </p>
          {showTrumfNetthandelNote && (
            <p>
              <span className="font-semibold text-stone-800">
                Trumf Netthandel:{" "}
              </span>
              Du får Trumf-bonus når du starter handelen via Trumf Netthandel.
              Start med tom handlekurv, unngå andre rabattkoder med mindre Trumf
              godkjenner dem, og fullfør kjøpet i samme økt. Priser kan variere
              etter kanal og tidspunkt. Sammenlign spesielt totalpris på reise,
              hotell og leiebil før du bestiller.
            </p>
          )}
          <p className="text-stone-500">
            Sjekk alltid vilkår hos aktuell partner før du handler.
          </p>
        </div>
      </details>
    );
  }

  return (
    <p className="text-xs leading-relaxed text-stone-500">
      Tilbudslisten er basert på {sources}, sist oppdatert {lastUpdated}.
      Rabatter og vilkår kan endres eller avsluttes når som helst. Penger i
      Fokus er ikke ansvarlig for feil eller utdatert informasjon. Verifiser
      alltid hos partner før kjøp.
    </p>
  );
}
