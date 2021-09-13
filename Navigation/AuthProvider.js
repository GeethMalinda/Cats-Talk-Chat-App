import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'
//can accsess in another files
export const AuthContext = createContext()

//Childern Prop Receive As A Prop
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const showAlert = (e) =>
    Alert.alert(
      'ALERT',
      e,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.'
          ),
      }
    )

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          if (email && password != null || '') {
            try {
              await auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
              showAlert(e.message)
            }
          } else {
            showAlert('Please Insert Email And Passward')
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password)
          } catch (e) {
            console.log(e.getMessage())
            showAlert(e.message)
          }
        },
        logout: async () => {
          try {
            await auth().signOut()
          } catch (e) {
            showAlert(e.message)
          }
        },
        googleSignIn: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn()

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken)

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential)
          } catch (e) {
            showAlert(e.message)
          }
        },
        faceBookSignIn: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

            if (result.isCancelled) {
              throw 'User cancelled the login process'
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken()

            if (!data) {
              throw 'Something went wrong obtaining access token'
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)

            // Sign-in the user with the credential
            await auth().signInWithCredential(facebookCredential)
          } catch (e) {
            showAlert(e.message)
            console.log(e.message)
          }
        }
      }}
    >

      {/*provide Childern Prop*/}
      {children}
    </AuthContext.Provider>
  )
}
