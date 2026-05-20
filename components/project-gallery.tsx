"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { DURATION, EASE, stagger } from "@/lib/animation"

interface ProjectGalleryProps {
  title: string
  images: string[]
  isActive: boolean
  parallax: { x: number; y: number }
  className?: string
}

const imageReveal = {
  hidden: { opacity: 0, scale: 1.08, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE.luxury },
  },
}

export function ProjectGallery({
  title,
  images,
  isActive,
  parallax,
  className,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasImages = images.length > 0
  const safeIndex = hasImages ? Math.min(activeIndex, images.length - 1) : 0

  const layerX = parallax.x * 10
  const layerY = parallax.y * 8
  const deepX = parallax.x * 18
  const deepY = parallax.y * 14

  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-lg", className)}
      initial={false}
      animate={{ opacity: isActive ? 1 : 0.85 }}
      transition={{ duration: DURATION.medium, ease: EASE.smooth }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-zinc-700/40 bg-zinc-900/60">
        {/* Ambient glow — matches site orange/amber palette */}
        <motion.div
          className="pointer-events-none absolute -inset-4 bg-gradient-to-br from-orange-500/25 via-transparent to-amber-500/20 blur-2xl"
          animate={{ opacity: isActive ? 0.9 : 0.35 }}
          transition={{ duration: DURATION.medium }}
          style={{ transform: "translateZ(0)" }}
        />

        <AnimatePresence mode="wait">
          {hasImages ? (
            <motion.div
              key={images[safeIndex]}
              className="absolute inset-0 transform-gpu"
              variants={imageReveal}
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: DURATION.fast } }}
              style={{
                x: layerX,
                y: layerY,
              }}
            >
              <Image
                src={images[safeIndex]}
                alt={`${title} preview ${safeIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={safeIndex === 0}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: isActive ? 0.75 : 0.55 }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-800/80 via-zinc-900 to-zinc-950 transform-gpu"
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              variants={imageReveal}
              style={{ x: deepX * 0.5, y: deepY * 0.5 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(249,115,22,0.15),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(245,158,11,0.12),transparent_50%)]" />
              <ImageIcon className="relative z-10 h-10 w-10 text-orange-400/50" />
              <p className="relative z-10 px-4 text-center text-xs text-zinc-500">
                Add images in <span className="text-orange-400/80">data/projects.ts</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Parallax frame accent */}
        <motion.div
          className="pointer-events-none absolute inset-2 rounded-md border border-white/5"
          style={{ x: deepX * -0.3, y: deepY * -0.3 }}
          animate={{ opacity: isActive ? 1 : 0.4 }}
        />
      </div>

      {/* Thumbnail strip for multiple images */}
      {images.length > 1 && (
        <motion.ul
          className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          variants={{
            hidden: {},
            visible: { transition: stagger.gallery },
          }}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          {images.map((src, index) => (
            <motion.li
              key={src}
              variants={{
                hidden: { opacity: 0, y: 8, scale: 0.92 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: DURATION.medium, ease: EASE.luxury },
                },
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex(index)
                }}
                className={cn(
                  "relative block h-12 w-16 shrink-0 overflow-hidden rounded-md border transition-colors duration-300",
                  safeIndex === index
                    ? "border-orange-500/70 ring-1 ring-orange-500/30"
                    : "border-zinc-700/50 opacity-70 hover:opacity-100"
                )}
                aria-label={`Show image ${index + 1}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="64px" />
              </button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  )
}
