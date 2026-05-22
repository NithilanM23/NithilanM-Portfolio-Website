"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { DURATION, EASE } from "@/lib/animation"
import { VIEWPORT } from "@/lib/viewport"

const COLORS = [
  "rgba(249, 115, 22, 0.35)",
  "rgba(251, 191, 36, 0.3)",
  "rgba(234, 88, 12, 0.25)",
  "rgba(253, 186, 116, 0.2)",
]

interface Blob {
  x: number
  y: number
  radius: number
  phaseX: number
  phaseY: number
  speedX: number
  speedY: number
  color: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export function ContactVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const reduced = useReducedMotion()
  const reducedMotionRef = useRef(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 }
  }, [])

  useEffect(() => {
    reducedMotionRef.current = reduced
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0
    let dpr = 1

    const blobs: Blob[] = COLORS.map((color, i) => ({
      x: 0,
      y: 0,
      radius: 80 + i * 25,
      phaseX: i * 1.2,
      phaseY: i * 0.9,
      speedX: 0.4 + i * 0.08,
      speedY: 0.35 + i * 0.1,
      color,
    }))

    const particles: Particle[] = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.003,
      vy: (Math.random() - 0.5) * 0.003,
      size: Math.random() * 2 + 1,
    }))

    let time = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      time += reducedMotionRef.current ? 0 : 0.008

      // Flowing gradient blobs
      for (const blob of blobs) {
        const bx =
          width * (0.35 + 0.25 * Math.sin(time * blob.speedX + blob.phaseX)) +
          (mouseRef.current.x > 0 ? (mouseRef.current.x - width / 2) * 0.03 : 0)
        const by =
          height * (0.4 + 0.2 * Math.cos(time * blob.speedY + blob.phaseY)) +
          (mouseRef.current.y > 0 ? (mouseRef.current.y - height / 2) * 0.03 : 0)

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, blob.radius)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(bx, by, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Particle field with connections
      const px = particles.map((p) => {
        if (!reducedMotionRef.current) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > 1) p.vx *= -1
          if (p.y < 0 || p.y > 1) p.vy *= -1

          const mx = mouseRef.current.x
          const my = mouseRef.current.y
          if (mx > 0) {
            const dx = p.x * width - mx
            const dy = p.y * height - my
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 120 && dist > 0) {
              p.vx += (dx / dist) * 0.00015
              p.vy += (dy / dist) * 0.00015
            }
          }
          p.vx *= 0.999
          p.vy *= 0.999
        }
        return { x: p.x * width, y: p.y * height, size: p.size }
      })

      for (let i = 0; i < px.length; i++) {
        for (let j = i + 1; j < px.length; j++) {
          const dx = px[i].x - px[j].x
          const dy = px[i].y - px[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.15 * (1 - dist / 100)})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(px[i].x, px[i].y)
            ctx.lineTo(px[j].x, px[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of px) {
        ctx.fillStyle = "rgba(251, 191, 36, 0.6)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Central hub ring
      const cx = width / 2
      const cy = height / 2
      const hubPulse = reducedMotionRef.current ? 1 : 1 + 0.08 * Math.sin(time * 2)
      ctx.strokeStyle = "rgba(249, 115, 22, 0.25)"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(cx, cy, 48 * hubPulse, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(cx, cy, 72 * hubPulse, 0, Math.PI * 2)
      ctx.stroke()

      const hubGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32)
      hubGrad.addColorStop(0, "rgba(249, 115, 22, 0.4)")
      hubGrad.addColorStop(1, "transparent")
      ctx.fillStyle = hubGrad
      ctx.beginPath()
      ctx.arc(cx, cy, 32, 0, Math.PI * 2)
      ctx.fill()

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [reduced])

  if (reduced) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.slow, ease: EASE.luxury }}
        viewport={VIEWPORT}
        className="h-full min-h-[420px] rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/10 border border-zinc-700/50 flex items-end justify-center pb-8"
      >
        <p className="text-sm text-zinc-500">Reach out via the links — always listening</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE.luxury }}
      viewport={VIEWPORT}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 hover:border-orange-500/50 h-full min-h-[420px]">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl blur opacity-25 hover:opacity-60 transition duration-1000" />

        <div className="relative h-full min-h-[420px]">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />

          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-8 px-6">
            <motion.p
              className="text-sm font-medium tracking-widest uppercase text-orange-400/80"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Neural flux
            </motion.p>
            <p className="text-xs text-zinc-500 mt-1 text-center">Reach out via the links — always listening</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
