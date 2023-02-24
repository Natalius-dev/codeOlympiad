import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../colors';
import { useFonts } from 'expo-font';

const Polaroid = props => {
    const margin = 15;
    const styles = StyleSheet.create({
        polaroid: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: colors['Alabaster 1'],
            padding: margin,
            borderColor: "lightgrey",
            borderWidth: 2
        }
    });
    const [fontsLoaded] = useFonts({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf")
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={[styles.polaroid, props.style]}>
            <Image source={props.source} style={{width: props.size, height: props.size, marginBottom: margin}} resizeMode="cover" />
            <Text style={{marginVertical: margin, textAlign: "center", fontSize: 15, fontFamily: "Poppins-Regular"}}>{props.text}</Text>
        </View>
    )
}

export default Polaroid;