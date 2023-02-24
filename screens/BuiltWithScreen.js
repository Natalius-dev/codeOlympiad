import { React, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Text, BackHandler, StatusBar } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';


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
        backgroundColor: colors['Slate gray']
    },
    textCenter: {
        textAlign: "center",
        fontFamily: "Poppins-Regular"
    },
    texts: {
        color: colors['Alabaster 1'],
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
    divider: {
        height: 2,
        backgroundColor: colors['Alabaster 1'],
        marginTop: 15,
        marginBottom: 15,
        opacity: 0.75,
        overflow: "hidden",
        width: "100%"
    }
});

const BuiltWithScreen = ({props, navigation}) => {
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
            <ScrollView>
                <View style={[styles.viewCenter, {padding: 20}]}>
                    <Text style={styles.textBold}>This app was built using:</Text>
                    <Text style={styles.texts}>- React Native</Text>
                    <Text style={styles.texts}>- Expo</Text>
                    <Text style={styles.texts}>- Font Awesome</Text>
                    <Text style={styles.texts}>- AirVisual API</Text>
                    <Text style={styles.texts}>- Lots of love ♥ (and pain)</Text>
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

export default BuiltWithScreen;