import { React, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Text, BackHandler, StatusBar, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import Polaroid from '../lib/Polaroid'

// Icons
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';

// Libs
import Navbar from '../lib/Navbar';
import colors from '../colors';

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors['Slate gray'],
        height: "100%"
    },
    textCenter: {
        textAlign: "left",
        alignSelf: "flex-start",
        fontFamily: "Poppins-Regular"
    },
    textBold: {
        fontFamily: "Poppins-Bold",
        textAlign: "left",
        alignSelf: "flex-start",
        fontSize: 25,
        color: colors['Alabaster 1']
    },
    viewCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    polaroid: {
        position: "absolute"
    }
});

const SearchScreen = ({props, navigation}) => {
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.navigate("Home");
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        })
    );
    
    const [fontsLoaded] = useFonts({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf")
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.body}>
        <StatusBar backgroundColor={colors['Alabaster 1']} barStyle={'dark-content'} />
            <ScrollView style={{height:"100%"}}>
                <View style={[styles.viewCenter, {padding: 20, height: "100%"}]}>
                    <Text style={styles.textBold}>Hello there!</Text>
                    <Text style={[styles.textCenter, {color: colors['Alabaster 1'], marginBottom: 30}]}>My name is Natalius and I am the sole developer of Air Monitor. This is my first time using React Native and I have learnt a lot from developing this app.</Text>
                    
                    <Polaroid style={{marginVertical: 10, transform: [{rotateZ: "15deg"},{scale:0.9}]}} source={require("../assets/me1.png")} size={200} text="Guitar!!" />
                    <Polaroid style={{marginVertical: 10, transform: [{rotateZ: "-10deg"},{scale:0.9},{translateY: -50},{translateX:60}]}} source={require("../assets/me2.png")} size={200} text="white wall." />
                    <Polaroid style={{marginVertical: 10, transform: [{rotateZ: "10deg"},{scale:0.9},{translateY: -120},{translateX:-40}]}} source={require("../assets/me3.png")} size={200} text="i love silly hats" />

                    <Text style={[styles.textCenter, {color: colors['Alabaster 1'], transform: [{translateY: -50}]}]}>(also i love polaroids if you couldn't tell)</Text>
                    
                </View>
            </ScrollView>
            {/* navbar */}
            <Navbar buttons={[
                {
                    title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faLocationDot} size={20} /><Text style={styles.textCenter}>My Air</Text></View>),
                    onPress: (() => { setTimeout(() => { navigation.navigate("Home"); }, 150) })
                },
                {
                    title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faCircleQuestion} size={20} /><Text style={styles.textCenter}>About</Text></View>),
                    onPress: (() => { setTimeout(() => { navigation.navigate("About"); }, 150) })
                },
                {
                    title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faCode} size={20} /><Text style={styles.textCenter}>Built With</Text></View>),
                    onPress: (() => { setTimeout(() => { navigation.navigate("Built Using"); }, 150) })
                }
            ]} color={colors['Alabaster 1']} borderColor={colors['Alabaster 2']} />
        </View>
    );
}

export default SearchScreen;