import React, { useEffect } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import SplashScreen from "react-native-splash-screen";
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

const Map = ()=>{
    useEffect(() => {
         SplashScreen.hide();

    }, [])
    return (
        <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>    )
}

export default Map