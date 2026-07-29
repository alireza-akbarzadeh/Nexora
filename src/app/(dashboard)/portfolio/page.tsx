"use client";

import { useQuery } from "@tanstack/react-query";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import type { Balance, ExchangeOrder } from "@/types/exchange";

export default function PortfolioPage() {
  const balancesQuery = useQuery({
    queryKey: ["balances"],
    queryFn: async () => {
      const response = await fetch("/api/exchange/balance?exchange=binance");
      if (!response.ok) throw new Error("Failed to fetch balances");
      return response.json() as Promise<{ balances: Balance[] }>;
    },
  });

  const ordersQuery = useQuery({
    queryKey: ["open-orders"],
    queryFn: async () => {
      const response = await fetch("/api/exchange/orders?exchange=binance");
      if (!response.ok) throw new Error("Failed to fetch orders");
      return response.json() as Promise<{ orders: ExchangeOrder[] }>;
    },
  });

  return (
    <>
      <Header title="Portfolio" subtitle="Balances and open orders from Binance" />

      <main className="grid flex-1 gap-6 p-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Balances</CardTitle>
          </CardHeader>
          <CardContent>
            {balancesQuery.isLoading ? (
              <Skeleton className="h-40 w-full" />
            ) : balancesQuery.data?.balances.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead className="text-right">Free</TableHead>
                    <TableHead className="text-right">Used</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {balancesQuery.data.balances.map((balance) => (
                    <TableRow key={balance.currency}>
                      <TableCell>{balance.currency}</TableCell>
                      <TableCell className="text-right font-tabular">
                        {formatPrice(balance.free, 6)}
                      </TableCell>
                      <TableCell className="text-right font-tabular">
                        {formatPrice(balance.used, 6)}
                      </TableCell>
                      <TableCell className="text-right font-tabular">
                        {formatPrice(balance.total, 6)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                Connect Binance API keys in Settings to view your balances.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {ordersQuery.isLoading ? (
              <Skeleton className="h-40 w-full" />
            ) : ordersQuery.data?.orders.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersQuery.data.orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.symbol}</TableCell>
                      <TableCell className="capitalize">{order.side}</TableCell>
                      <TableCell className="text-right font-tabular">
                        {formatPrice(order.amount, 6)}
                      </TableCell>
                      <TableCell className="text-right font-tabular">
                        {formatPrice(order.price, 2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                No open orders found for your connected exchange.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
