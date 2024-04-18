import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Link, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import { CartProvider, useCart } from '@/context/CartProvider'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const { clearCart } = useCart()

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar style="dark" />
      <CartProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(admin)" options={{ headerShown: false }} />
          <Stack.Screen name="(users)" options={{ headerShown: false }} />
          <Stack.Screen
            name="cart"
            //! Opções que podem ser passadas para o componente Stack.Screen que representa o header da tela
            options={{
              presentation: 'modal',
              title: 'Cart',
              headerTitleAlign: 'left',
              //! Para estilizar o Title no IOS deve ser criado um novo componente e estilizado manualmente
              headerTitle: (props) => (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.children}</Text>
                </View>
              ),
              //! Cria um botão para limpar o carrinho
              headerRight: () => (
                <Link href="/(users)/menu" asChild>
                  <Pressable onPress={clearCart} style={styles.button}>
                    <Text>Clear</Text>
                    <Ionicons name="trash-outline" size={24} color="#ef4444" />
                  </Pressable>
                </Link>
              ),
            }}
          />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
})
