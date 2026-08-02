"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { NotifyToast, NotifyVariant } from "@/lib/notify/types"

const MAX_TOASTS = 5
const MAX_HISTORY = 40

export interface NotifyHistoryItem {
  id: string
  title: string
  description?: string
  variant: NotifyVariant
  createdAt: number
  read: boolean
}

interface NotifyState {
  toasts: NotifyToast[]
  history: NotifyHistoryItem[]
  unreadCount: number
  soundEnabled: boolean
  push: (toast: NotifyToast) => void
  dismiss: (id: string) => void
  dismissAll: () => void
  markAllRead: () => void
  markRead: (id: string) => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void
  setSoundEnabled: (enabled: boolean) => void
}

export const useNotifyStore = create<NotifyState>()(
  persist(
    (set) => ({
      toasts: [],
      history: [],
      unreadCount: 0,
      soundEnabled: true,
      push: (toast) =>
        set((state) => {
          const item: NotifyHistoryItem = {
            id: toast.id,
            title: toast.title,
            description: toast.description,
            variant: toast.variant,
            createdAt: toast.createdAt,
            read: false,
          }
          return {
            toasts: [toast, ...state.toasts].slice(0, MAX_TOASTS),
            history: [item, ...state.history].slice(0, MAX_HISTORY),
            unreadCount: state.unreadCount + 1,
          }
        }),
      dismiss: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
      dismissAll: () => set({ toasts: [] }),
      markAllRead: () =>
        set((state) => ({
          history: state.history.map((item) =>
            item.read ? item : { ...item, read: true },
          ),
          unreadCount: 0,
        })),
      markRead: (id) =>
        set((state) => {
          const target = state.history.find((item) => item.id === id)
          if (!target || target.read) return state
          return {
            history: state.history.map((item) =>
              item.id === id ? { ...item, read: true } : item,
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          }
        }),
      removeFromHistory: (id) =>
        set((state) => {
          const target = state.history.find((item) => item.id === id)
          return {
            history: state.history.filter((item) => item.id !== id),
            unreadCount:
              target && !target.read
                ? Math.max(0, state.unreadCount - 1)
                : state.unreadCount,
          }
        }),
      clearHistory: () => set({ history: [], unreadCount: 0 }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
    }),
    {
      name: "nexora-notify",
      partialize: (state) => ({
        soundEnabled: state.soundEnabled,
        history: state.history,
        unreadCount: state.unreadCount,
      }),
    },
  ),
)
