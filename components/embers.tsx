"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"

interface Ember {
  id: number
  size: number
  top: number
  left: number
  delay: number
  duration: number
  opacity: number
  color: string
}

export default function Embers({ count = 50 }: { count?: number }) {
  const [embers, setEmbers] = useState<Ember[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    // Colores de brasas según el tema
    const dayEmberColors = ["#ff9500", "#ff7b00", "#ff6600", "#ff5500", "#e64500"]
    const nightEmberColors = ["#ff7b00", "#ff5500", "#ff3300", "#ff0000", "#cc0000"]

    const emberColors = theme === "day" ? dayEmberColors : nightEmberColors
    const baseOpacity = theme === "day" ? 0.3 : 0.6
    const emberCount = theme === "day" ? Math.floor(count * 0.7) : count

    // Crear brasas con propiedades aleatorias
    const newEmbers = Array.from({ length: emberCount }).map((_, index) => {
      return {
        id: index,
        size: Math.random() * 6 + 2, // Tamaño entre 2px y 8px
        top: Math.random() * 100, // Posición vertical (%)
        left: Math.random() * 100, // Posición horizontal (%)
        delay: Math.random() * 5, // Retraso de animación aleatorio
        duration: Math.random() * 3 + 2, // Duración de animación entre 2s y 5s
        opacity: Math.random() * 0.4 + baseOpacity, // Opacidad variable según tema
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
      }
    })

    setEmbers(newEmbers)
  }, [count, theme])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute rounded-full animate-pulse"
          style={{
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            top: `${ember.top}%`,
            left: `${ember.left}%`,
            backgroundColor: ember.color,
            boxShadow: `0 0 ${ember.size * 2}px ${ember.color}`,
            opacity: ember.opacity,
            animationDuration: `${ember.duration}s`,
            animationDelay: `${ember.delay}s`,
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  )
}
