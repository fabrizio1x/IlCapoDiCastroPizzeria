// Script para inicializar Firebase con todas las pizzas
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore"

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAnIUjpyozXJcQVCDsOj0-NN_tCm87LSCE",
  authDomain: "pizzeria-ilcapo.firebaseapp.com",
  projectId: "pizzeria-ilcapo",
  storageBucket: "pizzeria-ilcapo.firebasestorage.app",
  messagingSenderId: "909810371621",
  appId: "1:909810371621:web:d24866f824baa70cce43cc",
  measurementId: "G-JX99F1LTG8",
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Datos de las pizzas para inyectar
const pizzasData = [
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

async function initializeFirebase() {
  console.log("🔥 Iniciando conexión con Firebase...")
  console.log("📊 Proyecto:", firebaseConfig.projectId)

  try {
    // Verificar si ya existen pizzas en la base de datos
    console.log("🔍 Verificando pizzas existentes...")
    const pizzasRef = collection(db, "pizzas")
    const existingPizzas = await getDocs(pizzasRef)

    if (!existingPizzas.empty) {
      console.log(`⚠️  Ya existen ${existingPizzas.size} pizzas en la base de datos.`)
      console.log("¿Deseas continuar y agregar las pizzas de todos modos? (Se pueden crear duplicados)")

      // En un entorno real, aquí podrías preguntar al usuario
      // Por ahora, continuaremos
      console.log("✅ Continuando con la inicialización...")
    }

    console.log("🍕 Agregando pizzas a Firestore...")

    let successCount = 0
    let errorCount = 0

    for (const [index, pizza] of pizzasData.entries()) {
      try {
        // Verificar si la pizza ya existe por nombre
        const existingQuery = query(collection(db, "pizzas"), where("name", "==", pizza.name))
        const existingDocs = await getDocs(existingQuery)

        if (!existingDocs.empty) {
          console.log(`⏭️  Pizza "${pizza.name}" ya existe, saltando...`)
          continue
        }

        // Agregar timestamps
        const pizzaWithTimestamps = {
          ...pizza,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        const docRef = await addDoc(collection(db, "pizzas"), pizzaWithTimestamps)
        console.log(`✅ ${index + 1}/${pizzasData.length} - "${pizza.name}" agregada con ID: ${docRef.id}`)
        successCount++

        // Pequeña pausa para evitar rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`❌ Error agregando "${pizza.name}":`, error.message)
        errorCount++
      }
    }

    console.log("\n🎉 ¡Inicialización completada!")
    console.log(`✅ Pizzas agregadas exitosamente: ${successCount}`)
    console.log(`❌ Errores: ${errorCount}`)
    console.log(`📊 Total en base de datos: ${successCount + existingPizzas.size}`)

    // Verificar el resultado final
    console.log("\n🔍 Verificando resultado final...")
    const finalPizzas = await getDocs(collection(db, "pizzas"))
    console.log(`📈 Total de pizzas en Firestore: ${finalPizzas.size}`)

    // Mostrar resumen por categoría
    const premiumCount = finalPizzas.docs.filter((doc) => doc.data().category === "premium").length
    const signatureCount = finalPizzas.docs.filter((doc) => doc.data().category === "signature").length

    console.log(`🌟 Pizzas Premium: ${premiumCount}`)
    console.log(`🔥 Pizzas Signature: ${signatureCount}`)

    console.log("\n🚀 ¡Tu base de datos está lista!")
    console.log("🌐 Puedes ver tus datos en: https://console.firebase.google.com/project/pizzeria-ilcapo/firestore")

    return true
  } catch (error) {
    console.error("💥 Error fatal durante la inicialización:", error)
    console.error("Detalles del error:", error.message)

    if (error.code) {
      console.error("Código de error:", error.code)
    }

    console.log("\n🔧 Posibles soluciones:")
    console.log("1. Verifica que las reglas de Firestore permitan escritura")
    console.log("2. Asegúrate de que el proyecto Firebase esté activo")
    console.log("3. Verifica la configuración de Firebase")

    return false
  }
}

// Ejecutar la inicialización
console.log("🍕 IL CAPO DI CASTRO - Inicialización de Base de Datos")
console.log("=".repeat(60))

initializeFirebase()
  .then((success) => {
    if (success) {
      console.log("\n🎊 ¡Proceso completado exitosamente!")
    } else {
      console.log("\n😞 El proceso falló. Revisa los errores arriba.")
    }
  })
  .catch((error) => {
    console.error("\n💥 Error inesperado:", error)
  })
