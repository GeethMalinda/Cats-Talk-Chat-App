import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import {
  Card,
  Container,
  MessageText,
  PostTime,
  TextSection,
  UserImgWrapper,
  UserInfo,
  UserInfoText,
  UserName
} from '../Styles/Message'
import { UserImg } from '../Styles/HomeStyle.'

const Messages = [
  {
    id: '1',
    userName: 'Surandi',
    userImg: require('../assects/users/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },

  {
    id: '2',
    userName: 'Geeth',
    userImg: require('../assects/users/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  }
  // {
  //   id: '3',
  //   userName: 'Ken William',
  //   userImg: require('../assects/users/user-4.jpg'),
  //   messageTime: '1 hours ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  //
  // {
  //   id: '4',
  //   userName: 'Selina Paul',
  //   userImg: require('../assects/users/user-6.jpg'),
  //   messageTime: '1 day ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '5',
  //   userName: 'Christy Alex',
  //   userImg: require('../assects/users/user-7.jpg'),
  //   messageTime: '2 days ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
]

const MessagesScreen = ({ navigation }) => {

  return (
    <Container>
      <FlatList
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('ChatScreen', { userName: item.userName })}>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg}/>
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
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

export default MessagesScreen