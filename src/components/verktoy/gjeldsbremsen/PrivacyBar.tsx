"use client";

interface PrivacyBarProps {
  hasStoredData: boolean;
  onClear: () => void;
  onDownload?: () => void;
  downloadDisabled?: boolean;
}

export function PrivacyBar({
  hasStoredData,
  onClear,
  onDownload,
  downloadDisabled = false,
}: PrivacyBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <p className="text-sm text-stone-600">
        {hasStoredData
          ? "Opplysningene er lagret lokalt i nettleseren. De sendes ikke til en server."
          : "Opplysningene lagres bare lokalt i nettleseren. De sendes ikke til en server."}
      </p>
      <div className="flex flex-wrap gap-2">
        {onDownload && (
          <button
            type="button"
            onClick={onDownload}
            disabled={downloadDisabled}
            className="rounded-lg bg-stone-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Last ned bremseplan
          </button>
        )}
        <button
          type="button"
          onClick={onClear}
          className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900"
        >
          Slett mine opplysninger
        </button>
      </div>
    </div>
  );
}
