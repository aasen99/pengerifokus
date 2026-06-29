import {
  FORMUE_DISCLAIMER,
  FORMUE_ESTIMATE_SOURCE,
} from "@/data/formuesbyggere-labels";
import { formatWealthEstimate } from "@/lib/wealth-estimate";
import type { Formuesbygger } from "@/types/formuesbygger";

interface WealthEstimateCardProps {
  profile: Formuesbygger;
  compact?: boolean;
}

export function WealthEstimateCard({
  profile,
  compact = false,
}: WealthEstimateCardProps) {
  const formatted = formatWealthEstimate(profile.wealthEstimate);

  if (compact) {
    return (
      <p className="mt-3 text-sm font-medium text-stone-800">{formatted}</p>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        Omtrentlig formue
      </p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-stone-900">
        {formatted}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        {profile.wealthContext}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-stone-500">
        {FORMUE_DISCLAIMER} {FORMUE_ESTIMATE_SOURCE}
      </p>
    </div>
  );
}
