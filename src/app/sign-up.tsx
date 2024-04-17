import { Stack } from "expo-router";
import { View } from "react-native";

export default function SignUp() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Stack.Screen options={{ title: 'Sign up' }} /> 
    </View>
  )
} 