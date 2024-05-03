import NotFoundScreen from '@/app/+not-found'
import { OrderInfo } from '@/components/order-info'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, View } from 'react-native'
import { OrderItem } from './_components/order-item'
import { OrderStatusList } from './_components/order-status'
import { useGetOrder } from './actions'

export default function OrderScreen() {
  const { id } = useLocalSearchParams()

  if (!id) {
    return <NotFoundScreen />
  }
  const { data: order } = useGetOrder(id as string)

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
        data={order.orderItems}
        renderItem={({ item }) => <OrderItem {...item} />}
        ListHeaderComponent={() => <OrderInfo order={order} />}
        ListFooterComponent={() => <OrderStatusList orderId={id as string} status={order.status} />}
      />
    </View>
  )
}
