import React, {useContext, useState} from 'react';

import FormInput from '../Component/FormInput';
import FormButton from '../Component/FormButton';
import SocialButton from '../Component/SocialButton';
import * as Platform from 'react-native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../Navigation/AuthProvider'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({navigation}) => {

    const {login, googleSignIn, faceBookSignIn} = useContext(AuthContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    return (

        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Image
                    source={require('../assects/cat.png')}
                    style={styles.logo}
                />

                <Text style={styles.text}> Cat Talks</Text>
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
                <FormButton
                    buttonTitle="Sign In"
                    onPress={() => login(email, password)}
                />
                <TouchableOpacity style={styles.forgotButton} onPress={() => {

                }}>
                    <Text style={styles.navButtonText}>Forgot Passward</Text>
                </TouchableOpacity>

                {Platform.OS === 'android' ? (
                    <View>
                        <SocialButton
                            buttonTitle="Sign In With FaceBook"
                            btnType="facebook"
                            color="#4867aa"
                            backgroundColor="#e6eaf4"
                            onPress={() => faceBookSignIn()}
                        />

                        <SocialButton
                            buttonTitle="Sign In With Googel"
                            btnType="google"
                            color="#de4d41"
                            backgroundColor="#f5e7ea"
                            onPress={() => googleSignIn()}
                        />
                    </View>
                ) : null}
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => navigation.navigate('signUpScreen')}>
                    <Text style={styles.navButtonText}>
                        Don't Have An Acount ? Create Here
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
    },
    logo: {
        height: 120,
        width: 120,
        resizeMode: 'cover',
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: 'blue',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
});

export default LoginScreen;
