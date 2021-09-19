import { Alert, Platform, StyleSheet, View, } from 'react-native'
import React, { useState } from 'react'
import { AddImage, InputField, InputWrapper, SubmitBtn, SubmitBtnText } from '../Styles/AddPost'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'

const PostScreen = () => {

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [transferred, setTransferred] = useState(0)
  const [post, setPost] = useState(null)

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image)
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
      setImage(imageUri)
    })
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image)
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
      setImage(imageUri)
    })
  }

  const submitPost = async () => {
    const uploadUrl = image
    let filename = uploadUrl.substring(uploadUrl.lastIndexOf('/') + 1)

    setUploading(true)
    try {
      await storage().ref(filename).putFile(uploadUrl)
      setUploading(false)
      Alert.alert('Image Uploaded ..!', 'Image Already Exists In FireBase Cloud Storage..')
    } catch (e) {
      console.log(e)
    }
    setImage(null)
  }

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{ uri: image }}/> : null}
        <InputField
          placeholder="Whats On Your Mind "
          multiline
          numberOfLines={6}/>

        <SubmitBtn onPress={submitPost}>
          <SubmitBtnText>Post</SubmitBtnText>
        </SubmitBtn>
      </InputWrapper>
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon}/>
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon}/>
        </ActionButton.Item>
      </ActionButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})
export default PostScreen