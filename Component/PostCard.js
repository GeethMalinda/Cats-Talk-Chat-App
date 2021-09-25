import React, { useContext } from 'react'
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

import { AuthContext } from '../Navigation/AuthProvider'
import moment from 'moment'

const PostCard = ({ item, onDelete }) => {
  const { user, logout } = useContext(AuthContext)
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
    <Card key={item.id}>
      <UserInfo>
        <UserImg source={{ uri: item.userImg }}/>
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
          {/*<PostTime>{item.postTime.toString()}</PostTime>*/}
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg !== null ? <PostImg source={{ uri: item.postImg }}/> : <Divider/>}
      {/*<Divider/>*/}
      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={'#c0392b'}/>
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>

        <Interaction>
          <Ionicons name="chatbubbles-outline" size={25}/>
          <InteractionText>{commentText}</InteractionText>
        </Interaction>

        {/*if the current user id matchs the user id of the post Creator*/}
        {
          user.uid === item.userId ?
            <Interaction onPress={() => onDelete(item.id)}>
              <Ionicons name="trash-outline" size={25}/>
            </Interaction> :
            null
        }

      </InteractionWrapper>
    </Card>
  )
}

export default PostCard