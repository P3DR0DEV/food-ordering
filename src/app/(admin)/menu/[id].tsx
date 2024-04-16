import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import { products } from "@/api/data/products";
import NotFoundScreen from "@/app/+not-found";
import { defaultImage } from "@/constants/Links";




export default function Product() {
  const { id } = useLocalSearchParams()
  const product = products.find(product => product.id.toString() === id)

  return (
    <View style={styles.container}>
      {/* Redirect to 404 if product is not found */}
      {!product && <NotFoundScreen />}

      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultImage }} style={styles.image} />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
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
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto'
  }
})