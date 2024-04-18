import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Link, router, Stack } from 'expo-router'
import { Text, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useState } from 'react'
import { KeyboardAvoidContainer } from '@/components/keyboardAvoidContainer'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  async function signIn() {
    router.push('/(admin)')
  }

  return (
    <KeyboardAvoidContainer>
      <Stack.Screen options={{ title: 'Sign in', headerShown: true }} />
      <View style={{ gap: 16 }}>
        {/* Login user Email field */}
        <Input>
          <Input.Label style={{ marginBottom: 4 }}>Email</Input.Label>
          <Input.Icon>
            <MaterialIcons name="alternate-email" size={20} color="black" />
            <Input.Field placeholder="Email" value={email} onChangeText={setEmail} />
          </Input.Icon>
        </Input>

        {/* Login user Password field */}
        <Input>
          <Input.Label style={{ marginBottom: 4 }}>Password</Input.Label>
          <Input.Icon>
            <MaterialIcons name="password" size={20} color="black" />
            <Input.Field
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={20} onPress={toggleShowPassword} />
          </Input.Icon>
        </Input>
      </View>

      <Button text="Sign in" style={{ marginTop: 20 }} onPress={signIn} />

      <Text style={{ textAlign: 'center', marginVertical: 10 }}>
        Don't have an account?{' '}
        <Link href="/sign-up" style={{ color: 'blue' }}>
          Sign up
        </Link>
      </Text>
    </KeyboardAvoidContainer>
  )
}
