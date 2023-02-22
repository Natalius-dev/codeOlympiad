import { View, StyleSheet, Text } from 'react-native';
import colors from '../colors';
import { useFonts } from 'expo-font';

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: colors['Slate gray'],
        borderRadius: 7,
        overflow: "hidden",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    child: {
        backgroundColor:colors['Alabaster 1'],
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: colors['Slate gray'],
        overflow: "hidden",
        height: "100%",
        flexWrap: "wrap",
        flexShrink: 1,
        flex: 1,
        textAlign: "center",
        flexDirection: "column"
    },
    text: {
        fontFamily: "Poppins-Regular",
        textAlign: "center",
        flexShrink: 1,
        flexWrap: "wrap",
        width: "100%"
    },
    boldText: {
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        flexShrink: 1,
        flexWrap: "wrap",
        width: "100%"
    }
});

const AQIdisplay = (props) => {
    const [fontsLoaded] = useFonts({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf")
    });
    if (!fontsLoaded) {
        return null;
    }
    console.log("AQIdisplay.js | "+JSON.stringify(props.data));
    return (
        <View style={styles.card}>
            <View style={[styles.child, {flexGrow: 1, borderRightWidth: 2, backgroundColor: colors['AQI'+props.data['Category']["Number"]]}]}>
                <Text style={[styles.text, {fontSize: 12}]}>{props.data['Category']['Name']}</Text>
                <Text style={[styles.boldText, {fontSize: 25, marginTop: -5, marginBottom: -5}]}>{props.data['AQI']}</Text>
                <Text style={[styles.text, {fontSize: 10}]}>US AQI</Text>
            </View>
            <View style={[styles.child, {flexGrow: 2, borderLeftWidth: 2}]}>
                <Text style={styles.boldText}>{props.data['ReportingArea']}</Text>
                <Text style={styles.text}>{props.data['DateObserved']} {props.data['HourObserved']}:00</Text>
            </View>
        </View>
    )
}

export default AQIdisplay;