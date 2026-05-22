"use client"

import { motion } from "framer-motion"

import { AboutStats } from "@/components/about-stats"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { MagneticButton } from "@/components/magnetic-button"
import { SectionHeading } from "@/components/section-heading"
import { SectionWrapper } from "@/components/section-wrapper"
import { StaggerChildren, StaggerItem } from "@/components/stagger-children"
import { Button } from "@/components/ui/button"
import { DURATION, EASE } from "@/lib/animation"

const paragraphs = [
  "I'm a B.Tech student specializing in Artificial Intelligence and Data Science with strong interests in Machine Learning, Deep Learning, Generative AI, and RAG systems. I focus on building practical AI systems that solve real-world problems rather than just theoretical implementations.",
  "My experience spans intelligent chatbots, multimodal RAG systems, predictive analytics, healthcare AI, and educational AI systems. I work with both code-first and no-code AI ecosystems, integrating LLMs with vector databases, APIs, and modern deployment workflows.",
  'I achieved All India Rank 5 in "Large Language Models" and All India Rank 16 in "Responsible and Safe AI Systems" (NPTEL). Currently exploring full-stack AI engineering and preparing for international research opportunities.',
]

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading title="About Me" subtitle="My background and journey" />

      <div className="mt-16">
        <GlassmorphicCard>
          <StaggerChildren className="space-y-4">
            {paragraphs.map((text) => (
              <StaggerItem key={text.slice(0, 24)} as="p" className="text-lg text-zinc-300">
                {text}
              </StaggerItem>
            ))}
          </StaggerChildren>

          <AboutStats />

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="space-y-1">
              <div className="text-sm text-zinc-500">Name</div>
              <div className="font-medium">Nithilan M</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-zinc-500">Email</div>
              <div className="font-medium">nithilan.am@gmail.com</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-zinc-500">Location</div>
              <div className="font-medium">Chennai, India</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-zinc-500">Specialization</div>
              <div className="font-medium text-orange-400">AI/ML & Data Science</div>
            </div>
          </div>

          <div className="mt-8">
            <MagneticButton>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: DURATION.fast, ease: EASE.luxury }}
              >
                <Button className="relative overflow-hidden bg-zinc-800 hover:bg-zinc-700 text-white group">
                  <span className="relative z-10">Download Resume</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </motion.a>
            </MagneticButton>
          </div>
        </GlassmorphicCard>
      </div>
    </SectionWrapper>
  )
}
