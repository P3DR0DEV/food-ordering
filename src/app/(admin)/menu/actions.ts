import { api } from '@/lib/axios'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  description?: string | null
  price: number
  imageUrl?: string | null
}

export function useCreateProduct(name: string, price: number, imageUrl: string | null) {
  const [data, setData] = useState<{ product: Product } | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  api
    .post('/products', {
      name,
      price,
      imageUrl,
    })
    .then((response) => {
      setData(response.data)
    })
    .catch((err) => {
      setError(err)
    })
    .finally(() => {
      setIsLoading(false)
    })

  return { data, error, isLoading }
}

export function useGetProducts() {
  const [data, setData] = useState<{ products: Product[] }>({ products: [] })
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  api
    .get('/products')
    .then((response) => {
      setData(response.data)
    })
    .catch((err) => {
      setError(err)
    })
    .finally(() => {
      setIsLoading(false)
    })

  return { data, error, isLoading }
}
