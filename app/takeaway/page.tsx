"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Check, Flame, Clock, MapPin, Phone, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useTheme } from "@/contexts/theme-context"
import Embers from "@/components/embers"
import Smoke from "@/components/smoke"
import EmberGlow from "@/components/ember-glow"

interface TakeAwayForm {
  name: string
  phone: string
  pickupTime: string
}

export default function TakeAwayPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart()
  const { theme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [errors, setErrors] = useState<Partial<TakeAwayForm>>({})
  const [formData, setFormData] = useState<TakeAwayForm>({
    name: "",
    phone: "",
    pickupTime: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Obtener hora mínima (30 minutos desde ahora)
  const getMinTime = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() + 30) // Mínimo 30 minutos de preparación
    return now.toTimeString().slice(0, 5)
  }

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Partial<TakeAwayForm> = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.pickupTime) newErrors.pickupTime = "La hora de retiro es requerida"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      alert("Tu carrito está vacío. Agrega algunas pizzas antes de continuar.")
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setOrderConfirmed(true)

    // Reset después de 5 segundos
    setTimeout(() => {
      clearCart()
      setOrderConfirmed(false)
      setFormData({
        name: "",
        phone: "",
        pickupTime: "",
      })
    }, 5000)
  }

  // Manejar cambios en el formulario
  const handleInputChange = (field: keyof TakeAwayForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (orderConfirmed) {
    return (
      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <Embers count={60} />
        <Smoke count={8} />
        <EmberGlow position="center" intensity="high" />

        <div className="text-center z-10 max-w-3xl mx-auto px-4">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <Check className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl font-bold mb-6 font-serif" style={{ color: "var(--text-primary)" }}>
            ¡Pedido Confirmado!
          </h1>
          <p className="text-2xl mb-6" style={{ color: "var(--text-secondary)" }}>
            🔥 Gracias {formData.name}, tu pedido estará listo a las {formData.pickupTime}
          </p>

          <div
            className="p-8 rounded-2xl mb-8 border-2"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-primary)",
            }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Detalles de tu pedido:
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-bold text-lg mb-3" style={{ color: "var(--text-primary)" }}>
                  📋 Resumen del pedido:
                </h4>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span style={{ color: "var(--text-secondary)" }}>
                        {item.name} x{item.quantity}
                      </span>
                      <span style={{ color: "var(--accent-primary)" }}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-3" style={{ borderColor: "var(--border-primary)" }}>
                    <div className="flex justify-between font-bold text-lg">
                      <span style={{ color: "var(--text-primary)" }}>Total:</span>
                      <span style={{ color: "var(--accent-primary)" }}>{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3" style={{ color: "var(--text-primary)" }}>
                  🕐 Información de retiro:
                </h4>
                <div className="space-y-2" style={{ color: "var(--text-secondary)" }}>
                  <p>
                    <strong>Nombre:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Hora de retiro:</strong> {formData.pickupTime}
                  </p>
                  <p>
                    <strong>Dirección:</strong> Av. Bernardo O'Higgins 1234, Castro
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xl mb-4" style={{ color: "var(--text-secondary)" }}>
            📞 Te contactaremos si hay algún cambio en el tiempo de preparación
          </p>
          <p className="text-lg" style={{ color: "var(--text-accent)" }}>
            🔥 Tu pizza se está preparando en nuestro horno a leña
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      <Embers count={40} />
      <Smoke count={6} />

      {/* Header */}
      <header
        className="shadow-lg border-b-2"
        style={{
          backgroundColor: "var(--bg-tertiary)",
          borderColor: "var(--border-primary)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <ArrowLeft className="w-6 h-6" style={{ color: "var(--text-primary)" }} />
              <div className="flex items-center">
                <Flame className="w-8 h-8 mr-3" style={{ color: "var(--accent-primary)" }} />
                <div>
                  <div className="text-2xl font-bold font-serif" style={{ color: "var(--text-primary)" }}>
                    IL CAPO
                  </div>
                  <div className="text-xs font-medium tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    DI CASTRO
                  </div>
                </div>
              </div>
            </Link>
            <h1 className="text-3xl font-bold font-serif" style={{ color: "var(--text-primary)" }}>
              🥡 Take Away
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {items.length === 0 ? (
          // Carrito vacío
          <div className="text-center py-20">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <ShoppingBag className="w-16 h-16" style={{ color: "var(--text-secondary)" }} />
            </div>
            <h2 className="text-5xl font-bold mb-6 font-serif" style={{ color: "var(--text-primary)" }}>
              Tu carrito está vacío
            </h2>
            <p className="text-2xl mb-8" style={{ color: "var(--text-secondary)" }}>
              🍕 ¡Agrega algunas pizzas para llevar!
            </p>
            <Link href="/#menu">
              <Button
                size="lg"
                className="px-12 py-4 text-xl font-bold rounded-full shadow-2xl border-2 transform hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: "var(--bg-hover)",
                  borderColor: "var(--border-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                🔥 Ver Nuestro Menú
              </Button>
            </Link>
          </div>
        ) : (
          // Carrito con productos
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 font-serif" style={{ color: "var(--text-primary)" }}>
                Pedido para Retiro
              </h2>
              <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
                🔥 Prepara tu pedido y retíralo cuando esté listo
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-2 space-y-6">
                <Card
                  className="border-2 shadow-xl"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-primary)",
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif" style={{ color: "var(--text-primary)" }}>
                      🛒 Tu Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          borderColor: "var(--border-primary)",
                        }}
                      >
                        {/* Imagen */}
                        <div className="relative w-full md:w-24 h-24 rounded-lg overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        {/* Información del producto */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1 font-serif" style={{ color: "var(--text-primary)" }}>
                            {item.name}
                          </h3>
                          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                            {item.ingredients}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-xl font-bold" style={{ color: "var(--accent-primary)" }}>
                              {formatPrice(item.price)}
                            </div>

                            {/* Controles de cantidad */}
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border"
                                style={{
                                  borderColor: "var(--border-primary)",
                                  color: "var(--text-primary)",
                                }}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span
                                className="text-lg font-bold w-6 text-center"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border"
                                style={{
                                  borderColor: "var(--border-primary)",
                                  color: "var(--text-primary)",
                                }}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeItem(item.id)}
                                className="w-8 h-8 rounded-full ml-2"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Información del local */}
                <Card
                  className="border-2 shadow-xl"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-primary)",
                  }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-2xl font-serif flex items-center"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <MapPin className="w-6 h-6 mr-3" style={{ color: "var(--accent-primary)" }} />
                      Información del Local
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3" style={{ color: "var(--text-primary)" }}>
                        📍 Dirección
                      </h4>
                      <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                        Av. Bernardo O'Higgins 1234
                        <br />
                        Castro, Chiloé
                      </p>
                      <h4 className="font-bold text-lg mb-3" style={{ color: "var(--text-primary)" }}>
                        📞 Contacto
                      </h4>
                      <p style={{ color: "var(--text-secondary)" }}>+56 9 8765 4321</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3" style={{ color: "var(--text-primary)" }}>
                        🕐 Horarios de Retiro
                      </h4>
                      <p style={{ color: "var(--text-secondary)" }}>
                        Lunes a Jueves: 18:00 - 23:00
                        <br />
                        Viernes a Domingo: 12:00 - 24:00
                      </p>
                      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "var(--bg-primary)" }}>
                        <p className="text-sm font-medium" style={{ color: "var(--text-accent)" }}>
                          ⏱️ Tiempo de preparación: 15-25 minutos
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Formulario y resumen */}
              <div className="lg:col-span-1">
                <Card
                  className="sticky top-8 border-2 shadow-2xl"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-primary)",
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-center" style={{ color: "var(--text-primary)" }}>
                      Datos para Retiro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Nombre */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-lg font-medium flex items-center"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Nombre Completo *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`text-lg p-3 border-2 rounded-xl ${errors.name ? "border-red-500" : ""}`}
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: errors.name ? "#ef4444" : "var(--border-primary)",
                            color: "var(--text-primary)",
                          }}
                          placeholder="Tu nombre"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                      </div>

                      {/* Teléfono */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-lg font-medium flex items-center"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Teléfono *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`text-lg p-3 border-2 rounded-xl ${errors.phone ? "border-red-500" : ""}`}
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: errors.phone ? "#ef4444" : "var(--border-primary)",
                            color: "var(--text-primary)",
                          }}
                          placeholder="+56 9 1234 5678"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                      </div>

                      {/* Hora de retiro */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="pickupTime"
                          className="text-lg font-medium flex items-center"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Hora de Retiro *
                        </Label>
                        <Input
                          id="pickupTime"
                          type="time"
                          min={getMinTime()}
                          value={formData.pickupTime}
                          onChange={(e) => handleInputChange("pickupTime", e.target.value)}
                          className={`text-lg p-3 border-2 rounded-xl ${errors.pickupTime ? "border-red-500" : ""}`}
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: errors.pickupTime ? "#ef4444" : "var(--border-primary)",
                            color: "var(--text-primary)",
                          }}
                        />
                        {errors.pickupTime && <p className="text-red-500 text-sm">{errors.pickupTime}</p>}
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          Mínimo 30 minutos desde ahora
                        </p>
                      </div>
                    </form>

                    {/* Resumen del pedido */}
                    <div className="border-t pt-4" style={{ borderColor: "var(--border-primary)" }}>
                      <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                        Resumen del Pedido
                      </h3>
                      <div className="space-y-2 mb-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-bold" style={{ color: "var(--accent-primary)" }}>
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-3 mb-6" style={{ borderColor: "var(--border-primary)" }}>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                            Total:
                          </span>
                          <span className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
                            {formatPrice(getTotalPrice())}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full py-4 text-xl font-bold rounded-xl shadow-2xl border-2 transform hover:scale-105 transition-all duration-300"
                      style={{
                        backgroundColor: isSubmitting ? "var(--text-secondary)" : "var(--accent-primary)",
                        borderColor: "var(--border-secondary)",
                        color: "var(--bg-primary)",
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Procesando...
                        </>
                      ) : (
                        <>🥡 Confirmar Pedido para Retiro</>
                      )}
                    </Button>

                    <p className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                      * Campos obligatorios. Te contactaremos si hay cambios.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
