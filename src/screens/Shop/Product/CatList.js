import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { APP_SIDE_DISTANCE } from "../../../theme/Dimentions";
import { M_BOLD, M_Regular } from "../../../theme/fonts";
import WooCommerceAPI from "../WoocommerceApi";
// import WooCommerceAPI from "react-native-woocommerce-api";
import { getWcConfig } from "../../../Utils/WcApi";
import { APP_ORANGE } from "../../../theme/colors";
import Icon from "react-native-vector-icons/dist/Entypo";

import categories from "../../../assets/json/cat-list.json"

const CatList = props => {
  // const [categories, setcategories] = useState([]);
  useEffect(() => {
    // let wcConfig = getWcConfig();
    // let wcApi = new WooCommerceAPI(wcConfig);
    // wcApi
    //   .get("products/categories?parent=0")
    //   .then(data => {
    //     if (data && Array.isArray(data)) {
    //       console.log(data)
    //       setcategories(data);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, []);

  const gotoProductList = cat => {
    props.navigation.navigate("ProductList", {
      category: cat
    });
  };

  const renderProductCat = cat => {
    return (
      <TouchableOpacity onPress={() => gotoProductList(cat)}>
        <View style={styles.catContainer}>
          <Text style={styles.catText}>{cat.name}</Text>
          <Icon name="chevron-right" color="gray" size={24} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.heading}>Categories</Text>
        <FlatList
          keyExtractor={item => `pcat-${item.id}`}
          data={categories}
          renderItem={pcat => {
           
            return (
              <View key={`pcat-${pcat.item.id}`}>
                {renderProductCat(pcat.item)}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CatList;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: APP_SIDE_DISTANCE
  },
  head: {
    marginVertical: 20
  },
  heading: {
    fontFamily: M_BOLD,
    fontSize: 25
  },
  catContainer: {
    borderTopColor: "#ddd",
    borderRightColor: "#ddd",
    borderBottomColor: "#ddd",
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderLeftWidth: 5,
    borderLeftColor: APP_ORANGE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  catText: {
    fontSize: 20,
    fontFamily: M_Regular,
    color: "gray"
  }
});
