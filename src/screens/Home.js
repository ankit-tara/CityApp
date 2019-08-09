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
import DeviceInfo from "react-native-device-info";
import { PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import Spinner from "react-native-spinkit";
import { APP_ORANGE } from "../theme/colors";
const Home = props => {
  const [loader, setloader] = useState(true);
  const [loadingMsg, setloadingMsg] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    checkGranted();
    // getGlobalData();
    SplashScreen.hide();
  }, [false]);

  const checkGranted = async () => {
    try {
      setloadingMsg("Checking your location");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "City",
          message:
            "Allow Access to location so that we can show you the personlised data."
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            let value = `${position.coords.latitude},${
              position.coords.longitude
            }`;
            getCityData("Abohar");
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
    }
  };

  const getGlobalData = () => {
    getHomePageData()
      .then(setHomePageData)
      .catch(e => console.log(e));
    setloader(false);
    setloadingMsg("");
  };

  const getCityData = city => {
    getHomePageData(city)
      .then(setHomePageData)
      .catch(e => console.log(e));
    setloader(false);
    setloadingMsg("");
  };

  const handleLocationData = data => {
    if (data.status == "OK") {
      var cityName = data.results[0].address_components.filter(
        x => x.types.filter(t => t == "administrative_area_level_2").length > 0
      )[0].short_name;
      getCityData(cityName);
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
        <BlockHeader heading="Categories" onLinkPress={ShowAllTags} />
        <Tags {...props} />
        {adData && <Ads images={adData} />}
        {catData.length > 0 &&
          catData.map(cat => {
            cat.tag.id = cat.tag.term_id;
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
export default Home;
