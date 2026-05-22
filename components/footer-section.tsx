"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DURATION, EASE } from "@/lib/animation"
import { VIEWPORT } from "@/lib/viewport"

const socials = [
  { href: "https://github.com/NithilanM23", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/nithilanm23", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:nithilan.am@gmail.com", icon: Mail, label: "Email" },
]

export function FooterSection() {
  return (
    <motion.footer
      className="border-t border-zinc-800 py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE.luxury }}
      viewport={VIEWPORT}
    >
      <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Link href="/" className="font-bold text-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">
              Nithilan
            </span>
            <span className="text-white">M</span>
          </Link>
          <p className="text-sm text-zinc-500 mt-2">
            © {new Date().getFullYear()} Nithilan M. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.12, y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Button>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
