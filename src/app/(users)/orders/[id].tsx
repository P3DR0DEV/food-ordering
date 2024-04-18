import orders from '@/api/data/orders'
import NotFoundScreen from '@/app/+not-found'
import { OrderInfo } from '@/components/order-info'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'

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
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Stack.Screen
        options={{
          title: 'Order #' + id,
        }}
      />
      <OrderInfo order={order} />
    </ScrollView>
  )
}
