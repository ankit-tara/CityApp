import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { M_BOLD } from "../../../theme/fonts";
import { text_truncate } from "../../../Utils/Helpers";
import { getWcConfig } from "../../../Utils/WcApi";
import WooCommerceAPI from "react-native-woocommerce-api";
import Product from "./Product";
import { APP_SIDE_DISTANCE } from "../../../theme/Dimentions";
const { width } = Dimensions.get("window");
let boxCount = 2;
let boxWidth = width / boxCount - 3;

const ProductList = props => {
  const [products, setproducts] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  useEffect(() => {
    let params = props.navigation.state.params;
    if (params && params.category && params.category.id) {
      console.log(params.category);
      let wcConfig = getWcConfig();
      let wcApi = new WooCommerceAPI(wcConfig);
      wcApi
        .get("products", {})
        .then(data => {
          console.log(data);
          if (data && Array.isArray(data)) {
            setproducts(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text>Filter Category</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productsList}>
          {products.length > 0 &&
            products.map(product => (
              <View style={styles.product} key={`product-${product.id}`}>
                <Product item={product} />
              </View>
            ))}
          {products.length > 0 &&
            products.map(product => (
              <View style={styles.product} key={`product-${product.id}`}>
                <Product item={product} />
              </View>
            ))}
          {products.length > 0 &&
            products.map(product => (
              <View style={styles.product} key={`product-${product.id}`}>
                <Product item={product} />
              </View>
            ))}
          {products.length > 0 &&
            products.map(product => (
              <View style={styles.product} key={`product-${product.id}`}>
                <Product item={product} />
              </View>
            ))}
          {products.length > 0 &&
            products.map(product => (
              <View style={styles.product} key={`product-${product.id}`}>
                <Product item={product} />
              </View>
            ))}
          {products.length > 0 &&
            products.map(product => (
              <View style={styles.product} key={`product-${product.id}`}>
                <Product item={product} />
              </View>
            ))}
          {products.length > 0 &&
            products.map(product => (
              <View style={styles.product} key={`product-${product.id}`}>
                <Product item={product} />
              </View>
            ))}
          {products.length > 0 &&
            products.map(product => (
              <View style={styles.product} key={`product-${product.id}`}>
                <Product item={product} />
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
ProductList.navigationOptions = ({ navigation }) => {
  console.log(navigation);
  let name = "Shop";
  let params = navigation.state.params;
  if (params && params.category && params.category.name) {
    name = text_truncate(params.category.name, 15);
  }
  return {
    title: name,
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      flex: 1,
      fontFamily: M_BOLD,
      textTransform: "capitalize"
    },
    headerRight: <View />
  };
};
export default ProductList;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: APP_SIDE_DISTANCE,
    // marginTop:20
  },
  productsList: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  product: {
    width: boxWidth,
    marginBottom:20
  }
});
