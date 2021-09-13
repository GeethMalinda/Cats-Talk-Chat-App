import React, {useState} from 'react';
import {StyleSheet, View,} from 'react-native'
import {Button, TextInput, Title} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';

// type Action = | {
//     type: 'SET_CUSTOMER',
//     name: string
//     addresses: string
//     salary: number
// }
//
// interface State {
//     name: string
//     address: string
//     salary: number
// }

const FireStore = () => {

    // const [name, setName] = useState('')
    // const [address, setAddress] = useState('')
    // const [salary, setSalary] = useState('')

    interface CustomerObj {
        name: string,
        address: string,
        salary: string,
    }

    const [customer, setCustomer] = useState<CustomerObj>({name: '', address: '', salary: ""})


    //
    // const reducer = (state: State, action: Action): State => {
    //
    //     switch (action.type) {
    //         case 'SET_CUSTOMER':
    //             return {
    //                 ...state,
    //                 name: action.name,
    //                 address: action.addresses,
    //                 salary: action.salary,
    //             }
    //     }
    // }
    //
    // const [state, dispatch] = React.useReducer(reducer, {
    //     name: "",
    //     addresses: "",
    //     salary: 0
    // })


    //real time update example
    // useEffect(() => {
    //
    //     const subscriber = firestore()
    //         .collection('Customer')
    //         .doc("EYd84OoP12Sn92Fg1gni")
    //         .onSnapshot(documentSnapshot => {
    //             console.log('User data: ', documentSnapshot.data());
    //             setCustomer(prevState => ({
    //                 name:documentSnapshot.data().name,
    //                 address:documentSnapshot.data().address,
    //                 salary:documentSnapshot.data().salary,
    //             }))
    //         });
    //
    //     // Stop listening for updates when no longer required
    //     return () => subscriber();
    // }, ["EYd84OoP12Sn92Fg1gni"]);

    const saveCustomer = () => {

        firestore()
            .collection('Customer')
            .add(customer)
            .then(() => {
                setCustomer(prevState => ({
                    ...prevState,
                    name: '',
                    address: '',
                    salary: ''
                }));

            });

        // console.log(name)
        // console.log("Save Button Clicked")
    }


    return (
        <View style={styles.container}>
            <Title>Customer Management</Title>


            <TextInput style={styles.input}
                       mode="outlined"
                       label="name"
                       placeholder="Customer Name"
                       value={customer.name}
                       right={<TextInput.Affix text=""/>}
                       onChangeText={(value: string) => {

                           // dispatch({type: "SET_CUSTOMER", name: value})
                           // console.log(value)
                           setCustomer(prevState => ({
                               ...prevState,
                               name: value
                           }));
                       }}

            />

            <TextInput style={styles.input}
                       mode="outlined"
                       label="address"
                       value={customer.address}
                       placeholder="Customer Address"
                       right={<TextInput.Affix text=""/>}
                       onChangeText={(value: any) => {
                           // dispatch({type: "SET_CUSTOMER", address: value})
                           // console.log(value)
                           setCustomer(prevState => ({
                               ...prevState,
                               address: value
                           }));
                       }}
            />

            <TextInput style={styles.input}
                       mode="outlined"
                       label="salary"
                       value={customer.salary}
                       placeholder="Customer Salary"
                       right={<TextInput.Affix text=""/>}
                       onChangeText={(value: any) => {
                           // dispatch({type: "SET_CUSTOMER", salary: value})
                           // console.log(value)
                           setCustomer(prevState => ({
                               ...prevState,
                               salary: value
                           }));
                       }}
            />


            <Button
                style={{fontSize: 20, color: 'green', marginTop: 20}}
                styleDisabled={{color: 'red'}}

                title="Press Me"
            >
                Press Me
            </Button>

            <Button style={styles.btn} color="#8e44ad"
                    icon="camera"
                    mode="contained"
                    onPress={() => saveCustomer()}

            >
                Save Customer
            </Button>

            <Button style={styles.btn} color="#2ecc71"

                    icon="account-edit"
                    mode="contained"
                    onPress={() => console.log("Clicked")}
            >
                Update Customer

            </Button>


            <Button style={styles.btn} color="#e67e22"
                    icon="arrow-collapse-all"
                    mode="outlined "
            >
                GetAll Customer
            </Button>
            <Button style={styles.btn} color="#e74c3c"
                    icon="delete"
                    mode="outlined"
            >
                Delete Customer
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

export default FireStore
