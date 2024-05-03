import { FlatList } from 'react-native'
import { ProductListItem } from '@/components/productListItem'
import { useGetProducts } from './actions'

export default function MenuScreen() {
  const { data } = useGetProducts()

  return (
    <FlatList
      data={data.products}
      renderItem={({ item }) => <ProductListItem key={item.id} {...item} />}
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  )
}
