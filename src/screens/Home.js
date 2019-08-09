import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Banner from "../components/Banner";
import BlockHeader from "../components/BlockHeader";
import Tags from "../components/Tags";
import SingleCard from "../components/SingleCard";
import Header from "../components/Header";
import Ads from "../components/Ads";
import styles from "../assets/style.js";
import { getHomePageData, getLocationData } from "../Utils/Api";
import {
  locationLoadingStart,
  locationLoadingStop
} from "../redux/actions/locationLoading";
import {
  selectLocation,
  unselectLocation
} from "../redux/actions/authLocation";
import Location from "../redux/modals/Location";
import { PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import Spinner from "react-native-spinkit";
import { APP_ORANGE } from "../theme/colors";
import { connect, useSelector } from "react-redux";
import json from "../assets/sample-location.json";
import { LOCATION_DATA } from "../Utils/constants";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
const Home = props => {
  const [loader, setloader] = useState(true);
  const [loadingMsg, setloadingMsg] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [catData, setCatData] = useState([]);
  const locationLoading = useSelector(state => state.locationLoading);
  const authLocation = useSelector(state => state.authLocation);

  useEffect(() => {
    props.locationLoadingStart();
    loadPageData();
    // checkGranted();
    SplashScreen.hide();
  }, [false]);

  const loadPageData = async () => {
    const value = await AsyncStorage.getItem(LOCATION_DATA);
    if (value) {
      let currentTime = new moment();
      let data = JSON.parse(value);
      let dataStoredTime = new moment(data.time);
      let timeDiff = currentTime.diff(dataStoredTime, "minutes");
      console.log(timeDiff);
      if (timeDiff < 30) {
        setloadingMsg(`Getting location data of ${data.data.city}`);
        console.log("get data from stiorage");
        getCityData(data.data);
        return;
      }
    }
    console.log("get data from api");

    checkGranted();
  };
  const checkGranted = async () => {
    try {
      setloadingMsg("Checking your location");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            let value = `${position.coords.latitude},${
              position.coords.longitude
            }`;
            getLocationData(value)
              .then(handleLocationData)
              .catch(e => getGlobalData());
          },
          error => {
            getGlobalData();
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          }
        );
      } else {
        getGlobalData();
      }
    } catch (err) {
      console.warn(err);
      getGlobalData();
    }
  };

  const getGlobalData = () => {
    getHomePageData()
      .then(setHomePageData)
      .catch(e => console.log(e));
    setloader(false);
    setloadingMsg("");
    props.locationLoadingStop();
  };

  const getCityData = data => {
    console.log('authLocation')
    console.log(authLocation)
    props.selectLocation(data);
    getHomePageData(data.city)
      .then(setHomePageData)
      .catch(e => console.log(e));
    setloader(false);
    setloadingMsg("");
    props.locationLoadingStop();
  };

  const handleLocationData = async data => {
    if (data.status == "OK") {
      let data = new Location(json);
      setloadingMsg(`Getting location data of ${data.city}`);

      let storage_data = {
        data: data,
        time: new Date()
      };

      await AsyncStorage.setItem(LOCATION_DATA, JSON.stringify(storage_data));
      
      getCityData(data);
    } else {
      getGlobalData();
    }
  };

  const setHomePageData = data => {
    if (!data || !data.acf) return;
    let acf = data.acf;
    acf.main_slider_images && setBannerData(acf.main_slider_images);
    data.ads_data && setAdData(data.ads_data);
    data.categories_data && setCatData(data.categories_data);
    console.log(data);
  };

  ShowAllTags = () => {
    props.navigation.navigate("ShowAllTags");
  };

  getlistByTag = tag => {
    props.navigation.navigate("ListByTag", {
      item: tag,
      type: "tag"
    });
  };

  if (loader)
    return (
      <View
        style={[
          styles.flex,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
        <Spinner style={styles.spinner} type="9CubeGrid" color={APP_ORANGE} />
        {loadingMsg && <Text style={styles.loaderMsg}>{loadingMsg} </Text>}
      </View>
    );

  return (
    <View style={styles.flex}>
      <ScrollView>
        <Banner data={bannerData} />
        {/* <Text>{locationLoading.toString()}</Text> */}

        <BlockHeader heading="Categories" onLinkPress={ShowAllTags} />
        <Tags {...props} />
        {adData && <Ads images={adData} />}
        {catData.length > 0 &&
          catData.map(cat => {
            cat.tag.id = cat.tag.term_id;
            if (cat.posts.length <= 0) return;
            return (
              <View key={cat.tag.term_id}>
                <BlockHeader
                  heading={cat.tag.name}
                  onLinkPress={() => {
                    props.navigation.navigate("ListByTag", {
                      item: cat.tag,
                      type: "tag"
                    });
                  }}
                />
                <View style={[{ paddingHorizontal: 10 }, styles.boxes]}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {cat.posts.length > 0 &&
                      cat.posts.map(post => (
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
                      ))}
                  </ScrollView>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

Home.navigationOptions = {
  header: <Header />
};
// export default Home;

const mapStateToProps = state => ({
  locationLoading: state.locationLoading,
  authLocation: state.authLocation
});

const mapDispatchToProps = dispatch => ({
  locationLoadingStart: () => dispatch(locationLoadingStart()),
  locationLoadingStop: () => dispatch(locationLoadingStop()),
  selectLocation: locationData => dispatch(selectLocation(locationData)),
  unselectLocation: () => dispatch(unselectLocation())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
