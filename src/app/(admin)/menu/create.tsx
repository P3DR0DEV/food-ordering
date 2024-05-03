import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import Colors from '@/constants/Colors'
import { defaultImage } from '@/constants/Links'
import { Stack } from 'expo-router'
import { KeyboardAvoidContainer } from '@/components/keyboardAvoidContainer'
import { useCreateProduct } from './actions'
import { toast } from '@/lib/toast'

export default function CreateProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [erros, setErrors] = useState('')

  async function selectImage() {
    const permissionsResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionsResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })

      if (!result.canceled) {
        setImageUrl(result.assets[0].uri)
      }
    }
  }

  function validateInput() {
    setErrors('')
    if (name === '' || price === '') {
      setErrors('All fields are required')
      return false
    }

    if (isNaN(parseFloat(price))) {
      setErrors('Price must be a number')
      return false
    }
    return true
  }

  function reset() {
    setName('')
    setPrice('')
    setImageUrl(null)
  }

  function createProduct() {
    if (!validateInput()) {
      return
    }

    const { data, error } = useCreateProduct(name, parseFloat(price), imageUrl)

    if (error) {
      return toast.error({ title: 'Error', message: error.message || 'Something went wrong' })
    }

    if (!data) {
      return toast.error({ title: 'Error', message: 'Something went wrong' })
    }

    toast.success({ title: 'Success', message: `Product ${data.product.name} created successfully` })
    reset()
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Create Product' }} />
      <KeyboardAvoidContainer style={styles.container}>
        <Image source={{ uri: imageUrl || defaultImage }} style={styles.image} />

        <Pressable onPress={selectImage}>
          <Text style={styles.selectImageText}>Select Image</Text>
        </Pressable>

        <View style={{ gap: 16 }}>
          <Input>
            <Input.Label>Name</Input.Label>
            <Input.Field
              style={{
                padding: 10,
                marginTop: 4,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 10,
              }}
              placeholder="Margarita..."
              placeholderTextColor={'gainsboro'}
              value={name}
              onChangeText={setName}
            />
          </Input>

          <Input>
            <Input.Label>Price</Input.Label>
            <Input.Field
              placeholder="9.99"
              style={{
                padding: 10,
                marginTop: 4,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 10,
              }}
              keyboardType="numeric"
              value={price}
              placeholderTextColor={'gainsboro'}
              onChangeText={setPrice}
            />
          </Input>

          <Text style={{ color: 'red' }}>{erros}</Text>
        </View>
        <Button text="Create" onPress={createProduct} />
      </KeyboardAvoidContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: -100,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 100,
    marginBottom: 20,
  },
  selectImageText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
})
