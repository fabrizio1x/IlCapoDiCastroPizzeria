"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"

interface EmberGlowProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  intensity?: "low" | "medium" | "high"
  autoShow?: boolean // Nueva prop para controlar si se muestra automáticamente
}

export default function EmberGlow({
  position = "bottom-right",
  intensity = "medium",
  autoShow = true, // Por defecto true para mantener compatibilidad
}: EmberGlowProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Solo mostrar automáticamente si autoShow es true
    if (autoShow) {
      setIsVisible(true)
    }
  }, [autoShow])

  // Si autoShow es false y no está visible, no renderizar nada
  if (!autoShow && !isVisible) {
    return null
  }

  // Determinar tamaño y opacidad según intensidad y tema
  const getSize = () => {
    switch (intensity) {
      case "low":
        return "w-32 h-32"
      case "high":
        return "w-80 h-80"
      default:
        return "w-56 h-56"
    }
  }

  const getOpacity = () => {
    const baseOpacity = theme === "day" ? 0.1 : 0.2
    switch (intensity) {
      case "low":
        return theme === "day" ? "opacity-5" : "opacity-10"
      case "high":
        return theme === "day" ? "opacity-15" : "opacity-25"
      default:
        return theme === "day" ? "opacity-10" : "opacity-15"
    }
  }

  // Determinar posición
  const getPosition = () => {
    switch (position) {
      case "top-left":
        return "-top-16 -left-16"
      case "top-right":
        return "-top-16 -right-16"
      case "bottom-left":
        return "-bottom-16 -left-16"
      case "center":
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      default:
        return "-bottom-16 -right-16"
    }
  }

  const gradientColors = theme === "day" ? "from-[#ff9500] to-[#e64500]" : "from-[#ff5500] to-[#cc0000]"

  return (
    <div
      className={`absolute ${getPosition()} ${getSize()} rounded-full blur-3xl bg-gradient-to-br ${gradientColors} ${getOpacity()} transition-opacity duration-1000 animate-pulse ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ animationDuration: "4s" }}
    />
  )
}
