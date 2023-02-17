import { React, useEffect } from 'react';
import { BackHandler } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

// Screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import RankScreen from './screens/RankScreen';
import ExposureScreen from './screens/ExposureScreen';

import colors from './colors'
import * as RootNavigation from './RootNavigation';

const Stack = createNativeStackNavigator();

const App = () => {

  const backButtonClick = () => {
    RootNavigation.navigate("Home");
    console.log("Back button clicked 🖱");
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonClick);
    };
  }, []);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle: {backgroundColor: colors['Alabaster 1']}, headerTitleStyle: {fontFamily: "Poppins-Bold"}, animation: "slide_from_right", headerBackVisible: false}}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Rank" component={RankScreen} />
          <Stack.Screen name="Exposure" component={ExposureScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
