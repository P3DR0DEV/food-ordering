import { Stack, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { products } from "@/api/data/products";
import NotFoundScreen from "@/app/+not-found";
import { defaultImage } from "@/constants/Links";
import { useState } from "react";

const sizes = ['S', 'M', 'L', 'XL']

type Sizes = 'S' | 'M' | 'L' | 'XL'

export default function Product() {
  const { id } = useLocalSearchParams()
  const [selectedSize, setSelectedSize] = useState<Sizes>('M')

  const product = products.find(product => product.id.toString() === id)

  return (
    <View style={styles.container}>
      {
        product &&
        <>
          <Stack.Screen options={{ title: product.name }} />
          <Image source={{ uri: product.image || defaultImage }} style={styles.image} />
          <Text>Select size</Text>
          <View style={styles.sizesContainer}>

          {sizes.map((size) => (
            <Pressable onPress={() => setSelectedSize(size as Sizes)} key={size} style={[styles.sizesView, { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }]}>
              <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gray' }]}>{size}</Text>
            </Pressable>
            )
            )}
            </View>
          <Text style={styles.price}>${product.price}</Text>
        </>
      }
      {!product && <NotFoundScreen />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  sizesContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginVertical: 10
  },
  sizesView: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius:25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize:20, 
    fontWeight: '500'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})