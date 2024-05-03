import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Pressable, StyleSheet, Text, Image, Alert, View } from 'react-native'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import { Button } from '@/components/button'
import NotFoundScreen from '@/app/+not-found'
import { Input } from '@/components/input'
import { defaultImage } from '@/constants/Links'
import Colors from '@/constants/Colors'
import { KeyboardAvoidContainer } from '@/components/keyboardAvoidContainer'
import { useGetProduct } from '../../orders/actions'
import { useDeleteProduct, useUpdateProduct } from './actions'
import { toast } from '@/lib/toast'

export default function EditProduct() {
  const { id } = useLocalSearchParams()

  const { data: product } = useGetProduct(id as string)

  if (!product) {
    return <NotFoundScreen />
  }

  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price.toString())
  const [imageUrl, setImageUrl] = useState<string | null>(product.imageUrl)
  const [erros, setErrors] = useState('')

  if (!id) {
    return <NotFoundScreen />
  }

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

  function onDelete(id: string) {
    const { error } = useDeleteProduct(id)

    if (error) {
      toast.error({ title: 'Error', message: error.message || 'Something went wrong' })
    }
  }

  function confirmDelete() {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete(id as string),
      },
    ])
  }

  function updateProduct() {
    if (!validateInput()) {
      return
    }
    const { error } = useUpdateProduct({
      id: id as string,
      name,
      price: parseFloat(price),
      description: null,
      imageUrl,
    })

    if (error) {
      return toast.error({ title: 'Error', message: error.message || 'Something went wrong' })
    }

    toast.success({ title: 'Success', message: 'Product updated successfully' })
    return router.push('/(admin)/menu')
  }

  return (
    <>
      <Stack.Screen options={{ headerBackTitle: 'Back', title: 'Edit Product' }} />
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
              style={{
                padding: 10,
                marginTop: 4,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 10,
              }}
              placeholder="9.99"
              keyboardType="numeric"
              value={price}
              placeholderTextColor={'gainsboro'}
              onChangeText={setPrice}
            />
          </Input>

          <Text style={{ color: 'red' }}>{erros}</Text>
        </View>

        <Button text="Update Product" onPress={updateProduct} />
        <Text onPress={confirmDelete} style={styles.selectImageText}>
          Delete
        </Text>
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
