"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

import { DURATION, EASE, stagger } from "@/lib/animation"
import { VIEWPORT } from "@/lib/viewport"

const item = {
  hidden: {
    opacity: 0,
    y: 14,
    transition: { duration: DURATION.medium, ease: EASE.luxury },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE.luxury },
  },
}

const containerVariants = {
  hidden: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
  visible: {
    transition: stagger.container,
  },
}

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  as?: "div" | "ul"
}

export function StaggerChildren({ children, className, as = "div" }: StaggerChildrenProps) {
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={containerVariants}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "li" | "p"
}) {
  const Component = motion[as]
  return (
    <Component variants={item} className={className}>
      {children}
    </Component>
  )
}
