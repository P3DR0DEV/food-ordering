import Colors from '@/constants/Colors'
import { defaultImage } from '@/constants/Links'
import { PizzaSize } from '@/types'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useGetProduct } from '../actions'
import NotFoundScreen from '@/app/+not-found'

interface OrderItemProps {
  orderId: string
  productId: string
  size: PizzaSize
  quantity: number
}

export function OrderItem({ size, quantity, productId }: OrderItemProps) {
  const { data: product } = useGetProduct(productId)

  if (!product) return <NotFoundScreen />

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Image style={styles.image} source={{ uri: product.imageUrl || defaultImage }} resizeMode="contain" />
        <View style={{ gap: 4 }}>
          <Text style={{ fontWeight: 'bold' }}>{product.name}</Text>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
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
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gainsboro',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  image: {
    aspectRatio: 1,
    width: 50,
  },
  price: {
    fontWeight: 'bold',
    color: Colors.light.tint,
    fontSize: 14,
  },
})
