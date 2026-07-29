import { create } from "zustand";

type OrderSide = "buy" | "sell";
type OrderType = "market" | "limit";

interface TradingState {
  selectedSymbol: string;
  orderSide: OrderSide;
  orderType: OrderType;
  orderAmount: string;
  orderPrice: string;
  showOrderBook: boolean;
  showRecentTrades: boolean;
  setSelectedSymbol: (symbol: string) => void;
  setOrderSide: (side: OrderSide) => void;
  setOrderType: (type: OrderType) => void;
  setOrderAmount: (amount: string) => void;
  setOrderPrice: (price: string) => void;
  toggleOrderBook: () => void;
  toggleRecentTrades: () => void;
  resetOrderForm: () => void;
}

export const useTradingStore = create<TradingState>((set) => ({
  selectedSymbol: "BTC/USDT",
  orderSide: "buy",
  orderType: "limit",
  orderAmount: "",
  orderPrice: "",
  showOrderBook: true,
  showRecentTrades: true,
  setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),
  setOrderSide: (orderSide) => set({ orderSide }),
  setOrderType: (orderType) => set({ orderType }),
  setOrderAmount: (orderAmount) => set({ orderAmount }),
  setOrderPrice: (orderPrice) => set({ orderPrice }),
  toggleOrderBook: () =>
    set((state) => ({ showOrderBook: !state.showOrderBook })),
  toggleRecentTrades: () =>
    set((state) => ({ showRecentTrades: !state.showRecentTrades })),
  resetOrderForm: () => set({ orderAmount: "", orderPrice: "" }),
}));
