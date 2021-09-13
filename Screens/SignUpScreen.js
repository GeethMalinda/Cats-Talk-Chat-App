import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormInput from '../Component/FormInput'
import FormButton from '../Component/FormButton'
import SocialButton from '../Component/SocialButton'
import { AuthContext } from '../Navigation/AuthProvider'

const SignUpScreen = ({ navigation }) => {

  const { register } = useContext(AuthContext)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  //todo set validations to email and passward
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.text}> Create An Acount </Text>
        <FormInput
          labelValue={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholderText="Email Address"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholderText="password"
          iconType="lock"
          secureTextEntry={true}
        />
        <FormInput
          labelValue={confirmPassword}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          placeholderText="confirmPassword"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign Up"
          onPress={() => register(email, password)}
        />
        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{' '}
          </Text>
          <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
            <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
            Privacy Policy
          </Text>
        </View>
        <SocialButton
          buttonTitle="Sign Up With FaceBook"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => {
          }}
        />

        <SocialButton
          buttonTitle="Sign Up With Googel"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => {
          }}
        />

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('loggingScreen')}>
          <Text style={styles.navButtonText}>Have An Acount?Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}
export default SignUpScreen

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
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: '700',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
})