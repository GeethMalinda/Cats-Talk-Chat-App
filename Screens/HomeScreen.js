import React from 'react'
import {
  Card,
  Container,
  Interaction,
  InteractionText,
  InteractionWrapper,
  PostImg,
  PostText,
  PostTime,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName
} from '../Styles/HomeStyle.'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeScreen = () => {

  return (
    <Container>
      {/*<Card>*/}
      {/*  <UserInfo>*/}
      {/*    <UserImg source={require('../assects/users/user-1.jpg')}/>*/}
      {/*    <UserInfoText>*/}
      {/*      <UserName>Geeth Malinda</UserName>*/}
      {/*      <PostTime>4hours</PostTime>*/}
      {/*    </UserInfoText>*/}
      {/*  </UserInfo>*/}
      {/*  <PostText>Sample Text</PostText>*/}
      {/*  <PostImg source={require('../assects/posts/post-img-1.jpg')}/>*/}
      {/*  <InteractionWrapper>*/}
      {/*    <Interaction>*/}
      {/*      <Ionicons name="heart-outline" size={25}/>*/}
      {/*      <InteractionText>Like</InteractionText>*/}
      {/*    </Interaction>*/}

      {/*    <Interaction>*/}
      {/*      <Ionicons name="chatbubbles-outline" size={25}/>*/}
      {/*      <InteractionText>Comment</InteractionText>*/}
      {/*    </Interaction>*/}
      {/*  </InteractionWrapper>*/}
      {/*</Card>*/}

      <Card>
        <UserInfo>
          <UserImg source={require('../assects/users/user-1.jpg')}/>
          <UserInfoText>
            <UserName>Geeth Malinda</UserName>
            <PostTime>4hours</PostTime>
          </UserInfoText>
        </UserInfo>
        <PostText>Sample Text</PostText>
        <PostImg source={require('../assects/posts/post-img-1.jpg')}/>
        <InteractionWrapper>
          <Interaction>
            <Ionicons name="heart-outline" size={25}/>
            <InteractionText>Like</InteractionText>
          </Interaction>

          <Interaction>
            <Ionicons name="chatbubbles-outline" size={25}/>
            <InteractionText>Comment</InteractionText>
          </Interaction>
        </InteractionWrapper>
      </Card>

      <Card>
        <UserInfo>
          <UserImg source={require('../assects/users/user-1.jpg')}/>
          <UserInfoText>
            <UserName>Geeth Malinda</UserName>
            <PostTime>4hours</PostTime>
          </UserInfoText>
        </UserInfo>
        <PostText>Sample Text</PostText>
        {/*<PostImg source={require('../assects/posts/post-img-1.jpg')}/>*/}
        <InteractionWrapper>
          <Interaction active>
            <Ionicons name="heart" size={25} color={'#c0392b'}/>
            <InteractionText> 12 Likes</InteractionText>
          </Interaction>

          <Interaction>
            <Ionicons name="chatbubbles-outline" size={25}/>
            <InteractionText>Comment</InteractionText>
          </Interaction>
        </InteractionWrapper>
      </Card>
    </Container>
  )
}

export default HomeScreen