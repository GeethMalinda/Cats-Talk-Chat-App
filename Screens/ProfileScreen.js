import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import FormButton from '../Component/FormButton'
import { AuthContext } from '../Navigation/AuthProvider'

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user.uid}</Text>

      <FormButton buttonTitle="Log Out" onPress={() => logout()}/>
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

export default ProfileScreen