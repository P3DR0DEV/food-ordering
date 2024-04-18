import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ScrollViewProps } from 'react-native'

export function KeyboardAvoidContainer(props: ScrollViewProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.container, props.style]}>
          {props.children}
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
