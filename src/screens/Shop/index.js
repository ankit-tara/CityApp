import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Image,
  PermissionsAndroid
} from "react-native";
import Header from "../../components/Header";
import Banner from "./banner"
import { APP_SIDE_DISTANCE } from "../../theme/Dimentions";

const Shop = props => {
  return(
    <View style={styles.container}>
      <Banner/>
    </View>
  )
};

Shop.navigationOptions = {
  header: <Header />
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginHorizontal:APP_SIDE_DISTANCE
  }
});
