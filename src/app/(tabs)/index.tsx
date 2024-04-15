import { Image, Text, View } from 'react-native';
import { products } from '@/api/data/products';

const product = products[0];
export default function TabOneScreen() {
  return (
    <View className='bg-white p-2.5 rounded-3xl'>
      <Image className='aspect-square w-full ' source={{ uri: product.image }} />
      <Text className='text-2xl font-semibold my-2.5'>{product.name}</Text>
      <Text className='text-[#2f95dc] text-bold'>{product.price}</Text>
    </View>
  );
}
