"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export default function CartIndicator() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Link href="/delivery">
      <Button
        variant="outline"
        size="sm"
        className="relative border-2 transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-primary)",
          color: "var(--text-primary)",
        }}
      >
        <ShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <span
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center animate-pulse"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--bg-primary)",
            }}
          >
            {totalItems}
          </span>
        )}
        <span className="sr-only">Carrito de compras</span>
      </Button>
    </Link>
  )
}
