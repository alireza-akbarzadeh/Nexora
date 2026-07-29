import { z } from "zod";

export const exchangeConnectionSchema = z.object({
  exchange: z.enum(["binance", "coinbase"]),
  label: z.string().optional(),
  apiKey: z.string().min(1, "API key is required"),
  apiSecret: z.string().min(1, "API secret is required"),
});

export type ExchangeConnectionFormValues = z.infer<typeof exchangeConnectionSchema>;
