"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { SectionHeading } from "@/components/section-heading"
import { SectionWrapper } from "@/components/section-wrapper"
import { skillGroups, skills, type SkillGroup } from "@/data/skills"
import { DURATION, EASE } from "@/lib/animation"
import { cn } from "@/lib/utils"

function SkillsCard({ name, level }: { name: string; level: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    gsap.registerPlugin(ScrollTrigger)

    // Scroll-linked progress bar animation
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: level / 100,
        duration: 1.2,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [level])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Tilt calculations (capped at 12 degrees)
    const rotX = -(y / rect.height) * 12
    const rotY = (x / rect.width) * 12

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      translateZ: 15,
      transformPerspective: 500,
      boxShadow: "0 10px 30px -10px rgba(249,115,22,0.25)",
      borderColor: "rgba(249,115,22,0.4)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      borderColor: "rgba(63,63,70,0.5)",
      duration: 0.5,
      ease: "power2.out",
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 p-6 h-full transition-all duration-300 hover:border-orange-500/50 transform-gpu cursor-default"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      <div className="relative space-y-4" style={{ transform: "translateZ(10px)" }}>
        <div className="text-center font-semibold text-zinc-100 text-lg tracking-tight">
          {name}
        </div>

        {/* Progress Bar Track */}
        <div className="relative h-2 w-full bg-zinc-800/80 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full origin-left w-full"
          />
        </div>

        <div className="text-right text-xs font-semibold text-zinc-400 group-hover:text-orange-400 transition-colors duration-300">
          {level}%
        </div>
      </div>
    </div>
  )
}

export function Skills3DGrid() {
  const [active, setActive] = useState<SkillGroup | "all">("all")
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered =
    active === "all" ? skills : skills.filter((s) => s.group === active)

  return (
    <SectionWrapper id="skills">
      <SectionHeading title="My Skills" subtitle="Technologies I work with" />

      {/* Filter tab pills */}
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
              layoutId="skill-filter-pill-cinematic"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
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
                layoutId="skill-filter-pill-cinematic"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{g.label}</span>
          </button>
        ))}
      </div>

      {/* 3D Grid Display */}
      <motion.div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 perspective-1000"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: DURATION.medium, ease: EASE.luxury }}
            >
              <SkillsCard name={skill.name} level={skill.level} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  )
}
