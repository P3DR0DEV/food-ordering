import { ActivityIndicatorBase, FlatList } from 'react-native'
import { ProductListItem } from '@/components/productListItem'
import { useProducts } from './actions'

export default function MenuScreen() {
  const { data: products, isLoading } = useProducts()

  return (
    <>
      {isLoading ? (
        <ActivityIndicatorBase color="black" />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductListItem key={item.id} {...item} />}
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ gap: 10, padding: 10 }}
        />
      )}
    </>
  )
}
