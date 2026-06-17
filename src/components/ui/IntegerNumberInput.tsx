"use client";

import { useEffect, useState } from "react";
import {
  formatIntegerInput,
  handleIntegerInputChange,
  parseIntegerInput,
} from "@/lib/format/number";

interface IntegerNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  min?: number;
  max?: number;
}

export function IntegerNumberInput({
  value,
  onChange,
  className,
  min,
  max,
}: IntegerNumberInputProps) {
  const [display, setDisplay] = useState(formatIntegerInput(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setDisplay(formatIntegerInput(value));
    }
  }, [value, focused]);

  const commit = (raw: string) => {
    const parsed = parseIntegerInput(raw);

    if (!Number.isFinite(parsed)) {
      const fallback = min ?? value ?? 0;
      onChange(fallback);
      setDisplay(formatIntegerInput(fallback));
      return;
    }

    let next = parsed;
    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);
    onChange(next);
    setDisplay(formatIntegerInput(next));
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={display}
      className={className}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        commit(display);
      }}
      onChange={(event) => {
        const next = handleIntegerInputChange(event.target.value);
        setDisplay(next);

        if (next === "") return;

        const parsed = parseIntegerInput(next);
        if (Number.isFinite(parsed)) {
          onChange(parsed);
        }
      }}
    />
  );
}
