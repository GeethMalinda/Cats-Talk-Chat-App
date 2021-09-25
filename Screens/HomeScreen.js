import React, { useEffect, useState } from 'react'
import { Container, } from '../Styles/HomeStyle.'

import PostCard from '../Component/PostCard'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Alert, FlatList, SafeAreaView, ScrollView, View, } from 'react-native'

const HomeScreen = () => {

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    fetchPosts()
    setDeleted(false)
  }, [deleted])

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false },
    )
  }

  const fetchPosts = async () => {
    try {
      const list = []

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          console.log('Total posts ', querySnapshot.size)
          querySnapshot.forEach(doc => {

            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data()

            console.log('doc data ==========>', doc.data())
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            })
          })
        }).catch((e) => {
          console.log('hoem Screen Fire Store ', e)
        })

      setPost(list)

      if (loading) {
        setLoading(false)
      }
      console.log('list==================>', list)
    } catch (e) {
      console.log(e)
    }
  }

  const deletePost = async (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {

          const { postImg } = documentSnapshot.data()

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg)
            const imageRef = storage().ref(storageRef.fullPath)

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted sucessfully`)
                deleteFireStoreData(postId)
                setDeleted(true)
              })
              .catch((e) => {
                console.log('Delelte ImageMethod Eroor', e)
              })
          } else {
            deleteFireStoreData(postId)
          }
        }
      })
  }

  const deleteFireStoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert('Post Deleted!',
          'Your post has been Deleted Successfully!')
      })
      .catch(e => {
        console.log('Delelte firestore Data Method Eroor', e)
      })
  }

  const ListHeader = () => {
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'center' }}>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }}/>
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }}/>
                <View
                  style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }}/>
              <View
                style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
              />
              <View
                style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }}/>
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }}/>
                <View
                  style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }}/>
              <View
                style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
              />
              <View
                style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <Container>
          <FlatList
            data={post}
            renderItem={({ item }) => <PostCard item={item} onDelete={handleDelete}/>}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
          />
        </Container>
      )}
    </SafeAreaView>
  )
}

export default HomeScreen