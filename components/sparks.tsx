"use client"

import { useEffect, useState } from "react"

interface Spark {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

interface SparksProps {
  active: boolean
  theme: "day" | "night"
  originX?: number
  originY?: number
}

export default function Sparks({ active, theme, originX = 50, originY = 10 }: SparksProps) {
  const [sparks, setSparks] = useState<Spark[]>([])

  useEffect(() => {
    if (!active) {
      setSparks([])
      return
    }

    // Crear chispas iniciales
    const initialSparks = Array.from({ length: 20 }).map((_, index) => ({
      id: index,
      x: originX,
      y: originY,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * -3 - 1,
      size: Math.random() * 4 + 2,
      color: theme === "day" ? "#ff8c00" : "#ff3300",
      life: 100,
      maxLife: 100,
    }))

    setSparks(initialSparks)

    // Animar chispas
    const interval = setInterval(() => {
      setSparks((prevSparks) =>
        prevSparks
          .map((spark) => ({
            ...spark,
            x: spark.x + spark.vx,
            y: spark.y + spark.vy,
            vy: spark.vy + 0.1, // Gravedad
            life: spark.life - 2,
          }))
          .filter((spark) => spark.life > 0 && spark.y < 100),
      )
    }, 50)

    // Limpiar después de 3 segundos
    const timeout = setTimeout(() => {
      setSparks([])
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [active, theme, originX, originY])

  return (
    <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden">
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute rounded-full"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            boxShadow: `0 0 ${spark.size * 2}px ${spark.color}`,
            opacity: spark.life / spark.maxLife,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
