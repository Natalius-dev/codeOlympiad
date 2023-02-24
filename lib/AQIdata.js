import { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import * as Location from 'expo-location';
import cities from '../cities';

let data;
var requestOptions = {
    method: 'GET'
};

const AQIdata = (key, func, useCurr, lat, long) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getData = (lat, long) => {
        return fetch("https://api.airvisual.com/v2/nearest_city?key="+key+"&lat=" + lat + "&lon=" + long, requestOptions)
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            })
    }

    const getLocation = () => {
        (async () => {
            let location;
            if (useCurr) {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    BackHandler.exitApp();
                    return;
                }

                location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            }
            getData(useCurr === true ? location.coords.latitude : lat, useCurr === true ? location.coords.longitude : long).then(response => { data = response; console.log("AQIdata.js | " + JSON.stringify(data)); func(data); });
        })();
    }

    useEffect(() => {
        setTimeout(() => {
            getLocation();
        }, (1000/cities.length))
    }, []);
}

export default AQIdata;