import { React, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.body}>
        <StatusBar backgroundColor={colors['Alabaster 1']} barStyle={'dark-content'} />
            <ScrollView>
                <View style={[styles.viewCenter, {padding: 20}]}>
                    
                </View>
            </ScrollView>
            {/* navbar */}
            <Navbar buttons={[
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faLocationDot} size={20} /><Text style={styles.textCenter}>My Air</Text></View>),
                onPress: (() => { setTimeout( () => {navigation.navigate("Home");}, 150 )}) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faMagnifyingGlassLocation} size={20} /><Text style={styles.textCenter}>Search</Text></View>),
                onPress: (() => { setTimeout( () => {navigation.navigate("Search");}, 150 ) }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faChartSimple} size={20} /><Text style={styles.textCenter}>Ranking</Text></View>),
                onPress: (() => { setTimeout( () => {navigation.navigate("Rank");}, 150 ) }) },
                { title: (<View style={styles.viewCenter}><FontAwesomeIcon icon={faUser} size={20} /><Text style={styles.textCenter}>Exposure</Text></View>),
                onPress: (() => { setTimeout( () => {navigation.navigate("Exposure");}, 150 ) }) }
            ]} color={colors['Alabaster 1']} borderColor={colors['Alabaster 1']} />
        </View>
    );
}

export default SearchScreen;