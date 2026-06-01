"use client"

import { HeroAboutMorph } from "@/components/hero-about-morph"
import { ContactSection } from "@/components/contact-section"
import { ExperienceSection } from "@/components/experience-section"
import { FloatingNav } from "@/components/floating-nav"
import { FooterSection } from "@/components/footer-section"
import { MouseFollower } from "@/components/mouse-follower"
import { ProjectsSection } from "@/components/projects-section"
import { ResearchSection } from "@/components/research-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { Skills3DGrid } from "@/components/skills-3d-grid"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

export function PortfolioShell() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-zinc-950 text-white">
        <MouseFollower />
        <ScrollProgress />
        <FloatingNav />

        {/* Morphing Hero & About Section */}
        <HeroAboutMorph />

        {/* Work Experience Section */}
        <ExperienceSection />

        {/* Research Section */}
        <ResearchSection />

        {/* 3D Skills Grid Section */}
        <Skills3DGrid />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer Section */}
        <FooterSection />
      </div>
    </SmoothScrollProvider>
  )
}
