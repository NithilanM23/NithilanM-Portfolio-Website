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

    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const near =
        e.clientX >= rect.left - threshold &&
        e.clientX <= rect.right + threshold &&
        e.clientY >= rect.top - threshold &&
        e.clientY <= rect.bottom + threshold

      setIsNear(near)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [ref, threshold, enabled])

  return isNear
}
