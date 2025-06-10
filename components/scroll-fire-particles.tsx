"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "@/contexts/theme-context"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  life: number
  maxLife: number
  color: string
}

export default function ScrollFireParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const { theme } = useTheme()
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  // Colores según el tema
  const getColors = () => {
    return theme === "day"
      ? ["#ff9500", "#ff7b00", "#ff6600", "#ff5500", "#e64500"]
      : ["#ff7b00", "#ff5500", "#ff3300", "#ff0000", "#cc0000"]
  }

  // Detectar scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = Math.abs(currentScrollY - scrollPosition)

      // Solo crear partículas si el scroll es significativo
      if (scrollDelta > 15) {
        setIsScrolling(true)
        createParticlesOnScroll(scrollDelta)
        setScrollPosition(currentScrollY)

        // Resetear el timeout cada vez que se hace scroll
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false)
        }, 200)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [scrollPosition])

  // Crear partículas basadas en la intensidad del scroll
  const createParticlesOnScroll = (scrollDelta: number) => {
    const colors = getColors()
    const particleCount = Math.min(Math.floor(scrollDelta / 10), 8) // Máximo 8 partículas por evento

    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      // Posición aleatoria en los bordes de la pantalla
      const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
      let x, y

      switch (side) {
        case 0: // top
          x = Math.random() * window.innerWidth
          y = -20
          break
        case 1: // right
          x = window.innerWidth + 20
          y = Math.random() * window.innerHeight
          break
        case 2: // bottom
          x = Math.random() * window.innerWidth
          y = window.innerHeight + 20
          break
        default: // left
          x = -20
          y = Math.random() * window.innerHeight
          break
      }

      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3 - 1, // Tendencia a subir
        life: 100,
        maxLife: 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setParticles((prev) => [...prev, ...newParticles])
  }

  // Animación de partículas
  const animate = (time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time
    }

    const deltaTime = time - previousTimeRef.current
    previousTimeRef.current = time

    setParticles((prevParticles) =>
      prevParticles
        .map((p) => ({
          ...p,
          x: p.x + p.speedX,
          y: p.y + p.speedY,
          speedY: p.speedY - 0.01, // Simular que suben (como el fuego)
          life: p.life - 1,
        }))
        .filter(
          (p) => p.life > 0 && p.x > -50 && p.x < window.innerWidth + 50 && p.y > -50 && p.y < window.innerHeight + 50,
        ),
    )

    requestRef.current = requestAnimationFrame(animate)
  }

  // Iniciar/detener animación
  useEffect(() => {
    if (isScrolling || particles.length > 0) {
      requestRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isScrolling, particles.length])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            opacity: particle.life / particle.maxLife,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.2s ease-out",
          }}
        />
      ))}
    </div>
  )
}
