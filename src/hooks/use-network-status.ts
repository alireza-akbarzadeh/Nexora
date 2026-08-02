"use client";

import { useEffect, useState } from "react";

export type NetworkStatus = "online" | "offline" | "reconnected";

/**
 * Tracks browser online/offline state.
 * Emits `"reconnected"` briefly after returning online so UI can celebrate recovery.
 */
export function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkStatus>("online");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const initial = navigator.onLine ? "online" : "offline";
    setStatus(initial);

    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

    const goOffline = () => {
      clearTimeout(reconnectTimer);
      setStatus("offline");
    };

    const goOnline = () => {
      clearTimeout(reconnectTimer);
      setStatus("reconnected");
      reconnectTimer = setTimeout(() => setStatus("online"), 3200);
    };

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      clearTimeout(reconnectTimer);
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  return {
    status,
    isOnline: status !== "offline",
    isOffline: status === "offline",
    /** False until client has read navigator.onLine (avoids SSR flash). */
    isHydrated,
  };
}
