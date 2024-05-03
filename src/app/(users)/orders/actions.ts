import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

interface Order {
  id: string
  status: 'new' | 'cooking' | 'delivering' | 'delivered' | 'cancelled'
  total: number
  userId: string
  createdAt: string
}

export function useGetOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .get('/orders/user')
      .then((res) => setOrders(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  return { orders, error, isLoading }
}

interface OrderByIdResponse {
  id: string
  status: 'new' | 'cooking' | 'delivering' | 'delivered' | 'cancelled'
  total: number
  userId: string
  createdAt: string
  orderItems: {
    id: string
    productId: string
    orderId: string
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL'
    quantity: number
  }[]
}

export function useGetOrder(id: string) {
  const [data, setData] = useState<OrderByIdResponse | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  return { data, error, isLoading }
}

interface Product {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
}

export function useGetProduct(id: string) {
  const [data, setData] = useState<Product | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  return { data, error, isLoading }
}
