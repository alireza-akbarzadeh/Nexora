"use client";

import { useMotionValue, type MotionValue } from "motion/react";
import { useCallback, type PointerEvent } from "react";

export type PointerOffset = {
  /** -0.5 … 0.5, horizontal position within the element. */
  x: MotionValue<number>;
  /** -0.5 … 0.5, vertical position within the element. */
  y: MotionValue<number>;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
};

/**
 * Tracks the pointer as a normalised offset from an element's centre.
 *
 * Returns motion values rather than state, so movement never triggers a React
 * render — the transform is written straight to the compositor.
 */
export function usePointerOffset(): PointerOffset {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - rect.left) / rect.width - 0.5);
      y.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y],
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x, y, onPointerMove, onPointerLeave };
}
