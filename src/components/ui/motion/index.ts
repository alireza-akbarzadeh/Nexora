/**
 * Motion primitives.
 *
 * Every export animates transform/opacity/filter only, and collapses to a
 * static render under `prefers-reduced-motion`. Timing tokens live in
 * `@/lib/motion/easing` so the whole product shares one rhythm.
 */

export { CountUp } from "./count-up";
export { Magnetic } from "./magnetic";
export { ParallaxLayer } from "./parallax-layer";
export { Reveal } from "./reveal";
export { Spotlight } from "./spotlight";
export { Stagger, StaggerItem } from "./stagger";
export { Depth, TiltCard } from "./tilt-card";
