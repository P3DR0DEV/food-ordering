import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "@/context/CartProvider";
import { CartListItem } from "@/components/CartListItem";
import { FontAwesome } from "@expo/vector-icons";
export default function CartScreen() {
  const { items, clearCart } = useCart()

  return (
    <View>
      <Pressable
        onPress={clearCart}
        style={styles.button}
      >
        <Text style={{ color: 'white' }}>Empty Cart</Text>
        <FontAwesome name="trash-o" size={24} color="#ef4444" />
      </Pressable>

      <FlatList data={items} renderItem={({ item }) => (<CartListItem cartItem={item} />)} contentContainerStyle={{ padding: 10, gap: 10 }} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'gainsboro',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf:'flex-end',
    margin: 8
  }
})