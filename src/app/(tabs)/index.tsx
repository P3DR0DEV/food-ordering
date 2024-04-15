import { FlatList } from 'react-native';
import { products } from '@/api/data/products';
import { ProductListItem } from '@/components/ProductListItem';

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (<ProductListItem key={item.id} {...item} />)}
      numColumns={2}
      columnWrapperClassName='gap-2.5'
      contentContainerClassName='gap-2.5 p-2.5'
    />
  );
}
