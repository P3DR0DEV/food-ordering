import { FlatList } from 'react-native'
import orders from '@/api/data/orders'
import { OrderInfo } from '@/components/order-info'

export default function OrdersScreen() {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 12, padding: 10 }}
      data={orders}
      renderItem={({ item }) => <OrderInfo order={item} />}
    />
  )
}
