"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

import { DURATION, EASE } from "@/lib/animation"
import { VIEWPORT } from "@/lib/viewport"

type BlobConfig = {
  className: string
  parallax?: number
}

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  blobs?: BlobConfig[]
}

function ParallaxBlob({ className, parallax = 0.15 }: { className: string; parallax?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const amount = 48 * parallax
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, willChange: "transform" }}
      aria-hidden
    />
  )
}

const defaultBlobs: BlobConfig[] = [
  {
    className:
      "absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply blur-3xl opacity-10",
    parallax: 0.12,
  },
  {
    className:
      "absolute bottom-1/3 left-1/3 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply blur-3xl opacity-10",
    parallax: 0.18,
  },
]

export function SectionWrapper({
  id,
  children,
  className = "py-32 relative",
  blobs = defaultBlobs,
}: SectionWrapperProps) {
  return (
    <section id={id} className={className}>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {blobs.map((blob, i) => (
          <ParallaxBlob key={i} className={blob.className} parallax={blob.parallax ?? 0.15} />
        ))}
      </div>

      <motion.div
        className="container relative z-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.slow, ease: EASE.luxury }}
        viewport={VIEWPORT}
      >
        {children}
      </motion.div>
    </section>
  )
}
