import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { getWcConfig } from "../../../Utils/WcApi";
import WooCommerceAPI from "../WoocommerceApi";
import { getProductsBySeller } from "../../../Utils/Api";
import { M_SemiBold } from "../../../theme/fonts";
const {width} = Dimensions.get('window')
let wcConfig = getWcConfig();
let wcApi = new WooCommerceAPI(wcConfig);
import { withNavigation} from 'react-navigation'
const sellerProducts = (props) => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
      if(!props.sellerid) return
    getProductsBySeller(props.sellerid)
      .then(data => {
        setproducts(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!products.length) {
    return null;
  }
  return (
    <ScrollView horizontal>
      <View
        style={{
          flexDirection: "row",
        //   justifyContent: "space-between",
        //   flexWrap: "wrap",
          marginVertical: 20
        }}
      >
        {products.map(item => (
          <View style={{ width: width / 2 - 4, height: 200, marginRight: 10 }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("ProductSingal", {
                  postId: item.ID
                })
              }
            >
              <Image
                source={{ uri: item.image }}
                style={{ height: "80%", width: "100%" }}
              />
              <Text style={{ textAlign:'center',fontFamily:M_SemiBold }}>{item.post_title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default withNavigation(sellerProducts);
