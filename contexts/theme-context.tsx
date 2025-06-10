"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "night"

interface ThemeContextType {
  theme: Theme
  isTransitioning: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>("night")
  const [isTransitioning] = useState(false)

  useEffect(() => {
    // Aplicar tema nocturno al documento
    document.documentElement.setAttribute("data-theme", "night")
  }, [])

  return <ThemeContext.Provider value={{ theme, isTransitioning }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
