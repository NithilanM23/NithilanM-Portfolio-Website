/** Shared motion presets — tweak durations/easing for site-wide feel */
export const EASE = {
  luxury: [0.22, 1, 0.36, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
}

export const DURATION = {
  fast: 0.25,
  medium: 0.45,
  slow: 0.65,
  reveal: 0.8,
}

export const spring = {
  soft: { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.8 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 32, mass: 0.6 },
  /** Project card gallery expand / collapse */
  galleryOpen: { type: "spring" as const, stiffness: 180, damping: 24, mass: 0.85 },
  galleryClose: { type: "spring" as const, stiffness: 200, damping: 28, mass: 0.95 },
}

/** Hover dwell before project preview opens (ms) */
export const PROJECT_HOVER_DELAY_MS = 1200

export const stagger = {
  container: { staggerChildren: 0.06, delayChildren: 0.08 },
  gallery: { staggerChildren: 0.1, delayChildren: 0.12 },
}
