# Pizzeria Íl Capo di Castro 🍕

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PNPM](https://img.shields.io/badge/PNPM-F69200?style=for-the-badge&logo=pnpm&logoColor=white)

App de menú de pizzas desarrollada con **Next.js**, **Firebase**, **TailwindCSS** y **PNPM**.

## 🚚 Descripción
**Pizzería Íl Capo di Castro** es una plataforma web para la gestión de un menú dinámico de pizzas, inspirada en la fusión Ítalo/Chilota. Este proyecto celebra el arte de los ‘pizzaioli’ napolitanos, reconocido como Patrimonio Cultural Inmaterial de la Humanidad. Con categorías como "premium" y "signature", permite explorar, visualizar y gestionar pizzas de manera eficiente y atractiva.

## 🛠️ Tecnologías principales
- **Next.js**: Framework principal para la construcción de la aplicación web.
- **Firebase / Firestore**: Backend en la nube, autenticación y base de datos en tiempo real.
- **Tailwind CSS**: Framework de estilos para un diseño moderno, elegante y consistente.
- **PNPM**: Gestor de paquetes rápido y eficiente.

## 🗂️ Vistas principales

- **Inicio** (con menú dinámico de pizzas)
- **Categorías de pizzas** (premium y signature)
- **Modo offline** (datos locales cuando Firebase no está disponible)
- **Delivery**
- **Pedido para Llevar**
- **Reserva**
- **Carrito de compras**
- **Checkout**

## 🚀 Características
- **Menú dinámico**: Los datos de las pizzas se cargan desde Firebase.
- **Modo offline**: Carga de datos locales cuando Firebase no está disponible.
- **Interfaz moderna**: Diseño responsivo y atractivo.

## 🛠️ Configuración del proyecto

### Requisitos
1. Node.js (v16 o superior).
2. PNPM como gestor de paquetes.
3. Una cuenta de Firebase(Si escoges esta base de datos para el proyecto)

### Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/fabrizio1x/IlCapoDiCastroPizzeria.git
   cd IlCapoDiCastroPizzeria
   ```

**💡 Instalación rápida:** Consulta el archivo `instalar-requerimientos.txt` para ver los comandos paso a paso.

### Configuración de Firebase

1. **Crea un proyecto en Firebase:**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto
   - Habilita Firestore Database y Authentication

2. **Configura el archivo Firebase:**
   - En la carpeta `lib/` encontrarás el archivo `firebase.ejemplo.ts`
   - Copia este archivo y renómbralo a `firebase.ts`:
     ```bash
     cp lib/firebase.ejemplo.ts lib/firebase.ts
     ```
   - Abre `lib/firebase.ts` y rellena las credenciales de tu proyecto Firebase:
     ```typescript
     const firebaseConfig = {
       apiKey: "tu-api-key",
       authDomain: "tu-proyecto.firebaseapp.com",
       projectId: "tu-proyecto-id",
       storageBucket: "tu-proyecto.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abcdef123456",
       measurementId: "G-XXXXXXXXXX" // Opcional
     }
     ```

3. **Configura las reglas de seguridad:**
   - Ve a Firestore Database en Firebase Console
   - Copia y pega las reglas desde `firestore.rules`

4. **Configura los índices:**
   - Copia y pega los índices desde `firestore.indexes.json`

### Ejecución
1. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📚 Tutorial: Conecta tu Firebase

### Paso 1: Configura Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Crea un nuevo proyecto.
3. Habilita Firestore Database y Authentication.

### Paso 2: Configura las reglas de seguridad
1. Ve a la sección de Firestore Database.
2. Copia y pega las reglas de seguridad desde `firestore.rules`.

### Paso 3: Configura los índices
1. Ve a la sección de Firestore Database.
2. Copia y pega los índices desde `firestore.indexes.json`.


## 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request para sugerencias o mejoras. Consulta la [guía de contribución](CONTRIBUTING.md).

## ⚖️ Licencia
Este proyecto está bajo la licencia [MIT](LICENSE).

## ⚠️ Notas de seguridad
- Este proyecto incluye archivos de ejemplo y un instructivo para conectar tu propio backend de Firebase.
- Asegúrate de agregar todos los archivos sensibles al `.gitignore` para proteger tus credenciales y datos privados.

---

**Desarrollado por Fabrizio**
