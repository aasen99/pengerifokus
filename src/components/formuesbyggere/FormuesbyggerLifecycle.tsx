import type { Formuesbygger } from "@/types/formuesbygger";
import {
  formatLifecycleCompact,
  formatLifecycleFull,
  isDeceased,
} from "@/lib/formuesbygger-lifecycle";

interface FormuesbyggerLifecycleProps {
  profile: Pick<Formuesbygger, "birthDate" | "deathDate">;
  variant?: "compact" | "full";
  className?: string;
}

export function FormuesbyggerLifecycle({
  profile,
  variant = "full",
  className = "",
}: FormuesbyggerLifecycleProps) {
  const text =
    variant === "compact"
      ? formatLifecycleCompact(profile)
      : formatLifecycleFull(profile);

  if (!text) return null;

  return (
    <p className={`text-sm text-stone-500 ${className}`.trim()}>
      {variant === "full" && isDeceased(profile) && (
        <span className="mr-2 inline-flex rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
          Avdød
        </span>
      )}
      {text}
    </p>
  );
}
