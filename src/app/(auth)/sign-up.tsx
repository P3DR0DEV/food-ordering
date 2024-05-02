import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, router, Stack } from 'expo-router'
import { useState } from 'react'
import { Text, View } from 'react-native'
import * as Burnt from 'burnt'

import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { KeyboardAvoidContainer } from '@/components/keyboardAvoidContainer'

import { signUp as signUpAction } from './actions'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function toggleShowPassword() {
    setShowPassword(!showPassword)
  }

  async function handleSignUp() {
    const { status, data } = await signUpAction({
      name,
      email,
      password,
    })

    if (status === 201 && data) {
      Burnt.toast({
        title: 'Success',
        preset: 'done',
        message: 'User created successfully',
      })
      return router.push('/(auth)/')
    }

    Burnt.toast({
      title: 'Error',
      preset: 'error',
      message: data?.message,
    })
  }

  return (
    <KeyboardAvoidContainer>
      <Stack.Screen options={{ title: 'Sign in', headerShown: true }} />
      <View style={{ gap: 16 }}>
        {/* Login user Name field */}
        <Input>
          <Input.Label style={{ marginBottom: 4 }}>Name</Input.Label>
          <Input.Icon>
            <MaterialIcons name="person-outline" size={20} color="black" />
            <Input.Field placeholder="Your Name" value={name} onChangeText={setName} />
          </Input.Icon>
        </Input>

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

      <Button text="Create Account" style={{ marginTop: 20 }} onPress={handleSignUp} />

      <Text style={{ textAlign: 'center', marginVertical: 10 }}>
        Already have an account?
        <Link href="/" style={{ color: 'blue' }}>
          Sign In
        </Link>
      </Text>
    </KeyboardAvoidContainer>
  )
}
