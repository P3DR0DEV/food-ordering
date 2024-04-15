import { Image, Text, View } from 'react-native';

interface ProductListItemProps {
  id: number;
  image: string | null;
  name: string;
  price: number;
}
const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

export function ProductListItem({ image, name, price }: ProductListItemProps) {
  return (
    <View className='bg-white p-2.5 rounded-3xl flex-1 max-w-1/2' style={{ maxWidth: '50%' }}>
      <Image className='w-full aspect-square' source={{ uri: image || defaultImage }} resizeMode='contain'/>
      <Text className='text-2xl font-semibold my-2.5'>{name}</Text>
      <Text className='text-[#2f95dc] text-bold'>${price}</Text>
    </View>
  );
}
