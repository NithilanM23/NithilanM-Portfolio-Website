"use client"

import { motion } from "framer-motion"

import { useCounter } from "@/hooks/use-counter"
import { DURATION, EASE } from "@/lib/animation"
import { VIEWPORT } from "@/lib/viewport"

function StatCard({
  value,
  suffix,
  label,
  decimals = 0,
  delay = 0,
}: {
  value: number
  suffix?: string
  label: string
  decimals?: number
  delay?: number
}) {
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()

  return (
    <motion.div
      className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/40"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.medium, ease: EASE.luxury, delay }}
      viewport={VIEWPORT}
      whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.4)" }}
    >
      <div className="text-orange-400 font-bold text-xl">
        {display}
        {suffix}
      </div>
      <div className="text-sm text-zinc-400 mt-1">{label}</div>
    </motion.div>
  )
}

export function ResearchStats() {
  const auroc = useCounter(99.6, 2200, 1)
  const params = useCounter(5.9, 2000, 1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard value={auroc} suffix="%" label="AUROC on MVTec AD Benchmark" delay={0} />
      <StatCard value={params} suffix="M" label="Parameters (~35% fewer than SOTA)" delay={0.08} />
    </div>
  )
}
