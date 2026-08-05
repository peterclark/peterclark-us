import { useEffect, useState } from "react"

/**
 * Returns the id of whichever section currently owns the top of the viewport.
 * Falls back to the first id until something intersects.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const topmost = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (topmost) setActive(topmost.target.id)
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [ids])

  return active
}
