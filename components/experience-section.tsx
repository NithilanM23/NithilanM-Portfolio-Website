"use client"

import { SectionHeading } from "@/components/section-heading"
import { SectionWrapper } from "@/components/section-wrapper"
import { Timeline } from "@/components/timeline"

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading title="Work Experience" subtitle="My professional journey" />
      <div className="mt-16">
        <Timeline />
      </div>
    </SectionWrapper>
  )
}
