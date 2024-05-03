export type PizzaSize = 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type Product = {
  id: string
  imageUrl: string | null
  name: string
  price: number
}

export type OrderItem = {
  id: string
  productId: string
  orderId: string
  size: PizzaSize
  quantity: number
}

export type OrderStatus = 'new' | 'cooking' | 'delivering' | 'delivered' | 'cancelled'

export type Order = {
  id: string
  createdAt: string
  total: number
  userId: string
  status: OrderStatus

  orderItems?: OrderItem[]
}

export type CartItem = {
  id: string
  product: Product
  productId: string
  size: PizzaSize
  quantity: number
}
