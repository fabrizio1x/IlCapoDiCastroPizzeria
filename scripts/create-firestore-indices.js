const admin = require("firebase-admin");

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const firestore = admin.firestore();

async function createIndices() {
  try {
    console.log("🔍 Creando índices en Firestore...");

    // Índice para getAllPizzas
    await firestore.indexes.create({
      collectionGroup: "pizzas",
      fields: [
        { fieldPath: "isActive", mode: "ASCENDING" },
        { fieldPath: "category", mode: "DESCENDING" },
        { fieldPath: "name", mode: "ASCENDING" },
      ],
    });
    console.log("✅ Índice para getAllPizzas creado.");

    // Índice para getPizzasByCategory
    await firestore.indexes.create({
      collectionGroup: "pizzas",
      fields: [
        { fieldPath: "isActive", mode: "ASCENDING" },
        { fieldPath: "category", mode: "ASCENDING" },
        { fieldPath: "name", mode: "ASCENDING" },
      ],
    });
    console.log("✅ Índice para getPizzasByCategory creado.");

    console.log("🎉 Todos los índices han sido creados exitosamente.");
  } catch (error) {
    console.error("❌ Error creando índices:", error);
  }
}

createIndices();