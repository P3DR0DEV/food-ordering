import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { TextProps, ViewProps } from './Themed'

function Input({ children }: { children: React.ReactNode }) {
  return (
    <View>
      {children}
    </View >
  )
}

function InputField(props: TextInputProps) {
  return <TextInput style={styles.input} placeholderTextColor={'gainsboro'} {...props} />
}

interface InputProps extends ViewProps {
  
}

function InputIcon({ children, ...props }: InputProps) {
  return (
    <View style={styles.inputView} {...props}>
      {children}
    </View>
  )
}

function InputLabel(props: TextProps) {
  return <Text style={[{ fontSize: 16, color: 'gray'}, props.style]}>{props.children}</Text>
}

Input.Field = InputField
Input.Label = InputLabel
Input.Icon = InputIcon

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    flex: 1
  }, 
  inputView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
  }

})

export { Input }