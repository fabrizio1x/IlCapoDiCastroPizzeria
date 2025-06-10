"use client"

import { Sun, Moon, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { useState } from "react"

export default function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme()
  const [isClicked, setIsClicked] = useState(false)

  const handleToggle = () => {
    setIsClicked(true)
    toggleTheme()

    // Reset click animation
    setTimeout(() => {
      setIsClicked(false)
    }, 300)
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={isTransitioning}
      variant="outline"
      size="sm"
      className={`fixed top-6 right-6 z-50 border-2 transition-all duration-300 rounded-full w-14 h-14 p-0 ${
        isTransitioning ? "animate-spin scale-110 shadow-2xl" : isClicked ? "scale-125 rotate-180" : "hover:scale-110"
      }`}
      style={{
        backgroundColor: isTransitioning ? (theme === "day" ? "#ff8c00" : "#ff3300") : "var(--bg-secondary)",
        borderColor: isTransitioning ? (theme === "day" ? "#ffa500" : "#ff5500") : "var(--border-primary)",
        color: "var(--text-primary)",
        boxShadow: isTransitioning ? `0 0 20px ${theme === "day" ? "#ff8c00" : "#ff3300"}` : "none",
      }}
    >
      {isTransitioning ? (
        <Zap className="w-6 h-6 animate-pulse" />
      ) : theme === "day" ? (
        <Moon className="w-5 h-5 transition-transform duration-300" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-300" />
      )}
      <span className="sr-only">
        {isTransitioning ? "Cambiando tema..." : `Cambiar a modo ${theme === "day" ? "nocturno" : "diurno"}`}
      </span>
    </Button>
  )
}
