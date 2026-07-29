export type ExchangeId = "binance" | "coinbase";

export interface Ticker {
  symbol: string;
  last: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  percentage: number;
  timestamp: number;
}

export interface Balance {
  currency: string;
  free: number;
  used: number;
  total: number;
}

export interface OrderBookLevel {
  price: number;
  amount: number;
}

export interface OrderBook {
  symbol: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  timestamp: number;
}

export interface OHLCV {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ExchangeOrder {
  id: string;
  symbol: string;
  type: string;
  side: "buy" | "sell";
  price: number;
  amount: number;
  filled: number;
  remaining: number;
  status: string;
  timestamp: number;
}

export interface ExchangeConnectionSummary {
  id: string;
  exchange: ExchangeId;
  label: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface MarketInfo {
  symbol: string;
  base: string;
  quote: string;
  active: boolean;
}
