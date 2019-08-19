import React, { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Platform,Linking } from "react-native";
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

const Map = ({ lat, lng, address = "" }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const gotoMaps = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${lat},${lng}`;
    const label = address;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      // android: `https://www.google.com/maps/search/?api=1&query=${address}`
      android: `${scheme}${address}`
      // android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };
  if (!lat || !lng) return null;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        <MapView.Marker
          onPress={gotoMaps}
          coordinate={{ latitude: parseFloat(lat), longitude: parseFloat(lng) }}
          title={"Location"}
          description={address}
        />
      </MapView>
     
    </View>
  );
};

export default Map;
