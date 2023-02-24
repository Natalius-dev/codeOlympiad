import { React, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, ActivityIndicator, BackHandler, Alert, StatusBar } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useFonts } from 'expo-font';


// Icons
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassLocation';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

// Libs
import Navbar from '../lib/Navbar';
import colors from '../colors';
import AQIdata from '../lib/AQIdata';
import AQIdisplay from '../lib/AQIdisplay';
import cities from '../cities';

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colors['Slate gray']
    },
    textCenter: {
        textAlign: "center",
        fontFamily: "Poppins-Regular"
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
let airData;
let cityComponents = [(<View style={styles.divider} key="divider" />)];
let updateDisplayOut;
let updateCityOut;

const cityDataReady = (data) => {
    cityComponents.push(<AQIdisplay key={data.data.city} data={data.data} />)
    if(cityComponents.length-1 === cities.length) {
        updateCityOut(cityComponents);
    }
}
const dataReady = (data) => {
    if(data.status !== "success"){
        Alert.alert("Failed to Connect", "Application failed to connect to API, please try again later.", [{text: 'OK', onPress: () => {BackHandler.exitApp();}}]);
    }
    airData = data.data;
    updateDisplayOut(<AQIdisplay data={airData} />);
}

const HomeScreen = ({props, navigation}) => {
    const [cityDisplay, updateCityDisplay] = useState(null);
    const [airDisplay, updateAirDisplay] = useState(<ActivityIndicator style={{transform: [{scale: 1.5}], margin: 10}} size={"large"} color={colors['Alabaster 1']} />);
    useEffect(() => {
        updateDisplayOut = updateAirDisplay;
        updateCityOut = updateCityDisplay;
    });
    for(let i = 0; i < cities.length; i++) {
        AQIdata(cityDataReady, false, cities[i].lat, cities[i].long);
    }
    AQIdata(dataReady, true);
    const [fontsLoaded] = useFonts({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.body}>
        <StatusBar backgroundColor={colors['Alabaster 1']} barStyle={'dark-content'} />
            <ScrollView>
                <View style={[styles.viewCenter, {padding: 20}]}>
                    {airDisplay}
                    {cityDisplay}
                </View>
            </ScrollView>
            {/* navbar */}
            <Navbar buttons={[
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faLocationDot} size={20} /><Text style={styles.textCenter}>My Air</Text></View>), onPress: (() => { navigation.navigate("Home"); }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faMagnifyingGlassLocation} size={20} /><Text style={styles.textCenter}>Search</Text></View>), onPress: (() => { navigation.navigate("Search"); }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faChartSimple} size={20} /><Text style={styles.textCenter}>Ranking</Text></View>), onPress: (() => { navigation.navigate("Rank"); }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faUser} size={20} /><Text style={styles.textCenter}>Exposure</Text></View>), onPress: (() => { navigation.navigate("Exposure"); }) }
            ]} color={colors['Alabaster 1']} borderColor={colors['Alabaster 1']} />
        </View>
    );
}

export default HomeScreen;