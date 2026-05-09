"use client"

import { useEffect, useRef, useState } from "react"

export function useCounter(target: number, durationMs = 1500, decimals = 0) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!Number.isFinite(target) || durationMs <= 0) {
      setValue(target)
      return
    }

    const from = 0
    const to = target

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const t = Math.min(1, elapsed / durationMs)

      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      const next = from + (to - from) * eased

      const factor = Math.pow(10, decimals)
      setValue(Math.round(next * factor) / factor)

      if (t < 1) {
        rafRef.current = window.requestAnimationFrame(tick)
      }
    }

    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      startRef.current = null
    }
  }, [target, durationMs, decimals])

  return value
}

