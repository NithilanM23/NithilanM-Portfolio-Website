"use client"

import { useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

import { useMobile } from "@/hooks/use-mobile"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  asChild?: boolean
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const isMobile = useMobile()
  const reduced = useReducedMotion()

  const handleMove = (e: React.MouseEvent) => {
    if (isMobile || reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setOffset({
      x: (e.clientX - cx) * strength * 0.15,
      y: (e.clientY - cy) * strength * 0.15,
    })
  }

  const reset = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 350, damping: 22, mass: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
