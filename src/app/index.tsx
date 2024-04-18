import { Button } from '@/components/button'
import { Link, Redirect } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

export default function Home() {
  const loading = false
  const session = false
  const isAdmin = false

  if (loading) {
    return <ActivityIndicator />
  }

  if (!session) {
    return <Redirect href={'/(auth)/'} />
  }

  if (!isAdmin) {
    return <Redirect href={'/(users)'} />
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(users)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  )
}
