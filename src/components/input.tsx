import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { TextProps } from './Themed'

function Input({ children }: { children: React.ReactNode }) {
  return (
    <View>
      {children}
    </View>
  )
}

function InputField(props: TextInputProps) {
  return <TextInput style={styles.input} placeholderTextColor={'gainsboro'} {...props} />
}

function InputLabel(props: TextProps) {
  return <Text style={[{ fontSize: 16, color: 'gray'}, props.style]}>{props.children}</Text>
}

Input.Field = InputField
Input.Label = InputLabel

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5
  }
})

export { Input }