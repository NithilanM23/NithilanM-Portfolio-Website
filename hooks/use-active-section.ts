"use client"

import { useEffect, useState } from "react"

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState("")

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio > 0.15)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return active
}
