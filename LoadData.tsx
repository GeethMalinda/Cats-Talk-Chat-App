import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from "react-native-paper";


import {FlatList, Text, View} from 'react-native'

const LoadData = () => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [customersList, setCustomers] = useState([]); // Initial empty array of users

    useEffect(() => {
        const subscriber = firestore()
            .collection('Customer')
            .onSnapshot(querySnapshot => {
                const users = [];

                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        name: documentSnapshot.data().name,
                        address: documentSnapshot.data().address,
                        salary: documentSnapshot.data().salary,
                        key: documentSnapshot.id,
                    });
                });

                setCustomers(users);
                setLoading(false);

            });
        console.log(customersList)


        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    if (loading) {
        return <ActivityIndicator/>;
    }

    // ...
    return (
        <FlatList
            data={customersList}
            renderItem={({item}) => (
                <View style={{height: 50, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>User ID: {item.name}</Text>
                    <Text>User Name: {item.address}</Text>
                </View>
            )}
        />
    )

}


export default LoadData