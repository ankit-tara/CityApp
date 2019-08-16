import React, { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import SplashScreen from "react-native-splash-screen";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    //  ...StyleSheet.absoluteFillObject,
    height: width - 150,
    width: width,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

const Map = ({ lat, lng }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  if (!lat || !lng) return null;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude:parseFloat(lng),
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <MapView.Marker
          coordinate={{latitude: parseFloat(lat),
            longitude:parseFloat(lng), }}
          title={"title"}
          description={"description"}
        />
      </MapView>
      {/* <MapView
      //  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: lat,
         longitude:lng,
        //  latitude: 37.78825,
        //  longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView> */}
    </View>
  );
};

export default Map;
