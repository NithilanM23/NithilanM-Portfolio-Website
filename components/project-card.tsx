"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectGallery } from "@/components/project-gallery"
import { usePointerParallax } from "@/hooks/use-pointer-parallax"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { DURATION, EASE, spring, stagger, PROJECT_HOVER_DELAY_MS } from "@/lib/animation"
import { VIEWPORT } from "@/lib/viewport"
import type { Project } from "@/types/project"

export type ProjectCardProps = Project

const HOVER_LEAVE_GRACE_MS = 280

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
  const [clickedOpen, setClickedOpen] = useState(false)
  const [hoverOpen, setHoverOpen] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const [hoverPending, setHoverPending] = useState(false)

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }, [])

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
  }, [])

  const isActive = isMobile ? isTapped : clickedOpen || hoverOpen
  const parallaxEnabled = !isMobile && isActive
  const parallax = usePointerParallax(cardRef, parallaxEnabled, 1)

  const galleryTransition = isActive ? spring.galleryOpen : spring.galleryClose

  const handleMouseEnter = useCallback(() => {
    if (isMobile || clickedOpen) return
    clearLeaveTimer()
    setHoverPending(true)
    clearHoverTimer()
    hoverTimerRef.current = setTimeout(() => {
      setHoverOpen(true)
      setHoverPending(false)
    }, PROJECT_HOVER_DELAY_MS)
  }, [isMobile, clickedOpen, clearHoverTimer, clearLeaveTimer])

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return
    clearHoverTimer()
    setHoverPending(false)
    if (clickedOpen) return

    clearLeaveTimer()
    leaveTimerRef.current = setTimeout(() => {
      setHoverOpen(false)
    }, HOVER_LEAVE_GRACE_MS)
  }, [isMobile, clickedOpen, clearHoverTimer, clearLeaveTimer])

  const handleClick = useCallback(() => {
    if (isMobile) {
      setIsTapped((prev) => !prev)
      return
    }
    clearHoverTimer()
    clearLeaveTimer()
    setHoverPending(false)
    setHoverOpen(false)
    setClickedOpen((prev) => !prev)
  }, [isMobile, clearHoverTimer, clearLeaveTimer])

  useEffect(() => {
    if (!isMobile) setIsTapped(false)
  }, [isMobile])

  useEffect(() => {
    return () => {
      clearHoverTimer()
      clearLeaveTimer()
    }
  }, [clearHoverTimer, clearLeaveTimer])

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE.luxury }}
      viewport={{ ...VIEWPORT, margin: "-40px" }}
      className={cn("group relative h-full will-change-transform", isActive && "z-30")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
    >
      <motion.div
        layout
        className={cn(
          "relative h-full overflow-hidden rounded-xl border backdrop-blur-sm",
          "bg-zinc-800/50 border-zinc-700/50",
          isActive && "border-orange-500/50 shadow-[0_0_40px_-8px_rgba(249,115,22,0.35)]"
        )}
        animate={{
          scale: isActive ? (isMobile ? 1 : 1.02) : 1,
        }}
        transition={isActive ? spring.galleryOpen : spring.galleryClose}
        style={{ transformOrigin: "center center" }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 blur-md"
          animate={{ opacity: isActive ? 1 : 0.25 }}
          transition={galleryTransition}
        />

        <div className="relative flex h-full flex-col transform-gpu">
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{
              maxHeight: isActive ? 520 : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={galleryTransition}
          >
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={galleryTransition}
                  className="p-4 pb-0"
                >
                  <ProjectGallery
                    title={title}
                    images={images}
                    isActive={isActive}
                    parallax={parallax}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="relative flex flex-grow flex-col p-6">
            <div className="absolute right-3 top-3 z-20">
              <motion.div
                className="h-3 w-3 rounded-full"
                animate={{
                  backgroundColor: isActive ? "#22c55e" : hoverPending ? "#f97316" : "#71717a",
                  scale: isActive ? 1.15 : hoverPending ? 1.08 : 1,
                }}
                transition={spring.snappy}
              />
            </div>

            <h3 className="pr-6 text-xl font-bold">{title}</h3>

            <motion.p
              className="mt-2 text-zinc-400"
              animate={{ opacity: isActive ? 1 : 0.85 }}
              transition={{ duration: DURATION.fast, ease: EASE.luxury }}
            >
              <span className={cn(!isActive && "line-clamp-2 block")}>{description}</span>
            </motion.p>

            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              variants={containerVariants}
              initial={false}
              animate={isActive ? "visible" : "hidden"}
            >
              {(isActive ? tags : tags.slice(0, 3)).map((tag, index) => (
                <motion.div
                  key={tag}
                  custom={index}
                  variants={contentVariants}
                  initial={false}
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

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={galleryTransition}
                  className="overflow-hidden"
                >
                  <motion.div
                    className="mt-6 flex flex-col gap-3 border-t border-zinc-700/50 pt-4 sm:flex-row sm:justify-between"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
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

            {!isActive && !isMobile && (
              <p className="mt-auto pt-4 text-xs text-zinc-500">
                {hoverPending ? "Keep hovering to preview…" : "Click or hover ~1s to preview"}
              </p>
            )}

            {isMobile && !isActive && (
              <p className="mt-auto pt-4 text-xs text-zinc-500">Tap to preview</p>
            )}

            {isActive && !isMobile && clickedOpen && (
              <p className="mt-auto pt-4 text-xs text-zinc-500">Click again to close</p>
            )}
          </div>

          {!isMobile && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light"
              animate={{ opacity: isActive ? 0.15 : 0 }}
              transition={galleryTransition}
              style={{
                background: `radial-gradient(600px circle at ${50 + parallax.x * 25}% ${50 + parallax.y * 25}%, rgba(255,255,255,0.12), transparent 40%)`,
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.article>
  )
}
