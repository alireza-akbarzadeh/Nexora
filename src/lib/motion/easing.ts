/** Shared motion timing. One rhythm across the whole product. */

type Bezier = [number, number, number, number];

/** Expo-out. Fast departure, long settle — reads as weight rather than speed. */
export const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];

/** Symmetric expo, for elements that leave as well as enter. */
export const EASE_IN_OUT: Bezier = [0.87, 0, 0.13, 1];

/** Spring presets, tuned so cursor-tracked elements lag without feeling loose. */
export const SPRING = {
  /** Pointer tracking — noticeable trail. */
  trail: { stiffness: 90, damping: 26, mass: 0.6 },
  /** Tilt and magnetic pull — snappy but damped. */
  responsive: { stiffness: 150, damping: 20, mass: 0.5 },
  /** Scroll-linked transforms — smooths jitter without visible lag. */
  scroll: { stiffness: 120, damping: 30, mass: 0.4 },
} as const;

/** Exit animations run at ~60% of entry duration so dismissal feels immediate. */
export const EXIT_RATIO = 0.6;
