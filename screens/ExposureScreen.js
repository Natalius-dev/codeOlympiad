import { React, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';

// Icons
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassLocation';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

// Libs
import Navbar from '../lib/Navbar';

import colors from '../colors'

const ExposureScreen = ({props, navigation}) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getLocation = () => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }

    useEffect(() => {
        getLocation();
    }, []);

    let locStatus = 'Waiting..';
    let timestampLoc;
    let parsedTimestamp;
    let strTimestamp;

    if (errorMsg) {
        locStatus = errorMsg;
    } else if (location) {
        locStatus = JSON.stringify(location);
        timestampLoc = JSON.parse(locStatus).timestamp;
        parsedTimestamp = new Date(timestampLoc);
        strTimestamp = parsedTimestamp.getHours() + ":" + parsedTimestamp.getMinutes() + ":" + parsedTimestamp.getSeconds();
    }


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
                    <Text>d</Text>
                </View>
            </ScrollView>
            {/* navbar */}
            <Navbar buttons={[
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faLocationDot} size={20} /><Text style={styles.textCenter}>My Air</Text></View>), onPress: (() => { getLocation(); console.log(strTimestamp); navigation.navigate("Home"); }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faMagnifyingGlassLocation} size={20} /><Text style={styles.textCenter}>Search</Text></View>), onPress: (() => { console.log("button 2"); navigation.navigate("Search"); }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faChartSimple} size={20} /><Text style={styles.textCenter}>Ranking</Text></View>), onPress: (() => { console.log("button 3"); navigation.navigate("Rank"); }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faUser} size={20} /><Text style={styles.textCenter}>Exposure</Text></View>), onPress: (() => { console.log("button 4"); navigation.navigate("Exposure"); }) }
            ]} color={colors['Alabaster 1']} borderColor={colors['Alabaster 1']} />
        </View>
    );
}

export default ExposureScreen;