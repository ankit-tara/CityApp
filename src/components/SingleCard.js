import React from "react";
import { Text, View, Image, ImageBackground } from "react-native";
import styles from "../assets/style.js";
import { text_truncate } from "../Utils/Helpers.js";

const SingleCard = ({ image, title ,showText=true}) => {
  const bgImage =
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c";
  const noImageView = () => {
    return (
      <ImageBackground
        source={{ uri: bgImage }}
        style={[styles.flex, { borderRadius: 5, overflow: "hidden" }]}
      >
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{title.substring(0, 2)}</Text>
        </View>
      </ImageBackground>
    );
  };

  const ImageView = () => {
    return <Image style={styles.boxImage} source={{ uri: image }} />;
  };

  return (
    <View style={styles.box}>
      {!image && noImageView()}
      {image && ImageView()}
      <Text style={styles.boxText}>{showText&& text_truncate(title,16)}</Text>
    </View>
  );
};

export default SingleCard;
