import { FlatList } from 'react-native'
import { OrderInfo } from '@/components/order-info'
import { useGetOrders } from '../actions'

export default function OrdersScreen() {
  const { orders } = useGetOrders()

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 12, padding: 10 }}
      data={orders}
      renderItem={({ item }) => <OrderInfo order={item} />}
    />
  )
}
