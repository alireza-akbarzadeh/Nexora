"use client";

import {AppSidebar} from "@/components/layout/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import React from "react";
import {Header} from "@/components/layout/header";
import {BottomBar, TickerItem} from "@/components/layout/bottom-bar";
import {useWsConnection} from "@/hooks/use-ticker";

export function DashboardShell({children}: { children: React.ReactNode }) {
    const connected = useWsConnection();

    const tickers: TickerItem [] = [{pair: "BTC/USDT", changePercent: 0.26, price: "63,204.57", symbol: "BTC"}]
    return (
        <SidebarProvider className="h-screen overflow-hidden">
            <AppSidebar/>
            <SidebarInset className="flex h-full flex-col overflow-hidden">
                <Header/>
                <div className="min-h-0 flex-1 overflow-y-auto p-4">
                    {children}
                </div>
                <BottomBar connected={connected} tickers={tickers} className="shrink-0"/>
            </SidebarInset>
        </SidebarProvider>
    );
}