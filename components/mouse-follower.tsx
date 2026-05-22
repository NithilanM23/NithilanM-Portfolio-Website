"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { useMobile } from "@/hooks/use-mobile"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMobile()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (isMobile || reduced) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isMobile, reduced])

  if (isMobile || reduced) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-50 border-2 border-orange-400/60"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 280, mass: 0.5 }}
        style={{
          boxShadow: "0 0 24px rgba(249, 115, 22, 0.25)",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-orange-400 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.3 }}
      />
    </>
  )
}
