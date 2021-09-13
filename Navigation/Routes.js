import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from './AuthProvider'
import AuthStack from './AuthStack'
import auth from '@react-native-firebase/auth'
import AppStack from './AppStack'

const Routes = () => {
  const { user, setUser } = useContext(AuthContext)
  const [initializing, setInitializing] = useState(true)

  // Handle user state changes
  function onAuthStateChanged (user) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  //if innializing set to true
  //app will stablinshing and connection with firebase return null
  //we can use loader insted of return null
  if (initializing) {
    return null
    console.log('initializing')
  }
  //if innializing is false display navigation container
  return (
    <NavigationContainer>
      {/*if user will difened we will displayed Appstack Else AuthStack*/}
      {user ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}
export default Routes