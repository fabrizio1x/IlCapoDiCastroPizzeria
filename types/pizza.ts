export interface Pizza {
  id: string
  name: string
  ingredients: string
  price: number
  category: "signature" | "premium"
  description: string
  badge: string
  icon: string
  imageUrl?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PizzaFormData {
  name: string
  ingredients: string
  price: number
  category: "signature" | "premium"
  description: string
  badge: string
  icon: string
  imageUrl?: string
  isActive: boolean
}
