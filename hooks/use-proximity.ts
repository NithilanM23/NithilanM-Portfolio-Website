"use client"

import { useEffect, useState, type RefObject } from "react"

/** True when the pointer is within `threshold` px of the element bounds (desktop). */
export function useProximity(
  ref: RefObject<HTMLElement | null>,
  threshold = 96,
  enabled = true
) {
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setIsNear(false)
      return
    }

    let raf = 0
    let lastNear: boolean | null = null
    let lastEvent: MouseEvent | null = null

    const compute = () => {
      raf = 0
      const el = ref.current
      const e = lastEvent
      if (!el || !e) return

      const rect = el.getBoundingClientRect()
      const near =
        e.clientX >= rect.left - threshold &&
        e.clientX <= rect.right + threshold &&
        e.clientY >= rect.top - threshold &&
        e.clientY <= rect.bottom + threshold

      if (near !== lastNear) {
        lastNear = near
        setIsNear(near)
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
  }, [ref, threshold, enabled])

  return isNear
}
