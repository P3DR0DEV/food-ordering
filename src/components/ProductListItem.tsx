import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

interface ProductListItemProps {
  id: number;
  image: string | null;
  name: string;
  price: number;
}
const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

export function ProductListItem({ id, image, name, price }: ProductListItemProps) {
  return (
    <Link href={`/menu/${id}`} asChild>
      <Pressable style={styles.container} >
        <Image style={styles.image} source={{ uri: image || defaultImage }} resizeMode='contain' />
        <View>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </Pressable>
    </Link>
  );
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
  }
})