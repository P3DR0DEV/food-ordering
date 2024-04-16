import { FlatList } from 'react-native';
import { products } from '@/api/data/products';
import { ProductListItem } from '@/components/ProductListItem';

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (<ProductListItem key={item.id} {...item} />)}
      numColumns={2}
      columnWrapperStyle={{gap: 10}}
      contentContainerStyle={{gap: 10, padding: 10}}
    />
  );
}
