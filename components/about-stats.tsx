"use client"

import { motion } from "framer-motion"
import { Award, GraduationCap, Trophy, type LucideIcon } from "lucide-react"

import { useCounter } from "@/hooks/use-counter"

type Stat = {
  icon: LucideIcon
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  sublabel: string
}

function formatNumber(value: number, decimals = 0) {
  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
}

export function AboutStats() {
  const cgpa = useCounter(9.0, 2000, 1)
  const llmRank = useCounter(5, 1500, 0)
  const aiRank = useCounter(16, 1800, 0)

  const stats: Stat[] = [
    {
      icon: GraduationCap,
      value: cgpa,
      decimals: 1,
      label: "CGPA",
      sublabel: "Academic Score",
    },
    {
      icon: Trophy,
      value: llmRank,
      prefix: "AIR ",
      label: "LLMs Course",
      sublabel: "All India Rank",
    },
    {
      icon: Award,
      value: aiRank,
      prefix: "AIR ",
      label: "Responsible AI",
      sublabel: "All India Rank",
    },
  ]

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl bg-zinc-900/30 border border-zinc-700/40 p-5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10 opacity-80" />
              <div className="relative flex items-start gap-4">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <Icon className="h-5 w-5 text-orange-300" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-baseline gap-1">
                    {stat.prefix ? (
                      <span className="text-sm font-semibold text-orange-300/90">{stat.prefix}</span>
                    ) : null}
                    <span className="text-2xl font-bold text-white">
                      {formatNumber(stat.value, stat.decimals ?? 0)}
                    </span>
                    {stat.suffix ? (
                      <span className="text-sm font-semibold text-orange-300/90">{stat.suffix}</span>
                    ) : null}
                  </div>
                  <div className="mt-1 text-sm font-medium text-zinc-200">{stat.label}</div>
                  <div className="text-xs text-zinc-400">{stat.sublabel}</div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

