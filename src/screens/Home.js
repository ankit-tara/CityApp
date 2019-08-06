import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Banner from "../components/Banner";
import BlockHeader from "../components/BlockHeader";
import Categories from "../components/Categories";
import SingleCard from "../components/SingleCard";
import Ads from "../components/Ads";
import styles from "../assets/style.js";
import { getHomePageData } from "../Utils/Api";

const Home = (props) => {
  const [bannerData, setBannerData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    SplashScreen.hide();
    getHomePageData()
      .then(setHomePageData)
      .catch(e => console.log(e));
  }, [false]);

  const setHomePageData = data => {
    if (!data || !data.acf) return;
    let acf = data.acf;
    acf.main_slider_images && setBannerData(acf.main_slider_images);
    acf.images && setAdData(acf.images);
    data.categories_data && setCatData(data.categories_data);
    console.log(data);
  };

  showAllCities=()=>{
    props.navigation.navigate('Cities')
    // props.navigation.navigate('ShowAllCities')
  }

  return (
    <View style={styles.flex}>
      <ScrollView>
        <Banner data={bannerData} />
        <BlockHeader heading="CITIES" onLinkPress={showAllCities} />
        <Categories {...props} />
        <Ads data={adData} />

        {catData.length > 0 &&
          catData.map(cat => {
            return (
              <View key={cat.tag.term_id}>
                <BlockHeader heading={cat.tag.name} />
                {cat.posts.map(post => (
                  <View key={`cat-${post.id}`} style={[{paddingHorizontal:10},styles.boxes]}>
                    <SingleCard image={post.fimg_url} title={post.title.rendered} />
                  </View>
                ))}
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};
export default Home;
