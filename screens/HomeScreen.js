import { React, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
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

let airData;

export const dataReady = (data) => {
    console.log("HomeScreen.js | "+JSON.stringify(data));
    airData = data;
}

const HomeScreen = ({props, navigation}) => {
    AQIdata();
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
        }
    });

    return (
        <View style={styles.body}>
            <ScrollView>
                <View style={styles.viewCenter}>
                    
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