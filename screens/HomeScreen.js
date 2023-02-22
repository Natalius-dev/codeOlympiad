import { React, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
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

let airData;
let updateOut;

export const dataReady = (data) => {
    console.log("HomeScreen.js | "+JSON.stringify(data));
    airData = data;
    updateOut(<AQIdisplay data={airData} />);
}

const HomeScreen = ({props, navigation}) => {
    const [airDisplay, updateDisplay] = useState(<ActivityIndicator style={{transform: [{scale: 1.5}], margin: 10}} size={"large"} color={colors['Alabaster 1']} />);
    useEffect(() => {
        updateOut = updateDisplay;
    });
    AQIdata(true);
    const [fontsLoaded] = useFonts({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }
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
            flex: 1,
            height: 1,
            backgroundColor: colors['Alabaster 1'],
            marginTop: 10,
            marginBottom: 10
        }
    });

    return (
        <View style={styles.body}>
            <ScrollView>
                <View style={[styles.viewCenter, {padding: 20}]}>
                    {airDisplay}
                    <View style={styles.divider} />
                    {airDisplay}
                </View>
            </ScrollView>
            {/* navbar */}
            <Navbar buttons={[
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faLocationDot} size={20} /><Text style={styles.textCenter}>My Air</Text></View>), onPress: (() => { console.log("button 1"); navigation.navigate("Home"); }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faMagnifyingGlassLocation} size={20} /><Text style={styles.textCenter}>Search</Text></View>), onPress: (() => { console.log("button 2"); navigation.navigate("Search"); }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faChartSimple} size={20} /><Text style={styles.textCenter}>Ranking</Text></View>), onPress: (() => { console.log("button 3"); navigation.navigate("Rank"); }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faUser} size={20} /><Text style={styles.textCenter}>Exposure</Text></View>), onPress: (() => { console.log("button 4"); navigation.navigate("Exposure"); }) }
            ]} color={colors['Alabaster 1']} borderColor={colors['Alabaster 1']} />
        </View>
    );
}

export default HomeScreen;