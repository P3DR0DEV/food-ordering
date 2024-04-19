import orders from '@/api/data/orders'
import NotFoundScreen from '@/app/+not-found'
import { OrderInfo } from '@/components/order-info'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, View } from 'react-native'
import { OrderItem } from './_components/order-item'

export default function OrderScreen() {
  const { id } = useLocalSearchParams()

  if (!id) {
    return <NotFoundScreen />
  }
  const order = orders.find((order) => order.id.toString() === id)

  if (!order) {
    return <NotFoundScreen />
  }
  return (
    <View style={{ padding: 16, gap: 16, flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Order #' + id,
        }}
      />
      <FlatList
        contentContainerStyle={{ gap: 12 }}
        data={order.order_items}
        renderItem={({ item }) => <OrderItem {...item} />}
        ListHeaderComponent={() => <OrderInfo order={order} />}
      />
    </View>
  )
}
