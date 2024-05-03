import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Order } from '@/types'
import { compareDates } from '@/util/format-date'
import { Link, useSegments } from 'expo-router'

function OrderInfo({ order }: { order: Order }) {
  const date = compareDates(new Date(order.createdAt))
  const segments = useSegments()

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontWeight: 'bold' }}>Order #{order.id}</Text>
          <Text style={{ fontWeight: '300', color: 'gray' }}>{date}</Text>
        </View>
        <Text style={{ fontWeight: '600' }}>{order.status}</Text>
      </Pressable>
    </Link>
  )
}

export { OrderInfo }

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
})
