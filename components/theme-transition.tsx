"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/contexts/theme-context"

interface TransitionParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

export default function ThemeTransition() {
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [particles, setParticles] = useState<TransitionParticle[]>([])
  const [rippleActive, setRippleActive] = useState(false)

  useEffect(() => {
    // Activar animación de transición cuando cambia el tema
    setIsTransitioning(true)
    setRippleActive(true)

    // Crear partículas de transición
    const newParticles = Array.from({ length: 30 }).map((_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      color: theme === "day" ? "#ff8c00" : "#ff3300",
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 0.5,
    }))

    setParticles(newParticles)

    // Limpiar animaciones después de completarse
    const timer = setTimeout(() => {
      setIsTransitioning(false)
      setRippleActive(false)
      setParticles([])
    }, 3000)

    return () => clearTimeout(timer)
  }, [theme])

  if (!isTransitioning) return null

  return (
    <>
      {/* Efecto de ondas expansivas */}
      {rippleActive && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          <div
            className="absolute top-6 right-6 rounded-full animate-ping"
            style={{
              width: "3000px",
              height: "3000px",
              background: `radial-gradient(circle, ${
                theme === "day" ? "rgba(255, 140, 0, 0.1)" : "rgba(255, 51, 0, 0.1)"
              } 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              animationDuration: "2s",
              animationIterationCount: "1",
            }}
          />
          <div
            className="absolute top-6 right-6 rounded-full animate-ping"
            style={{
              width: "2000px",
              height: "2000px",
              background: `radial-gradient(circle, ${
                theme === "day" ? "rgba(255, 165, 0, 0.15)" : "rgba(255, 0, 0, 0.15)"
              } 0%, transparent 60%)`,
              transform: "translate(-50%, -50%)",
              animationDuration: "1.5s",
              animationDelay: "0.2s",
              animationIterationCount: "1",
            }}
          />
        </div>
      )}

      {/* Partículas de transición */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-bounce"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              animationIterationCount: "1",
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Cortina de transición */}
      <div
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: `linear-gradient(45deg, ${
            theme === "day"
              ? "rgba(255, 140, 0, 0.1), rgba(255, 165, 0, 0.05)"
              : "rgba(255, 51, 0, 0.1), rgba(204, 0, 0, 0.05)"
          })`,
          animation: "curtainSweep 2s ease-in-out forwards",
        }}
      />
    </>
  )
}
