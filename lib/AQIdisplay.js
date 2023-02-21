import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        overflow: "hidden"
    }
});

const AQIdisplay = (data) => {
    console.log("AQIdisplay.js | "+data['ReportingArea']);
    return (
        <View style={styles.card}>
            <Text>{data['ReportingArea']}</Text>
        </View>
    )
}

export default AQIdisplay;