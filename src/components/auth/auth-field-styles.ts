import { cn } from "@/lib/utils";

export const authInputClassName = cn(
  "h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm shadow-[inset_0_1px_0_oklch(1_0_0/0.06)]",
  "transition-all duration-200 placeholder:text-muted-foreground/60",
  "hover:border-white/15 hover:bg-white/[0.06]",
  "focus-visible:border-[color-mix(in_srgb,var(--violet)_55%,transparent)] focus-visible:bg-white/[0.06]",
  "focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--violet)_22%,transparent)] focus-visible:ring-offset-0",
  "dark:bg-white/[0.04] dark:hover:bg-white/[0.06]",
);

export const authLabelClassName = "text-xs font-medium tracking-wide text-foreground/90";
