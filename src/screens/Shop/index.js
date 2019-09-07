import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "../../components/Header";
import Banner from "./banner";
import { woocommerce_config } from "../../Utils/config";
import WooCommerceAPI from "react-native-woocommerce-api";
import CatList from "./Product/CatList";
var wcApi = new WooCommerceAPI(woocommerce_config);
const Shop = props => {
  useEffect(() => {
    // wcApi
    //   .get("products/categories", {})
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Banner />
      <CatList {...props}/>
    </ScrollView>
  );
};

Shop.navigationOptions = {
  header: <Header />
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // marginHorizontal:APP_SIDE_DISTANCE
  }
});
