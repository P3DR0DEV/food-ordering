import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useCart } from '@/context/CartProvider'
import { CartListItem } from '@/components/cartListItem'
import { Button } from '@/components/button'

export default function CartScreen() {
  const { items, calculateTotalValue } = useCart()

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}

      <Text style={styles.totalValue}>Total: {calculateTotalValue()}</Text>
      <Button text="Checkout" />
    </View>
  )
}

const styles = StyleSheet.create({
  totalValue: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
})
