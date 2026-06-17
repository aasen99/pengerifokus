export const calculatorInputClassName =
  "w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-stone-900 shadow-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

interface FieldProps {
  label: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}

export function CalculatorField({ label, hint, children }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-900">{label}</span>
      {hint && (
        <span className="mt-0.5 block text-xs text-stone-500">{hint}</span>
      )}
      <div className="mt-2">{children}</div>
    </label>
  );
}
