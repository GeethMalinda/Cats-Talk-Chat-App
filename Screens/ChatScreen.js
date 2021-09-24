import { StyleSheet, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../Navigation/AuthProvider'

const ChatScreen = () => {
  const { user, logout } = useContext(AuthContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {

    const subscribe = firestore()
      .collection('chatId')
      .onSnapshot((snapshot => {
        snapshot.docChanges().forEach((changes) => {
          if (changes.type === 'added') {
            let data: any = changes.doc.data()
            data.createdAt = data.createdAt.toDate()
            setMessages(previousMessages => GiftedChat.append(previousMessages, data))
          }
        })
      }))

    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ])

  }, [])

  const onSend = useCallback((messages = []) => {

    firestore()
      .collection('chatId')
      .doc(Date.now().toString())
      .set(messages[0])

  }, [])

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}//recive all props from gifted chat
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    )
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      user={{
        _id: user.uid,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    color: '#3333',
  },
})

export default ChatScreen