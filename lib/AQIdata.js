import { useState, useEffect } from 'react';
import {dataReady} from '../screens/HomeScreen';
import * as Location from 'expo-location';

let data = {"AQI": -1};

const AQIdata = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getData = (lat, long) => {
        return fetch("https://www.airnowapi.org/aq/observation/latLong/current?api_key=98E58C0D-0E38-40F9-8D06-E4A1CDBADE84&format=application/json&latitude="+lat+"&longitude="+long)
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            })
    }
    
    const getLocation = () => {
        (async () => {
    
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            getData(location.coords.latitude, location.coords.longitude).then(response => {data = response[0];console.log("AQIdata.js | "+JSON.stringify(data));dataReady(data);});
        })();
    }

    useEffect(() => {
        getLocation();
    }, []);
}

export default AQIdata;