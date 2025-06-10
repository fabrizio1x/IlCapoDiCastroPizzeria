"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react"
import WebpayLogo from "./webpay-logo"

interface WebpayPaymentProps {
  amount: number
  onPaymentComplete: (success: boolean) => void
  onCancel: () => void
}

export default function WebpayPayment({ amount, onPaymentComplete, onCancel }: WebpayPaymentProps) {
  const [step, setStep] = useState<"form" | "processing" | "result">("form")
  const [paymentResult, setPaymentResult] = useState<"success" | "error" | null>(null)
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    installments: "1",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))

    // Limpiar error cuando el usuario escribe
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!cardData.cardNumber.trim()) {
      newErrors.cardNumber = "Número de tarjeta requerido"
    } else if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Número de tarjeta inválido"
    }

    if (!cardData.expiryDate.trim()) {
      newErrors.expiryDate = "Fecha de expiración requerida"
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = "Formato inválido (MM/AA)"
    }

    if (!cardData.cvv.trim()) {
      newErrors.cvv = "CVV requerido"
    } else if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = "CVV inválido"
    }

    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = "Nombre requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Simular procesamiento de pago
    setStep("processing")

    // Simular respuesta del servidor (éxito en la mayoría de los casos)
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% de probabilidad de éxito
      setPaymentResult(success ? "success" : "error")
      setStep("result")

      // Notificar al componente padre
      if (success) {
        setTimeout(() => onPaymentComplete(true), 2000)
      }
    }, 3000)
  }

  // Formatear número de tarjeta mientras se escribe
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Formatear fecha de expiración mientras se escribe
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  if (step === "processing") {
    return (
      <Card
        className="w-full border-2 shadow-xl"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-primary)" }}
      >
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div
            className="animate-spin rounded-full h-16 w-16 border-b-4 mb-8"
            style={{ borderColor: "var(--accent-primary)" }}
          ></div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Procesando Pago
          </h3>
          <p className="text-center" style={{ color: "var(--text-secondary)" }}>
            Tu pago está siendo procesado por WebPay.
            <br />
            Por favor, no cierres esta ventana.
          </p>
          <div className="mt-8 flex justify-center">
            <WebpayLogo className="w-40 h-12 opacity-70" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (step === "result") {
    return (
      <Card
        className="w-full border-2 shadow-xl"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-primary)" }}
      >
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          {paymentResult === "success" ? (
            <>
              <CheckCircle className="h-16 w-16 mb-6" style={{ color: "var(--accent-primary)" }} />
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                ¡Pago Exitoso!
              </h3>
              <p className="text-center mb-6" style={{ color: "var(--text-secondary)" }}>
                Tu pago por {formatPrice(amount)} ha sido procesado correctamente.
                <br />
                Recibirás un correo con los detalles de tu compra.
              </p>
            </>
          ) : (
            <>
              <AlertCircle className="h-16 w-16 mb-6 text-red-500" />
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Error en el Pago
              </h3>
              <p className="text-center mb-6" style={{ color: "var(--text-secondary)" }}>
                Ha ocurrido un error al procesar tu pago.
                <br />
                Por favor, intenta nuevamente o utiliza otro método de pago.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => setStep("form")}
                  className="px-6 py-2 rounded-lg"
                  style={{
                    backgroundColor: "var(--bg-hover)",
                    color: "var(--text-primary)",
                  }}
                >
                  Reintentar
                </Button>
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="px-6 py-2 rounded-lg border"
                  style={{
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}
          <div className="mt-8 flex justify-center">
            <WebpayLogo className="w-40 h-12 opacity-70" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="w-full max-w-md md:max-w-lg mx-auto border-2 shadow-xl"
      style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border-primary)" }}
    >
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-serif" style={{ color: "var(--text-primary)" }}>
          <CreditCard className="w-6 h-6 mr-3" style={{ color: "var(--accent-primary)" }} />
          Pago con WebPay
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          {/* Total a pagar - destacado */}
          <div
            className="p-4 md:p-5 rounded-xl border-2 text-center mb-2"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-primary)",
            }}
          >
            <div className="text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
              Total a pagar:
            </div>
            <div className="text-3xl md:text-4xl font-bold" style={{ color: "var(--accent-primary)" }}>
              {formatPrice(amount)}
            </div>
          </div>

          {/* Número de tarjeta */}
          <div className="space-y-3">
            <Label htmlFor="cardNumber" className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
              Número de Tarjeta
            </Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
              maxLength={19}
              className={`p-4 text-lg border-2 rounded-xl ${errors.cardNumber ? "border-red-500" : ""}`}
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: errors.cardNumber ? "#ef4444" : "var(--border-primary)",
                color: "var(--text-primary)",
              }}
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>

          {/* Fecha y CVV en fila */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="expiryDate" className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                Fecha de Expiración
              </Label>
              <Input
                id="expiryDate"
                placeholder="MM/AA"
                value={cardData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                maxLength={5}
                className={`p-4 text-lg border-2 rounded-xl text-center ${errors.expiryDate ? "border-red-500" : ""}`}
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: errors.expiryDate ? "#ef4444" : "var(--border-primary)",
                  color: "var(--text-primary)",
                  width: "100%",
                }}
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="cvv" className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                CVV
              </Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cardData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                maxLength={4}
                className={`p-4 text-lg border-2 rounded-xl text-center ${errors.cvv ? "border-red-500" : ""}`}
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: errors.cvv ? "#ef4444" : "var(--border-primary)",
                  color: "var(--text-primary)",
                  width: "100%",
                }}
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>

          {/* Nombre del titular */}
          <div className="space-y-3">
            <Label
              htmlFor="cardholderName"
              className="text-base font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Nombre del Titular
            </Label>
            <Input
              id="cardholderName"
              placeholder="NOMBRE APELLIDO"
              value={cardData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value.toUpperCase())}
              className={`p-4 text-lg border-2 rounded-xl ${errors.cardholderName ? "border-red-500" : ""}`}
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: errors.cardholderName ? "#ef4444" : "var(--border-primary)",
                color: "var(--text-primary)",
              }}
            />
            {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
          </div>

          {/* Cuotas */}
          <div className="space-y-3">
            <Label htmlFor="installments" className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
              Cuotas
            </Label>
            <Select value={cardData.installments} onValueChange={(value) => handleInputChange("installments", value)}>
              <SelectTrigger
                className="p-4 text-lg border-2 rounded-xl"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-primary)",
                  color: "var(--text-primary)",
                }}
              >
                <SelectValue placeholder="Selecciona cuotas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Sin cuotas</SelectItem>
                <SelectItem value="3">3 cuotas sin interés</SelectItem>
                <SelectItem value="6">6 cuotas sin interés</SelectItem>
                <SelectItem value="12">12 cuotas con interés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botones de acción */}
          <div className="pt-6 space-y-4">
            <Button
              type="submit"
              className="w-full py-4 text-xl font-bold rounded-xl shadow-xl border-2 transform hover:scale-105 transition-all duration-300"
              style={{
                backgroundColor: "var(--accent-primary)",
                borderColor: "var(--border-secondary)",
                color: "var(--bg-primary)",
              }}
            >
              Pagar {formatPrice(amount)}
            </Button>

            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="w-full py-3 text-lg rounded-xl border-2"
              style={{
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
                backgroundColor: "transparent",
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>

        {/* Logo y mensaje de seguridad */}
        <div className="mt-8 space-y-4">
          <div className="flex justify-center">
            <WebpayLogo className="w-40 h-12 opacity-80" />
          </div>

          <p className="text-sm text-center leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            🔒 Pago seguro procesado por WebPay.
            <br />
            Tus datos están protegidos con encriptación SSL.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
