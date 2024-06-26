import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import NotFoundScreen from '@/app/+not-found'
import { defaultImage } from '@/constants/Links'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useGetProduct } from '../orders/actions'

export default function Product() {
  const { id } = useLocalSearchParams()

  const { data: product } = useGetProduct(id as string)

  //  Redirect to 404 if product is not found
  if (!product) return <NotFoundScreen />

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/edit/${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image source={{ uri: product.imageUrl || defaultImage }} style={styles.image} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
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
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
})
