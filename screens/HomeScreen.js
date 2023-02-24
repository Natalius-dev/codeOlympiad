import { React, useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Text, ActivityIndicator, BackHandler, Alert, StatusBar } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Icons
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faCity } from '@fortawesome/free-solid-svg-icons/faCity';

// Libs
import Navbar from '../lib/Navbar';
import colors from '../colors';
import AQIdata from '../lib/AQIdata';
import AQIdisplay from '../lib/AQIdisplay';
import cities from '../cities';

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (e) {
        // error reading value
    }
}


const key1 = "f05ca10e-5c19-4841-b5c8-825c79ccf39a";
const key2 = "2bd5a6f8-176c-408e-862d-1f0001b0d770";

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors['Slate gray']
    },
    textCenter: {
        textAlign: "center",
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
        opacity: 0.5,
        overflow: "hidden",
        width: "100%"
    }
});
let airData;
let cityComponents = [(<View style={styles.divider} key="divider" />),(<Text key="title" style={styles.textBold}>Major Cities <FontAwesomeIcon icon={faCity} style={{transform: [{translateY: 5}]}} size={30} color={colors['Alabaster 1']} /></Text>)];
let cityData = [];
let updateDisplayOut;
let updateCityOut;

const cityDataReady = (data) => {
    let cityDataCache;
    getData("@cityData").then(value => cityDataCache = value);
    if(data.status !== "success") {
        if(cityDataCache !== null){
            getData("@cityData").then(value => {
                cityData = JSON.parse(value);
                for (let i = 0; i < cityData.length; i++) {
                    cityComponents.push(<AQIdisplay data={cityData[i]} key={cityData[i].city} />);
                }
                updateCityOut(cityComponents);
            });
        } else {
            Alert.alert("Failed to Connect", "Application failed to connect to API, please try again in 1 minute.", [{ text: 'OK', onPress: () => { BackHandler.exitApp(); } }]);
        }
    } else {
        cityData.push(data.data);
        storeData("@cityData", JSON.stringify(cityData));
        if (cityData.length === cities.length) {
            cityData.sort((a, b) => a.current.pollution.aqius - b.current.pollution.aqius);
            storeData("@cityData", JSON.stringify(cityData));
            for (let i = 0; i < cityData.length; i++) {
                cityComponents.push(<AQIdisplay data={cityData[i]} key={cityData[i].city} />);
            }
            updateCityOut(cityComponents);
        }
    }
}
const dataReady = (data) => {
    let airDataCache;
    getData("@airData").then(value => airDataCache = value);
    airData = data.data;
    if (data.status !== "success") {
        if(airDataCache !== null) {
            getData("@airData").then(value => {airData = JSON.parse(value).data; updateDisplayOut([(<Text key="title" style={styles.textBold}>Your Location <FontAwesomeIcon icon={faLocationDot} size={25} color={colors['Alabaster 1']} /></Text>),(<AQIdisplay key="data" data={airData} />)]);});
            
        } else {
        Alert.alert("Failed to Connect", "Application failed to connect to API, please try again in 1 minute.", [{ text: 'OK', onPress: () => { BackHandler.exitApp(); } }]);
        }
    }
    storeData("@airData", JSON.stringify(airData));
    updateDisplayOut([(<Text key="title" style={styles.textBold}>Your Location <FontAwesomeIcon icon={faLocationDot} size={25} color={colors['Alabaster 1']} /></Text>),(<AQIdisplay key="data" data={airData} />)]);
}

const HomeScreen = ({ props, navigation }) => {
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

    const [cityDisplay, updateCityDisplay] = useState(null);
    const [airDisplay, updateAirDisplay] = useState(<ActivityIndicator style={{ transform: [{ scale: 1.5 }], margin: 10 }} size={"large"} color={colors['Alabaster 1']} />);
    useEffect(() => {
        updateDisplayOut = updateAirDisplay;
        updateCityOut = updateCityDisplay;
    });

    for (let i = 0; i < cities.length; i++) {
        AQIdata(key1, cityDataReady, false, cities[i].lat, cities[i].long);
    }
    AQIdata(key2, dataReady, true);
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
                <View style={[styles.viewCenter, { padding: 20 }]}>
                    {airDisplay}
                    {cityDisplay}
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

export default HomeScreen;