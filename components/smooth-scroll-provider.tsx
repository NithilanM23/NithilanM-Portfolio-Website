"use client"

import { useEffect } from "react"

/** Lightweight anchor smooth scroll; swap for Lenis when `lenis` is installed */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!target || !(target instanceof HTMLAnchorElement)) return
      const id = target.getAttribute("href")
      if (!id || id === "#") return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return <>{children}</>
}
