"use client";

import * as React from "react";
import {usePathname} from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Crumb {
    href: string;
    label: string;
}

interface DynamicBreadcrumbProps {
    /**
     * Override the auto-generated label for a specific path segment.
     * Keyed by the full href up to that point, e.g.
     * { "/dashboard": "Overview", "/dashboard/portfolio/BTC": "Bitcoin" }.
     * Useful for dynamic segments like [id] where the slug itself
     * ("64f2a1...") isn't a good display label.
     */
    labels?: Record<string, string>;
    /** Segments to hide entirely, e.g. route groups exposed by rewrites. */
    hide?: string[];
    /** Always show the root/home crumb even if pathname is "/". */
    rootLabel?: string;
    rootHref?: string;
    /** Collapse the middle into an ellipsis once the trail exceeds this many crumbs. */
    maxVisible?: number;
    className?: string;
}

function toLabel(segment: string) {
    // "buy-sell" -> "Buy Sell", "api-keys" -> "Api Keys"
    return segment
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function DynamicBreadcrumb({
                                      labels = {},
                                      hide = [],
                                      rootLabel = "Dashboard",
                                      rootHref = "/dashboard",
                                      maxVisible = 4,
                                      className,
                                  }: DynamicBreadcrumbProps) {
    const pathname = usePathname();

    const crumbs = React.useMemo<Crumb[]>(() => {
        const segments = pathname.split("/").filter(Boolean);

        const list: Crumb[] = [{href: rootHref, label: rootLabel}];

        let acc = "";
        for (const segment of segments) {
            acc += `/${segment}`;
            if (hide.includes(segment)) continue;
            // Skip re-adding the root if the route itself starts with it.
            if (acc === rootHref) continue;

            list.push({
                href: acc,
                label: labels[acc] ?? toLabel(decodeURIComponent(segment)),
            });
        }

        // De-dupe consecutive identical hrefs (can happen with trailing slashes).
        return list.filter((c, i) => i === 0 || c.href !== list[i - 1].href);
    }, [pathname, labels, hide, rootHref, rootLabel]);

    const shouldCollapse = crumbs.length > maxVisible;
    const visible: (Crumb | "ellipsis")[] = shouldCollapse
        ? [crumbs[0], "ellipsis", ...crumbs.slice(-2)]
        : crumbs;

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {visible.map((crumb, i) => {
                    const isLast = i === visible.length - 1;

                    if (crumb === "ellipsis") {
                        return (
                            <React.Fragment key="ellipsis">
                                <BreadcrumbItem>
                                    <BreadcrumbEllipsis/>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator/>
                            </React.Fragment>
                        );
                    }

                    return (
                        <React.Fragment key={crumb.href}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={crumb.href}>
                                        {crumb.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator/>}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
