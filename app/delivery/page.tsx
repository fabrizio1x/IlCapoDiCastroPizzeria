"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Check, Flame, CreditCard, Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import Embers from "@/components/embers"
import Smoke from "@/components/smoke"
import EmberGlow from "@/components/ember-glow"
import WebpayPayment from "@/components/webpay-payment"

type PaymentMethod = "cash" | "webpay" | null

export default function DeliveryPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart()
  const { theme } = useTheme()
  const [isConfirming, setIsConfirming] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleConfirmOrder = async () => {
    if (!paymentMethod) {
      alert("Por favor selecciona un método de pago")
      return
    }

    if (paymentMethod === "webpay") {
      setShowPaymentForm(true)
      return
    }

    // Proceso para pago en efectivo
    setIsConfirming(true)

    // Simular proceso de pedido
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsConfirming(false)
    setOrderConfirmed(true)

    // Limpiar carrito después de 3 segundos
    setTimeout(() => {
      clearCart()
      setOrderConfirmed(false)
    }, 3000)
  }

  const handlePaymentComplete = (success: boolean) => {
    if (success) {
      setShowPaymentForm(false)
      setOrderConfirmed(true)

      // Limpiar carrito después de 3 segundos
      setTimeout(() => {
        clearCart()
        setOrderConfirmed(false)
      }, 3000)
    }
  }

  const handleCancelPayment = () => {
    setShowPaymentForm(false)
    setPaymentMethod(null)
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

        <div className="text-center z-10">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <Check className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl font-bold mb-6 font-serif" style={{ color: "var(--text-primary)" }}>
            ¡Pedido Confirmado!
          </h1>
          <p className="text-2xl mb-8" style={{ color: "var(--text-secondary)" }}>
            🔥 Tu pizza está siendo preparada en nuestro horno a leña
          </p>
          <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
            Te contactaremos pronto para coordinar la entrega
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
              🚚 Delivery
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
              🍕 ¡Descubre nuestras deliciosas pizzas artesanales!
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 font-serif" style={{ color: "var(--text-primary)" }}>
                Tu Pedido
              </h2>
              <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
                🔥 Directo desde nuestro horno a leña
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Lista de productos */}
              <div className="lg:col-span-3 space-y-6">
                {items.map((item, index) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden border-2 shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-primary)",
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Imagen */}
                        <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          <Badge
                            className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: "var(--accent-primary)",
                              color: "var(--bg-primary)",
                            }}
                          >
                            {item.category}
                          </Badge>
                        </div>

                        {/* Información del producto */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 font-serif" style={{ color: "var(--text-primary)" }}>
                            {item.name}
                          </h3>
                          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                            {item.ingredients}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold" style={{ color: "var(--accent-primary)" }}>
                              {formatPrice(item.price)}
                            </div>

                            {/* Controles de cantidad */}
                            <div className="flex items-center space-x-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-10 h-10 rounded-full border-2"
                                style={{
                                  borderColor: "var(--border-primary)",
                                  color: "var(--text-primary)",
                                }}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span
                                className="text-xl font-bold w-8 text-center"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-10 h-10 rounded-full border-2"
                                style={{
                                  borderColor: "var(--border-primary)",
                                  color: "var(--text-primary)",
                                }}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeItem(item.id)}
                                className="w-10 h-10 rounded-full ml-4"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Resumen del pedido */}
              <div className="lg:col-span-2">
                {showPaymentForm ? (
                  <WebpayPayment
                    amount={getTotalPrice()}
                    onPaymentComplete={handlePaymentComplete}
                    onCancel={handleCancelPayment}
                  />
                ) : (
                  <Card
                    className="sticky top-8 border-2 shadow-2xl"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-primary)",
                    }}
                  >
                    <CardContent className="p-8">
                      <h3
                        className="text-3xl font-bold mb-6 font-serif text-center"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Resumen del Pedido
                      </h3>

                      <div className="space-y-4 mb-6">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                                {item.name}
                              </span>
                              <span className="text-sm ml-2" style={{ color: "var(--text-secondary)" }}>
                                x{item.quantity}
                              </span>
                            </div>
                            <span className="font-bold" style={{ color: "var(--accent-primary)" }}>
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t-2 pt-4 mb-6" style={{ borderColor: "var(--border-primary)" }}>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                            Total:
                          </span>
                          <span className="text-3xl font-bold" style={{ color: "var(--accent-primary)" }}>
                            {formatPrice(getTotalPrice())}
                          </span>
                        </div>
                      </div>

                      {/* Métodos de pago */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                          Método de Pago:
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            type="button"
                            onClick={() => setPaymentMethod("cash")}
                            variant={paymentMethod === "cash" ? "default" : "outline"}
                            className={`p-4 h-auto flex flex-col items-center justify-center gap-2 rounded-xl border-2 ${
                              paymentMethod === "cash" ? "ring-2" : ""
                            }`}
                            style={{
                              backgroundColor: paymentMethod === "cash" ? "var(--bg-hover)" : "var(--bg-primary)",
                              borderColor: "var(--border-primary)",
                              color: "var(--text-primary)",
                              boxShadow: paymentMethod === "cash" ? "0 0 0 2px var(--accent-primary)" : "none",
                            }}
                          >
                            <Wallet className="w-8 h-8" />
                            <span>Efectivo</span>
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setPaymentMethod("webpay")}
                            variant={paymentMethod === "webpay" ? "default" : "outline"}
                            className={`p-4 h-auto flex flex-col items-center justify-center gap-2 rounded-xl border-2 ${
                              paymentMethod === "webpay" ? "ring-2" : ""
                            }`}
                            style={{
                              backgroundColor: paymentMethod === "webpay" ? "var(--bg-hover)" : "var(--bg-primary)",
                              borderColor: "var(--border-primary)",
                              color: "var(--text-primary)",
                              boxShadow: paymentMethod === "webpay" ? "0 0 0 2px var(--accent-primary)" : "none",
                            }}
                          >
                            <CreditCard className="w-8 h-8" />
                            <span>WebPay</span>
                          </Button>
                        </div>
                        {paymentMethod === "webpay" && (
                          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                            Serás redirigido a WebPay para completar tu pago.
                          </p>
                        )}
                        {paymentMethod === "cash" && (
                          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                            Pago en efectivo al momento de la entrega.
                          </p>
                        )}
                      </div>

                      <Button
                        onClick={handleConfirmOrder}
                        disabled={isConfirming || !paymentMethod}
                        className="w-full py-4 text-xl font-bold rounded-full shadow-2xl border-2 transform hover:scale-105 transition-all duration-300"
                        style={{
                          backgroundColor:
                            isConfirming || !paymentMethod ? "var(--text-secondary)" : "var(--accent-primary)",
                          borderColor: "var(--border-secondary)",
                          color: "var(--bg-primary)",
                          opacity: !paymentMethod ? 0.7 : 1,
                        }}
                      >
                        {isConfirming ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                            Procesando...
                          </>
                        ) : paymentMethod === "webpay" ? (
                          <>💳 Pagar con WebPay</>
                        ) : (
                          <>🔥 Confirmar Pedido</>
                        )}
                      </Button>

                      <p className="text-center text-sm mt-4" style={{ color: "var(--text-secondary)" }}>
                        📞 Te contactaremos para coordinar la entrega
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
