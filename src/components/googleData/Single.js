import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/dist/Entypo";
import { M_Regular } from "../../theme/fonts";
import { Rating, AirbnbRating } from "react-native-ratings";
import { getListPlaceImage } from "../../Utils/Api";
import { GOOGLE_MAP_API } from "../../Utils/constants";

const Place = ({ place, handleClick }) => {
  
  if (!place) return null;
  return (
    <Text>jhfjfdhg</Text>
  );
};

export default Place;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

});
