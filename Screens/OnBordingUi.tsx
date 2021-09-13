import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 8}} {...props}>
        <Text style={{fontSize: 16}}>Skip</Text>
    </TouchableOpacity>
);
const Done = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 8}} {...props}>
        <Text style={{fontSize: 16}}>Done</Text>
    </TouchableOpacity>
);
const Next = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 8}} {...props}>
        <Text style={{fontSize: 16}}>Next</Text>
    </TouchableOpacity>
);
const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(47, 54, 64,1.0)' : 'rgba(0, 0, 0,0.3)';

    return (
        <View
            style={{
                width: 5,
                height: 5,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    );
};

const OnBoardingScreen = ({navigation}) => {
    return (
        <Onboarding
            DoneButtonComponent={Done}
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DotComponent={Dots}
            onSkip={() => navigation.navigate('loggingScreen')}
            onDone={() => navigation.navigate('loggingScreen')}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: (
                        <Image
                            source={require('../assects/pngkey.com-social-media-png-images-3908340.png')}
                            style={styles.image}
                        />
                    ),
                    title: 'Connect To The World',
                    subtitle: 'A new Way To Connect To the World',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: (
                        <Image
                            style={styles.image2}
                            source={require('../assects/transparent-cartoon-business-social-media-management-suite-powerful-simple-a5da602d8be9bd1.2161200315711607927807.png')}
                        />
                    ),
                    title: 'Share Your Favourite',
                    subtitle: 'Share Your Thought With Similer Kind Of People',
                },
                {
                    backgroundColor: '#78e08f',
                    image: (
                        <Image
                            style={styles.image3}
                            source={require('../assects/kisspng-social-media-influencer-marketing-business-content-take-the-rocket-s-business-villain-5aa160da5a9c44.9968298015205255303712.png')}
                        />
                    ),
                    title: 'Become The Start',
                    subtitle: 'Let The Spot Light Capture You',
                },
            ]}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        top: 70,
        // left: 0,
        width: '82%',
        margin: 0,
        height: '63%',
        padding: 0,
    },
    image2: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        top: 70,
        width: '90%',
        margin: 0,
        height: '60%',
        padding: 0,
    },
    image3: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        top: 90,
        width: '80%',
        height: '60%',
        borderRadius: 80,
    },
});


export default OnBoardingScreen


