"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MotionConfig} from "motion/react";
import {useState} from "react";

import {NetworkStatusToast} from "@/components/network-status-toast";
import {NotifyProvider} from "@/components/notify/notify-provider";
import {ThemeProvider} from "@/components/theme-provider";
import {TooltipProvider} from "@/components/ui/tooltip";

export function Providers({children}: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 30_000,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    return (
        <ThemeProvider>
            {/*
              reducedMotion="user" drops transform/layout animations for anyone
              with the OS preference set, while keeping opacity fades. Doing it
              here means components never branch their tree on the preference —
              that branch is a hydration mismatch, since the value differs
              between the server and the first client render.
            */}
            <MotionConfig reducedMotion="user">
                <QueryClientProvider client={queryClient}>
                    <TooltipProvider delay={0}>
                        <NotifyProvider>
                            {children}
                            <NetworkStatusToast/>
                        </NotifyProvider>
                    </TooltipProvider>
                </QueryClientProvider>
            </MotionConfig>
        </ThemeProvider>
    );
}
