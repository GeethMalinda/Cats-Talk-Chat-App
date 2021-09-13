import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Chat Screen</Text>
    </View>
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