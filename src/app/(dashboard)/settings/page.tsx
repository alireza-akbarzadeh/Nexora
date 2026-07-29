"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { FormPasswordField } from "@/components/forms/form-password-field";
import { FormTextField } from "@/components/forms/form-text-field";
import { Header } from "@/components/layout/header";
import {
  exchangeConnectionSchema,
  type ExchangeConnectionFormValues,
} from "@/lib/validations/exchange";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import type { ExchangeConnectionSummary } from "@/types/exchange";

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ExchangeConnectionFormValues>({
    resolver: zodResolver(exchangeConnectionSchema),
    defaultValues: {
      exchange: "binance",
      label: "",
      apiKey: "",
      apiSecret: "",
    },
  });

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
    mutationFn: async (values: ExchangeConnectionFormValues) => {
      const response = await fetch("/api/exchange/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          label: values.label || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to connect exchange");
      }
      return data;
    },
    onSuccess: () => {
      form.reset({
        exchange: "binance",
        label: "",
        apiKey: "",
        apiSecret: "",
      });
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
              onSubmit={form.handleSubmit((values) => connectMutation.mutate(values))}
            >
              <FieldGroup>
                <Controller
                  name="exchange"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="exchange">Exchange</FieldLabel>
                      <select
                        id="exchange"
                        {...field}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                      >
                        <option value="binance">Binance</option>
                        <option value="coinbase">Coinbase</option>
                      </select>
                    </Field>
                  )}
                />

                <FormTextField
                  control={form.control}
                  name="label"
                  label="Label"
                  placeholder="Main account"
                />
                <FormTextField
                  control={form.control}
                  name="apiKey"
                  label="API Key"
                  placeholder="Your exchange API key"
                  autoComplete="off"
                />
                <FormPasswordField
                  control={form.control}
                  name="apiSecret"
                  label="API Secret"
                  placeholder="Your exchange API secret"
                  autoComplete="off"
                />
              </FieldGroup>

              <FieldDescription>
                Keys are validated against the exchange, encrypted at rest, and
                never returned to the browser.
              </FieldDescription>

              {message ? <p className="text-xs text-buy">{message}</p> : null}
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
