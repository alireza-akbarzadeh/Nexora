import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const sizeMap = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;

type SpinnerProps = {
  className?: string;
  size?: keyof typeof sizeMap;
  label?: string;
};

export function Spinner({ className, size = "md", label = "Loading" }: SpinnerProps) {
  return (
    <Loader2
      role="status"
      aria-label={label}
      className={cn("animate-spin", sizeMap[size], className)}
    />
  );
}

export function LoadingIndicator({
  label,
  className,
  size = "md",
}: {
  label: string;
  className?: string;
  size?: keyof typeof sizeMap;
}) {
  return (
    <span className={cn("inline-flex items-center justify-center gap-2", className)}>
      <Spinner size={size} label={label} />
      <span>{label}</span>
    </span>
  );
}
