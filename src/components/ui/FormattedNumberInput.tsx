"use client";

import {
  handleIntegerInputChange,
  parseIntegerInput,
} from "@/lib/format/number";

interface FormattedNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  "aria-label"?: string;
}

export function FormattedNumberInput({
  value,
  onChange,
  className,
  placeholder,
  "aria-label": ariaLabel,
}: FormattedNumberInputProps) {
  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(e) => onChange(handleIntegerInputChange(e.target.value))}
      className={className}
    />
  );
}

export { parseIntegerInput };
