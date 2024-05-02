import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function ListLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <TopTabs>
        <TopTabs.Screen name="index" options={{ title: 'Active' }} />
        <TopTabs.Screen name="archived" options={{ title: 'Archived' }} />
      </TopTabs>
    </SafeAreaView>
  )
}