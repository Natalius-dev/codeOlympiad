import { React } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

// Screens
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import BuiltWithScreen from './screens/BuiltWithScreen';

import colors from './colors'
import * as RootNavigation from './RootNavigation';

const Stack = createNativeStackNavigator();

const App = () => {

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle: {backgroundColor: colors['Alabaster 1']}, headerTitleStyle: {fontFamily: "Poppins-Bold"}, headerBackVisible: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Built Using" component={BuiltWithScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
