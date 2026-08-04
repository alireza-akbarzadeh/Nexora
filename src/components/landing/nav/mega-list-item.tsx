import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { MegaNavItem } from "@/lib/landing/nav-menu";

export function MegaListItem({
  item,
  onNavigate,
}: {
  item: MegaNavItem;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group/item flex gap-3 rounded-lg px-2.5 py-2.5 transition-colors duration-200 hover:bg-muted/70"
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover/item:scale-105">
        <Icon className="size-4" aria-hidden />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {item.title}
          </span>
          {item.badge ? (
            <Badge
              variant="default"
              className="h-4 rounded px-1.5 text-[10px] font-semibold"
            >
              {item.badge}
            </Badge>
          ) : null}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
          {item.description}
        </span>
      </span>
    </Link>
  );
}
