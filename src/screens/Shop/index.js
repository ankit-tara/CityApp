import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "../../components/Header";
import Banner from "./banner";
import CatList from "./Product/CatList";
const Shop = props => {
  return (
    <ScrollView style={styles.container}>
      <Banner />
      <CatList {...props} />
    </ScrollView>
  );
};

Shop.navigationOptions = {
  header: <Header showCart={true} />
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // marginHorizontal:APP_SIDE_DISTANCE
  }
});
