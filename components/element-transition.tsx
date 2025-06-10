"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"

interface ElementTransitionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function ElementTransition({ children, delay = 0, className = "" }: ElementTransitionProps) {
  const { theme, isTransitioning } = useTheme()
  const [animationClass, setAnimationClass] = useState("")

  useEffect(() => {
    if (isTransitioning) {
      // Iniciar animación con delay
      setTimeout(() => {
        setAnimationClass("animate-pulse scale-105")
      }, delay)

      // Limpiar animación
      setTimeout(() => {
        setAnimationClass("")
      }, 1000 + delay)
    }
  }, [isTransitioning, delay])

  return (
    <div
      className={`transition-all duration-500 ${animationClass} ${className}`}
      style={{
        filter: isTransitioning ? `hue-rotate(${theme === "day" ? "20deg" : "-20deg"})` : "none",
      }}
    >
      {children}
    </div>
  )
}
