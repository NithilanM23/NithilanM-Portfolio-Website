"use client"

import { SectionHeading } from "@/components/section-heading"
import { SectionWrapper } from "@/components/section-wrapper"
import { CinematicTimeline } from "@/components/cinematic-timeline"

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading title="Work Experience" subtitle="My professional journey" />
      <div className="mt-16">
        <CinematicTimeline />
      </div>
    </SectionWrapper>
  )
}
