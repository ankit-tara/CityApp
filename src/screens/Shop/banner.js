import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { M_BOLD } from "../../theme/fonts";
import Placeholder from "../../placeholder/BannerPlaceholder";
import { GetShoppingPageData } from "../../Utils/Api";
const bnnerHeight = 280;

const MainBanner = () => {
  const [images, setimages] = useState([]);

  useEffect(() => {
    GetShoppingPageData()
      .then(data => {
        setimages(data.acf ? data.acf.banner_pictures : []);
      })
      .catch(err => console.log(err));
  }, []);

  if (!images || images.length <= 0) {
    return <Placeholder h={bnnerHeight} />;
  }

  return (
    <View style={styles.container}>
      {images.length > 0 && (
        <Swiper
          horizontal={false}
          autoplay={true}
          autoplayTimeout={7}
          dot={<View style={[styles.dot, styles.dotStyle]} />}
          activeDot={<View style={[styles.dot, styles.activeDot]} />}
          loop
        >
          {images.map((img, index) => (
            <View style={styles.slide} key={`img-${index}`}>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{ uri: img.image.sizes.medium }}
              />
              {img.image.title != "" && (
                <Text style={styles.bannerText}>{img.image.title}</Text>
              )}
            </View>
          ))}
        </Swiper>
      )}
    </View>
  );
};

export default MainBanner;

const styles = StyleSheet.create({
  container: {
    height: bnnerHeight
  },

  wrapper: {
    marginBottom: 15
  },

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "relative"
  },

  bannerText: {
    paddingVertical: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textTransform: "capitalize",
    position: "absolute",
    color: "#fff",
    fontSize: 25,
    width: "60%",
    fontFamily: M_BOLD,
    paddingHorizontal: 15
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },

  image: {
    width: "100%",
    flex: 1,
    height: 100
  },
  dot: {
    borderRadius: 8,
    margin: 3
  },
  dotStyle: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 8,
    height: 8
  },
  activeDot: {
    backgroundColor: "#000",
    width: 10,
    height: 10
  }
});
