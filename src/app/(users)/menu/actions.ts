import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export function useProducts() {
  const [data, setData] = useState<Product[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .get('/products')
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  return { data, error, isLoading }
}

export function getProduct(id: string) {
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
