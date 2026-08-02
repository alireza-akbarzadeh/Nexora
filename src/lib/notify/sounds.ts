import type { NotifySound } from "./types"

/**
 * Trading-terminal style alerts via Web Audio API.
 * No asset files — synthesized so it works offline and stays tiny.
 */

let audioCtx: AudioContext | null = null
let unlocked = false

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    audioCtx = new Ctx()
  }
  return audioCtx
}

/** Call once after a user gesture so browsers allow playback. */
export async function unlockNotifyAudio(): Promise<void> {
  const ctx = getCtx()
  if (!ctx) return
  if (ctx.state === "suspended") {
    try {
      await ctx.resume()
    } catch {
      return
    }
  }
  unlocked = true
}

function tone(
  ctx: AudioContext,
  {
    frequency,
    start,
    duration,
    type = "sine",
    gain = 0.12,
    ramp = "exp",
  }: {
    frequency: number
    start: number
    duration: number
    type?: OscillatorType
    gain?: number
    ramp?: "exp" | "lin"
  },
) {
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, start)
  g.gain.setValueAtTime(0.0001, start)
  if (ramp === "exp") {
    g.gain.exponentialRampToValueAtTime(gain, start + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  } else {
    g.gain.linearRampToValueAtTime(gain, start + 0.015)
    g.gain.linearRampToValueAtTime(0, start + duration)
  }
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

const playbook: Record<Exclude<NotifySound, "none">, (ctx: AudioContext) => void> = {
  info(ctx) {
    const t = ctx.currentTime
    tone(ctx, { frequency: 880, start: t, duration: 0.08, gain: 0.06, type: "triangle" })
  },
  success(ctx) {
    const t = ctx.currentTime
    tone(ctx, { frequency: 523.25, start: t, duration: 0.12, gain: 0.09, type: "sine" })
    tone(ctx, { frequency: 659.25, start: t + 0.09, duration: 0.14, gain: 0.1, type: "sine" })
    tone(ctx, { frequency: 783.99, start: t + 0.18, duration: 0.22, gain: 0.11, type: "sine" })
  },
  error(ctx) {
    const t = ctx.currentTime
    tone(ctx, { frequency: 220, start: t, duration: 0.18, gain: 0.14, type: "square" })
    tone(ctx, { frequency: 180, start: t + 0.12, duration: 0.28, gain: 0.12, type: "sawtooth" })
  },
  warning(ctx) {
    const t = ctx.currentTime
    tone(ctx, { frequency: 740, start: t, duration: 0.1, gain: 0.09, type: "triangle" })
    tone(ctx, { frequency: 740, start: t + 0.14, duration: 0.12, gain: 0.09, type: "triangle" })
  },
  order(ctx) {
    const t = ctx.currentTime
    // Crisp terminal “ping” then confirm tick
    tone(ctx, { frequency: 988, start: t, duration: 0.07, gain: 0.1, type: "sine" })
    tone(ctx, { frequency: 1318.5, start: t + 0.06, duration: 0.16, gain: 0.12, type: "triangle" })
  },
  fill(ctx) {
    const t = ctx.currentTime
    // Satisfying fill chord
    tone(ctx, { frequency: 392, start: t, duration: 0.2, gain: 0.08, type: "sine" })
    tone(ctx, { frequency: 493.88, start: t + 0.02, duration: 0.22, gain: 0.09, type: "sine" })
    tone(ctx, { frequency: 587.33, start: t + 0.04, duration: 0.28, gain: 0.1, type: "triangle" })
  },
}

export function playNotifySound(sound: NotifySound): void {
  if (sound === "none" || typeof window === "undefined") return
  const ctx = getCtx()
  if (!ctx) return

  const run = () => {
    try {
      playbook[sound](ctx)
    } catch {
      // Audio can fail if device policy blocks it — never break UX
    }
  }

  if (ctx.state === "suspended") {
    void ctx.resume().then(() => {
      unlocked = true
      run()
    })
    return
  }

  if (!unlocked) unlocked = true
  run()
}

/** Install a one-shot unlock on first pointer/keydown. Safe to call multiple times. */
export function installNotifyAudioUnlock(): () => void {
  if (typeof window === "undefined") return () => undefined

  const unlock = () => {
    void unlockNotifyAudio()
    window.removeEventListener("pointerdown", unlock)
    window.removeEventListener("keydown", unlock)
  }

  window.addEventListener("pointerdown", unlock, { once: true })
  window.addEventListener("keydown", unlock, { once: true })

  return () => {
    window.removeEventListener("pointerdown", unlock)
    window.removeEventListener("keydown", unlock)
  }
}
