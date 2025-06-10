"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Phone, ChevronLeft, ChevronRight, Star, MessageCircle, Flame, Wheat } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Embers from "@/components/embers"
import Smoke from "@/components/smoke"
import EmberGlow from "@/components/ember-glow"
import ThemeTransition from "@/components/theme-transition"
import Sparks from "@/components/sparks"
import ElementTransition from "@/components/element-transition"
import { useTheme } from "@/contexts/theme-context"
import MenuSection from "@/components/menu-section"
import CartIndicator from "@/components/cart-indicator"
import { useEffect, useState } from "react"

function PageContent() {
  const { isTransitioning, theme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  // Efecto para animación de carga inicial
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`min-h-screen relative overflow-hidden theme-transition-element transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Animaciones de transición */}
      <ThemeTransition />
      <Sparks active={isTransitioning} theme={theme} originX={95} originY={5} />

      {/* Efectos de brasas y humo */}
      <Embers count={80} />
      <Smoke count={10} />

      {/* Header */}
      <ElementTransition delay={0}>
        <header
          className="shadow-lg sticky top-0 z-40 border-b-2 theme-transition-element"
          style={{
            backgroundColor: "var(--bg-tertiary)",
            borderColor: "var(--border-primary)",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <Flame
                    className="w-10 h-10 mr-3 transition-all duration-500"
                    style={{ color: "var(--accent-primary)" }}
                  />
                  <div>
                    <div
                      className="text-3xl font-bold font-serif theme-transition-element"
                      style={{ color: "var(--text-primary)" }}
                    >
                      IL CAPO
                    </div>
                    <div
                      className="text-sm font-medium tracking-wider theme-transition-element"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      DI CASTRO
                    </div>
                  </div>
                </div>
              </div>
              <nav className="hidden md:flex space-x-6">
                {[
                  { name: "Inicio", href: "#" },
                  { name: "Menú", href: "#menu" },
                  { name: "Nosotros", href: "#nosotros" },
                  { name: "Contacto", href: "#contacto" },
                  { name: "Delivery", href: "/delivery" },
                  { name: "Take Away", href: "/takeaway" },
                  { name: "Reservas", href: "/reservas" },
                ].map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="font-medium text-lg transition-all duration-500 hover:opacity-80 theme-transition-element"
                    style={{
                      color: "var(--text-primary)",
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center space-x-4">
                <CartIndicator />
                <Button
                  className="md:hidden border theme-transition-element"
                  style={{
                    backgroundColor: "var(--bg-hover)",
                    borderColor: "var(--border-secondary)",
                    color: "var(--text-primary)",
                  }}
                  variant="default"
                  size="sm"
                >
                  ☰
                </Button>
              </div>
            </div>
          </div>
        </header>
      </ElementTransition>

      {/* Hero Section */}
      <ElementTransition delay={200}>
        <section
          className="relative h-[80vh] overflow-hidden theme-transition-element"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          {/* Añadir efectos de brasa grandes */}
          <EmberGlow position="bottom-right" intensity="high" />
          <EmberGlow position="top-left" intensity="medium" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
          <div className="absolute inset-0">
            <Image
              src="/images/pizza-con.horno-de-fondo.webp"
              alt="Horno a leña con fuego ardiente y brasas"
              fill
              className="object-cover theme-transition-element"
              sizes="100vw"
              priority
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center theme-transition-element" style={{ color: "var(--text-primary)" }}>
              <div className="mb-8">
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <div
                    className="h-1 w-16 rounded-full theme-transition-element"
                    style={{ background: `linear-gradient(to right, transparent, var(--border-secondary))` }}
                  ></div>
                  <Wheat className="w-20 h-20 theme-transition-element" style={{ color: "var(--text-secondary)" }} />
                  <div
                    className="h-1 w-16 rounded-full theme-transition-element"
                    style={{ background: `linear-gradient(to left, transparent, var(--border-secondary))` }}
                  ></div>
                </div>
              </div>
              <h1
                className="text-6xl md:text-9xl font-bold mb-8 tracking-wide font-serif theme-transition-element animate-fadeIn"
                style={{ color: "var(--text-primary)" }}
              >
                IL CAPO DI CASTRO
              </h1>
              <p
                className="text-3xl md:text-4xl mb-10 font-light italic theme-transition-element animate-slideUp"
                style={{ color: "var(--text-secondary)" }}
              >
                "La tradición napolitana con alma chilota"
              </p>
              <div className="flex items-center justify-center mb-10">
                <div
                  className="h-2 w-32 mr-6 rounded-full theme-transition-element"
                  style={{ background: `linear-gradient(to right, var(--border-secondary), var(--border-primary))` }}
                ></div>
                <Flame className="w-10 h-10 theme-transition-element" style={{ color: "var(--accent-primary)" }} />
                <div
                  className="h-2 w-32 ml-6 rounded-full theme-transition-element"
                  style={{ background: `linear-gradient(to left, var(--border-secondary), var(--border-primary))` }}
                ></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="px-8 py-4 text-xl font-bold rounded-full shadow-2xl border-2 transform hover:scale-105 transition-all duration-300 theme-transition-element"
                  style={{
                    backgroundColor: "var(--bg-hover)",
                    borderColor: "var(--border-secondary)",
                    color: "var(--text-primary)",
                  }}
                  onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                >
                  🔥 Ver Nuestro Menú
                </Button>
                <Link href="/takeaway">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-xl font-bold rounded-full shadow-2xl border-2 transform hover:scale-105 transition-all duration-300 theme-transition-element"
                    style={{
                      backgroundColor: "var(--accent-primary)",
                      borderColor: "var(--border-secondary)",
                      color: "var(--bg-primary)",
                    }}
                  >
                    🥡 Pedir para Llevar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <button
            className="absolute left-8 top-1/2 transform -translate-y-1/2 transition-all duration-500 rounded-full p-4 backdrop-blur-sm theme-transition-element"
            style={{
              color: "var(--text-secondary)",
              backgroundColor: "var(--bg-secondary)/60",
            }}
          >
            <ChevronLeft size={36} />
          </button>
          <button
            className="absolute right-8 top-1/2 transform -translate-y-1/2 transition-all duration-500 rounded-full p-4 backdrop-blur-sm theme-transition-element"
            style={{
              color: "var(--text-secondary)",
              backgroundColor: "var(--bg-secondary)/60",
            }}
          >
            <ChevronRight size={36} />
          </button>
        </section>
      </ElementTransition>

      {/* Introducción */}
      <ElementTransition delay={400}>
        <section
          id="nosotros"
          className="py-24 relative theme-transition-element"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <EmberGlow position="bottom-left" intensity="medium" />
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2
                  className="text-6xl font-bold mb-8 font-serif theme-transition-element"
                  style={{ color: "var(--text-primary)" }}
                >
                  Nuestra Historia
                </h2>
                <div className="flex items-center justify-center mb-8">
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
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <div
                    className="p-10 rounded-3xl shadow-xl border-2"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-primary)",
                    }}
                  >
                    <h3 className="text-3xl font-bold mb-6 flex items-center" style={{ color: "var(--text-primary)" }}>
                      <Flame className="w-8 h-8 mr-3" style={{ color: "var(--accent-primary)" }} />
                      El Calor del Hogar
                    </h3>
                    <p className="text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      Bienvenidos a <strong style={{ color: "var(--text-primary)" }}>Il Capo di Castro</strong>, donde
                      cada pizza nace del corazón ardiente de nuestro horno a leña de barro. Como en las cabañas
                      chilotas de antaño, aquí el fuego nunca se apaga y el aroma a leña abraza cada rincón, creando esa
                      atmósfera única que solo el calor genuino puede ofrecer.
                    </p>
                  </div>
                  <div
                    className="p-10 rounded-3xl shadow-xl border-2"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-primary)",
                    }}
                  >
                    <h3 className="text-3xl font-bold mb-6 flex items-center" style={{ color: "var(--text-primary)" }}>
                      <Wheat className="w-8 h-8 mr-3" style={{ color: "var(--accent-primary)" }} />
                      Tradición que Abraza
                    </h3>
                    <p className="text-xl leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      Nuestro horno alcanza los 450°C, temperatura perfecta donde la madera de lenga chilota se
                      convierte en llamas doradas que abrazan cada pizza. Con masa madre de 48 horas, harina italiana
                      tipo 00 y los tesoros del mar de Chiloé, cada bocado es un abrazo cálido que conecta Italia con
                      nuestra tierra austral.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Badge
                      className="px-6 py-3 text-lg font-bold rounded-full"
                      style={{
                        backgroundColor: "var(--bg-hover)",
                        color: "var(--text-primary)",
                      }}
                    >
                      🔥 Horno 450°C
                    </Badge>
                    <Badge
                      className="px-6 py-3 text-lg font-bold rounded-full"
                      style={{
                        backgroundColor: "var(--bg-hover)",
                        color: "var(--text-primary)",
                      }}
                    >
                      🌾 Masa Madre Artesanal
                    </Badge>
                    <Badge
                      className="px-6 py-3 text-lg font-bold rounded-full"
                      style={{
                        backgroundColor: "var(--bg-hover)",
                        color: "var(--text-primary)",
                      }}
                    >
                      🪵 Leña de Lenga
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="rounded-3xl p-6 shadow-2xl transform rotate-2"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <Image
                      src="/images/maestropizzaiolo.webp"
                      alt="Maestro pizzaiolo junto al horno a leña en ambiente cálido de cabaña"
                      width={600}
                      height={600}
                      className="rounded-2xl shadow-xl transform -rotate-2"
                    />
                  </div>
                  <div
                    className="absolute -bottom-8 -right-8 p-6 rounded-full shadow-2xl"
                    style={{
                      backgroundColor: "var(--bg-hover)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <Flame className="w-12 h-12" />
                  </div>
                  <div
                    className="absolute -top-4 -left-4 p-4 rounded-full shadow-2xl"
                    style={{
                      backgroundColor: "var(--bg-hover)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <Wheat className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ElementTransition>

      {/* Nuestro Menu Artesanal */}
      <MenuSection />

      {/* Testimonios */}
      <ElementTransition delay={800}>
        <section className="py-24 relative theme-transition-element" style={{ backgroundColor: "var(--bg-primary)" }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2
                className="text-6xl font-bold mb-8 font-serif theme-transition-element"
                style={{ color: "var(--text-primary)" }}
              >
                Corazones Conquistados
              </h2>
              <div className="flex items-center justify-center">
                <div
                  className="h-2 w-32 mr-6 rounded-full theme-transition-element"
                  style={{ background: `linear-gradient(to right, var(--border-secondary), var(--border-primary))` }}
                ></div>
                <Star
                  className="w-8 h-8 fill-current theme-transition-element"
                  style={{ color: "var(--accent-primary)" }}
                />
                <div
                  className="h-2 w-32 ml-6 rounded-full theme-transition-element"
                  style={{ background: `linear-gradient(to left, var(--border-secondary), var(--border-primary))` }}
                ></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {[
                {
                  text: "Entrar aquí es como llegar a casa después de un largo viaje. El aroma del horno a leña te abraza desde la puerta, y cada bocado de la Pulmay Napoletano es pura magia. Es imposible no enamorarse de este lugar.",
                  name: "María González",
                  role: "Corazón conquistado",
                  initials: "MG",
                },
                {
                  text: "Este lugar tiene alma. Cada pizza cuenta una historia, cada llama del horno susurra secretos de tradición. La Fior del Sur no es solo comida, es una experiencia que te transporta a los rincones más cálidos del corazón.",
                  name: "Carlos Mendoza",
                  role: "Alma cautivada",
                  initials: "CM",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-10 border-2 shadow-2xl transform hover:scale-105 transition-all duration-300 theme-transition-element"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-primary)",
                  }}
                >
                  <div className="flex items-center mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-8 h-8 fill-current" style={{ color: "var(--accent-primary)" }} />
                    ))}
                  </div>
                  <p
                    className="text-2xl mb-8 italic leading-relaxed font-medium theme-transition-element"
                    style={{ color: "var(--text-primary)" }}
                  >
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mr-6 shadow-lg"
                      style={{ backgroundColor: "var(--bg-hover)" }}
                    >
                      <span className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                        {testimonial.name}
                      </p>
                      <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </ElementTransition>

      {/* Información de Contacto */}
      <ElementTransition delay={1000}>
        <section
          id="contacto"
          className="py-24 relative theme-transition-element"
          style={{ backgroundColor: "var(--bg-tertiary)" }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2
                className="text-6xl font-bold mb-8 font-serif theme-transition-element"
                style={{ color: "var(--text-primary)" }}
              >
                Nuestro Refugio Cálido
              </h2>
              <p className="text-3xl theme-transition-element" style={{ color: "var(--text-secondary)" }}>
                Donde el fuego nunca se apaga
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: MapPin,
                  title: "Nuestro Hogar",
                  content: ["Av. Bernardo O'Higgins 1234", "Castro, Chiloé"],
                  button: "📍 Cómo Llegar",
                },
                {
                  icon: Clock,
                  title: "Fuego Encendido",
                  content: ["🔥 Horno ardiendo:", "Lunes a Jueves: 18:00 - 23:00", "Viernes a Domingo: 12:00 - 24:00"],
                  button: null,
                },
                {
                  icon: Phone,
                  title: "Conversemos",
                  content: ["📞 +56 9 8765 4321", "✉️ hola@ilcapodicastro.cl"],
                  button: "WhatsApp",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="text-center p-12 rounded-3xl backdrop-blur-sm border shadow-2xl theme-transition-element"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-primary)",
                  }}
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
                    style={{ backgroundColor: "var(--bg-hover)" }}
                  >
                    <contact.icon className="w-12 h-12" style={{ color: "var(--text-primary)" }} />
                  </div>
                  <h3
                    className="text-3xl font-bold mb-6 theme-transition-element"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {contact.title}
                  </h3>
                  {contact.content.map((line, i) => (
                    <p
                      key={i}
                      className="text-xl mb-3 theme-transition-element"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {line}
                    </p>
                  ))}
                  {contact.button && (
                    <Button
                      className={`font-bold text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${index === 2 ? "bg-green-800 hover:bg-green-700" : "border-2"}`}
                      style={
                        index !== 2
                          ? {
                              borderColor: "var(--border-secondary)",
                              color: "var(--text-secondary)",
                              backgroundColor: "transparent",
                            }
                          : {}
                      }
                      variant={index === 2 ? "default" : "outline"}
                    >
                      {index === 2 && <MessageCircle className="w-6 h-6 mr-3" />}
                      {contact.button}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </ElementTransition>

      {/* Footer */}
      <ElementTransition delay={1200}>
        <footer className="py-16 relative theme-transition-element" style={{ backgroundColor: "var(--bg-tertiary)" }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-12 md:mb-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-6">
                  <Flame
                    className="w-12 h-12 mr-4 theme-transition-element"
                    style={{ color: "var(--accent-primary)" }}
                  />
                  <div>
                    <div
                      className="text-4xl font-bold font-serif theme-transition-element"
                      style={{ color: "var(--text-primary)" }}
                    >
                      IL CAPO DI CASTRO
                    </div>
                    <p className="italic text-lg theme-transition-element" style={{ color: "var(--text-secondary)" }}>
                      La tradición napolitana con alma chilota
                    </p>
                  </div>
                </div>
                <p className="text-xl theme-transition-element" style={{ color: "var(--text-secondary)" }}>
                  🔥 Donde cada llama cuenta una historia
                </p>
              </div>
              <div className="flex space-x-10">
                <Link
                  href="#"
                  className="transition-all duration-500 font-bold text-xl theme-transition-element"
                  style={{ color: "var(--text-secondary)" }}
                >
                  📘 Facebook
                </Link>
                <Link
                  href="#"
                  className="transition-all duration-500 font-bold text-xl theme-transition-element"
                  style={{ color: "var(--text-secondary)" }}
                >
                  📸 Instagram
                </Link>
                <Link
                  href="#"
                  className="transition-all duration-500 font-bold text-xl theme-transition-element"
                  style={{ color: "var(--text-secondary)" }}
                >
                  🎵 TikTok
                </Link>
              </div>
            </div>
            <div
              className="mt-12 pt-12 text-center border-t theme-transition-element"
              style={{
                borderColor: "var(--border-primary)",
                color: "var(--text-secondary)",
              }}
            >
              <p className="text-lg">
                &copy; 2024 Il Capo di Castro - Pizzería del Corazón. Todos los derechos reservados.
              </p>
              <p className="text-lg mt-3">🍕 Hecho con amor, fuego y tradición en Castro, Chiloé</p>
            </div>
          </div>
        </footer>
      </ElementTransition>

      {/* WhatsApp Floating Button */}
      <ElementTransition delay={1400}>
        <div className="fixed bottom-10 right-10 z-50">
          <Button
            className="rounded-full w-20 h-20 shadow-2xl border-4 hover:scale-110 transition-all duration-300 bg-green-800 hover:bg-green-700 theme-transition-element"
            style={{ borderColor: "var(--bg-primary)" }}
          >
            <MessageCircle className="w-10 h-10" />
          </Button>
        </div>
      </ElementTransition>
    </div>
  )
}

export default function HomePage() {
  return <PageContent />
}
