import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Root() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(users)'} asChild>
        <Button text="User"/>
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  )
}