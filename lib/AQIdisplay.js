import { View, StyleSheet, Text, Image } from 'react-native';
import colors from '../colors';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// Icons
import { faTemperature3 } from '@fortawesome/free-solid-svg-icons/faTemperature3';
import { faDroplet } from '@fortawesome/free-solid-svg-icons/faDroplet';
import { faWind } from '@fortawesome/free-solid-svg-icons/faWind';

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: colors['Slate gray'],
        borderRadius: 7,
        overflow: "hidden",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5
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
    },
    icon: {
        transform: [{translateY: 2}]
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
    let aqicolor;
    let aqiname;
    if(props.data['current']['pollution']['aqius'] > 301) {
        aqicolor = colors.AQI6;
        aqiname = "Hazardous";
    } else if(props.data['current']['pollution']['aqius'] > 201) {
        aqicolor = colors.AQI5;
        aqiname = "Very Unhealthy";
    } else if(props.data['current']['pollution']['aqius'] > 151) {
        aqicolor = colors.AQI4;
        aqiname = "Unhealthy";
    } else if(props.data['current']['pollution']['aqius'] > 101) {
        aqicolor = colors.AQI3;
        aqiname = "Unhealthy for Sensitive Groups";
    } else if(props.data['current']['pollution']['aqius'] > 51) {
        aqicolor = colors.AQI2;
        aqiname = "Moderate";
    } else {
        aqicolor = colors.AQI1;
        aqiname = "Good";
    }
    return (
        <View style={styles.card}>
            <View style={[styles.child, {flexGrow: 1, borderRightWidth: 2, backgroundColor: aqicolor}]}>
                <Text style={[styles.text, {fontSize: 12}]}>{aqiname}</Text>
                <Text style={[styles.boldText, {fontSize: 25, marginTop: -5, marginBottom: -5}]}>{props.data['current']['pollution']['aqius']}</Text>
                <Text style={[styles.text, {fontSize: 10}]}>US AQI</Text>
            </View>
            <View style={[styles.child, {flexGrow: 2, borderLeftWidth: 2}]}>
                <Text style={styles.boldText}>{props.data['city'] === props.data['state'] ? props.data['state'] : props.data['city']+", "+props.data['state']}, {props.data['country']}</Text>
                <Text style={styles.text}><Text><FontAwesomeIcon style={styles.icon} icon={faTemperature3} color={"#d93838"} /></Text> {props.data['current']['weather']['tp']}°C <FontAwesomeIcon style={styles.icon} icon={faDroplet} color={"#89c1f5"} /> {props.data['current']['weather']['hu']}%</Text>
                <Text style={styles.text}><Text><FontAwesomeIcon style={styles.icon} icon={faWind} /></Text> {Math.round((props.data['current']['weather']['ws']*3.6) * 10) / 10} km/h</Text>
            </View>
        </View>
    )
}

export default AQIdisplay;