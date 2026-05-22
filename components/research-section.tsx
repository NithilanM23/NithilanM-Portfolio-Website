"use client"

import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { ResearchStats } from "@/components/research-stats"
import { SectionHeading } from "@/components/section-heading"
import { SectionWrapper } from "@/components/section-wrapper"
import { StaggerChildren, StaggerItem } from "@/components/stagger-children"

const contributions = [
  "Implemented the complete end-to-end pipeline in PyTorch",
  "Engineered a custom gating mechanism to reduce reconstruction over-smoothing",
  "Worked on defect localization and semantic consistency optimization",
]

export function ResearchSection() {
  return (
    <SectionWrapper
      id="research"
      blobs={[
        {
          className:
            "absolute top-1/4 right-1/4 w-72 h-64 bg-orange-500 rounded-full mix-blend-multiply blur-3xl opacity-10",
          parallax: 0.14,
        },
        {
          className:
            "absolute bottom-1/4 left-1/4 w-64 h-72 bg-amber-600 rounded-full mix-blend-multiply blur-3xl opacity-10",
          parallax: 0.2,
        },
      ]}
    >
      <SectionHeading title="Research" subtitle="My research contributions" />

      <div className="mt-16">
        <GlassmorphicCard>
          <div className="space-y-8">
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-bold mb-2">
                RGAE-PNNR: Unsupervised Visual Anomaly Detection
              </h3>
              <p className="text-orange-400 font-medium mb-2">
                Revised Draft submitted at Springer Nature
              </p>
              <p className="text-zinc-400 mb-4">Aug 2025 – Jan 2026</p>

              <p className="text-zinc-300 mb-4">
                Co-developed a lightweight hybrid anomaly detection framework combining
                Residual Gated AutoEncoder (RGAE) and Patchwise Nearest Neighbor
                Reconstruction (PNNR).
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Key Contributions:</h4>
                <StaggerChildren as="ul" className="space-y-2 text-zinc-300">
                  {contributions.map((item) => (
                    <StaggerItem key={item} as="li" className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{item}</span>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Performance Results:</h4>
                <ResearchStats />
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Benchmarks Evaluated:</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-orange-500/20 rounded-full text-sm text-orange-300">
                    MVTec AD Benchmark
                  </div>
                  <div className="px-3 py-1 bg-orange-500/20 rounded-full text-sm text-orange-300">
                    VisA Benchmark
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Research Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Computer Vision",
                    "Visual Anomaly Detection",
                    "AutoEncoders",
                    "Lightweight Deep Learning",
                  ].map((area) => (
                    <div
                      key={area}
                      className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300"
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </SectionWrapper>
  )
}
