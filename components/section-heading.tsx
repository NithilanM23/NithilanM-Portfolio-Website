"use client"

import { motion } from "framer-motion"

import { DURATION, EASE, stagger } from "@/lib/animation"
import { VIEWPORT } from "@/lib/viewport"

interface SectionHeadingProps {
  title: string
  subtitle: string
}

const headingVariants = {
  hidden: {
    transition: { staggerChildren: 0.06, staggerDirection: -1, delayChildren: 0 },
  },
  visible: {
    transition: { ...stagger.container, staggerDirection: 1 },
  },
}

const badgeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE.luxury },
  },
}

const titleVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.luxury },
  },
}

const lineVariant = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: DURATION.medium, ease: EASE.luxury },
  },
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      className="text-center space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={headingVariants}
    >
      <motion.div variants={badgeVariant}>
        <div className="inline-block">
          <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
            <span className="relative z-10">{subtitle}</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 animate-pulse" />
          </div>
        </div>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300"
        variants={titleVariant}
      >
        {title}
      </motion.h2>

      <motion.div
        className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-6"
        variants={lineVariant}
        style={{ originX: 0.5 }}
      />
    </motion.div>
  )
}
