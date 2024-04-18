import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'

export function KeyboardAvoidContainer({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    height: '100%',
  },
})
