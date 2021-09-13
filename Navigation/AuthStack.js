import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import LoginScreen from '../Screens/LoginScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OnBoardingScreen from '../Screens/OnBordingUi'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SignUpScreen from '../Screens/SignUpScreen'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const Stack = createStackNavigator()
const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null)
  let routeName

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(val => {

      if (val === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })

    //Innialize the Googel SDK
    GoogleSignin.configure({
      webClientId: '381701270368-6ao1fvnnkud2mr5lvp0brtg41ah01poc.apps.googleusercontent.com',//googel service.json/auth client/secon clint id
    })

  }, [])

  if (isFirstLaunch === null) {
    return null
  } else if (isFirstLaunch === true) {
    routeName = 'onBoardingScreen'
  } else {
    routeName = 'loggingScreen'
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>

      <Stack.Screen
        name="onBoardingScreen"
        component={OnBoardingScreen}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="loggingScreen"
        component={LoginScreen}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="signUpScreen"
        component={SignUpScreen}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('loggingScreen')}
              />
            </View>
          ),
        })}
      />

    </Stack.Navigator>
  )

}
export default AuthStack