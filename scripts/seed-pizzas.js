// Script para poblar la base de datos con las pizzas iniciales
import { addPizza } from "../services/pizzaService.js"

const initialPizzas = [
  {
    name: "Pulmay Napoletano",
    ingredients: "Base de ajo y aceite, mariscos de la zona, pesto y rúcula",
    price: 8500,
    category: "premium",
    description:
      "El tesoro del mar chilote se encuentra con la tradición napolitana en una sinfonía de sabores únicos.",
    badge: "🌊 Tesoro del Mar",
    icon: "Fish",
    imageUrl: "/placeholder.svg?height=300&width=400",
    isActive: true,
  },
  {
    name: "Fior del Sur",
    ingredients: "Mozzarella di bufala, jamón curado, queso de campo, gotas de pebre artesanal",
    price: 8500,
    category: "premium",
    description: "La elegancia italiana abraza los sabores sureños en esta creación que conquista corazones.",
    badge: "⭐ Premium",
    icon: "Star",
    imageUrl: "/placeholder.svg?height=300&width=400",
    isActive: true,
  },
  {
    name: "Luma y Mar",
    ingredients: "Base blanca, choritos ahumados, queso de Chonchi, ajo confitado, cilantro fresco",
    price: 8500,
    category: "premium",
    description: "Donde el bosque nativo se encuentra con el mar, creando una experiencia gastronómica inolvidable.",
    badge: "🌲 Nativa",
    icon: "TreePine",
    imageUrl: "/placeholder.svg?height=300&width=400",
    isActive: true,
  },
  {
    name: "Trapananda",
    ingredients: "Cordero desmenuzado, mozzarella, merkén suave, cebolla morada, toque de menta",
    price: 8000,
    category: "signature",
    description: "Inspirada en las tierras patagónicas, esta pizza lleva el nombre histórico de nuestra región.",
    badge: "🏔️ Patagónica",
    icon: "Mountain",
    imageUrl: "/placeholder.svg?height=300&width=400",
    isActive: true,
  },
  {
    name: "La Volcánica",
    ingredients: "Salsa de tomate, salame picante, queso de oveja, papas nativas, merkén",
    price: 8000,
    category: "signature",
    description: "Ardiente como los volcanes del sur, esta pizza despierta todos los sentidos con su intensidad.",
    badge: "🌋 Picante",
    icon: "Flame",
    imageUrl: "/placeholder.svg?height=300&width=400",
    isActive: true,
  },
  {
    name: "La Chonchina",
    ingredients: "Queso de Chonchi, longaniza ahumada, cebolla caramelizada, mozzarella fior di latte",
    price: 7500,
    category: "signature",
    description: "Un homenaje a la tradición de Chonchi, donde cada ingrediente cuenta la historia de nuestra tierra.",
    badge: "🏘️ Tradicional",
    icon: "Leaf",
    imageUrl: "/placeholder.svg?height=300&width=400",
    isActive: true,
  },
  {
    name: "Italo-Chilota",
    ingredients: "Salsa San Marzano, queso mantecoso, papas michuñe, albahaca fresca, aceite de oliva",
    price: 7500,
    category: "signature",
    description: "La perfecta fusión entre Italia y Chiloé, donde las papas nativas abrazan la tradición mediterránea.",
    badge: "🇮🇹 Fusión",
    icon: "Leaf",
    imageUrl: "/placeholder.svg?height=300&width=400",
    isActive: true,
  },
  {
    name: "La Nalca",
    ingredients: "Mozzarella, pesto de nalca, queso de campo, tomates cherry, almendras tostadas",
    price: 7500,
    category: "signature",
    description: "Celebrando la flora nativa chilota con el sabor único de la nalca en una combinación sorprendente.",
    badge: "🌿 Silvestre",
    icon: "Leaf",
    imageUrl: "/placeholder.svg?height=300&width=400",
    isActive: true,
  },
  {
    name: "Margarita",
    ingredients: "Salsa San Marzano, mozzarella, albahaca fresca",
    price: 6500,
    category: "signature",
    description: "La reina de las pizzas en su versión más pura, perfecta para quienes buscan la tradición auténtica.",
    badge: "👑 Clásica",
    icon: "Star",
    imageUrl: "/placeholder.svg?height=300&width=400",
    isActive: true,
  },
]

async function seedPizzas() {
  console.log("🍕 Iniciando población de pizzas...")

  for (const pizza of initialPizzas) {
    try {
      const id = await addPizza(pizza)
      if (id) {
        console.log(`✅ Pizza "${pizza.name}" agregada con ID: ${id}`)
      } else {
        console.log(`❌ Error al agregar pizza "${pizza.name}"`)
      }
    } catch (error) {
      console.error(`❌ Error al agregar pizza "${pizza.name}":`, error)
    }
  }

  console.log("🎉 Población de pizzas completada!")
}

// Ejecutar el script
seedPizzas()
