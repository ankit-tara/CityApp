import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Banner from "../components/Banner";
import BlockHeader from "../components/BlockHeader";
import Tags from "../components/Tags";
import SingleCard from "../components/SingleCard";
import Header from "../components/Header";
import Ads from "../components/Ads";
import styles from "../assets/style.js";
import { getHomePageData } from "../Utils/Api";
import DeviceInfo from "react-native-device-info";
import { PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';

// let id =  navigator.geolocation.watchPosition((position) => {
//   let region = {
//       latitude:       position.coords.latitude,
//       longitude:      position.coords.longitude,
//       latitudeDelta:  0.00922*1.5,
//       longitudeDelta: 0.00421*1.5
//   }
// })
// console.log(id)
const Home = props => {
  const [bannerData, setBannerData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    checkGranted();

    DeviceInfo.getIPAddress().then(ip => {
      fetch("https://ipapi.co/" + ip + "/json/ ")
        .then(response => console.log(response))
        .catch(error => {
          throw error;
        });
    });

    SplashScreen.hide();
    getHomePageData()
      .then(setHomePageData)
      .catch(e => console.log(e));
  }, [false]);

  const checkGranted = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location "
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
          
            console.log(position)
            // this.setState({
            //   position: {
            //     longitude: position.longitude,
            //     latitude: position.latitude
            //   }
            // });
          },
          error => {
            alert(JSON.stringify(error));
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
          }
        );
        console.log("You can use the location");
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const setHomePageData = data => {
    if (!data || !data.acf) return;
    let acf = data.acf;
    acf.main_slider_images && setBannerData(acf.main_slider_images);
    acf.images && setAdData(acf.images);
    data.categories_data && setCatData(data.categories_data);
    console.log(data);
  };

  ShowAllTags = () => {
    props.navigation.navigate("ShowAllTags");
  };

  return (
    <View style={styles.flex}>
      <ScrollView>
        <Banner data={bannerData} />
        <BlockHeader heading="Categories" onLinkPress={ShowAllTags} />
        <Tags {...props} />
        {adData && <Ads images={adData} />}
        {catData.length > 0 &&
          catData.map(cat => {
            return (
              <View key={cat.tag.term_id}>
                <BlockHeader heading={cat.tag.name} />
                {cat.posts.map(post => (
                  <View
                    key={`cat-${post.id}`}
                    style={[{ paddingHorizontal: 10 }, styles.boxes]}
                  >
                    <SingleCard
                      image={post.fimg_url}
                      title={post.title.rendered}
                    />
                  </View>
                ))}
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
