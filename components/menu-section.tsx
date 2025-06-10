"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, Star, Leaf, Fish, Mountain, TreePine, Loader2, Wifi, WifiOff } from "lucide-react"
import Image from "next/image"
import ElementTransition from "./element-transition"
import { useCart } from "@/contexts/cart-context"
import { usePizzas } from "@/hooks/usePizzas"
import type { Pizza } from "@/types/pizza"

// Mapeo de iconos
const iconMap = {
  Fish,
  Star,
  Leaf,
  Mountain,
  TreePine,
  Flame,
} as const

export default function MenuSection() {
  const { addItem } = useCart()
  const { premiumPizzas, signaturePizzas, loading, error, isConnectedToFirebase, refetch } = usePizzas()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Star
  }

  const PizzaCard = ({ pizza, index }: { pizza: Pizza; index: number }) => {
    const IconComponent = getIcon(pizza.icon)

    return (
      <ElementTransition delay={index * 100}>
        <Card
          className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 theme-transition-element group"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-primary)",
          }}
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={pizza.imageUrl || "/placeholder.svg?height=300&width=400"}
              alt={pizza.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <Badge
              className="absolute top-4 left-4 font-bold px-3 py-1 text-sm rounded-full shadow-lg"
              style={{
                backgroundColor: pizza.category === "premium" ? "var(--accent-primary)" : "var(--bg-hover)",
                color: "var(--text-primary)",
              }}
            >
              {pizza.badge}
            </Badge>
            <div className="absolute top-4 right-4">
              <IconComponent
                className="w-8 h-8 p-1.5 rounded-full shadow-lg"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--accent-primary)",
                }}
              />
            </div>
            <div className="absolute bottom-4 right-4">
              <div
                className="px-4 py-2 rounded-full font-bold text-xl shadow-lg"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                {formatPrice(pizza.price)}
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <h3
              className="text-2xl font-bold mb-3 font-serif theme-transition-element"
              style={{ color: "var(--text-primary)" }}
            >
              {pizza.name}
            </h3>
            <p className="text-sm mb-4 font-medium theme-transition-element" style={{ color: "var(--text-accent)" }}>
              {pizza.ingredients}
            </p>
            <p
              className="mb-6 text-base leading-relaxed theme-transition-element"
              style={{ color: "var(--text-secondary)" }}
            >
              {pizza.description}
            </p>
            <Button
              onClick={() =>
                addItem({
                  id: pizza.id,
                  name: pizza.name,
                  price: pizza.price,
                  ingredients: pizza.ingredients,
                  image: pizza.imageUrl || "/placeholder.svg?height=300&width=400",
                  category: pizza.category,
                })
              }
              className="w-full font-bold py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 theme-transition-element"
              style={{
                backgroundColor: "var(--bg-hover)",
                color: "var(--text-primary)",
              }}
            >
              🛒 Agregar al Carrito
            </Button>
          </CardContent>
        </Card>
      </ElementTransition>
    )
  }

  // Loading state
  if (loading) {
    return (
      <section
        id="menu"
        className="py-24 relative theme-transition-element"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-8" style={{ color: "var(--accent-primary)" }} />
            <h2 className="text-4xl font-bold mb-4 font-serif" style={{ color: "var(--text-primary)" }}>
              Encendiendo el horno...
            </h2>
            <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
              Cargando nuestras deliciosas pizzas artesanales
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section
        id="menu"
        className="py-24 relative theme-transition-element"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Flame className="w-16 h-16 mx-auto mb-8" style={{ color: "var(--accent-primary)" }} />
            <h2 className="text-4xl font-bold mb-4 font-serif" style={{ color: "var(--text-primary)" }}>
              ¡Ups! Algo salió mal
            </h2>
            <p className="text-xl mb-8" style={{ color: "var(--text-secondary)" }}>
              No pudimos cargar el menú. Por favor, intenta nuevamente.
            </p>
            <Button
              onClick={refetch}
              className="px-8 py-4 text-xl font-bold rounded-full shadow-lg"
              style={{
                backgroundColor: "var(--accent-primary)",
                color: "var(--bg-primary)",
              }}
            >
              🔄 Reintentar
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (!premiumPizzas || !signaturePizzas) {
    console.error("Las variables premiumPizzas o signaturePizzas no están inicializadas correctamente.");
    return null;
  }

  return (
    <section
      id="menu"
      className="py-24 relative theme-transition-element"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="container mx-auto px-4">
        {/* Header del Menú */}
        <ElementTransition delay={0}>
          <div className="text-center mb-20">
            <h2
              className="text-6xl font-bold mb-8 font-serif theme-transition-element"
              style={{ color: "var(--text-primary)" }}
            >
              Nuestro Menú Artesanal
            </h2>
            <p className="text-3xl font-light mb-8 theme-transition-element" style={{ color: "var(--text-secondary)" }}>
              Cada pizza, una historia del fuego
            </p>
            <div className="flex items-center justify-center">
              <div
                className="h-2 w-32 mr-6 rounded-full theme-transition-element"
                style={{ background: `linear-gradient(to right, var(--border-secondary), var(--border-primary))` }}
              ></div>
              <Flame className="w-8 h-8 theme-transition-element" style={{ color: "var(--accent-primary)" }} />
              <div
                className="h-2 w-32 ml-6 rounded-full theme-transition-element"
                style={{ background: `linear-gradient(to left, var(--border-secondary), var(--border-primary))` }}
              ></div>
            </div>
          </div>
        </ElementTransition>

        {/* Pizzas Premium */}
        {premiumPizzas.length > 0 && (
          <ElementTransition delay={200}>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3
                  className="text-4xl font-bold mb-4 font-serif theme-transition-element"
                  style={{ color: "var(--text-primary)" }}
                >
                  🌟 Colección Premium
                </h3>
                <p className="text-xl theme-transition-element" style={{ color: "var(--text-secondary)" }}>
                  Nuestras creaciones más exclusivas
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {premiumPizzas.map((pizza, index) => (
                  <PizzaCard key={pizza.id} pizza={pizza} index={index} />
                ))}
              </div>
            </div>
          </ElementTransition>
        )}

        {/* Pizzas Signature */}
        {signaturePizzas.length > 0 && (
          <ElementTransition delay={400}>
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3
                  className="text-4xl font-bold mb-4 font-serif theme-transition-element"
                  style={{ color: "var(--text-primary)" }}
                >
                  🔥 Especialidades de la Casa
                </h3>
                <p className="text-xl theme-transition-element" style={{ color: "var(--text-secondary)" }}>
                  Sabores únicos que definen nuestra identidad
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {signaturePizzas.map((pizza, index) => (
                  <PizzaCard key={pizza.id} pizza={pizza} index={index} />
                ))}
              </div>
            </div>
          </ElementTransition>
        )}

        {/* Información adicional */}
        <ElementTransition delay={600}>
          <div
            className="text-center p-12 rounded-3xl border-2 shadow-2xl"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-primary)",
            }}
          >
            <Flame className="w-16 h-16 mx-auto mb-6" style={{ color: "var(--accent-primary)" }} />
            <h3 className="text-3xl font-bold mb-6 font-serif" style={{ color: "var(--text-primary)" }}>
              Del Horno a Tu Mesa
            </h3>
            <p className="text-xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Cada pizza es cocinada a 450°C en nuestro horno a leña de barro, usando masa madre de 48 horas y los
              mejores ingredientes locales e importados. El tiempo de cocción es de apenas 90 segundos, preservando
              todos los sabores y texturas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge
                className="px-6 py-3 text-lg font-bold rounded-full"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  color: "var(--text-primary)",
                }}
              >
                🔥 450°C Horno a Leña
              </Badge>
              <Badge
                className="px-6 py-3 text-lg font-bold rounded-full"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  color: "var(--text-primary)",
                }}
              >
                ⏱️ 90 Segundos de Cocción
              </Badge>
              <Badge
                className="px-6 py-3 text-lg font-bold rounded-full"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  color: "var(--text-primary)",
                }}
              >
                🌾 Masa Madre 48h
              </Badge>
            </div>
            <p className="text-lg font-medium" style={{ color: "var(--text-accent)" }}>
              💡 Precio promedio: $7.500 - $8.500 | Margarita desde $6.500
            </p>
          </div>
        </ElementTransition>
      </div>
    </section>
  )
}
