"use client"

import { motion } from "framer-motion"

import { DURATION, EASE } from "@/lib/animation"
import { VIEWPORT } from "@/lib/viewport"

interface SkillBadgeProps {
  name: string
  level: number
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: DURATION.fast, ease: EASE.luxury }}>
      <div className="group relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 h-full transition-all duration-300 hover:border-orange-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

        <div className="relative">
          <div className="text-center mb-4 font-medium text-lg">{name}</div>

          <div className="relative h-2.5 w-full bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: level / 100 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE.luxury }}
              viewport={VIEWPORT}
              style={{ width: "100%" }}
            />
            <motion.div
              className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: "400%" }}
              transition={{ duration: 0.9, ease: EASE.luxury }}
            />
          </div>

          <div className="mt-2 text-right text-sm text-zinc-400">{level}%</div>
        </div>
      </div>
    </motion.div>
  )
}
