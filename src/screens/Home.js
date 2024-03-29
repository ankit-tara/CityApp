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
import { LOCATION_DATA, LAT_LNG, AUTH_USER } from "../Utils/constants";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
var PushNotification = require("react-native-push-notification");
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import CatListHome from "./catListHome";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/authUser";
const Home = props => {
  const [loader, setloader] = useState(true);
  const [loadingMsg, setloadingMsg] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [latlng, setlatlng] = useState();
  const [status, setstatus] = useState("");
  const locationLoading = useSelector(state => state.locationLoading);
  const authLocation = useSelector(state => state.authLocation);
  const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
    // configurePushNotification()
    props.locationLoadingStart();
    loadPageData();
    setUser();
    getHomePageData()
      .then(data => setHomePageData(data,false))
      .catch(e => console.log(e));
  }, [false]);

  setUser = async () => {
    let value = await AsyncStorage.getItem(AUTH_USER);
    if (!value) return;
    value = JSON.parse(value);
    value && value.token && dispatch(userLogin(value));

  };

  configurePushNotification = () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "942434448921",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    });
  };

  const loadPageData = async () => {
    props.unselectLocation();
    const value = await AsyncStorage.getItem(LOCATION_DATA);
    const lat_lng = await AsyncStorage.getItem(LAT_LNG);
    if (value && lat_lng) {
      let currentTime = new moment();
      let data = JSON.parse(value);
      let dataStoredTime = new moment(data.time);
      let timeDiff = currentTime.diff(dataStoredTime, "minutes");
      if (timeDiff < 5) {
        setlatlng(lat_lng);
        setstatus("from storage");
        setloadingMsg(`Getting location data of ${data.data.city}`);
        getCityData(data.data);
        return;
      }
    }
    checkLocationAcess();
    // checkGranted();
  };
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

        checkGranted();
        // error.message => "disabled"
      });
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
            let value = `${position.coords.latitude},${position.coords.longitude}`;
            setlatlngValue(value);
            // await AsyncStorage.setItem(LAT_LNG, value);
            // setlatlng(value);
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
      getGlobalData();
    }
  };
  const setlatlngValue = async value => {
    await AsyncStorage.setItem(LAT_LNG, value);
    setlatlng(value);
  };
  const getGlobalData = () => {
    props.unselectLocation();
    getHomePageData()
      .then(setHomePageData)
      .catch(e => console.log(e));
    setloader(false);
    setloadingMsg("");
    props.locationLoadingStop();
  };

  const getCityData = data => {
    props.selectLocation(data);
    getHomePageData(data.city)
      .then(setHomePageData)
      .catch(e => console.log(e));
    setloader(false);
    setloadingMsg("");
    props.locationLoadingStop();
  };

  const handleLocationData = async locationData => {
    if (locationData.status == "OK") {
      let data = new Location(locationData);
      setloadingMsg(`Getting location data of ${data.city}`);

      let storage_data = {
        data: data,
        time: new Date()
      };

      await AsyncStorage.setItem(LOCATION_DATA, JSON.stringify(storage_data));
      setstatus("from api");

      getCityData(data);
    } else {
      getGlobalData();
    }
  };

  const setHomePageData = (data, show = true) => {
    if (!data || !data.acf) return;
    let acf = data.acf;
    acf.main_slider_images && setBannerData(acf.main_slider_images);
    show && data.ads_data && setAdData(data.ads_data);
    show && data.categories_data && setCatData(data.categories_data);
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
    <View>
      <ScrollView>
        <Banner data={bannerData} />

        <BlockHeader heading="Categories" onLinkPress={ShowAllTags} />
        <Tags {...props} />
        {adData && <Ads images={adData} />}
        {catData.length > 0 &&
          latlng &&
          catData.map(cat => {
            cat.tag.id = cat.tag.term_id;
            return (
              <View key={cat.tag.term_id} style={{ flex: 1 }}>
                <CatListHome data={cat} latlng={latlng} />
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
