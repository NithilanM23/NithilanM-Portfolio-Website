"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { SectionHeading } from "@/components/section-heading"
import { SectionWrapper } from "@/components/section-wrapper"
import { SkillBadge } from "@/components/skill-badge"
import { skillGroups, skills, type SkillGroup } from "@/data/skills"
import { DURATION, EASE } from "@/lib/animation"
import { cn } from "@/lib/utils"

export function SkillsSection() {
  const [active, setActive] = useState<SkillGroup | "all">("all")

  const filtered =
    active === "all" ? skills : skills.filter((s) => s.group === active)

  return (
    <SectionWrapper id="skills">
      <SectionHeading title="My Skills" subtitle="Technologies I work with" />

      <div className="flex flex-wrap justify-center gap-2 mt-10">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={cn(
            "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
            active === "all" ? "text-white" : "text-zinc-400 hover:text-white"
          )}
        >
          {active === "all" && (
            <motion.span
              layoutId="skill-filter-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-500/30 border border-orange-500/40"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">All</span>
        </button>
        {skillGroups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActive(g.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
              active === g.id ? "text-white" : "text-zinc-400 hover:text-white"
            )}
          >
            {active === g.id && (
              <motion.span
                layoutId="skill-filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-500/30 border border-orange-500/40"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{g.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: DURATION.medium, ease: EASE.luxury }}
            >
              <SkillBadge name={skill.name} level={skill.level} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  )
}
