"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { ExchangeConnectionSummary } from "@/types/exchange";

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [exchange, setExchange] = useState<"binance" | "coinbase">("binance");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [label, setLabel] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectionsQuery = useQuery({
    queryKey: ["exchange-connections"],
    queryFn: async () => {
      const response = await fetch("/api/exchange/connections");
      if (!response.ok) throw new Error("Failed to load connections");
      return response.json() as Promise<{
        connections: ExchangeConnectionSummary[];
      }>;
    },
  });

  const connectMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/exchange/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange,
          apiKey,
          apiSecret,
          label: label || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to connect exchange");
      }
      return data;
    },
    onSuccess: () => {
      setApiKey("");
      setApiSecret("");
      setLabel("");
      setMessage("Exchange connected successfully.");
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["exchange-connections"] });
    },
    onError: (mutationError) => {
      setMessage(null);
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : "Failed to connect exchange",
      );
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (input: { id: string; isActive: boolean }) => {
      const response = await fetch("/api/exchange/connections", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to update connection");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exchange-connections"] });
    },
  });

  return (
    <>
      <Header
        title="Settings"
        subtitle="Manage encrypted exchange API connections"
      />

      <main className="grid flex-1 gap-6 p-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Connect Exchange</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                connectMutation.mutate();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="exchange">Exchange</Label>
                <select
                  id="exchange"
                  value={exchange}
                  onChange={(event) =>
                    setExchange(event.target.value as "binance" | "coinbase")
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="binance">Binance</option>
                  <option value="coinbase">Coinbase</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={label}
                  onChange={(event) => setLabel(event.target.value)}
                  placeholder="Main account"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  value={apiKey}
                  onChange={(event) => setApiKey(event.target.value)}
                  placeholder="Your exchange API key"
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiSecret">API Secret</Label>
                <Input
                  id="apiSecret"
                  type="password"
                  value={apiSecret}
                  onChange={(event) => setApiSecret(event.target.value)}
                  placeholder="Your exchange API secret"
                  autoComplete="off"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Keys are validated against the exchange, encrypted at rest, and
                never returned to the browser.
              </p>

              {message ? (
                <p className="text-xs text-buy">{message}</p>
              ) : null}
              {error ? <p className="text-xs text-destructive">{error}</p> : null}

              <Button type="submit" disabled={connectMutation.isPending}>
                {connectMutation.isPending ? "Connecting..." : "Save Connection"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connected Exchanges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(connectionsQuery.data?.connections ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No exchange connections yet.
              </p>
            ) : (
              connectionsQuery.data?.connections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div>
                    <p className="font-medium capitalize">{connection.exchange}</p>
                    <p className="text-sm text-muted-foreground">
                      {connection.label ?? "No label"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {connection.isActive ? "Active" : "Disabled"}
                    </span>
                    <Switch
                      checked={connection.isActive}
                      onCheckedChange={(checked) =>
                        toggleMutation.mutate({
                          id: connection.id,
                          isActive: checked,
                        })
                      }
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
