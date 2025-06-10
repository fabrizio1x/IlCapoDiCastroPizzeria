"use client"

import { useState, useEffect } from "react"
import { getAllPizzas, getPizzasByCategory, testFirebaseConnection } from "@/services/pizzaService"
import type { Pizza } from "@/types/pizza"

export function usePizzas() {
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnectedToFirebase, setIsConnectedToFirebase] = useState(false)

  useEffect(() => {
    async function fetchPizzas() {
      try {
        setLoading(true)
        setError(null)

        // Probar conexión con Firebase
        const firebaseConnected = await testFirebaseConnection()
        setIsConnectedToFirebase(firebaseConnected)

        if (firebaseConnected) {
          console.log("🔥 Conectado a Firebase - Cargando pizzas...")
        } else {
          console.log("📱 Modo offline - Usando datos locales...")
        }

        const fetchedPizzas = await getAllPizzas()
        setPizzas(fetchedPizzas)

        console.log(`✅ ${fetchedPizzas.length} pizzas cargadas`)
      } catch (err) {
        setError("Error al cargar las pizzas")
        console.error("Error fetching pizzas:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPizzas()
  }, [])

  const premiumPizzas = pizzas.filter((pizza) => pizza.category === "premium")
  const signaturePizzas = pizzas.filter((pizza) => pizza.category === "signature")

  console.log("Pizzas obtenidas desde Firebase:", { premiumPizzas, signaturePizzas });

  return {
    pizzas,
    premiumPizzas,
    signaturePizzas,
    loading,
    error,
    isConnectedToFirebase,
    usingFallback: !isConnectedToFirebase,
    refetch: async () => {
      setLoading(true)
      const firebaseConnected = await testFirebaseConnection()
      setIsConnectedToFirebase(firebaseConnected)
      const fetchedPizzas = await getAllPizzas()
      setPizzas(fetchedPizzas)
      setLoading(false)
    },
  }
}

export function usePizzasByCategory(category: "signature" | "premium") {
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPizzas() {
      try {
        setLoading(true)
        const fetchedPizzas = await getPizzasByCategory(category)
        setPizzas(fetchedPizzas)
        setError(null)
      } catch (err) {
        setError("Error al cargar las pizzas")
        console.error("Error fetching pizzas by category:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPizzas()
  }, [category])

  return {
    pizzas,
    loading,
    error,
    refetch: async () => {
      const fetchedPizzas = await getPizzasByCategory(category)
      setPizzas(fetchedPizzas)
    },
  }
}
