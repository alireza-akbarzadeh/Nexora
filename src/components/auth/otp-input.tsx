"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  className?: string;
};

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled,
  className,
}: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(length, " ").slice(0, length).split("");

  function updateDigit(index: number, digit: string) {
    const clean = digit.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = clean || " ";
    onChange(next.join("").replace(/\s/g, ""));
    if (clean && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, key: string) {
    if (key === "Backspace" && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(text: string) {
    const clean = text.replace(/\D/g, "").slice(0, length);
    onChange(clean);
    const focusIndex = Math.min(clean.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  }

  return (
    <div className={cn("flex justify-center gap-2 sm:gap-3", className)}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          value={digit.trim()}
          onChange={(e) => updateDigit(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e.key)}
          onPaste={(e) => {
            e.preventDefault();
            handlePaste(e.clipboardData.getData("text"));
          }}
          className="h-12 w-10 rounded-xl border border-white/10 bg-white/[0.03] text-center font-mono text-lg font-semibold tabular-nums outline-none transition focus:border-[color-mix(in_srgb,var(--violet)_60%,transparent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--violet)_25%,transparent)] sm:h-14 sm:w-12"
        />
      ))}
    </div>
  );
}
