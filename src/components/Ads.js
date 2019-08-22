import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import Swiper from "react-native-swiper";
import { M_SemiBold } from "../theme/fonts";

const Ads = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.adHeading}>Sponsered ads</Text>
      {props.images.length > 0 && (
        <Swiper
          autoplay={true}
          autoplayTimeout={5}
          style={styles.wrapper}
          height={120}
          showsButton={true}
          showsPagination={false}
          nextButton={<Text style={styles.buttonText}>›</Text>}
          prevButton={<Text style={styles.buttonText}>‹</Text>}
          loop
        >
          {props.images.map(
            img =>
              img.ad_image && (
                <TouchableOpacity
                  style={styles.slide}
                  key={`ad-img-${img.ad_image.ID}`}
                  onPress={() => {
                    if (img.related_to) {
                      props.navigation.navigate("Single", {
                        postId: img.related_to.ID
                      });
                    }
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{ uri: img.ad_image.sizes.medium }}
                  />
                </TouchableOpacity>
              )
          )}
        </Swiper>
      )}
    </View>
  );
};
export default withNavigation(Ads);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    overflow: "hidden"
  },
  buttonText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    padding: 5,
    backgroundColor: "rgba(0,0,0,.6)"
  },
  wrapper: {
    marginBottom: 15
  },

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  text: {
    color: "#fff",
    height: "100%",
    fontSize: 30,
    fontWeight: "bold"
  },

  image: {
    width: "100%",
    flex: 1
  },
  adHeading: {
    textTransform: "uppercase",
    color: "#ccc",
    fontSize: 12,
    fontFamily: M_SemiBold
  }
});
