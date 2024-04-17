import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from "expo-router";
import { KeyboardAvoidingView, Platform, Text, View, ScrollView, SafeAreaView } from "react-native";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useState } from 'react';


export default function Root() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  function toggleShowPassword() { 
    setShowPassword(!showPassword); 
  }; 

  return (
    <SafeAreaView style={{ flex: 1, margin: 16 }} >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView  contentContainerStyle ={{ flexGrow: 1, justifyContent: 'center' }} style={{ height: '100%' }}>
        <Stack.Screen  options={{ title: 'Sign in', headerShown: true }} />
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
              <Input.Field placeholder="Password" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
              <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    onPress={toggleShowPassword} 
                /> 
            </Input.Icon>
          </Input>
        </View>

        <Button text='Sign in' style={{ marginTop: 20 }} />

        <Text style={{ textAlign: 'center', marginVertical: 10 }}>Don't have an account? <Link href="/sign-up" style={{ color: 'blue' }}>Sign up</Link></Text>

      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}