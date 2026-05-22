"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

import { ContactVisual } from "@/components/contact-visual"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { SectionHeading } from "@/components/section-heading"
import { SectionWrapper } from "@/components/section-wrapper"
import { DURATION, EASE } from "@/lib/animation"

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "nithilan.am@gmail.com",
    href: "mailto:nithilan.am@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/nithilanm23",
    href: "https://www.linkedin.com/in/nithilanm23",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/NithilanM23",
    href: "https://github.com/NithilanM23",
  },
]

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading title="Get In Touch" subtitle="Let's work together" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
        <GlassmorphicCard>
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          <div className="space-y-4">
            {links.map((item) => (
              <Link key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="flex items-center gap-4 rounded-lg p-2 -mx-2 group"
                  whileHover={{ x: 6 }}
                  transition={{ duration: DURATION.fast, ease: EASE.luxury }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <item.icon className="h-5 w-5 text-orange-400" />
                  </motion.div>
                  <div>
                    <div className="text-sm text-zinc-500">{item.label}</div>
                    <div className="font-medium group-hover:text-orange-300 transition-colors">
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-800">
            <h4 className="text-lg font-medium mb-4">Current Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span>Available for AI/ML internships and research collaborations</span>
            </div>
          </div>
        </GlassmorphicCard>

        <ContactVisual />
      </div>
    </SectionWrapper>
  )
}
