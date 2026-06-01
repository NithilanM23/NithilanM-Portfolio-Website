"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { CreativeHero } from "@/components/creative-hero"
import { HeroContent } from "@/components/hero-content"
import { AboutStats } from "@/components/about-stats"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { MagneticButton } from "@/components/magnetic-button"
import { SectionHeading } from "@/components/section-heading"
import { StaggerChildren, StaggerItem } from "@/components/stagger-children"
import { Button } from "@/components/ui/button"
import { DURATION, EASE } from "@/lib/animation"

const paragraphs = [
  "I'm a B.Tech student specializing in Artificial Intelligence and Data Science with strong interests in Machine Learning, Deep Learning, Generative AI, and RAG systems. I focus on building practical AI systems that solve real-world problems rather than just theoretical implementations.",
  "My experience spans intelligent chatbots, multimodal RAG systems, predictive analytics, healthcare AI, and educational AI systems. I work with both code-first and no-code AI ecosystems, integrating LLMs with vector databases, APIs, and modern deployment workflows.",
  'I achieved All India Rank 5 in "Large Language Models" and All India Rank 16 in "Responsible and Safe AI Systems" (NPTEL). Currently exploring full-stack AI engineering and preparing for international research opportunities.',
]

export function HeroAboutMorph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const heroWrapperRef = useRef<HTMLDivElement>(null)
  const aboutWrapperRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    // Desktop: Pinned scroll morph
    mm.add("(min-width: 1024px)", () => {
      if (!containerRef.current) return

      // Set initial states
      gsap.set(aboutWrapperRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.96,
        pointerEvents: "none",
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1. Hero Content & scroll indicator fade out
      tl.to([heroWrapperRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        scale: 0.95,
        y: -60,
        duration: 1,
        ease: "power2.inOut",
      })

      // 2. Morph phase: About content slides and scales up
      tl.to(
        aboutWrapperRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.4"
      )

      // Dynamic background glow change on scroll
      tl.to(
        containerRef.current,
        {
          backgroundColor: "#09090b", // Transition to deeper dark shade
          duration: 1.5,
        },
        0
      )
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full lg:h-[240vh] bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 transition-colors duration-500">
      {/* Absolute floating backdrop blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply blur-3xl opacity-15 animate-blob" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-600 rounded-full mix-blend-multiply blur-3xl opacity-15 animate-blob animation-delay-4000" />
      </div>

      {/* Sticky section for Desktop */}
      <div ref={stickyRef} className="lg:sticky lg:top-0 lg:h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Desktop Wrapper layout: Hero Content */}
        <div
          ref={heroWrapperRef}
          className="container z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-0 w-full"
        >
          <HeroContent />
          <div className="flex justify-center w-full">
            <CreativeHero />
          </div>
        </div>

        {/* Desktop Wrapper layout: About Content */}
        <div
          ref={aboutWrapperRef}
          className="lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center z-10 w-full px-4 lg:px-0 py-20 lg:py-0 hidden lg:block"
        >
          <div className="container max-w-4xl">
            <SectionHeading title="About Me" subtitle="My background and journey" />
            <div className="mt-8">
              <GlassmorphicCard>
                <div className="space-y-4">
                  {paragraphs.map((text) => (
                    <p key={text.slice(0, 24)} className="text-base md:text-lg text-zinc-300 leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>

                <AboutStats />

                <div className="grid grid-cols-2 gap-4 mt-6 border-t border-zinc-800/60 pt-6">
                  <div className="space-y-0.5">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Name</div>
                    <div className="font-semibold text-zinc-200">Nithilan M</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Email</div>
                    <div className="font-semibold text-zinc-200">nithilan.am@gmail.com</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Location</div>
                    <div className="font-semibold text-zinc-200">Chennai, India</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Specialization</div>
                    <div className="font-semibold text-orange-400">AI/ML & Data Science</div>
                  </div>
                </div>

                <div className="mt-6 flex justify-start">
                  <MagneticButton>
                    <motion.a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: DURATION.fast, ease: EASE.luxury }}
                    >
                      <Button className="relative overflow-hidden bg-zinc-800 hover:bg-zinc-700 text-white group border border-zinc-700/60 px-6">
                        <span className="relative z-10">Download Resume</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </Button>
                    </motion.a>
                  </MagneticButton>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>

        {/* Scroll down mouse animation (Hero section only) */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none hidden lg:block"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1 bg-black/20 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Fallback (Standard Stack) */}
      <div className="lg:hidden block px-4 py-8 space-y-16">
        {/* About Section Mobile container */}
        <div id="about" className="pt-8">
          <SectionHeading title="About Me" subtitle="My background and journey" />
          <div className="mt-8">
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
        </div>
      </div>
    </div>
  )
}
