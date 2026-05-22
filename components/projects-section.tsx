"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"
import { SectionWrapper } from "@/components/section-wrapper"
import { projectFilters, projects } from "@/data/projects"
import { DURATION, EASE } from "@/lib/animation"
import type { ProjectCategory } from "@/types/project"
import { cn } from "@/lib/utils"

type FilterId = "all" | ProjectCategory

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterId>("all")

  const featured = useMemo(() => projects.filter((p) => p.featured), [])
  const filtered = useMemo(() => {
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter)
    return list.filter((p) => !p.featured)
  }, [filter])

  return (
    <SectionWrapper id="projects">
      <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

      {featured.length > 0 && (
        <div className="mt-12">
          <p className="text-sm text-zinc-500 mb-4 uppercase tracking-wider">Spotlight</p>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-2 px-2">
            {featured.map((project) => (
              <div
                key={project.title}
                className="min-w-[min(100%,420px)] md:min-w-[380px] snap-center shrink-0"
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 mt-12">
        {projectFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
              filter === f.id ? "text-white" : "text-zinc-400 hover:text-white"
            )}
          >
            {filter === f.id && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-500/30 border border-orange-500/40"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </div>

      <motion.div className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: DURATION.medium, ease: EASE.luxury }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  )
}
