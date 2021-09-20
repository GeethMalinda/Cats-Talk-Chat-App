import React, { useEffect, useState } from 'react'
import { Container, } from '../Styles/HomeStyle.'
import { FlatList, } from 'react-native'
import PostCard from '../Component/PostCard'
import firestore from '@react-native-firebase/firestore'

const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assects/users/user-3.jpg'),
    postTime: '4 mins ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assects/posts/post-img-3.jpg'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assects/users/user-1.jpg'),
    postTime: '2 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assects/users/user-4.jpg'),
    postTime: '1 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assects/posts/post-img-2.jpg'),
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assects/users/user-6.jpg'),
    postTime: '1 day ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assects/posts/post-img-4.jpg'),
    liked: true,
    likes: '22',
    comments: '4',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assects/users/user-7.jpg'),
    postTime: '2 days ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
]

const HomeScreen = () => {

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const list = []
        firestore()
          .collection('posts')
          .get()
          .then((querySnapshot) => {
            console.log('Total posts ', querySnapshot.size)
            querySnapshot.forEach(doc => {
              const { userId, post, postImg, postTime } = doc.data()
              list.push({
                id: doc.id,
                userId,
                userName: 'Test name',
                userImg: postImg,
                postTime: postTime,
                post,
                postImg: postImg,
                liked: false,
                likes,
                comments,
              })
            })
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

    fetchPosts()
  }, [])

  return (
    <Container>
      <FlatList
        data={post}
        renderItem={({ item }) => <PostCard item={item}/>}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  )
}

export default HomeScreen