"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useActiveSection } from "@/hooks/use-active-section"
import { useMobile } from "@/hooks/use-mobile"
import { DURATION, EASE } from "@/lib/animation"

const SECTION_IDS = ["about", "experience", "research", "skills", "projects", "contact"]

const navItems = [
  { name: "About", href: "#about", id: "about" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Research", href: "#research", id: "research" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
]

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = () => {
    if (isMobile) setIsOpen(false)
  }

  const NavLink = ({ item }: { item: (typeof navItems)[0] }) => {
    const isActive = activeSection === item.id
    return (
      <Link
        href={item.href}
        className="relative px-3 py-1 text-sm font-medium transition-colors"
        onClick={handleNavClick}
      >
        {isActive && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-full bg-orange-500/20 border border-orange-500/30"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <span className={`relative z-10 ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`}>
          {item.name}
        </span>
      </Link>
    )
  }

  return (
    <>
      <motion.div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: DURATION.fast, ease: EASE.luxury }}
      >
        <div className="relative px-4 py-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur opacity-50" />

          {isMobile ? (
            <div className="relative flex items-center justify-between gap-4">
              <Link href="/" className="font-bold text-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">
                  Nithilan
                </span>
                <span className="text-white">M</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          ) : (
            <div className="relative flex items-center gap-1">
              <Link href="/" className="font-bold text-lg mr-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">
                  Nithilan
                </span>
                <span className="text-white">M</span>
              </Link>
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
              <Button
                size="sm"
                className="ml-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-500 border-0"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: DURATION.fast, ease: EASE.luxury }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-8 py-4 text-2xl font-medium transition-colors ${
                  activeSection === item.id ? "text-orange-400" : "text-white hover:text-orange-400"
                }`}
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}
            <Button className="mt-6 bg-gradient-to-r from-orange-500 to-amber-500 border-0" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </>
  )
}
