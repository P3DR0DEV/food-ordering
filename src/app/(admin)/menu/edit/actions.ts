import { api } from '@/lib/axios'
import { Product } from '@/types'
import { useState } from 'react'

export function useDeleteProduct(id: string) {
  const [data, setData] = useState<{ message: string } | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  api
    .delete<{ message: string }>(`/products/${id}`)
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

interface UpdateProductProps {
  id: string
  description: string | null
  name: string
  price: number
  imageUrl: string | null
}
export function useUpdateProduct({ id, description, name, price, imageUrl }: UpdateProductProps) {
  const [data, setData] = useState<{ product: Product }>()
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  api
    .put<{ product: Product }>(`/products/${id}`, {
      name,
      price,
      description,
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
