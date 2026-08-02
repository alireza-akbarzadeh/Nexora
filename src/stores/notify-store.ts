"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { NotifyToast } from "@/lib/notify/types"

const MAX_TOASTS = 5

interface NotifyState {
  toasts: NotifyToast[]
  soundEnabled: boolean
  push: (toast: NotifyToast) => void
  dismiss: (id: string) => void
  dismissAll: () => void
  setSoundEnabled: (enabled: boolean) => void
}

export const useNotifyStore = create<NotifyState>()(
  persist(
    (set) => ({
      toasts: [],
      soundEnabled: true,
      push: (toast) =>
        set((state) => ({
          toasts: [toast, ...state.toasts].slice(0, MAX_TOASTS),
        })),
      dismiss: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
      dismissAll: () => set({ toasts: [] }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
    }),
    {
      name: "nexora-notify",
      partialize: (state) => ({ soundEnabled: state.soundEnabled }),
    },
  ),
)
