"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // OutExpo-like easing curve
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    // Sync ScrollTrigger scroll updates with Lenis
    lenis.on("scroll", ScrollTrigger.update)

    // Add Lenis to GSAP ticker so scroll and GSAP animations run in sync
    const rafHandler = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafHandler)

    // Reset ScrollTrigger lag smoothing for perfectly synced frame updates
    gsap.ticker.lagSmoothing(0)

    // Save Lenis instance to window for global access
    ;(window as any).lenis = lenis

    // Handle all internal anchor clicks smoothly via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!target || !(target instanceof HTMLAnchorElement)) return
      
      const id = target.getAttribute("href")
      if (!id || id === "#") return
      
      const targetElement = document.querySelector(id)
      if (!targetElement) return
      
      e.preventDefault()
      
      // Let Lenis handle the transition smoothly
      lenis.scrollTo(targetElement as HTMLElement, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafHandler)
      document.removeEventListener("click", handleAnchorClick)
      delete (window as any).lenis
    }
  }, [])

  return <>{children}</>
}
