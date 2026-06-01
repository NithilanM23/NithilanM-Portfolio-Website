"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "AI/ML Intern",
    company: "Sopra Steria India – Chennai, India",
    period: "Dec 2025 – March 2026",
    description:
      "Worked on secure enterprise-grade multimodal Retrieval-Augmented Generation (RAG) systems focused on private document intelligence workflows. Designed a fully local multimodal RAG system capable of processing PDFs containing text, tables, and images. Developed a hybrid retrieval pipeline combining semantic and keyword-based retrieval. Integrated locally hosted LLMs to ensure secure offline inference and built privacy-focused AI workflows with zero external API dependency.",
    skills: ["RAG Pipelines", "Local LLMs", "Hybrid Search", "Semantic Retrieval", "Enterprise AI"],
  },
  {
    title: "Data Science Intern",
    company: "8Queens Software Technologies Private Limited – Chennai, India",
    period: "June 2025 – July 2025",
    description:
      "Worked on data analytics, automation, dashboards, and AI chatbot solutions using both code-based and no-code tools. Built an internal chatbot using Flowise and Pinecone by scraping company website data and deploying LLM-powered responses. Automated preprocessing and reporting workflows, analyzed client datasets to identify trends, and developed dashboards using Power BI.",
    skills: ["Flowise", "Pinecone", "Web Scraping", "Power BI", "Data Analytics"],
  },
]

export function CinematicTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    gsap.registerPlugin(ScrollTrigger)

    const line = lineRef.current
    const dots = dotsRef.current
    const cards = cardsRef.current

    if (!line) return

    // 1. Draw the vertical timeline line on scroll
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 25%",
          end: "bottom 75%",
          scrub: 0.5,
        },
      }
    )

    // 2. Animate each dot and its corresponding card
    dots.forEach((dot, index) => {
      if (!dot) return
      gsap.fromTo(
        dot,
        { scale: 0, backgroundColor: "#3f3f46", boxShadow: "0 0 0px rgba(249,115,22,0)" },
        {
          scale: 1,
          backgroundColor: "#f97316",
          boxShadow: "0 0 20px 4px rgba(249,115,22,0.5)",
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      )
    })

    cards.forEach((card, index) => {
      if (!card) return
      const isEven = index % 2 === 0
      
      gsap.fromTo(
        card,
        { opacity: 0, x: isEven ? 80 : -80, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
    })
  }, [])

  return (
    <div ref={containerRef} className="relative w-full py-10 px-4 md:px-0">
      
      {/* Background Central Tracking Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800/80 -translate-x-[1px] md:-translate-x-1/2" />
      
      {/* Scroll-driven Glowing Line */}
      <div
        ref={lineRef}
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500 to-amber-500 -translate-x-[1px] md:-translate-x-1/2 z-10 origin-top"
      />

      <div className="space-y-16">
        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={experience.title}
              className={`relative z-20 flex flex-col md:flex-row items-stretch ${
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Spacer / Outer side wrapper */}
              <div className="w-full md:w-1/2 hidden md:block" />

              {/* Central Glowing Connector Point */}
              <div className="absolute left-4 md:left-1/2 -translate-x-[11px] md:-translate-x-1/2 flex items-center justify-center top-6 md:top-8 z-30">
                <div
                  ref={(el) => {
                    dotsRef.current[index] = el
                  }}
                  className="w-[22px] h-[22px] rounded-full border-4 border-zinc-950 bg-zinc-700 transition-all duration-300"
                />
              </div>

              {/* Milestone Details Card */}
              <div
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                  isEven ? "md:pr-14" : "md:pl-14"
                }`}
              >
                <div className="group relative overflow-hidden rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800/60 p-6 md:p-8 transition-all duration-500 hover:border-orange-500/40 hover:shadow-[0_0_32px_-12px_rgba(249,115,22,0.2)]">
                  {/* Subtle inner hover glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

                  <div className="relative space-y-4">
                    <div>
                      <span className="inline-block text-xs font-semibold text-orange-400 tracking-wider bg-orange-950/30 border border-orange-500/20 px-3 py-1 rounded-full mb-3">
                        {experience.period}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {experience.title}
                      </h3>
                      <p className="text-sm font-medium text-zinc-400 mt-1">
                        {experience.company}
                      </p>
                    </div>

                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                      {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {experience.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-zinc-800/60 text-zinc-300 hover:bg-zinc-800 border border-zinc-700/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
