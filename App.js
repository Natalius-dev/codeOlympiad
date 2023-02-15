import { React, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Location from 'expo-location';

// Icons
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faUtensils } from '@fortawesome/free-solid-svg-icons/faUtensils';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';

// Libs
import Button from './lib/Button';

// Screens
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#5c5660"
  },
  navbar: {
    flexDirection: "row"
  }
});

const navbarColor = "#ede9e0"
const navbarBorderColor = "#f5f2eb";

const App = () => {
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

  return (
    <NavigationContainer>
      <View style={styles.body}>
        {/* Main Content */}
        <ScrollView style={{padding: 10}}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </ScrollView>
        {/* navbar */}
        <View style={styles.navbar}>
          <Button style={{borderTopLeftRadius: 10, overflow: "hidden"}} title={<FontAwesomeIcon icon={ faHouse } size={ 24 } />} color={navbarColor} borderColor={navbarBorderColor} onPress={() => {getLocation();console.log(strTimestamp);}} colorTitle="#ffffff" />
          <Button title={<FontAwesomeIcon icon={ faUtensils } size={ 24 } />} color={navbarColor} borderColor={navbarBorderColor} onPress={() => {console.log('aaa')}} />
          <Button style={{borderTopRightRadius: 10, overflow: "hidden"}} title={<FontAwesomeIcon icon={ faUsers } size={ 24 } />} color={navbarColor} borderColor={navbarBorderColor} />
        </View>
      </View>
    </NavigationContainer>
  );
};

export default App;
