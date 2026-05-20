"use client"

import { useEffect, useState, type RefObject } from "react"

/** Normalized pointer offset (-1..1) relative to element center for parallax layers. */
export function usePointerParallax(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
  intensity = 1
) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) {
      setOffset({ x: 0, y: 0 })
      return
    }

    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = ((e.clientX - cx) / (rect.width / 2)) * intensity
      const ny = ((e.clientY - cy) / (rect.height / 2)) * intensity

      setOffset({
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [ref, enabled, intensity])

  return offset
}
