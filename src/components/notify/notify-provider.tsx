"use client"

import { useEffect } from "react"

import { NotifyToaster } from "@/components/notify/notify-toaster"
import { installNotifyAudioUnlock } from "@/lib/notify/sounds"

/**
 * Mount once at app root. Renders the toast viewport and unlocks Web Audio
 * on the first user gesture (required by browsers).
 */
export function NotifyProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => installNotifyAudioUnlock(), [])

  return (
    <>
      {children}
      <NotifyToaster />
    </>
  )
}
