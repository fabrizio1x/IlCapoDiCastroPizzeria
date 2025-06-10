import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { CartProvider } from "@/contexts/cart-context"
import ScrollFireParticles from "@/components/scroll-fire-particles"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Il Capo di Castro - Pizzería Artesanal",
  description:
    "La tradición napolitana con alma chilota. Pizzas artesanales cocinadas en horno a leña en Castro, Chiloé.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <CartProvider>
            <ScrollFireParticles />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
