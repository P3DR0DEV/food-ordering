import Colors from '@/constants/Colors'
import { OrderStatus } from '@/types'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useStatusChange } from '../actions'

const statusList: OrderStatus[] = ['new', 'cooking', 'delivering', 'delivered', 'cancelled']

export function OrderStatusList({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const [orderStatus, setOrderStatus] = useState(status)

  function handleStatusChange(status: OrderStatus) {
    setOrderStatus(status)
    if (status === 'new') return

    useStatusChange(orderId, status)
  }

  return (
    <View style={{ gap: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'space-around' }}>
        {statusList.map((status) => (
          <Pressable
            onPress={() => handleStatusChange(status)}
            key={status}
            style={[
              styles.statusView,
              {
                backgroundColor: orderStatus === status ? Colors.light.tint : 'transparent',
              },
            ]}
          >
            <Text style={[styles.statusText, { color: orderStatus === status ? 'white' : Colors.light.tint }]}>
              {status}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statusView: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    minWidth: 70,
  },
  statusText: {
    textAlign: 'center',
  },
})
