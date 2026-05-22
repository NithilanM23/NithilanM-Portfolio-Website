"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

import { useMobile } from "@/hooks/use-mobile"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { DURATION, EASE } from "@/lib/animation"

export function CreativeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let devicePixelRatio = 1
    let animationId = 0
    let running = true

    const setCanvasDimensions = () => {
      devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    window.addEventListener("mousemove", onMouseMove)

    const onVisibility = () => {
      running = document.visibilityState === "visible"
      if (running) animate()
    }
    document.addEventListener("visibilitychange", onVisibility)

    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string
      distance: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = Math.random() * 5 + 2
        this.density = Math.random() * 30 + 1
        this.distance = 0
        const hue = Math.random() * 30 + 18
        this.color = `hsl(${hue}, 85%, 55%)`
      }

      update() {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        this.distance = Math.sqrt(dx * dx + dy * dy) || 1

        const maxDistance = 100
        const force = (maxDistance - this.distance) / maxDistance

        if (this.distance < maxDistance) {
          this.x -= (dx / this.distance) * force * this.density
          this.y -= (dy / this.distance) * force * this.density
        } else {
          this.x -= (this.x - this.baseX) / 10
          this.y -= (this.y - this.baseY) / 10
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particlesArray: Particle[] = []
    const gridSize = isMobile ? 48 : 30

    function init() {
      particlesArray.length = 0
      const canvasWidth = canvas.width / devicePixelRatio
      const canvasHeight = canvas.height / devicePixelRatio
      const numX = Math.floor(canvasWidth / gridSize)
      const numY = Math.floor(canvasHeight / gridSize)

      for (let y = 0; y < numY; y++) {
        for (let x = 0; x < numX; x++) {
          particlesArray.push(new Particle(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2))
        }
      }
    }

    init()
    window.addEventListener("resize", init)

    const connectionDist = isMobile ? 28 : 30

    const animate = () => {
      if (!running) return
      const { width: w, height: h } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, w, h)

      mouseX += (targetX - mouseX) * 0.1
      mouseY += (targetY - mouseY) * 0.1

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()

        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDist) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 140, 40, ${0.2 - distance / 150})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      running = false
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", init)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [isMobile, reduced])

  if (reduced) {
    return (
      <div className="w-full h-[400px] md:h-[500px] relative rounded-2xl bg-gradient-to-br from-orange-500/20 via-zinc-900/40 to-amber-500/15 border border-zinc-700/40" />
    )
  }

  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.slow, ease: EASE.luxury }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </motion.div>
  )
}
