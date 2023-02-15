import React, { useRef } from 'react';
import {Pressable, Text, View, StyleSheet, Animated} from 'react-native';

const style = StyleSheet.create({
    buttonStyle: {
        flexGrow: 1,
        flexShrink: 1,
        justifyContent: "center"
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center"
    }
});

const Button = props => {
    const opacityAnim = useRef(new Animated.Value(1)).current;
    function buttonOpacityIn() {Animated.timing(opacityAnim, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true
    }).start()}
    function buttonOpacityOut() {Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
    }).start()}

    const transformAnim = useRef(new Animated.Value(0)).current;
    function buttonTransformIn() {Animated.timing(transformAnim, {
        toValue: 4,
        duration: 100,
        useNativeDriver: true
    }).start()}
    function buttonTransformOut() {Animated.timing(transformAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
    }).start()}

    return (
        <Animated.View style={[style.buttonStyle, props.style, {opacity: opacityAnim, transform: [{translateY: transformAnim}], borderLeftColor: props.borderColor, borderRightColor: props.borderColor, borderLeftWidth: props.borderColor !== undefined ? 0.75 : 0, borderRightWidth: props.borderColor !== undefined ? 0.75 : 0}]}>
            <Pressable onPress={props.onPress} onPressIn={() => {buttonOpacityIn(); buttonTransformIn();}} onPressOut={() => {buttonOpacityOut(); buttonTransformOut();}} style={{paddingVertical: 15, backgroundColor: props.color}}>
                <Text style={[{color: props.colorTitle}, style.textStyle]}>{props.title}</Text>
            </Pressable>
        </Animated.View>
    );
}

export default Button;