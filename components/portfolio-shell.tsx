"use client"

import { CreativeHero } from "@/components/creative-hero"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { ExperienceSection } from "@/components/experience-section"
import { FloatingNav } from "@/components/floating-nav"
import { FooterSection } from "@/components/footer-section"
import { HeroContent } from "@/components/hero-content"
import { MouseFollower } from "@/components/mouse-follower"
import { ProjectsSection } from "@/components/projects-section"
import { ResearchSection } from "@/components/research-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { SkillsSection } from "@/components/skills-section"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

export function PortfolioShell() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
        <MouseFollower />
        <ScrollProgress />
        <FloatingNav />

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div>

          <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
            <HeroContent />
            <div className="flex justify-center">
              <CreativeHero />
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
            </div>
          </div>
        </section>

        <AboutSection />
        <ExperienceSection />
        <ResearchSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <FooterSection />
      </div>
    </SmoothScrollProvider>
  )
}
