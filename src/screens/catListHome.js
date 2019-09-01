import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  PermissionsAndroid
} from "react-native";
import styles from "../assets/style.js";
import BlockHeader from "../components/BlockHeader";
import SingleCard from "../components/SingleCard";
import Geolocation from "react-native-geolocation-service";
import GoogleList from "../components/googleData/List";
import { withNavigation } from 'react-navigation';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { getNearbyPlaces, getListPlaceImage } from "../Utils/Api.js";

const CatListHome = (props) => {
  const [cat, setcat] = useState();
  const [googleData, setgoogleData] = useState(false);
  const [latlng, setlatlng] = useState();
  useEffect(() => {
    let latlng = props.latlng
    if(props.data &&cat && cat.data&& props.data.tag.name == cat.tag.name) return
    if (props.latlng) {
      setlatlng(latlng);
    } 
    if (props.data.posts.length > 0) {
      setcat(props.data);
    } else {
      setCatValue(latlng)
    }
  }, []);

  checkLocationAcess = () => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    })
      .then(function(success) {
        checkGranted();
      })
      .catch(error => {
      });
  };

  const checkGranted = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            let value = `${position.coords.latitude},${position.coords.longitude}`;
           setCatValue(value)
          },
          error => {

          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          }
        );
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  setCatValue=(value='')=>{
    console.log(value)
    console.log(props.data)
     if (!props.data || !props.data.tag.name) return;
     getNearbyPlaces(value, props.data.tag.name).then(response => {
       if (response.status == "OK") {
         let data = props.data;
         data.posts = response.results;
         setgoogleData(true);
         setcat(data);
       } 
     });
  }
  //   const getImageUrl=(place)=>{
  //       return getListPlaceImage(place.photos[0].photo_reference)
  //          .then(data => data )
  //   }

  if (!cat) return null;
  return (
    <View key={cat.tag.term_id}>
      {googleData ? (
        <BlockHeader heading={cat.tag.name} />
      ) : (
        <BlockHeader
          heading={cat.tag.name}
          onLinkPress={() => {
            props.navigation.navigate("ListByTag", {
              item: cat.tag,
              type: "tag"
            });
          }}
        />
      )}
      <View style={[{ paddingHorizontal: 10 }, styles.boxes]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cat.posts.length > 0 &&
            cat.posts.map(post =>
              googleData ? (
                <TouchableOpacity
                  key={`post-${post.place_id}`}
                  onPress={() =>
                    props.navigation.navigate("Single", {
                      googlePlaceId: post.place_id
                    })
                  }
                >
                  <SingleCard title={post.name} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={`post-${post.id}`}
                  onPress={() =>
                    props.navigation.navigate("Single", { post: post })
                  }
                >
                  <SingleCard
                    image={post.fimg_url}
                    title={post.title.rendered}
                  />
                </TouchableOpacity>
              )
            )}
        </ScrollView>
      </View>
    </View>
  );
};
export default withNavigation(CatListHome);
