"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

import { spring } from "@/lib/animation"

interface GlassmorphicCardProps {
  children: ReactNode
}

/** Hover lift only — section enter/exit is handled by SectionWrapper */
export function GlassmorphicCard({ children }: GlassmorphicCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={spring.soft}>
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-orange-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200" />

        <div className="relative">{children}</div>
      </div>
    </motion.div>
  )
}
