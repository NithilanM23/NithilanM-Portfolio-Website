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

    let raf = 0
    let lastEvent: MouseEvent | null = null
    let last = { x: 0, y: 0 }

    const compute = () => {
      raf = 0
      const el = ref.current
      const e = lastEvent
      if (!el || !e) return

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = ((e.clientX - cx) / (rect.width / 2)) * intensity
      const ny = ((e.clientY - cy) / (rect.height / 2)) * intensity

      const next = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      }

      // Avoid re-render spam for tiny deltas.
      if (Math.abs(next.x - last.x) > 0.01 || Math.abs(next.y - last.y) > 0.01) {
        last = next
        setOffset(next)
      }
    }

    const onMove = (e: MouseEvent) => {
      lastEvent = e
      if (raf) return
      raf = window.requestAnimationFrame(compute)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [ref, enabled, intensity])

  return offset
}
