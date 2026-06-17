"use client";

import { useEffect, useState } from "react";
import {
  formatDecimalInput,
  isValidPartialDecimal,
  parseDecimalInput,
} from "@/lib/format/decimal";

interface DecimalNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  min?: number;
  max?: number;
}

export function DecimalNumberInput({
  value,
  onChange,
  className,
  min,
  max,
}: DecimalNumberInputProps) {
  const [display, setDisplay] = useState(formatDecimalInput(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setDisplay(formatDecimalInput(value));
    }
  }, [value, focused]);

  const commit = (raw: string) => {
    const parsed = parseDecimalInput(raw);

    if (parsed === null) {
      const fallback = min ?? value ?? 0;
      onChange(fallback);
      setDisplay(formatDecimalInput(fallback));
      return;
    }

    let next = parsed;
    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);
    onChange(next);
    setDisplay(formatDecimalInput(next));
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={display}
      className={className}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        commit(display);
      }}
      onChange={(event) => {
        const raw = event.target.value.replace(".", ",");
        if (!isValidPartialDecimal(raw)) return;

        setDisplay(raw);
        const parsed = parseDecimalInput(raw);
        if (parsed !== null) {
          onChange(parsed);
        }
      }}
    />
  );
}
