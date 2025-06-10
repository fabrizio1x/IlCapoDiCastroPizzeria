"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Users, Phone, Mail, User, ArrowLeft, Flame, Check, MapPin, Utensils } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import Embers from "@/components/embers"
import Smoke from "@/components/smoke"
import EmberGlow from "@/components/ember-glow"

interface ReservationForm {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  specialRequests: string
}

export default function ReservasPage() {
  const { theme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [errors, setErrors] = useState<Partial<ReservationForm>>({})
  const [formData, setFormData] = useState<ReservationForm>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  })

  // Generar horarios disponibles
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 12; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(timeString)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  // Obtener fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Partial<ReservationForm> = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.date) newErrors.date = "La fecha es requerida"
    if (!formData.time) newErrors.time = "La hora es requerida"
    if (!formData.guests) newErrors.guests = "El número de personas es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsConfirmed(true)

    // Reset después de 4 segundos
    setTimeout(() => {
      setIsConfirmed(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        specialRequests: "",
      })
    }, 4000)
  }

  // Manejar cambios en el formulario
  const handleInputChange = (field: keyof ReservationForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isConfirmed) {
    return (
      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <Embers count={60} />
        <Smoke count={8} />
        <EmberGlow position="center" intensity="high" />

        <div className="text-center z-10 max-w-2xl mx-auto px-4">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <Check className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl font-bold mb-6 font-serif" style={{ color: "var(--text-primary)" }}>
            ¡Reserva Confirmada!
          </h1>
          <p className="text-2xl mb-6" style={{ color: "var(--text-secondary)" }}>
            🔥 Tu mesa está reservada en nuestro acogedor refugio
          </p>
          <div
            className="p-6 rounded-2xl mb-8 border-2"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-primary)",
            }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Detalles de tu reserva:
            </h3>
            <div className="space-y-2 text-lg" style={{ color: "var(--text-secondary)" }}>
              <p>
                <strong>Nombre:</strong> {formData.name}
              </p>
              <p>
                <strong>Fecha:</strong> {new Date(formData.date).toLocaleDateString("es-CL")}
              </p>
              <p>
                <strong>Hora:</strong> {formData.time}
              </p>
              <p>
                <strong>Personas:</strong> {formData.guests}
              </p>
            </div>
          </div>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            Te contactaremos pronto para confirmar los detalles
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
              🍽️ Reservas
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 font-serif" style={{ color: "var(--text-primary)" }}>
              Reserva Tu Mesa
            </h2>
            <p className="text-2xl mb-8" style={{ color: "var(--text-secondary)" }}>
              🔥 Asegura tu lugar junto al calor de nuestro horno a leña
            </p>
            <div className="flex items-center justify-center">
              <div
                className="h-2 w-32 mr-6 rounded-full"
                style={{ background: `linear-gradient(to right, var(--border-secondary), var(--border-primary))` }}
              ></div>
              <Utensils className="w-8 h-8" style={{ color: "var(--accent-primary)" }} />
              <div
                className="h-2 w-32 ml-6 rounded-full"
                style={{ background: `linear-gradient(to left, var(--border-secondary), var(--border-primary))` }}
              ></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Información del restaurante */}
            <div className="lg:col-span-1 space-y-6">
              <Card
                className="border-2 shadow-xl"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-primary)",
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl font-serif" style={{ color: "var(--text-primary)" }}>
                    <MapPin className="w-6 h-6 mr-3" style={{ color: "var(--accent-primary)" }} />
                    Información
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                      📍 Ubicación
                    </h4>
                    <p style={{ color: "var(--text-secondary)" }}>
                      Av. Bernardo O'Higgins 1234
                      <br />
                      Castro, Chiloé
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                      🕐 Horarios
                    </h4>
                    <p style={{ color: "var(--text-secondary)" }}>
                      Lunes a Jueves: 18:00 - 23:00
                      <br />
                      Viernes a Domingo: 12:00 - 24:00
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                      📞 Contacto
                    </h4>
                    <p style={{ color: "var(--text-secondary)" }}>
                      +56 9 8765 4321
                      <br />
                      hola@ilcapodicastro.cl
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border-2 shadow-xl"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-primary)",
                }}
              >
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center" style={{ color: "var(--text-primary)" }}>
                    <Flame className="w-5 h-5 mr-2" style={{ color: "var(--accent-primary)" }} />
                    Ambiente Único
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Disfruta de la calidez de nuestro horno a leña, el aroma a madera de lenga y la atmósfera acogedora
                    que solo Il Capo di Castro puede ofrecer. Cada mesa tiene vista al corazón ardiente de nuestra
                    cocina.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Formulario de reserva */}
            <div className="lg:col-span-2">
              <Card
                className="border-2 shadow-2xl"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-primary)",
                }}
              >
                <CardHeader>
                  <CardTitle className="text-3xl font-serif text-center" style={{ color: "var(--text-primary)" }}>
                    Completa tu Reserva
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Información personal */}
                    <div className="grid md:grid-cols-2 gap-6">
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
                          className={`text-lg p-4 border-2 rounded-xl ${errors.name ? "border-red-500" : ""}`}
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: errors.name ? "#ef4444" : "var(--border-primary)",
                            color: "var(--text-primary)",
                          }}
                          placeholder="Tu nombre completo"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                      </div>

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
                          className={`text-lg p-4 border-2 rounded-xl ${errors.phone ? "border-red-500" : ""}`}
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: errors.phone ? "#ef4444" : "var(--border-primary)",
                            color: "var(--text-primary)",
                          }}
                          placeholder="+56 9 1234 5678"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-lg font-medium flex items-center"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`text-lg p-4 border-2 rounded-xl ${errors.email ? "border-red-500" : ""}`}
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          borderColor: errors.email ? "#ef4444" : "var(--border-primary)",
                          color: "var(--text-primary)",
                        }}
                        placeholder="tu@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Detalles de la reserva */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="date"
                          className="text-lg font-medium flex items-center"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Fecha *
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          min={getMinDate()}
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          className={`text-lg p-4 border-2 rounded-xl ${errors.date ? "border-red-500" : ""}`}
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: errors.date ? "#ef4444" : "var(--border-primary)",
                            color: "var(--text-primary)",
                          }}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="time"
                          className="text-lg font-medium flex items-center"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Hora *
                        </Label>
                        <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                          <SelectTrigger
                            className={`text-lg p-4 border-2 rounded-xl ${errors.time ? "border-red-500" : ""}`}
                            style={{
                              backgroundColor: "var(--bg-primary)",
                              borderColor: errors.time ? "#ef4444" : "var(--border-primary)",
                              color: "var(--text-primary)",
                            }}
                          >
                            <SelectValue placeholder="Selecciona hora" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="guests"
                          className="text-lg font-medium flex items-center"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Personas *
                        </Label>
                        <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                          <SelectTrigger
                            className={`text-lg p-4 border-2 rounded-xl ${errors.guests ? "border-red-500" : ""}`}
                            style={{
                              backgroundColor: "var(--bg-primary)",
                              borderColor: errors.guests ? "#ef4444" : "var(--border-primary)",
                              color: "var(--text-primary)",
                            }}
                          >
                            <SelectValue placeholder="¿Cuántos?" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "persona" : "personas"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.guests && <p className="text-red-500 text-sm">{errors.guests}</p>}
                      </div>
                    </div>

                    {/* Solicitudes especiales */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="requests"
                        className="text-lg font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Solicitudes Especiales (Opcional)
                      </Label>
                      <Textarea
                        id="requests"
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        className="text-lg p-4 border-2 rounded-xl min-h-[100px]"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          borderColor: "var(--border-primary)",
                          color: "var(--text-primary)",
                        }}
                        placeholder="Celebración especial, alergias alimentarias, preferencias de mesa..."
                      />
                    </div>

                    {/* Botón de envío */}
                    <Button
                      type="submit"
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
                          Procesando Reserva...
                        </>
                      ) : (
                        <>🔥 Reservar Mesa</>
                      )}
                    </Button>

                    <p className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                      * Campos obligatorios. Te contactaremos para confirmar tu reserva.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
