import Colors from '@/constants/Colors'
import { defaultImage } from '@/constants/Links'
import { PizzaSize, Product } from '@/types'
import { Image, StyleSheet, Text, View } from 'react-native'
interface OrderItemProps {
  products: Product
  size: PizzaSize
  quantity: number
}

export function OrderItem({ size, quantity, products }: OrderItemProps) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Image source={{ uri: products.image || defaultImage }} />
        <View>
          <Text style={{ fontWeight: 'bold' }}>{products.name}</Text>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text style={styles.price}>${products.price}</Text>
            <Text style={{ color: 'gray', fontSize: 12, fontWeight: '400' }}>Size: {size}</Text>
          </View>
        </View>
      </View>

      <Text>{quantity}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  price: {
    fontWeight: 'bold',
    color: Colors.light.tint,
    fontSize: 14,
  },
})
