"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"

interface SmokeParticle {
  id: number
  size: number
  top: number
  left: number
  opacity: number
  duration: number
  delay: number
}

export default function Smoke({ count = 15 }: { count?: number }) {
  const [particles, setParticles] = useState<SmokeParticle[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    const baseOpacity = theme === "day" ? 0.03 : 0.05
    const smokeCount = theme === "day" ? Math.floor(count * 0.5) : count

    const newParticles = Array.from({ length: smokeCount }).map((_, index) => {
      return {
        id: index,
        size: Math.random() * 100 + 50, // Tamaño entre 50px y 150px
        top: Math.random() * 100, // Posición vertical (%)
        left: Math.random() * 100, // Posición horizontal (%)
        opacity: Math.random() * baseOpacity + baseOpacity, // Opacidad muy sutil
        duration: Math.random() * 15 + 20, // Duración lenta entre 20s y 35s
        delay: Math.random() * 10, // Retraso aleatorio
      }
    })

    setParticles(newParticles)
  }, [count, theme])

  const smokeColor = theme === "day" ? "#d4a574" : "#e67e51"

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            backgroundColor: smokeColor,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}
