"use client"

import { useTypewriterPhrases } from "@/hooks/use-typewriter-phrases"
import { cn } from "@/lib/utils"

const PHRASES = ["RAG systems", "LLMs", "intelligent systems", "multimodal AI"]

interface TypewriterPhrasesProps {
  className?: string
  staticFallback?: string
  enabled?: boolean
}

export function TypewriterPhrases({
  className,
  staticFallback = "RAG, LLMs, and intelligent systems",
  enabled = true,
}: TypewriterPhrasesProps) {
  const { displayText, phase } = useTypewriterPhrases(PHRASES, enabled)

  if (!enabled) {
    return <span className={className}>{staticFallback}</span>
  }

  return (
    <span
      className={cn("text-orange-400 font-medium inline-flex items-baseline", className)}
      aria-live="polite"
    >
      <span className="inline-block min-w-[18ch] md:min-w-[20ch]">{displayText || "\u00A0"}</span>
      <span
        className={cn(
          "ml-0.5 inline-block w-[2px] h-[1em] bg-orange-400 align-middle",
          phase === "pause" ? "opacity-80" : "animate-pulse"
        )}
        aria-hidden
      />
    </span>
  )
}
