import React, {useState} from 'react';
import {Button, TextInput, Title,} from "react-native-paper";
import {StyleSheet, View,} from 'react-native'
import auth from '@react-native-firebase/auth';


const SignUp = () => {

    const [email, setEmail] = useState(""); // Set loading to true on component mount
    const [password, setPassword] = useState(""); // Initial empty array of users

    const registerUser = () => {
        auth()
            .createUserWithEmailAndPassword("geet@gmail.com", "password")
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    return (

        <View style={styles.container}>
            <Title>Sign Up</Title>

            <TextInput style={styles.input}
                       mode="outlined"
                       label="Email"
                       placeholder="Email"
                       right={<TextInput.Affix text=""/>}
                       value={email}
                       onChangeText={(value: string) => {
                           setEmail(value);
                       }}

            />

            <TextInput style={styles.input}
                       mode="outlined"
                       label="Passward"
                       placeholder="Passward"
                       right={<TextInput.Affix text=""/>}
                       value={password}
                       onChangeText={(value: any) => {
                           setPassword(value)
                       }}
            />

            <Button style={styles.btn} color="#8e44ad"
                    icon="camera"
                    mode="contained"
                    onPress={registerUser()}

            >
                Sign Up
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        marginTop: 10

    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    btn: {
        marginTop: 20
    }
})

export default SignUp
