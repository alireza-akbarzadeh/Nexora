"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { NetworkStatusToast } from "@/components/network-status-toast";
import { NotifyProvider } from "@/components/notify/notify-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delay={0}>
        <NotifyProvider>
          {children}
          <NetworkStatusToast />
        </NotifyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
