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
      <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm text-stone-600">
        <p>
          <span className="font-semibold text-stone-800">Viktig: </span>
          Tilbudene er hentet fra {sources} og kan endres av partner uten
          varsel. Vi oppdaterer listen fortløpende, men garanterer ikke at alle
          rabatter er gjeldende akkurat nå.
        </p>
        {showTrumfNetthandelNote && (
          <p className="mt-3">
            <span className="font-semibold text-stone-800">Trumf Netthandel: </span>
            Du får Trumf-bonus når du starter handelen via Trumf Netthandel.
            Start med tom handlekurv, unngå andre rabattkoder med mindre Trumf
            godkjenner dem, og fullfør kjøpet i samme økt. Priser kan variere
            etter kanal og tidspunkt – sammenlign spesielt totalpris på reise,
            hotell og leiebil før du bestiller.
          </p>
        )}
        <p className="mt-2 text-stone-500">
          Sist oppdatert: {lastUpdated}. Sjekk alltid vilkår hos aktuell partner
          før du handler.
        </p>
      </div>
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
