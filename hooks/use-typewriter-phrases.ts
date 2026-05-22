"use client"

import { useEffect, useState } from "react"

const DEFAULT_PHRASES = ["RAG systems", "LLMs", "intelligent systems", "multimodal AI"]

type Phase = "typing" | "pause" | "deleting"

const TYPE_WORD_MS = 380
const DELETE_WORD_MS = 280
const PAUSE_MS = 2200

export function useTypewriterPhrases(
  phrases: string[] = DEFAULT_PHRASES,
  enabled = true
) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [visibleWordCount, setVisibleWordCount] = useState(0)
  const [phase, setPhase] = useState<Phase>("typing")

  const currentPhrase = phrases[phraseIndex] ?? ""
  const words = currentPhrase.split(" ").filter(Boolean)
  const displayText = words.slice(0, visibleWordCount).join(" ")

  useEffect(() => {
    if (!enabled || phrases.length === 0) return

    let timeoutId: ReturnType<typeof setTimeout>

    const schedule = (ms: number, fn: () => void) => {
      timeoutId = setTimeout(fn, ms)
    }

    if (phase === "typing") {
      if (visibleWordCount < words.length) {
        schedule(TYPE_WORD_MS, () => setVisibleWordCount((c) => c + 1))
      } else {
        schedule(PAUSE_MS, () => setPhase("deleting"))
      }
    } else if (phase === "deleting") {
      if (visibleWordCount > 0) {
        schedule(DELETE_WORD_MS, () => setVisibleWordCount((c) => c - 1))
      } else {
        schedule(0, () => {
          setPhraseIndex((i) => (i + 1) % phrases.length)
          setPhase("typing")
        })
      }
    }

    return () => clearTimeout(timeoutId)
  }, [enabled, phase, visibleWordCount, words.length, phraseIndex, phrases.length])

  return { displayText, phase }
}
