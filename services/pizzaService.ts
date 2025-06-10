import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  getDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Pizza, PizzaFormData } from "@/types/pizza"

const COLLECTION_NAME = "pizzas"

// Datos de respaldo (solo se usan si Firebase falla)
function getFallbackPizzas(): Pizza[] {
  return [
    {
      id: "fallback-pulmay",
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fallback-fior",
      name: "Fior del Sur",
      ingredients: "Mozzarella di bufala, jamón curado, queso de campo, gotas de pebre artesanal",
      price: 8500,
      category: "premium",
      description: "La elegancia italiana abraza los sabores sureños en esta creación que conquista corazones.",
      badge: "⭐ Premium",
      icon: "Star",
      imageUrl: "/placeholder.svg?height=300&width=400",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fallback-luma",
      name: "Luma y Mar",
      ingredients: "Base blanca, choritos ahumados, queso de Chonchi, ajo confitado, cilantro fresco",
      price: 8500,
      category: "premium",
      description: "Donde el bosque nativo se encuentra con el mar, creando una experiencia gastronómica inolvidable.",
      badge: "🌲 Nativa",
      icon: "TreePine",
      imageUrl: "/placeholder.svg?height=300&width=400",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fallback-trapananda",
      name: "Trapananda",
      ingredients: "Cordero desmenuzado, mozzarella, merkén suave, cebolla morada, toque de menta",
      price: 8000,
      category: "signature",
      description: "Inspirada en las tierras patagónicas, esta pizza lleva el nombre histórico de nuestra región.",
      badge: "🏔️ Patagónica",
      icon: "Mountain",
      imageUrl: "/placeholder.svg?height=300&width=400",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fallback-volcanica",
      name: "La Volcánica",
      ingredients: "Salsa de tomate, salame picante, queso de oveja, papas nativas, merkén",
      price: 8000,
      category: "signature",
      description: "Ardiente como los volcanes del sur, esta pizza despierta todos los sentidos con su intensidad.",
      badge: "🌋 Picante",
      icon: "Flame",
      imageUrl: "/placeholder.svg?height=300&width=400",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fallback-chonchina",
      name: "La Chonchina",
      ingredients: "Queso de Chonchi, longaniza ahumada, cebolla caramelizada, mozzarella fior di latte",
      price: 7500,
      category: "signature",
      description:
        "Un homenaje a la tradición de Chonchi, donde cada ingrediente cuenta la historia de nuestra tierra.",
      badge: "🏘️ Tradicional",
      icon: "Leaf",
      imageUrl: "/placeholder.svg?height=300&width=400",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fallback-italo",
      name: "Italo-Chilota",
      ingredients: "Salsa San Marzano, queso mantecoso, papas michuñe, albahaca fresca, aceite de oliva",
      price: 7500,
      category: "signature",
      description:
        "La perfecta fusión entre Italia y Chiloé, donde las papas nativas abrazan la tradición mediterránea.",
      badge: "🇮🇹 Fusión",
      icon: "Leaf",
      imageUrl: "/placeholder.svg?height=300&width=400",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fallback-nalca",
      name: "La Nalca",
      ingredients: "Mozzarella, pesto de nalca, queso de campo, tomates cherry, almendras tostadas",
      price: 7500,
      category: "signature",
      description: "Celebrando la flora nativa chilota con el sabor único de la nalca en una combinación sorprendente.",
      badge: "🌿 Silvestre",
      icon: "Leaf",
      imageUrl: "/placeholder.svg?height=300&width=400",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fallback-margarita",
      name: "Margarita",
      ingredients: "Salsa San Marzano, mozzarella, albahaca fresca",
      price: 6500,
      category: "signature",
      description:
        "La reina de las pizzas en su versión más pura, perfecta para quienes buscan la tradición auténtica.",
      badge: "👑 Clásica",
      icon: "Star",
      imageUrl: "/placeholder.svg?height=300&width=400",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

// Obtener todas las pizzas activas
export async function getAllPizzas(): Promise<Pizza[]> {
  try {
    console.log("🔍 Obteniendo pizzas desde Firebase...")

    const q = query(
      collection(db, COLLECTION_NAME),
      where("isActive", "==", true),
      orderBy("category", "desc"), // premium primero
      orderBy("name", "asc"),
    )

    const querySnapshot = await getDocs(q)
    const pizzas: Pizza[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      pizzas.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Pizza)
    })

    console.log(`✅ ${pizzas.length} pizzas obtenidas desde Firebase`)
    return pizzas
  } catch (error) {
    console.error("❌ Error obteniendo pizzas desde Firebase:", error)

    // Datos de respaldo solo si Firebase falla completamente
    console.log("🔄 Usando datos de respaldo...")
    return getFallbackPizzas()
  }
}

// Obtener pizzas por categoría
export async function getPizzasByCategory(category: "signature" | "premium"): Promise<Pizza[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("isActive", "==", true),
      where("category", "==", category),
      orderBy("name", "asc"),
    )

    const querySnapshot = await getDocs(q)
    const pizzas: Pizza[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      pizzas.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Pizza)
    })

    return pizzas
  } catch (error) {
    console.error("Error fetching pizzas by category:", error)
    return getFallbackPizzas().filter((pizza) => pizza.category === category)
  }
}

// Obtener una pizza por ID
export async function getPizzaById(id: string): Promise<Pizza | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Pizza
    } else {
      return null
    }
  } catch (error) {
    console.error("Error fetching pizza:", error)
    return null
  }
}

// Agregar una nueva pizza
export async function addPizza(pizzaData: PizzaFormData): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...pizzaData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    console.log(`✅ Pizza "${pizzaData.name}" agregada con ID: ${docRef.id}`)
    return docRef.id
  } catch (error) {
    console.error("Error adding pizza:", error)
    return null
  }
}

// Actualizar una pizza
export async function updatePizza(id: string, pizzaData: Partial<PizzaFormData>): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      ...pizzaData,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error("Error updating pizza:", error)
    return false
  }
}

// Eliminar una pizza (soft delete)
export async function deletePizza(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      isActive: false,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error("Error deleting pizza:", error)
    return false
  }
}

// Eliminar permanentemente una pizza
export async function permanentDeletePizza(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.error("Error permanently deleting pizza:", error)
    return false
  }
}

// Verificar conexión con Firebase
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    console.log("🔍 Probando conexión con Firebase...")
    const testQuery = query(collection(db, COLLECTION_NAME))
    await getDocs(testQuery)
    console.log("✅ Conexión con Firebase exitosa")
    return true
  } catch (error) {
    console.error("❌ Error de conexión con Firebase:", error)
    return false
  }
}
