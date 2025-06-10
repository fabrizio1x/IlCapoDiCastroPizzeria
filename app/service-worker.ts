/// <reference lib="webworker" />

// Este archivo no será parseado por el compilador de JS/TS
// Se trata como un service worker puro
declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = "il-capo-castro-v1"

// Recursos para cachear inicialmente
const INITIAL_CACHED_RESOURCES = ["/", "/delivery", "/takeaway", "/reservas", "/offline.html"]

// Instalar el service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(INITIAL_CACHED_RESOURCES)
    }),
  )
  // Activar inmediatamente sin esperar a que las pestañas existentes se cierren
  self.skipWaiting()
})

// Activar el service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))
    }),
  )
  // Tomar el control de las páginas no controladas
  self.clients.claim()
})

// Estrategia de caché: Network first, falling back to cache
self.addEventListener("fetch", (event) => {
  // Solo manejar solicitudes GET
  if (event.request.method !== "GET") return

  // Ignorar solicitudes de análisis/métricas
  if (event.request.url.includes("/api/analytics")) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta para almacenarla en caché
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          // Solo cachear respuestas exitosas
          if (response.status === 200) {
            cache.put(event.request, responseToCache)
          }
        })

        return response
      })
      .catch(() => {
        // Si la red falla, intentar desde caché
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // Si no está en caché y es una solicitud de página, mostrar página offline
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html")
          }

          // Para otros recursos, devolver un error 404
          return new Response("Not found", { status: 404 })
        })
      }),
  )
})

// Evento de sincronización en segundo plano
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-orders") {
    event.waitUntil(syncOrders())
  }
})

// Función para sincronizar pedidos pendientes
async function syncOrders() {
  try {
    const db = await openDB()
    const pendingOrders = await db.getAll("pendingOrders")

    for (const order of pendingOrders) {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        })

        if (response.ok) {
          await db.delete("pendingOrders", order.id)
        }
      } catch (error) {
        console.error("Error syncing order:", error)
      }
    }
  } catch (error) {
    console.error("Error accessing IndexedDB:", error)
  }
}

// Función auxiliar para abrir IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("il-capo-offline", 1)

    request.onupgradeneeded = (event) => {
      const db = request.result
      if (!db.objectStoreNames.contains("pendingOrders")) {
        db.createObjectStore("pendingOrders", { keyPath: "id" })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Evento de notificación push
self.addEventListener("push", (event) => {
  if (!event.data) return

  const data = event.data.json()

  const options = {
    body: data.body,
    icon: "/icons/pizza-icon-192.png",
    badge: "/icons/badge-icon-96.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Evento de clic en notificación
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      // Si ya hay una ventana abierta, enfocarla
      for (const client of clientList) {
        if (client.url === event.notification.data.url && "focus" in client) {
          return client.focus()
        }
      }
      // Si no hay ventana abierta, abrir una nueva
      if (self.clients.openWindow) {
        return self.clients.openWindow(event.notification.data.url)
      }
    }),
  )
})
