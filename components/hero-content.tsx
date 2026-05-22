"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { TypewriterPhrases } from "@/components/typewriter-phrases"
import { DURATION, EASE, stagger } from "@/lib/animation"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const line = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.luxury },
  },
}

export function HeroContent() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: stagger.container } }}
    >
      <motion.div variants={line}>
        <div className="inline-block">
          <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 mt-4">
            <span className="relative z-10">AI/ML Engineer & Data Scientist</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 animate-pulse" />
          </div>
        </div>
      </motion.div>

      <div className="text-5xl md:text-7xl font-bold tracking-tight">
        <motion.span className="block" variants={line}>
          Hi, I&apos;m
        </motion.span>
        <motion.span
          className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600 block"
          variants={line}
        >
          Nithilan M
        </motion.span>
      </div>

      <motion.p className="text-xl text-zinc-400 max-w-[600px]" variants={line}>
        B.Tech AI/DS student building practical AI systems that solve real-world problems.
        Specializing in <TypewriterPhrases enabled={!reduced} />.
      </motion.p>

      <motion.div className="flex flex-wrap gap-4 pt-4" variants={line}>
        <MagneticButton>
          <a href="/#projects">
            <Button className="relative overflow-hidden group bg-gradient-to-r from-orange-500 to-amber-500 border-0">
              <span className="relative z-10 flex items-center">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </a>
        </MagneticButton>
        <MagneticButton>
          <a href="#contact">
            <Button
              variant="outline"
              className="border-zinc-700 text-orange-400 hover:text-orange-500 hover:border-zinc-500"
            >
              Contact Me
            </Button>
          </a>
        </MagneticButton>
      </motion.div>

      <motion.div className="flex gap-4 pt-4" variants={line}>
        <Link href="https://github.com/NithilanM23" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-transform hover:scale-110"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
        </Link>
        <Link href="https://linkedin.com/in/nithilanm23/" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-transform hover:scale-110"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Button>
        </Link>
        <Link href="mailto:nithilan.am@gmail.com">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-transform hover:scale-110"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
