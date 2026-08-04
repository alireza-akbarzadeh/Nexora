"use client";

import { useCountUp } from "@/hooks/use-count-up";

type CountUpProps = {
  /** A formatted metric string, e.g. `"$180B+"` or `"99.99%"`. */
  value: string;
  className?: string;
  /** Seconds. */
  duration?: number;
  /** Seconds to wait after entering the viewport. */
  delay?: number;
};

/**
 * Counts a formatted metric up to its value when scrolled into view.
 *
 * The animated text is `aria-hidden`; the final value is always present for
 * screen readers, so assistive tech never reads a partial number.
 */
export function CountUp({ value, className, duration, delay }: CountUpProps) {
  const { ref, text } = useCountUp(value, { duration, delay });

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{text}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
