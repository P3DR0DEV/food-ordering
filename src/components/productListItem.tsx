import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Link, useSegments } from 'expo-router'
import { defaultImage } from '@/constants/Links'

interface ProductListItemProps {
  id: string
  imageUrl?: string | null
  name: string
  price: number
  description?: string | null
}

export function ProductListItem({ id, imageUrl, name, price }: ProductListItemProps) {
  const segments = useSegments()

  return (
    <Link href={`/${segments[0]}/menu/${id}`} asChild>
      <Pressable style={styles.container}>
        <Image style={styles.image} source={{ uri: imageUrl || defaultImage }} resizeMode="contain" />
        <View>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: '50%',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
    color: '#2f95dc',
  },
})
