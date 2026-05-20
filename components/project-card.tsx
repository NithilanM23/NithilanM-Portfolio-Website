"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectGallery } from "@/components/project-gallery"
import { useProximity } from "@/hooks/use-proximity"
import { usePointerParallax } from "@/hooks/use-pointer-parallax"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { DURATION, EASE, spring, stagger } from "@/lib/animation"
import type { Project } from "@/types/project"

export type ProjectCardProps = Project

const contentVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: DURATION.medium,
      ease: EASE.luxury,
    },
  }),
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: stagger.container,
  },
}

export function ProjectCard({
  title,
  description,
  tags,
  images = [],
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const [isHovered, setIsHovered] = useState(false)
  const [isTapped, setIsTapped] = useState(false)

  const proximityEnabled = !isMobile
  const isNear = useProximity(cardRef, 100, proximityEnabled)
  const parallaxEnabled = !isMobile && (isHovered || isNear || isTapped)
  const parallax = usePointerParallax(cardRef, parallaxEnabled, 1)

  const isActive = isMobile ? isTapped : isHovered || isNear

  const handleTap = useCallback(() => {
    if (!isMobile) return
    setIsTapped((prev) => !prev)
  }, [isMobile])

  // Collapse other interactions when switching to desktop
  useEffect(() => {
    if (!isMobile) setIsTapped(false)
  }, [isMobile])

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE.luxury }}
      viewport={{ once: true, margin: "-40px" }}
      className={cn(
        "group relative h-full will-change-transform",
        isActive && "z-30"
      )}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleTap}
      onKeyDown={(e) => {
        if (isMobile && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          handleTap()
        }
      }}
      role={isMobile ? "button" : undefined}
      tabIndex={isMobile ? 0 : undefined}
      aria-expanded={isMobile ? isActive : undefined}
    >
      <motion.div
        layout
        className={cn(
          "relative h-full overflow-hidden rounded-xl border backdrop-blur-sm transition-[border-color,box-shadow] duration-500",
          "bg-zinc-800/50 border-zinc-700/50",
          isActive && "border-orange-500/50 shadow-[0_0_40px_-8px_rgba(249,115,22,0.35)]"
        )}
        animate={{
          scale: isActive ? (isMobile ? 1 : 1.03) : 1,
        }}
        transition={spring.soft}
        style={{ transformOrigin: "center center" }}
      >
        {/* Gradient glow — consistent with GlassmorphicCard */}
        <motion.div
          className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 blur-md"
          animate={{ opacity: isActive ? 1 : 0.25 }}
          transition={{ duration: isActive ? 0.35 : 1 }}
        />

        <motion.div
          layout
          className="relative flex h-full flex-col transform-gpu"
          style={{ willChange: "transform" }}
        >
          {/* Gallery — expands on active */}
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                key="gallery-shell"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: DURATION.reveal, ease: EASE.luxury }}
                className="overflow-hidden"
              >
                <motion.div className="p-4 pb-0" layout>
                  <ProjectGallery
                    title={title}
                    images={images}
                    isActive={isActive}
                    parallax={parallax}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="relative flex flex-grow flex-col p-6">
            {/* Status dot */}
            <div className="absolute right-3 top-3 z-20">
              <motion.div
                className="h-3 w-3 rounded-full"
                animate={{
                  backgroundColor: isActive ? "#22c55e" : "#71717a",
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ duration: DURATION.fast }}
              />
            </div>

            <motion.h3
              className="pr-6 text-xl font-bold"
              animate={{ color: isActive ? "#fafafa" : "#fafafa" }}
            >
              {title}
            </motion.h3>

            <motion.p
              className={cn(
                "mt-2 text-zinc-400 transition-all duration-500",
                !isActive && "line-clamp-2"
              )}
              layout
            >
              {description}
            </motion.p>

            {/* Tags — preview when collapsed, full when active */}
            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              variants={containerVariants}
              initial={false}
              animate={isActive ? "visible" : undefined}
            >
              {(isActive ? tags : tags.slice(0, 3)).map((tag, index) => (
                <motion.div
                  key={tag}
                  custom={index}
                  variants={contentVariants}
                  initial={false}
                  animate={isActive ? "visible" : undefined}
                >
                  <Badge
                    variant="secondary"
                    className={cn(
                      "bg-zinc-700/50 text-zinc-300 transition-colors duration-300",
                      isActive && "hover:bg-zinc-700"
                    )}
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
              {!isActive && tags.length > 3 && (
                <Badge variant="secondary" className="bg-zinc-700/30 text-zinc-500">
                  +{tags.length - 3}
                </Badge>
              )}
            </motion.div>

            {/* CTAs — reveal on active */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: DURATION.medium, ease: EASE.luxury }}
                  className="overflow-hidden"
                >
                  <motion.div
                    className="mt-6 flex flex-col gap-3 border-t border-zinc-700/50 pt-4 sm:flex-row sm:justify-between"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.div custom={0} variants={contentVariants}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-zinc-400 hover:bg-zinc-700/50 hover:text-white sm:w-auto"
                        asChild
                      >
                        <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div custom={1} variants={contentVariants}>
                      <Button
                        size="sm"
                        className="w-full border-0 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-500 sm:w-auto"
                        asChild
                      >
                        <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed hint — desktop only */}
            {!isActive && !isMobile && (
              <motion.p
                className="mt-auto pt-4 text-xs text-zinc-500"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: isNear ? 1 : 0.6 }}
              >
                Hover or move closer to explore
              </motion.p>
            )}

            {isMobile && !isActive && (
              <p className="mt-auto pt-4 text-xs text-zinc-500">Tap to preview</p>
            )}
          </motion.div>

          {/* Mouse-follow shine */}
          {!isMobile && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light"
              animate={{ opacity: isActive ? 0.15 : 0 }}
              style={{
                background: `radial-gradient(600px circle at ${50 + parallax.x * 25}% ${50 + parallax.y * 25}%, rgba(255,255,255,0.12), transparent 40%)`,
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  )
}
