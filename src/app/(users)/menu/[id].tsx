import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicatorBase, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import NotFoundScreen from '@/app/+not-found'
import { defaultImage } from '@/constants/Links'
import { useState } from 'react'
import { Button } from '@/components/button'
import { useCart } from '@/context/CartProvider'
import { PizzaSize } from '@/types'
import { getProduct } from './actions'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

export default function Product() {
  const { id } = useLocalSearchParams()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const { onAddItem } = useCart()

  const { data: product, isLoading } = getProduct(id[0])
  const router = useRouter()

  function addToCart() {
    if (!product) return
    onAddItem(product, selectedSize)
    router.push('/cart')
  }

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicatorBase color="black" />}
      {product && (
        <>
          <Stack.Screen options={{ title: product.name }} />
          <Image source={{ uri: product.imageUrl || defaultImage }} style={styles.image} />
          <Text>Select size</Text>
          <View style={styles.sizesContainer}>
            {sizes.map((size) => (
              <Pressable
                onPress={() => setSelectedSize(size)}
                key={size}
                style={[styles.sizesView, { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }]}
              >
                <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gray' }]}>{size}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.price}>${product.price}</Text>
          <Button text="Add to cart" onPress={addToCart} />
        </>
      )}
      {!product && !isLoading && <NotFoundScreen />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  sizesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sizesView: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
})
