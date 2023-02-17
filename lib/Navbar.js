import { React, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// Icons
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlassLocation';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

// Libs
import Button from './Button';

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});

const Navbar = props => {
    const navbarColor = props.color;
    const navbarBorderColor = props.borderColor;
    const buttonsArr = [];
    for(let i = 0; i < props.buttons.length; i++) {
        buttonsArr.push(
            <Button key={i} style={{ borderTopLeftRadius: i === 0 ? 12 : 0, borderTopRightRadius: i === props.buttons.length-1 ? 12 : 0, overflow: i === 0 || i === props.buttons.length-1 ? "hidden" : "visible", flex: 1 }} title={props.buttons[i].title} color={navbarColor} borderColor={navbarBorderColor} onPress={props.buttons[i].onPress} />
        );
    }

    return(
        <View style={styles.navbar}>
            {buttonsArr}
        </View>
    );
}

export default Navbar