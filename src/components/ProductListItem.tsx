import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, useSegments } from 'expo-router';
import { defaultImage } from '@/constants/Links';

interface ProductListItemProps {
  id: number;
  image: string | null;
  name: string;
  price: number;
}

export function ProductListItem({ id, image, name, price }: ProductListItemProps) {
  const segments = useSegments();

  const path = segments[0] === '(admin)' ? '(admin)' : '(users)';
  return (
    <Link href={`/${path}/menu/${id}`} asChild>
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