import { Alert, Platform, StyleSheet, View, } from 'react-native'
import React, { useContext, useState } from 'react'
import { AddImage, InputField, InputWrapper, StatusWrapper, SubmitBtn, SubmitBtnText } from '../Styles/AddPost'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import { ActivityIndicator, Text } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../Navigation/AuthProvider'

const PostScreen = () => {
  const { user, logout } = useContext(AuthContext)

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

    const imageUrl = await uploadImage()
    console.log('Image Url: ', imageUrl)

    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: null,
        comments: null,
      }).then(() => {
      console.log('post Added')
      Alert.alert('Image Uploaded ..!', 'Image Saved Sucessfully..')
      setPost(null)
    }).catch((e) => {

    })

  }

  const uploadImage = async () => {
    const uploadUrl = image
    let filename = uploadUrl.substring(uploadUrl.lastIndexOf('/') + 1)
    const storageRef = storage().ref(`photo/${filename})`)
    const task = storageRef.putFile(uploadUrl)

    // Add timestamp to File Name //for continue to save repetive uplaods
    const extension = filename.split('.').pop()
    const name = filename.split('.').slice(0, -1).join('.')
    filename = name + Date.now() + '.' + extension

    setUploading(true)
    setTransferred(0)

    //byte uploading status eka chek kragnna use krai
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`)

      //presentage get
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      )

    })

    try {
      await task

      const url = await storageRef.getDownloadURL()

      setUploading(false)
      setImage(null)

      // Alert.alert('Image Uploaded ..!', 'Image Saved To FireBase Cloud Storage')

      return url
    } catch (e) {
      console.log(e)
      return null
    }
  }

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{ uri: image }}/> : null}
        <InputField
          placeholder="Whats On Your Mind "
          multiline
          numberOfLines={6}
          value={post}
          onChangeText={(postContent) => setPost(postContent)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff"/>
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}

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