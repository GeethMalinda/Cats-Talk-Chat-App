import React from 'react'
import {
  Card,
  Divider,
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

const PostCard = ({ item }) => {

  const likeIcon = item.liked ? 'heart' : 'heart-outline'

  let likeText
  if (item.likes === 1) {
    likeText = '1 Like'
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes'
  } else {
    likeText = ' Like'
  }

  let commentText
  if (item.comments === 1) {
    commentText = '1 Comment'
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comment'
  } else {
    commentText = ' Comment'
  }

  return (
    <Card>
      <UserInfo>
        <UserImg source={item.userImg}/>
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{item.postTime}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg !== 'none' ? <PostImg source={item.postImg}/> : <Divider/>}
      {/*<Divider/>*/}
      {/*<PostImg source={require('../assects/posts/post-img-1.jpg')}/>*/}
      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={'#c0392b'}/>
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>

        <Interaction>
          <Ionicons name="chatbubbles-outline" size={25}/>
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  )
}

export default PostCard