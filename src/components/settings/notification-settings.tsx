"use client"

import { Volume2, VolumeX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { notify } from "@/lib/notify"
import { useNotifyStore } from "@/stores/notify-store"

export function NotificationSettings() {
  const soundEnabled = useNotifyStore((s) => s.soundEnabled)
  const setSoundEnabled = useNotifyStore((s) => s.setSoundEnabled)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">Alert sounds</p>
            <p className="text-xs text-muted-foreground">
              Play a short chime for orders, fills, and errors
            </p>
          </div>
          <Switch
            checked={soundEnabled}
            onCheckedChange={setSoundEnabled}
            aria-label="Toggle alert sounds"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              notify.order({
                side: "buy",
                symbol: "BTC/USDT",
                amount: "0.01",
                type: "limit",
                price: "64000",
              })
            }
          >
            {soundEnabled ? (
              <Volume2 data-icon="inline-start" />
            ) : (
              <VolumeX data-icon="inline-start" />
            )}
            Preview order
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              notify.success("Connected", {
                description: "Exchange keys verified successfully",
              })
            }
          >
            Preview success
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              notify.error("Order rejected", {
                description: "Insufficient balance",
              })
            }
          >
            Preview error
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
