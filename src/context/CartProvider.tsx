
import { CartItem, Product } from "@/types";
import { createContext, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto'



type CartContext = {
  items: CartItem[],
  onAddItem: (product: Product, size: CartItem['size']) => void,
  onRemoveItem: (productId: string) => void
  onUpdateItem: (productId: string, quantity: -1 | 1) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContext>({ items: [], onAddItem: () => {}, onRemoveItem: () => {}, onUpdateItem: () => {}, clearCart: () => {} });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const onAddItem = (product: Product, size: CartItem['size']) => {
    const item = items.find(item => item.product_id === product.id && item.size === size)
    if (item) {
      onUpdateItem(item.id, 1)
      return
    }

    const newCartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1
    }

    setItems([...items, newCartItem])
  }

  const clearCart = () => setItems([])

  const onUpdateItem = (productId: string, quantity: -1 | 1) => {
    const updatedItems = items.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + quantity
        }
      }
      return item
    })
    .filter(item => item.quantity > 0)


    setItems(updatedItems)
  }

  const onRemoveItem = (productId: string) => {
    const index = items.findIndex(item => item.id === productId)

    if (index < 0) return
    
    const [removedItem] = items.splice(index, 1)
    
    setItems(removedItem ? [...items] : [])
  }
  return (
    <CartContext.Provider value={{items, onAddItem, onRemoveItem, onUpdateItem, clearCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)