import { useCallback, useEffect, useState } from "react"

export type Theme = "light" | "dark" | "system"

const KEY = "theme"

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function apply(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && systemPrefersDark())
  document.documentElement.classList.toggle("dark", dark)
}

function stored(): Theme {
  const value = localStorage.getItem(KEY)
  return value === "light" || value === "dark" ? value : "system"
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === "undefined" ? "system" : stored(),
  )

  useEffect(() => {
    apply(theme)
    if (theme === "system") localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, theme)
  }, [theme])

  // Track the OS preference only while we're deferring to it.
  useEffect(() => {
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => apply("system")
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [theme])

  const toggle = useCallback(() => {
    setThemeState((current) => {
      const isDark =
        current === "dark" || (current === "system" && systemPrefersDark())
      return isDark ? "light" : "dark"
    })
  }, [])

  return { theme, setTheme: setThemeState, toggle }
}
